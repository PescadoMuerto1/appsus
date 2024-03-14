import { NoteEditForm } from './NoteEditForm.jsx'

export function EditNoteModal({ noteToEdit, onSaveNote, setSelectNote }) {
    return (
        <div onClick={()=>setSelectNote('')} className="modal-backdrop">
            <div onClick={ev => ev.stopPropagation()}className="edit-note-modal" >
                <div className="modal-content">
                    <NoteEditForm
                        noteToEdit={noteToEdit}
                        onSaveNote={onSaveNote}
                    />
                </div>
            </div>
        </div>
    )
}