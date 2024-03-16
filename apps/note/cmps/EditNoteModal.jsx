const { useOutletContext } = ReactRouterDOM
const { useEffect } = React
const { useSearchParams } = ReactRouterDOM


import { NoteEditForm } from './NoteEditForm.jsx'
import { noteService } from '../services/note.service.js'

export function EditNoteModal() {
    const [noteToEdit, onSaveNote, setSelectedNote] = useOutletContext()
    const [searchParams] = useSearchParams()


    useEffect(() => {
        const note = noteService.getEmptyNote('text')
        note.title = searchParams.get('subject') || ''
        note.text = searchParams.get('content') || ''
        setSelectedNote(note)
    }, [])

    return (
        <div onClick={() => setSelectedNote('')} className="modal-backdrop">
            <div onClick={ev => ev.stopPropagation()} className="edit-note-modal" >
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