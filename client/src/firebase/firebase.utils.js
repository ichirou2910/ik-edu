import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyBbMlQW0TX-y5trEIEPUXzIKxUl8ZkGpaA",
  authDomain: "ik-edu.firebaseapp.com",
  projectId: "ik-edu",
  storageBucket: "ik-edu.appspot.com",
  messagingSenderId: "196321212858",
  appId: "1:196321212858:web:82bfaf9047e76bee9b0583",
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export default firebase;
