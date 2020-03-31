import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyBwltdN1i2ppDBPR1ZCI1rXMOewFuhy5i4",
    authDomain: "mustang-project-frontend.firebaseapp.com",
    databaseURL: "https://mustang-project-frontend.firebaseio.com",
    projectId: "mustang-project-frontend",
    storageBucket: "mustang-project-frontend.appspot.com",
    messagingSenderId: "1041195856107",
    appId: "1:1041195856107:web:1aa5fea5c43b93d2330eae",
    measurementId: "G-C8JLK4WZKH"
};

firebase.initializeApp(config);

export default firebase;

export const database = firebase.database();
export const auth = firebase.auth();
export const storage = firebase.storage();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
