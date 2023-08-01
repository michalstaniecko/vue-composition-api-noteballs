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

const notesCollectionRef = collection( db, "notes" );
const notesCollectionQuery = query(
    notesCollectionRef,
    orderBy( 'date', 'desc' )
)

export const useStoreNotes = defineStore( 'storeNotes', {
    state: () => (
        {
            notes: [
            ],
            notesLoaded: false
        }
    ),
    actions: {
        getNotes() {
            this.notesLoaded = false;
            onSnapshot( notesCollectionQuery, ( querySnapshot ) => {
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
            } );
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
