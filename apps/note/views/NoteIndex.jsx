
const { useState, useEffect, Fragment, useRef } = React

import { NoteList } from '../cmps/NoteList.jsx'
import { AddNote } from '../cmps/AddNote.jsx'
import { noteService } from '../services/note.service.js'
import { AddNoteBar } from '../cmps/AddNoteBar.jsx'

export function NoteIndex() {
    const [notes, setNotes] = useState([])
    const [isEdit, setIsEdit] = useState(null)
    const [emptyNote, setEmptyNote] = useState(null)
    const editMode = useRef(null)


    useEffect(() => {
        loadNotes()
    }, [])

    useEffect(() => {
        const handleClickOutside = (event) => {
          if (!editMode.current.contains(event.target)) {
            setEmptyNote(false)
          }
        }
        document.addEventListener("mousedown", handleClickOutside)
      }, [editMode])

    function loadNotes() {
        noteService.query()
            .then(setNotes)
            .catch(console.error)
    }

    function onRemoveNote(ev, noteId) {
        ev.stopPropagation()
        noteService.remove(noteId)
            .then(() => {
                setNotes((prevNotes) => prevNotes.filter(note => note.id !== noteId))
                // showSuccessMsg(`note removed successfully${noteId}`)
            })
            .catch(console.error)
    }

    function onArchiveNote(ev, noteToArchive) {
        ev.stopPropagation()
        noteToArchive.isArchived = true
        noteService.save(noteToArchive)
            .then(() => {
                setNotes((prevNotes) => prevNotes.filter(note => note.id !== noteToArchive.id))
                // showSuccessMsg(`note moved successfully${note.id}`)
            })
            .catch(console.error)
    }

    function onSaveNote(note) {
        noteService.save(note)
            .then(loadNotes)
            .catch(console.error)
    }

    function onPinNote(ev, note) {
        ev.stopPropagation()
        note.isPinned = !note.isPinned ? true : false
        noteService.save(note)
            .then(loadNotes)
            .catch(console.error)
    }

    function onAddNote(type) {
        setEmptyNote(noteService.getEmptyNote(type))
    }

    // const closeAddMode = (e)=>{
    //     if(emptyNote && !editMode.current?.contains(e.target)){
    //       setEmptyNote(false)
    //     }
    // }

    if (!notes) return <div>loading...</div>
    return (
        <main className='main-notes main-notes-layout'>
                {!emptyNote && <AddNoteBar onAddNote={onAddNote}/>}
            <div ref={editMode}>
                {emptyNote &&  <AddNote onSaveNote={onSaveNote} emptyNote={emptyNote} />}
            </div>
            
            <div className='content-layout'>
                <NoteList notes={notes.filter(note => note.isPinned)} onRemoveNote={onRemoveNote} onArchiveNote={onArchiveNote} onPinNote={onPinNote} />
                <NoteList notes={notes.filter(note => !note.isPinned)} onRemoveNote={onRemoveNote} onArchiveNote={onArchiveNote} onPinNote={onPinNote} />
            </div>
        </main>
    )
}
