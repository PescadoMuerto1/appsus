import { NoteEditForm } from './NoteEditForm.jsx'

export function EditNoteModal({ selectedNote, onSaveNote, setSelectedNote }) {
  

    return (
        <div onClick={ () => setSelectedNote('') } className="modal-backdrop">
            <div onClick={ ev => ev.stopPropagation() } className="edit-note-modal" >
                <div className="modal-content">
                    <NoteEditForm
                        noteToEdit={ selectedNote }
                        onSaveNote={ onSaveNote }
                    />
                </div>
            </div>
        </div>
    )
}