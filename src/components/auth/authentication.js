import * as firebase from 'firebase';

// Initialize Firebase
const config = {
  apiKey: "AIzaSyBdP5b05_h5OdposX2WdYvr1HHgtAbyzqI",
  authDomain: "chat-6158e.firebaseapp.com",
  databaseURL: "https://chat-6158e.firebaseio.com",
  storageBucket: "chat-6158e.appspot.com",
};

export const firebaseApp = firebase.initializeApp(config);

// This is where you access the database
// Make a reference to the global database of firebase
export const topicsRef = firebase.database().ref();
