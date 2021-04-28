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
            modalShow: false,
            orderDesc: true,
            loggedIn: false
    });



    componentDidMount() {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.setState({loggedIn: true});
        }
      })
    }

    render() {
        return (
        <BrowserRouter>
            <Route path="/" exact component={Main} />
            <Route path="/admin" exact component={Admin} />
            <Route path="/my-list" exact component={MyList} />
            <div className='Container Centered'>
                <hr />
                <p>Know of any movies we don't have listed?</p>
                {this.state.modalShow ? <Modal show={this.state.modalShow} clicked={this.showModalHandler} /> : null}
                <Contribute howtoClicked={this.showModalHandler} loggedIn={this.state.loggedIn}/>
            </div>
            <Footer />
        </BrowserRouter>
    );
  }
}

export default App;
