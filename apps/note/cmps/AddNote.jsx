import { noteService } from "../services/note.service.js"

const { useState, Fragment } = React

export function AddNote({ onSaveNote, emptyNote }) {
    const [note, setNote] = useState(emptyNote)

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
        <section className="add-note-container">
            <form className="add-note" onSubmit={(ev) => onAddNote(ev, note)}>
                <input
                    onChange={handleChange}
                    name='title'
                    value={note.title}
                    type="text"
                    placeholder="Title"
                />
                {note.type === 'text' && <textarea
                    onChange={handleChange}
                    name='text'
                    className='note-text'
                    value={note.text}
                    placeholder="Take a note"
                />}
                {note.type === 'todo' && <Fragment>
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
        </section>
    )
}