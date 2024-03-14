import { noteService } from "../services/note.service.js"

const { useState } = React

export function AddNote({ onSaveNote, emptyNote }) {
    const [note, setNote] = useState(emptyNote)

    function handleChange({ target }) {
        const field = target.name
        let value = target.value
        setNote(prevNote => ({ ...prevNote, [field]: value }))
    }

    function onAddNote(ev, note) {
        ev.preventDefault()
        onSaveNote(note)
        setTimeout(() => setNote(noteService.getEmptyNote()), 1000)
    }

    return (
        <section className="add-note-container">
            <form className="add-note" onSubmit={(ev) => onAddNote(ev, note)}>
                <input onChange={handleChange} name='title' value={note.title} type="text" placeholder="Title" />
                <textarea onChange={handleChange} name='text' className='note-text' value={note.text} placeholder="Take a note" />
                <button type="submit">Save</button>
            </form>
        </section>
    )
}