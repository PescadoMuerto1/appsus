
const { useState, useEffect } = React

import { NoteList } from '../cmps/NoteList.jsx'
import { noteService } from '../services/note.service.js'

export function NoteIndex() {
    const [notes, setNotes] = useState([])

    useEffect(() => {
        loadNotes()
    }, [])

    function loadNotes() {
        noteService.query()
            // .then((notes) => sortNotes(notes, sortBy))
            .then(setNotes)
            .catch(console.error)
    }

    function onRemoveNote(noteId) {
        noteService.remove(noteId)
            .then(() => {
                setNotes((prevNotes) => prevNotes.filter(note => note.id !== noteId))
                showSuccessMsg(`note removed successfully${noteId}`)
            })
            .catch(console.error)
    }

    if (!notes) return <div>loading...</div>
    return (
        <div className='content-layout'>
            <NoteList notes={notes} onRemoveNote={onRemoveNote}/>
        </div>
    )
}
