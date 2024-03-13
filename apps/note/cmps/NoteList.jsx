import { NotePreview } from "./NotePreview.jsx";

export function NoteList({ notes, onRemoveNote }) {

    return (
        <ul className="note-list notes-list-layout">
            {
                notes.map(note =>
                    <li className='note-card' key={note.id}>

                        <NotePreview note={note} />
                        <ul className="note-actions clean-list">
                            <li onClick={()=>onRemoveNote(note.id)}> <i class="fa-solid fa-trash-can"></i></li>
                            <li> <i class="fa-solid fa-palette"></i></li>
                            <li> <i class="fa-solid fa-thumbtack"></i></li>
                            <li> <i class="fa-solid fa-box-archive"></i></li>
                        </ul>
                    </li>
                )
            }
        </ul >
    )
}
