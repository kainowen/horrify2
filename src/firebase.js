import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: 'AIzaSyCcB6Ydo7YBI5iwuVTgTigdBf9dhhT1DJE',
    authDomain: 'horror-app-43afa.firebaseapp.com',
    databaseURL: 'https://horror-app-43afa.firebaseio.com',
    projectId: 'horror-app-43afa',
    storageBucket: 'horror-app-43afa.appspot.com',
    messagingSenderId: '346325365764',
    appId: '1:346325365764:web:94e56bf3289cd01237f151',
    measurementId: 'G-YSH6SRQP5H',
  };
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
