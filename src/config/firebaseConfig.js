import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// THIS IS USED TO INITIALIZE THE firebase OBJECT
// PUT YOUR FIREBASE PROJECT CONFIG STUFF HERE
const firebaseConfig = {
    apiKey: "AIzaSyDmssRgppGdpoUlAI5puygB9fsAghyRCnU",
    authDomain: "todo-hw3-acuba.firebaseapp.com",
    databaseURL: "https://todo-hw3-acuba.firebaseio.com",
    projectId: "todo-hw3-acuba",
    storageBucket: "todo-hw3-acuba.appspot.com",
    messagingSenderId: "553560560278",
    appId: "1:553560560278:web:5477704c61adfa457e68b7",
    measurementId: "G-12SR1ZJ5TQ"
  };
firebase.initializeApp(firebaseConfig);

// NOW THE firebase OBJECT CAN BE CONNECTED TO THE STORE
export default firebase;