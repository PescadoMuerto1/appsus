
const { useState, useEffect, Fragment, useRef } = React
const { useSearchParams, Outlet } = ReactRouterDOM
const { useNavigate } = ReactRouter

import { NoteSideBar } from '../cmps/NoteSideBar.jsx'
import { NoteList } from '../cmps/NoteList.jsx'
import { AddNote } from '../cmps/AddNote.jsx'
import { noteService } from '../services/note.service.js'
import { AddNoteBar } from '../cmps/AddNoteBar.jsx'
import { NoteHeader } from '../cmps/NoteHeader.jsx'
import { utilService } from '../../../services/util.service.js'
import { EditNoteModal } from '../cmps/EditNoteModal.jsx'

export function NoteIndex() {
    const [searchParams, setSearchParams] = useSearchParams()
    const nav = useNavigate()
    const editModeRef = useRef(null)

    const [notes, setNotes] = useState([])
    const [selectedNote, setSelectedNote] = useState(null)
    const [emptyNote, setEmptyNote] = useState(null)
    const [filterBy, setFilterBy] = useState(noteService.getFilterFromParams(searchParams))
    const [isSidebarExtended, setIsSidebarExtended] = useState(null)

    useEffect(() => {
        const note = noteService.getEmptyNote('text')
        note.title = searchParams.get('subject') || ''
        note.text = searchParams.get('content') || ''
        if (note.title || note.text) setSelectedNote(note)
    }, [])

    useEffect(() => {
        const abc = { subject: searchParams.get('subject'), content: searchParams.get('content') }
        setSearchParams(utilService.getCleanParams({ ...filterBy, ...abc }))
        loadNotes()
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

        noteToArchive.isArchived = noteToArchive.isArchived ? '' : true
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
            .then(() => {
                if (selectedNote) setSelectedNote('')
                setSearchParams({})
            })
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

    function onAddImg(ev) {
        const reader = new FileReader()

        reader.onload = ev => {
            let newImg = new Image()
            newImg.src = ev.target.result

            newImg.onload = () => {
                const newNote = noteService.getEmptyNote('img')
                newNote.img = newImg.src
                setEmptyNote(newNote)
            }
        }
        reader.readAsDataURL(ev.target.files[0])
    }

    function onSelectNote(note) {
        setSelectedNote(note)
    }

    if (!notes) return <div>loading...</div>
    return (
        <main className='main-notes main-notes-layout'>
            <NoteHeader filterBy={filterBy} onSetFilter={onSetFilter} setIsSidebarExtended={setIsSidebarExtended} />
            <NoteSideBar isSidebarExtended={isSidebarExtended} />

            <div className='note-content'>
                {!emptyNote && <AddNoteBar onAddNote={onAddNote} onAddImg={onAddImg} />}

                <div ref={editModeRef}>
                    {emptyNote && <AddNote onSaveNote={onSaveNote} noteToEdit={emptyNote} />}
                </div>

                {notes.length &&
                    <div className='content-layout'>

                        {notes.filter(note => note.isPinned).length > 0 && <NoteList
                            notes={notes.filter(note => note.isPinned)}
                            onRemoveNote={onRemoveNote}
                            onArchiveNote={onArchiveNote}
                            onPinNote={onPinNote}
                            onSelectNote={onSelectNote}
                            onSaveNote={onSaveNote} />}

                        {notes.filter(note => !note.isPinned).length > 0 && <NoteList
                            notes={notes.filter(note => !note.isPinned)}
                            onRemoveNote={onRemoveNote}
                            onArchiveNote={onArchiveNote}
                            onPinNote={onPinNote}
                            onSelectNote={onSelectNote}
                            onSaveNote={onSaveNote} />}
                    </div>}
                {selectedNote && <EditNoteModal selectedNote={selectedNote} onSaveNote={onSaveNote} setSelectedNote={setSelectedNote} />
                }
            </div>
        </main>
    )
}
