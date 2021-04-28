import React, { Component } from 'react';
import firebase from './../../firebase';
import ContributeForm from './ContributeForm/ContributeForm';


class Contribute extends Component {

  state = {
        movieAdd: {
            movieYear: '',
            movieThemes: '',
            movieNature: 'supernatural',
            movieID: 0,
            movieRemake: false,
          },
        year: '',
        submit: false,
        entry: {},
        linkAdded: false,
        alerts: '',
        userEmail:'',
        userPass:'',
        signInError:''
      };

  userDetailsHandler = (event) => {
    let email;
    let pass;
    if (event.target.id === 'userEmail'){
      email = event.target.value;
      this.setState({userEmail: email})
    } else if (event.target.id === 'userPass'){
      pass = event.target.value;
      this.setState({userPass: pass});
    }
  }

  userSignUpHandler = (e) => {
    firebase.auth()
      .createUserWithEmailAndPassword(this.state.userEmail, this.state.userEmail)
        .catch((error) => {
          this.setState({signInError: error.message})
          console.log(this.state.signInError);
        });
  }

  userLogInHandler = (e) => {
    firebase.auth()
      .signInWithEmailAndPassword(this.state.userEmail, this.state.userEmail)
        .catch((error) => {
          this.setState({signInError: error.message});
          console.log(this.state.signInError);
        });
  }

  logoutHandler = (e) => {
    firebase.auth().signOut().then(res => {
      this.setState({loggedIn: false});
    });
  }

  changeEventHandler = (event) => {
        const updatedState = { ...this.state.movieAdd };
        if (event.target.id === 'movieID') {
          let tmdbID = event.target.value;
          tmdbID = tmdbID.split('/movie/').pop().split('-').shift();
          tmdbID = parseInt(tmdbID);
          updatedState[event.target.id] = tmdbID;
          this.setState({
            movieAdd: updatedState,
            submit: false, });
          if (event.target.value === '') {
            this.setState({
              linkAdded: false, });
          }
        }

        if (event.target.id === 'movieRemake') {
          const checked = event.target.checked;
          updatedState[event.target.id] = checked;
          this.setState({ movieAdd: updatedState });
        }

        if (event.target.id === 'movieNature' || event.target.id === 'movieThemes') {
          updatedState[event.target.id] = event.target.value.toLowerCase();
          this.setState({ movieAdd: updatedState });
        }
      };

  submitEventHandler = (event) => {
        event.preventDefault();
        if (this.state.movieAdd.movieNature === '' || this.state.movieAdd.movieThemes === '') {
          this.setState({
              alerts: 'Please fill all the fields to submit',
            });
        } else {
          if (!this.state.movieAdd.movieThemes.match(/[^,-\w\s]/gi)) {
            const entryState = { ...this.state.entry };
            const title = Object.keys(entryState);
            const nature = this.state.movieAdd.movieNature;
            let themes = this.state.movieAdd.movieThemes.split(', ');
            let themesObj = {};
            themes.forEach((item) => {
                themesObj = { ...themesObj, [item]: true, };
              });
            entryState[title].nature = nature;
            entryState[title].themes = themesObj;
            this.setState({
                  entry: entryState,
                  submit: true,
                });
          } else {
            this.setState({
                  alerts: 'Please separate themes with a comma (,)',
                });
          }
        }
      };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.movieAdd.movieID !== this.state.movieAdd.movieID) {
      let movID = this.state.movieAdd.movieID;
      const tmdbURL = 'https://api.themoviedb.org/3/movie/' + movID +
      '?api_key=b257b1a9a9fa747aa7036e3e24f4704c';
      fetch(tmdbURL).then(async response => {
              if (response.status === 200) {
                let movState = { ...this.state.movieAdd };
                const data = await response.json();
                let title = data.title.replace(/[^\w\s]/gi, '');
                const rating = data.vote_average;
                let decade = null;
                if (data.release_date !== undefined) {
                  decade = data.release_date.split('-').shift().split('');
                  decade[3] = '0';
                  decade = decade.join('');
                }

                let entry = {
                      [title]: {
                          orderRating: rating,
                          tmdbID: this.state.movieAdd.movieID,
                          nature: '',
                          themes: {},
                          decade: decade
                        },
                    };
                movState.movieYear = decade;

                this.setState({
                        year: data.release_date.split('-').shift(),
                        movieAdd: movState,
                        entry: entry,
                        linkAdded: true,
                      });
              } else {
                //jscs:disable maximumLineLength
                let alert =
                "This movie can't be found on themoviedatabase.org, please check the details and try again";

                //jscs:enable maximumLineLength
                this.setState({
                      alert: alert,
                    });
              }
            });
    };

    if (prevState.movieAdd.movieRemake !== this.state.movieAdd.movieRemake) {
      if (this.state.movieAdd.movieRemake) {
        const title = Object.keys(this.state.entry)[0];
        const year = this.state.year;
        const newTitle = title + ' (' + year + ')';
        let entryUpdate = { ...this.state.entry };
        let newEntry = {
          [newTitle]: entryUpdate[title],
        };
        this.setState({
          entry: newEntry
        });
      } else {
        const title = Object.keys(this.state.entry)[0];
        const newTitle = title.split(' (').shift();
        let entryUpdate = { ...this.state.entry };
        let newEntry = {
          [newTitle]: entryUpdate[title],
        };
        this.setState({
          entry: newEntry,
        });
      }
    }

    if (prevState.submit !== this.state.submit) {
      if (this.state.submit) {
        let movTitle = Object.keys(this.state.entry)[0];
        if (this.state.entry[movTitle].nature !== '' && Object.keys(this.state.entry[movTitle]
            .themes).length > 0) {
          const movieRef = firebase.database().ref('movies').child(movTitle);
          movieRef.on('value', snapshot => {
            if (snapshot.val() === null) {
              firebase.database().ref('contribute').child(movTitle).set(this.state.entry[movTitle]);
              this.setState({
                submit: false,
                alerts: 'Thanks for adding ' + movTitle + ' to our database',
              });
            } else {
              this.setState({
                submit: false,
                alerts: 'Thanks, but we already have ' + movTitle + ' in our database',
              });
            }
          });
        }
      }
    }
    /*if (prevState.state.alerts !== this.state.alerts) {
      if (this.state.alerts !== undefined && this.state.alerts.includes( 'Thanks for adding' )) {
        this.setState({
          entry: {}
        });
      }
    }*/
  }

  render() {
    //jscs:disable maximumLineLength
    return (
        <div>
            <ContributeForm
              entry={this.state.entry}
              movieYear={this.state.movieAdd.movieYear}
              alerts={this.state.alerts}
              howToClicked={this.props.howtoClicked}
              formChange={(e) => this.changeEventHandler(e)}
              formSubmit={(e) => this.submitEventHandler(e)}
              loggedIn={this.props.loggedIn}
              userDetails={(event) => this.userDetailsHandler(event)}
              signUp={this.userSignUpHandler}
              login={this.userLogInHandler}
              logout={this.logoutHandler}
              signInError={this.state.signInError}
              linkAdded={this.state.linkAdded}
            />
        </div>
    );

    //jscs:enable maximumLineLength
  }
}

export default Contribute;
