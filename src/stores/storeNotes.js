import { defineStore } from "pinia";

export const useStoreNotes = defineStore( 'storeNotes', {
    state: () => (
        {
            notes: [
                {
                    id: 'id1',
                    content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda atque deserunt earum eum inventore officia quaerat soluta ullam vel. Dolore facere fugit itaque laboriosam maxime quis ratione soluta tenetur. Beatae'
                },
                {
                    id: 'id2',
                    content: 'shorter notes'
                }
            ]
        }
    ),
    actions: {
        addNote(newNoteContent) {
            const currentDate = new Date().getTime()
            const id = currentDate.toString();
            const note = {
                id,
                content: newNoteContent
            }
            this.notes.unshift( note );
        },

        deleteNote(id) {
            this.notes = this.notes.filter(note => note.id !== id);
        }
    }
} )
