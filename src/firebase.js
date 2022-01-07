import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import 'firebase/firestore';
import 'firebase/auth'


const firebaseConfig = {
    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    projectId: process.env.REACT_APP_PROJECTID,
    storageBucket: process.env.REACT_APP_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
    appId: process.env.REACT_APP_APPID
  };
  
const firebase = initializeApp(firebaseConfig);
// const db = getFirestore();

export default firebase;
// export const auth = firebase.auth()

