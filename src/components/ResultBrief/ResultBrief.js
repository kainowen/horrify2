import React, { Component } from 'react';
//import firebase from '../../firebase';
import Result from './Result/Result';
import classes from './Results.module.css';

class Results extends Component {

        state = ({
            synopsis: {
                title: '',
                year:'',
                plot: '',
                rating: '',
                poster: '',
                decade: '',
                whereToWatch: ''
            },
            seeMore: false
        });

        seeMoreHandler = () => {
          const seeMore = this.state.seeMore;
            this.setState({
              seeMore: !seeMore
            });
        }

        componentDidMount() {
            if (this.props.nature) {
              let tmdbID = this.props.tmdbID;

              const tmdbURL = 'https://api.themoviedb.org/3/movie/'+tmdbID+'?api_key=b257b1a9a9fa747aa7036e3e24f4704c';
              fetch(tmdbURL).then(async response => {
                const details = await response.json();
                const imgURL = 'http://image.tmdb.org/t/p/w185/' + details.poster_path;
                const year = details.release_date.split('').splice(0,4).join('')
                const tmdbURLProviders = 'https://api.themoviedb.org/3/movie/'+tmdbID+'/watch/providers?api_key=b257b1a9a9fa747aa7036e3e24f4704c&language=gb'
                fetch(tmdbURLProviders).then (async response => {
                  let providers = await response.json();
                  if (providers.results.GB !== undefined && providers.results.GB.flatrate !== undefined){
                    const providerList = providers.results.GB.flatrate;
                    let list = [];
                    providerList.forEach((item, i) => {
                      if (item !== undefined && item.provider_name !== undefined) {
                        list.push(item.provider_name);
                      }
                    });
                    this.setState({
                      whereToWatch: list.join(', ')
                    })
                  }
                })
                this.setState({
                    synopsis: {
                        title: this.props.title,
                        year: year,
                        plot: details.overview,
                        rating: details.vote_average,
                        poster: imgURL,
                        decade: this.props.decade
                    }
                });
            })
            .catch((error => {
                console.log(error)
            }));
          }
        }

       componentDidUpdate() {
          /*if (this.props.decade === undefined || this.props.decade === null || this.props.decade === "0"){
              /*let decade = this.state.synopsis.year;
              decade = decade.split('');
              decade[3] = "0";
              decade = decade.join('');
              console.log(decade);
              firebase.database().ref().child('movies').child(this.props.title).child("decade").set(decade);
              console.log(this.props.title + " " + this.state.synopsis.year);
          }
          /*if(this.props.rating === this.state.synopsis.rating){
          } else {
            firebase.database().ref().child('movies').child(this.props.title).child("orderRating").set(this.state.synopsis.rating);
            firebase.database().ref().child(this.props.decade).child(this.props.title).child("orderRating").set(this.state.synopsis.rating);
            console.log(this.state.synopsis.title + " Has been updated");
          }*/
        }

    render() {
            let open = [classes.Close, classes.Transition2];
            if (this.state.synopsis.title) {
              open = [classes.Open, classes.Transition2];
            }
            open = open.join(" ");

            let themes;
            if (this.props.themes !== undefined) {
              themes = Object.keys(this.props.themes);
              themes = themes.join(', ');
            }

            return (<div className={open}>
                      <Result
                        title={this.state.synopsis.title}
                        year={this.state.synopsis.year}
                        nature={this.props.nature}
                        iMDBrating={this.state.synopsis.rating}
                        themes={themes}
                        rated={this.state.synopsis.rated}
                        poster={this.state.synopsis.poster}
                        plot={this.state.synopsis.plot}
                        director={this.state.synopsis.director}
                        seeMore={this.state.seeMore}
                        clicked={this.seeMoreHandler}
                        admin={this.props.admin}
                        verify={(e) => this.props.verify(e, this.props.entry)}
                        whereToWatch={this.state.whereToWatch}
                      />
                  </div>)
        }
}

export default Results;
