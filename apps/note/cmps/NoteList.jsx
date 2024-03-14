import { NotePreview } from "./NotePreview.jsx"

export function NoteList({ notes, onRemoveNote, onArchiveNote, onPinNote, onSelectNote }) {

   return (
      <ul className="note-list notes-list-layout clean-list">
         {
            notes.map(note =>
               <li className='note-card' key={note.id}  style={note.style}>
                  <NotePreview note={note} onSelectNote={onSelectNote}/>
                  <ul className="note-actions clean-list">
                     <li onClick={(ev) => onRemoveNote(ev, note.id)}> <i class="fa-solid fa-trash-can"></i></li>
                     <li> <i class="fa-solid fa-palette"></i></li>
                     <li onClick={(ev) => onPinNote(ev, note)}> <i class={`fa-solid fa-thumbtack${note.isPinned ? ' pinned' : ''}`}></i></li>
                     <li onClick={(ev) => onArchiveNote(ev, note)}> <i class="fa-solid fa-box-archive"></i></li>
                  </ul>
               </li>
            )
         }
      </ul >
   )
}
