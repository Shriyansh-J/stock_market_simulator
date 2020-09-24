import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

firebase.initializeApp({
  apiKey: "AIzaSyClD0cL13ypcJjMs3poxrz3eaKwsTG0uuM",
  authDomain: "stockmarket-simulation.firebaseapp.com",
  databaseURL: "https://stockmarket-simulation.firebaseio.com",
  projectId: "stockmarket-simulation",
  storageBucket: "stockmarket-simulation.appspot.com",
  messagingSenderId: "321834937804",
  appId: "1:321834937804:web:bb7fc4d6bdcdfb97380169",
});

export default firebase;
