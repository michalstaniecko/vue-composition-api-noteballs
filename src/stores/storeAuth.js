import { defineStore } from "pinia";
import {
    createUserWithEmailAndPassword,
    signOut,
    signInWithEmailAndPassword,
    onAuthStateChanged
} from "firebase/auth";
import { auth } from "@/js/firebase";

export const useStoreAuth = defineStore( 'storeAuth', {
    state: () => {
        return {
            user: {  }
        }
    },
    actions: {
        init() {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    console.log('user logged in: ', user);
                    this.user.id = user.uid;
                    this.user.email = user.email;
                } else {
                    this.user = {};
                }
            });
        },
        registerUser( { email, password } ) {
            createUserWithEmailAndPassword( auth, email, password )
                .then( ( userCredential ) => {
                    const user = userCredential.user;
                } )
                .catch( ( error ) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                } );
        },
        loginUser( { email, password } ) {
            signInWithEmailAndPassword( auth, email, password )
                .then( userCredential => {
                    const user = userCredential.user;
                } )
                .catch( error => {
                } )
        },
        logoutUser() {
            signOut( auth ).then( () => {
                console.log('user logged out')
            } ).catch( ( error ) => {
            } );
        }
    },
    getters: {}
} )
