import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// THIS IS USED TO INITIALIZE THE firebase OBJECT
// PUT YOUR FIREBASE PROJECT CONFIG STUFF HERE
const firebaseConfig = {
  apiKey: "AIzaSyBU1LAKWhXGj8DTxZd1sE-W0yIMpQGKLoI",
  authDomain: "todo-hw3-acuba2.firebaseapp.com",
  databaseURL: "https://todo-hw3-acuba2.firebaseio.com",
  projectId: "todo-hw3-acuba2",
  storageBucket: "todo-hw3-acuba2.appspot.com",
  messagingSenderId: "555248467332",
  appId: "1:555248467332:web:b052a4653011be25abf1d1",
  measurementId: "G-5RYD7XE0ZB"
};

firebase.initializeApp(firebaseConfig);

// NOW THE firebase OBJECT CAN BE CONNECTED TO THE STORE
export default firebase;