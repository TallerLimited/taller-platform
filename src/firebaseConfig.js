// import firebase from 'firebase/compat/app';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = 
{
    apiKey: "AIzaSyCe7teqgsrhGDjesiYcTAbF-Wzwp3asqQA",
    authDomain: "taller-platform.firebaseapp.com",
    projectId: "taller-platform",
    storageBucket: "taller-platform.appspot.com",
    messagingSenderId: "893669288647",
    appId: "1:893669288647:web:60b1c3ff1efa21cc40ace2",
    measurementId: "G-9PPV8NNY33"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth , firestore};