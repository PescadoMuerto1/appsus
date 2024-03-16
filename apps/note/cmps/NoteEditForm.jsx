import { noteService } from "../services/note.service.js"

const { useState, Fragment } = React

export function NoteEditForm({ onSaveNote, noteToEdit }) {
    const [note, setNote] = useState(noteToEdit)

    function handleChange({ target }) {
        const field = target.name
        let value = target.value
        setNote(prevNote => ({ ...prevNote, [field]: value }))
    }

    function onAddEmptyTodo(ev) {
        ev.preventDefault()
        note.todos.push(noteService.getEmptyTodo())
        setNote(prevNote => ({ ...prevNote }))
    }

    function handleTodoChange({ target }) {
        note.todos[target.id].text = target.value
        setNote(prevNote => ({ ...prevNote }))
    }

    function onAddNote(ev, note) {
        ev.preventDefault()
        onSaveNote(note)
        setTimeout(() => setNote(noteService.getEmptyNote()), 1000)
    }

    return (

        <form className="add-note" onSubmit={(ev) => onAddNote(ev, note)} style={{ backgroundColor: note.style.backgroundColor }}>
            <input
                onChange={handleChange}
                name='title'
                value={note.title}
                type="text"
                placeholder="Title"
            />
            {note.type.includes('text') && <textarea
                onChange={handleChange}
                name='text'
                className='note-text'
                value={note.text}
                placeholder="Take a note"
            />}
            {note.type.includes('img') && <img
                onChange={handleChange}
                name='img'
                className='note-image'
                src={note.img}
            />}
            {note.type.includes('todo') && <Fragment>
                {note.todos.map((todo, index) =>
                    <input
                        onChange={handleTodoChange}
                        id={index}
                        name='todo'
                        className='note-todo'
                        value={todo.text}
                        placeholder="Enter todo"
                    />
                )}
                <button onClick={onAddEmptyTodo}>+</button>
            </Fragment>
            }
            <button type="submit">Save</button>
        </form>

    )
}