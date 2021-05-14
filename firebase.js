import firebase from 'firebase/app'


import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
    /*FireBase ApiKey Here*/ 
  };
  
let app;
if(firebase.apps.length === 0){
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app()
}

const db = app.firestore();
const auth = app.auth();

export {db, auth};