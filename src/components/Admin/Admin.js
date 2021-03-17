import React, { Component } from 'react';
import firebase from './../../firebase';
import ResultsPage from '../ResultBrief/ResultsPage/ResultsPage';
import Loading from '../UI/Loading/Loading';

class Admin extends Component {

  state = {
    movieList: [],
    oldMovieList: [],
    admin: false,
    pageNo:1,
    verified: false,
    entry:{},
    decade: null
      };

      componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
          if (user.email === 'liamkainowen@gmail.com') {
            this.setState({admin: true});
            const rootRef = firebase.database().ref('contribute');
            rootRef.on('value', snapshot => {
              if (snapshot.val() !== undefined && snapshot.val() !== null) {
                const movies = snapshot.val();
                const titles = Object.keys(movies);
                let movList = [];
                titles.forEach(function (title) {
                  const movie = movies[title];
                  const mov = {
                    decade: movie.decade,
                    nature: movie.nature,
                    themes: movie.themes,
                    orderRating: movie.orderRating,
                    tmdbID: movie.tmdbID,
                    title: title
                  };
                  movList.push(mov);
                });
                movList.sort(function (a, b) {
                  return a.orderRating - b.orderRating
                });
                if(this.state.orderDesc){
                  movList.reverse();
                }
                this.setState({
                  movieList: movList,
                  oldMovieList: movList
                });
              }
            })
          }
        })
      }

      verifyHandler = (e, entry) => {
        this.setState({verify: true});
        const entryTitle = entry.title;
        delete entry.title;
        const alteredEntry = {[entryTitle]: {...entry}};
        this.setState({entry: alteredEntry,
                      decade: entry.decade});
      }

      componentDidUpdate(prevProps, prevState, SS) {
        if (this.state.verify !== prevState.verify) {
          if (this.state.verify === true) {
            let movTitle = Object.keys(this.state.entry)[0];
            if (this.state.entry[movTitle].nature !== '' && Object.keys(this.state.entry[movTitle]
                .themes).length > 0) {
              const rootRef = firebase.database().ref(this.state.decade).child(movTitle);
              const movieRef = firebase.database().ref('movies').child(movTitle);
              const deleteRef = firebase.database().ref('contribute').child(movTitle);
              rootRef.on('value', snapshot => {
                if (snapshot.val() === null) {
                  const entry = {...this.state.entry};
                  delete entry[movTitle].decade;
                  rootRef.set(entry[movTitle]);
                  movieRef.set(entry[movTitle]);
                  deleteRef.remove()
                  this.setState({
                    verify: false,
                    alerts: 'Thanks for adding ' + movTitle + ' to our database',
                  });
                } else {
                  this.setState({
                    verify: false,
                    alerts: 'Thanks, but we already have ' + movTitle + ' in our database',
                  });
                }
              });
            }

          }
        }
      }
  render() {

    let pageContent = [...this.state.movieList];
    pageContent = pageContent.slice(0 + (10 * (this.state.pageNo -1)) , 10 + (10 * (this.state.pageNo -1)));
    let lastPage = false;
    if (pageContent.length < 10){
      lastPage = true;
    }
    let loading = <Loading />;
    if (this.state.movieList.length > 0) {
        loading = null;
    }

    let movieResultsList = <ResultsPage
                                      list={pageContent}
                                      clickedUp={() => this.pageHandler(+1)}
                                      clickedDown={() => this.pageHandler(-1)}
                                      pageNo={this.state.pageNo}
                                      lastPage={lastPage}
                                      admin={this.state.admin}
                                      verify={this.verifyHandler}
                                      />;

    //jscs:disable maximumLineLength
    return (
        <div className='Container'>
          {loading}
          {movieResultsList}
        </div>
    );
    //jscs:enable maximumLineLength
  }
}

export default Admin;
