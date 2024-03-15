
import { NotePreview } from "./NotePreview.jsx"

export function NoteList({ notes, onRemoveNote, onArchiveNote, onPinNote, onSelectNote, onSaveNote}) {
   
  
   return (
      <ul className="note-list notes-list-layout clean-list">
         {
            notes.map(note =>
               <li className='note-card' key={note.id} style={note.style}>
                  <NotePreview note={note} onSelectNote={onSelectNote} onSaveNote={onSaveNote}  onRemoveNote={onRemoveNote} onArchiveNote={onArchiveNote} onPinNote={onPinNote} />
               </li>
            )
         }
      </ul >
   )
}
