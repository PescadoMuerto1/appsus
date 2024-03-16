
const { useState, useEffect, Fragment, useRef } = React
const { useSearchParams, Outlet } = ReactRouterDOM

import { NoteSideBar } from '../cmps/NoteSideBar.jsx'
import { NoteList } from '../cmps/NoteList.jsx'
import { AddNote } from '../cmps/AddNote.jsx'
import { noteService } from '../services/note.service.js'
import { AddNoteBar } from '../cmps/AddNoteBar.jsx'
import { EditNoteModal } from '../cmps/EditNoteModal.jsx'
import { NoteHeader } from '../cmps/NoteHeader.jsx'

export function NoteIndex() {
    const [searchParams, setSearchParams] = useSearchParams()

    const [notes, setNotes] = useState([])
    const [selectedNote, setSelectedNote] = useState(null)
    const [emptyNote, setEmptyNote] = useState(null)
    const editModeRef = useRef(null)
    const [filterBy, setFilterBy] = useState(noteService.getFilterFromParams(searchParams))

    useEffect(() => {
        setSearchParams(filterBy)
        loadNotes()
        console.log('load notes', notes)
    }, [filterBy])
   
    useEffect(() => {
        setFilterBy(noteService.getFilterFromParams(searchParams))
        loadNotes()
        console.log('load notes', notes)
    }, [searchParams])

    useEffect(() => {
        const handleClickOutside = (event) => {

            if (emptyNote && editModeRef.current && !editModeRef.current.contains(event.target)) {
                console.log('inside of ref')
                setEmptyNote(false)
            }
        }

        if (!emptyNote) document.removeEventListener("mousedown", handleClickOutside)
        else document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)

    }, [emptyNote])

    function loadNotes() {
        noteService.query(filterBy)
            .then(setNotes)
            .catch(console.error)
    }

    function onSetFilter(fieldsToUpdate) {
        console.log('fieldsToUpdate', fieldsToUpdate)

        setFilterBy(prevFilter => ({ ...prevFilter, ...fieldsToUpdate }))
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
            .then(() => { if (selectedNote) setSelectedNote('') })
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

    function onSelectNote(note) {
        setSelectedNote(note)
    }

    if (!notes) return <div>loading...</div>
    return (
        <main className='main-notes main-notes-layout'>
            <NoteHeader filterBy={filterBy} onSetFilter={onSetFilter} />
            <NoteSideBar />
            <div className='note-content'>
                {!emptyNote && <AddNoteBar onAddNote={onAddNote} />}
                <div ref={editModeRef}>
                    {emptyNote && <AddNote onSaveNote={onSaveNote} noteToEdit={emptyNote} />}
                </div>

                {notes.length && <div className='content-layout'>
                    <NoteList notes={notes.filter(note => note.isPinned)} onRemoveNote={onRemoveNote} onArchiveNote={onArchiveNote} onPinNote={onPinNote} onSelectNote={onSelectNote} onSaveNote={onSaveNote} />
                    <NoteList notes={notes.filter(note => !note.isPinned)} onRemoveNote={onRemoveNote} onArchiveNote={onArchiveNote} onPinNote={onPinNote} onSelectNote={onSelectNote} onSaveNote={onSaveNote} />
                </div>}
                {selectedNote && <EditNoteModal noteToEdit={selectedNote} onSaveNote={onSaveNote} setSelectNote={setSelectedNote} />}
            </div>
        </main>
    )
}
