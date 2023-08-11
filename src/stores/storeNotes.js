import { defineStore } from "pinia";
import {
    collection,
    doc,
    onSnapshot,
    addDoc,
    deleteDoc,
    updateDoc,
    query,
    orderBy
} from "firebase/firestore";
import { db } from "@/js/firebase";
import { useStoreAuth } from "@/stores/storeAuth";

let notesCollectionRef,
    notesCollectionQuery;

let unsubscribeSnapshot = null;

export const useStoreNotes = defineStore( 'storeNotes', {
    state: () => (
        {
            notes: [],
            notesLoaded: false
        }
    ),
    actions: {
        init() {
            const storeAuth = useStoreAuth();
            notesCollectionRef = collection(
                db,
                "users",
                storeAuth.user.id,
                "notes"
            );
            notesCollectionQuery = query(
                notesCollectionRef,
                orderBy( 'date', 'desc' )
            )

            this.getNotes();
        },

        getNotes() {
            this.notesLoaded = false;

            unsubscribeSnapshot = onSnapshot( notesCollectionQuery, ( querySnapshot ) => {
                let notes = [];
                querySnapshot.forEach( ( doc ) => {
                    const note = {
                        id: doc.id,
                        content: doc.data().content,
                        date: doc.data().date
                    }
                    notes.push( note );
                } );
                this.notes = notes;
                this.notesLoaded = true;
            }, error => {
                console.error(error);
            } );
        },

        clearNotes() {
            this.notes = [];
            if (unsubscribeSnapshot) unsubscribeSnapshot();
        },

        async addNote( newNoteContent ) {
            const currentDate = new Date().getTime()
            const date = currentDate.toString();

            await addDoc( notesCollectionRef, {
                content: newNoteContent,
                date
            } );
        },

        async deleteNote( id ) {
            await deleteDoc( doc( notesCollectionRef, id ) );
        },

        async updateNote( { id, content } ) {
            await updateDoc( doc( notesCollectionRef, id ), {
                content: content
            } );
        }
    },

    getters: {
        getNoteContent: ( { notes } ) => {
            return ( id ) => {
                return notes.find( note => note.id === id ).content
            }
        },

        totalNotesCount: ( { notes } ) => {
            return notes.length;
        },

        totalCharactersCount: ( { notes } ) => {
            return notes.reduce( ( total, note ) => {
                return total + note.content.length;
            }, 0 )
        }
    }
} )
