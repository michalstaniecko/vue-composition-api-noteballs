import { defineStore } from "pinia";
import { collection, doc, onSnapshot, setDoc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "@/js/firebase";

const notesCollectionRef = collection( db, "notes" );

export const useStoreNotes = defineStore( 'storeNotes', {
    state: () => (
        {
            notes: [
                // {
                //     id: 'id1',
                //     content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda atque deserunt earum eum inventore officia quaerat soluta ullam vel. Dolore facere fugit itaque laboriosam maxime quis ratione soluta tenetur. Beatae'
                // },
                // {
                //     id: 'id2',
                //     content: 'shorter notes'
                // }
            ]
        }
    ),
    actions: {
        async getNotes() {
            const q = notesCollectionRef;
            onSnapshot( q, ( querySnapshot ) => {
                let notes = [];
                querySnapshot.forEach( ( doc ) => {
                    const note = {
                        id: doc.id,
                        content: doc.data().content
                    }
                    notes.push( note );
                } );
                this.notes = notes;
            } );
        },
        async addNote( newNoteContent ) {
            const currentDate = new Date().getTime()
            const id = currentDate.toString();

            await setDoc( doc( notesCollectionRef, id ), {
                content: newNoteContent
            } );
        },

        async deleteNote( id ) {
            await deleteDoc(doc(notesCollectionRef, id));
        },

        async updateNote( { id, content } ) {
            const note = doc(notesCollectionRef, id);

            await updateDoc(note, {
                content: content
            });
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
