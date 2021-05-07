import React, { Component } from 'react';
import '../../App.css';
import firebase from '../../firebase';
import ResultsPage from '../ResultBrief/ResultsPage/ResultsPage';
import Loading from '../UI/Loading/Loading';
import Tagbar from '../Tags/TagBar/Tagbar';
import ResultHeader from '../ResultHeader/ResultHeader';


class Main extends Component {

    state = ({
            search: {
                decade: '',
                nature: '',
                theme: []
            },
            movieList: [],
            oldMovieList: [],
            searchError: false,
            heightToggle: false,
            pageNo: 1,
            orderDesc: true,
    });



    componentDidMount() {
      let rootRef = firebase.database().ref('movies').orderByChild('orderRating');

        rootRef.on('value', snapshot => {
            if (snapshot.val() !== undefined && snapshot.val() !== null) {
                const movies = snapshot.val();
                const titles = Object.keys(movies);;
                let movList = [];
                titles.forEach(function (title) {
                    const movie = movies[title];
                    const mov = {
                        title: title,
                        decade: movie.decade,
                        nature: movie.nature,
                        themes: movie.themes,
                        orderRating: movie.orderRating,
                        tmdbID: movie.tmdbID
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

    heightTiggleHandler = () => {
      const heightToggle = this.state.heightToggle;
        this.setState({
          heightToggle: !heightToggle
        });
    }

    TagSelectHandler = (tag, tagKey) => {
        let updatedState = {...this.state.search};
       if(tagKey !== 'theme' && tag !== updatedState[tagKey]) {
          updatedState[tagKey] = tag;
      } else if (tagKey !== 'theme' && tag === updatedState[tagKey]) {
          updatedState[tagKey] = '';
      } else if (tagKey === 'theme' && !this.state.search.theme.includes(tag)) {
           updatedState.theme.push(tag);
           updatedState.theme = [...updatedState.theme];
      } else if (tagKey === 'theme' && this.state.search.theme.includes(tag)) {
          updatedState.theme = updatedState.theme.filter(function(value){
              return value !== tag;
          });
      }
        this.setState({
            search: updatedState,
            pageNo: 1,
          });
    };

    pageHandler = (change) => {
        let page = this.state.pageNo;
        page = page + change;
            this.setState({
                pageNo:page
            })
      }

      orderHandler = (change) => {
        let order = this.state.orderDesc;
        this.setState({
            orderDesc: !order
        })
      }



    componentDidUpdate(prevProps, prevState, SS) {

        if(prevState.orderDesc!== this.state.orderDesc){
            let movieListOrder = [...this.state.movieList];
            movieListOrder.reverse();
            this.setState({
                movieList: movieListOrder
            });
        }
         if (prevState.search !== this.state.search) {

             this.setState({
                 searchError: false
             });

             let rootRef = firebase.database().ref('movies').orderByChild('orderRating');
             if (this.state.search.decade !== '' && this.state.search.nature === '') {
                 rootRef = firebase.database().ref(this.state.search.decade);
             } else  if (this.state.search.decade !== '' && this.state.search.nature !== '') {
                 rootRef = firebase.database().ref(this.state.search.decade).orderByChild('nature').equalTo(this.state.search.nature);
             } else  if (this.state.search.decade === '' && this.state.search.nature !== '') {
                 rootRef = firebase.database().ref('movies').orderByChild('nature').equalTo(this.state.search.nature);
             } else {
                rootRef = firebase.database().ref('movies').orderByChild('orderRating');
             }

             rootRef.on('value', snapshot => {
                 if (snapshot.val() !== undefined && snapshot.val() !== null) {
                     const movies = snapshot.val();
                     const titles = Object.keys(movies);
                     let movList = [];
                     let decade = null;
                     if (this.state.search.decade !== ''){
                       decade = this.state.search.decade;
                     }
                     titles.forEach(function (title) {
                         const movie = movies[title];
                         const mov = {
                            title: title,
                             nature: movie.nature,
                             themes: movie.themes,
                             decade: decade,
                             orderRating: movie.orderRating,
                             tmdbID: movie.tmdbID
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

                 } else {
                     this.setState({
                         searchError: true
                     })
                 }
             })
         }

        if(prevState.search.theme !== this.state.search.theme) {
           if (this.state.search.theme.length > 0) {
             const filterList = [...this.state.oldMovieList];
             const targetLength = this.state.search.theme.length;
             const filteredList = filterList.filter((movie) => {
               if (movie.themes !== undefined){

                let themes = Object.keys(movie.themes);

                let matches = 0;
                let val = false;
                this.state.search.theme.forEach(theme => {
                  if(themes.includes(theme)){
                    matches = matches + 1;
                  }
                })
                if(matches === targetLength){
                   val = true;
                }
                return val;
             } else {
               return null;
             }})
             this.setState({
                 movieList: filteredList
             });
            if(filteredList.length <= 0) {
               this.setState({
                   searchError: true
               });
           }
       } else {
           this.setState({
               movieList: this.state.oldMovieList
           });
       }
     }
   }


    render() {
        let pageContent = [...this.state.movieList];
        pageContent = pageContent.slice(0 + (25 * (this.state.pageNo -1)) , 25 + (25 * (this.state.pageNo -1)));
        let lastPage = false;
        if (pageContent.length < 25){
          lastPage = true;
        }
        let loading = <Loading />;
        if (this.state.movieList.length > 0) {
            loading = null;
        }

        let movieResultsList = null;
        if(!this.state.searchError) {
            movieResultsList = <ResultsPage
                                          list={pageContent}
                                          clickedUp={() => this.pageHandler(+1)}
                                          clickedDown={() => this.pageHandler(-1)}
                                          pageNo={this.state.pageNo}
                                          lastPage={lastPage}
                                          loggedIn={this.props.loggedIn}
                                          watchlist={this.props.watchlist}
                                          user={this.props.user}
                                          />;
        } else{
            movieResultsList = <div className='Container Centered'><p> A movie matching these tags does not exist... It is now your responsibility to make it.</p></div>
        }

        return (
          <div>
            <Tagbar
                toggle={this.state.heightToggle}
                clicked={this.heightTiggleHandler}
                search={this.state.search}
                tagsSelect={this.TagSelectHandler}
                orderClick={this.orderHandler}
                order={this.state.orderDesc}
                loggedIn={this.props.loggedIn}
              />
              <ResultHeader search={this.state.search} />
              {loading}
              {movieResultsList}
          </div>
    );
  }
}

export default Main;
