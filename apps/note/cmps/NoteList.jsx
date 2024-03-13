import { NotePreview } from "./NotePreview.jsx";

export function NoteList({ notes }) {

    return (
        <ul className="note-list notes-list-layout">
            {
                notes.map(note =>
                    <li className='note-card' key={note.id}>
                      
                        <NotePreview note={note} />
                    </li>
                )
            }
        </ul >
    )
}
