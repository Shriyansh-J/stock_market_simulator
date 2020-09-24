import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const config = {
  apiKey: "AIzaSyClD0cL13ypcJjMs3poxrz3eaKwsTG0uuM",
  authDomain: "stockmarket-simulation.firebaseapp.com",
  databaseURL: "https://stockmarket-simulation.firebaseio.com",
  messagingSenderId: "321834937804",
  projectId: "stockmarket-simulation",
  storageBucket: "stockmarket-simulation.appspot.com",
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

export const auth = firebase.auth();
export const db = firebase.database();
export const firestore = firebase.firestore();
