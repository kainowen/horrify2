import React, { Component } from 'react';
import './App.css';
import firebase from './firebase';
import { BrowserRouter, Route } from 'react-router-dom';
import Contribute from './components/Contribute/Contribute';
import Footer from './components/Footer/Footer';
import Modal from './components/UI/Modal/Modal';
import Admin from './components/Admin/Admin';
import MyList from './components/MyList/MyList';
import Main from './components/Main/Main';

class App extends Component {

    state = ({
            loggedIn: null,
            userEmail: '',
            userPass: '',
            userID:'',
            myWatchList: [],
            myWatchListCodes: []
    });

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

    userLogInHandler = (e) => {
      firebase.auth()
        .signInWithEmailAndPassword(this.state.userEmail, this.state.userPass)
          .then((userCredential) => {
            this.setState({
              loggedIn: true,
              userID: userCredential.user.uid
            })
        })
          .catch((error) => {
            this.setState({signInError: error.message});
            console.log(error.message);
          });

    }

    logoutHandler = (e) => {
      firebase.auth().signOut().then(res => {
        this.setState({
          loggedIn: false,
          userID: '',
          userEmail: '',
          userPass: '',
        });
      });
    }

    componentDidMount() {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.setState({
              loggedIn: true,
              userID: user.uid
            });
        } else {
          this.setState({
              loggedIn: false,
              userID: ''
            });
        }
      })
    }


    componentDidUpdate(prevProps, prevState, SS) {
      if (this.state.loggedIn) {
        if (prevState.loggedIn !== this.state.loggedIn) {
          let rootRef = firebase.database().ref('users/' + this.state.userID);
          rootRef.on('value', snapshot => {
            const result = snapshot.val();
            const list = Object.values(result.watchlist)
            this.setState({
              myWatchListCodes: list,
              myWatchList: result.watchlist
            })
          });
        }
      }
     }


    render() {
      let page = null;
      if (this.state.loggedIn !== null ){
        page = (<BrowserRouter>
            <Route path="/" exact> <Main loggedIn={this.state.loggedIn} watchlist={this.state.myWatchListCodes} user={this.state.userID} /></Route>
            <Route path="/admin" exact> <Admin loggedIn={this.state.loggedIn} watchlist={this.state.myWatchListCodes} user={this.state.userID} /></Route>
            <Route path="/my-list" exact> <MyList loggedIn={this.state.loggedIn} watchlist={this.state.myWatchListCodes} watchlistFull={this.state.myWatchList} user={this.state.userID} /></Route>
            <div className='Container Centered'>
                <hr />
                <p>Know of any movies we don't have listed?</p>
                {this.state.modalShow ? <Modal show={this.state.modalShow} clicked={this.showModalHandler} /> : null}
                <Contribute
                    howtoClicked={this.showModalHandler}
                    loggedIn={this.state.loggedIn}
                    clickLogin={this.userLogInHandler}
                    clickLogout={this.logoutHandler}
                    userEmail={this.state.userEmail}
                    userPass={this.state.userPass}
                    onChange={(e) => this.userDetailsHandler(e)}
                    />
            </div>
            <Footer />
        </BrowserRouter>)
      }
        return (
          <div>
            {page}
          </div>
    );
  }
}

export default App;
