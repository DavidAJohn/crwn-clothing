import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyC8T0y3CmzPT7yVqtaZETl2_sieN5JB1M4",
    authDomain: "crwn-clothing-db-cef8d.firebaseapp.com",
    databaseURL: "https://crwn-clothing-db-cef8d.firebaseio.com",
    projectId: "crwn-clothing-db-cef8d",
    storageBucket: "crwn-clothing-db-cef8d.appspot.com",
    messagingSenderId: "756806518393",
    appId: "1:756806518393:web:519e75203ed2e0564df6a8"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    if(!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }

    return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
