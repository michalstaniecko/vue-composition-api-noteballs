import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAISk3jACLveJCUiv2T6_wfZSL2NLyQrSk",
    authDomain: "noteballs-68244.firebaseapp.com",
    projectId: "noteballs-68244",
    storageBucket: "noteballs-68244.appspot.com",
    messagingSenderId: "210085170511",
    appId: "1:210085170511:web:a2bec3c2966f46a2dd093a"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth(app);

export {
    db, auth
}
