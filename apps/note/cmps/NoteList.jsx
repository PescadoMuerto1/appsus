import { NotePreview } from "./NotePreview.jsx"

export function NoteList({ notes, onRemoveNote, onArchiveNote, onPinNote, onSelectNote, onSaveNote }) {

   return (
      <ul className="note-list notes-list-layout clean-list">
         {
            notes.map(note =>
               <li className='note-card' key={note.id}  style={note.style}>
                  <NotePreview note={note} onSelectNote={onSelectNote} onSaveNote={onSaveNote}/>
                  <ul className="note-actions clean-list">
                     <li key={4242} onClick={(ev) => onRemoveNote(ev, note.id)}> <i class="fa-solid fa-trash-can"></i></li>
                     <li key={43242}> <i class="fa-solid fa-palette"></i></li>
                     <li key={42} onClick={(ev) => onPinNote(ev, note)}> <i class={`fa-solid fa-thumbtack${note.isPinned ? ' pinned' : ''}`}></i></li>
                     <li key={46}onClick={(ev) => onArchiveNote(ev, note)}> <i class="fa-solid fa-box-archive"></i></li>
                  </ul>
               </li>
            )
         }
      </ul >
   )
}
