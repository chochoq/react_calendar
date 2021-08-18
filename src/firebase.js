/*eslint-disable*/
import firebase from "firebase/app"
import "firebase/firestore";

const firebaseConfig = {
    
}
firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();

export { firestore };