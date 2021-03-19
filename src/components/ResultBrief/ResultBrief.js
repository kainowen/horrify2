import React, { Component } from 'react';
import firebase from '../../firebase';
import Result from './Result/Result';

class Results extends Component {

        state = ({
            synopsis: {
                title: '',
                year:'',
                plot: '',
                rating: '',
                poster: ''
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
          //console.log(this.props.title);
            if (this.props.nature) {
              let tmdbID = this.props.tmdbID;
              const tmdbURL = 'https://api.themoviedb.org/3/movie/'+tmdbID+'?api_key=b257b1a9a9fa747aa7036e3e24f4704c';
              fetch(tmdbURL).then(async response => {
                const details = await response.json();
                const imgURL = 'http://image.tmdb.org/t/p/w185/' + details.poster_path;
                const year = details.release_date.split('').splice(0,4).join('')
                this.setState({
                    synopsis: {
                        title: this.props.title,
                        year: year,
                        plot: details.overview,
                        rating: details.vote_average,
                        poster: imgURL,
                    }
                });
            })
            .catch((error => {
                console.log(error)
            }));
          }
        }

        componentDidUpdate() {
          /*if(this.props.rating === this.state.synopsis.rating){
            console.log("Match");
          } else {
            console.log("no Match");
            console.log(this.state.synopsis.title);
          //  if (this.props.title.includes("(")){
            //  console.log(this.props.title);
            //}
            //firebase.database().ref('movies').child(this.state.synopsis.title).child("orderRating").set(this.state.synopsis.rating);
          }*/
        }

    render() {
            let themes = Object.keys(this.props.themes);
              themes = themes.join(', ');
            return (<Result
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

                />)
        }
}

export default Results;
