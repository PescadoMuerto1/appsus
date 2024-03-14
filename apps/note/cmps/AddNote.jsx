import { NoteEditForm } from './NoteEditForm.jsx'

export function AddNote({ onSaveNote, noteToEdit }) {
   
    return (
        <section className="add-note-container">
            <NoteEditForm onSaveNote={onSaveNote} noteToEdit={noteToEdit}/>
        </section>
    )
}