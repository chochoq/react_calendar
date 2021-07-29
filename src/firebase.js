/*eslint-disable*/
import firebase from "firebase/app"
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDCnYbmpg8DZRadrkixzm-PiTbOJmliiGo",
    authDomain: "react-6f91a.firebaseapp.com",
    projectId: "react-6f91a",
    storageBucket: "react-6f91a.appspot.com",
    messagingSenderId: "1001419295103",
    appId: "1:1001419295103:web:7cd16e7e4376d73b3d724a",
    measurementId: "G-L3CLKY6VFS"
}
firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();

export { firestore };