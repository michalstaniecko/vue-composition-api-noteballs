import { defineStore } from "pinia";
import {
    createUserWithEmailAndPassword,
    signOut,
    signInWithEmailAndPassword,
    onAuthStateChanged
} from "firebase/auth";
import { auth } from "@/js/firebase";
import {useStoreNotes} from "@/stores/storeNotes";

export const useStoreAuth = defineStore( 'storeAuth', {
    state: () => {
        return {
            user: {}
        }
    },
    actions: {
        init() {
            const storeNotes = useStoreNotes();

            onAuthStateChanged( auth, ( user ) => {
                if (user) {
                    this.user.id = user.uid;
                    this.user.email = user.email;
                    this.router.push('/');
                    storeNotes.init();
                } else {
                    this.user = {};
                    this.router.replace('/auth')
                }
            } );
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
                    return true;
                } )
                .catch( error => {
                    return false;
                } )
        },
        logoutUser() {
            signOut( auth ).then( () => {
            } ).catch( ( error ) => {
            } );
        }
    },
    getters: {
        isLogged() {
            return !!this.user.id;
        }
    }
} )
