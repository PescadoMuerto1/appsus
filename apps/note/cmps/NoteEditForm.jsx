import { noteService } from "../services/note.service.js"
import { ColorPicker } from "./ColorPicker.jsx"

const { useState, Fragment } = React

export function NoteEditForm({ onSaveNote, noteToEdit }) {
    const [note, setNote] = useState(noteToEdit)
    const [colorPicker, setColorPicker] = useState(null)

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

    function onOpenColorPicker(ev) {
        ev.stopPropagation()
        setColorPicker(true)
    }

    function toggleForArchive() {
        note.isArchived = note.isArchived ? '' : true
        setNote(prevNote => ({ ...prevNote }))
    }

    function onRemoveTodo(todoId) {
        const nTodos = note.todos.filter(todo => todo.id !== todoId)
        setNote(prevNote => ({ ...prevNote, todos: nTodos }))
    }

    return (

        <form className="add-note" onSubmit={(ev) => onAddNote(ev, note)} style={{ backgroundColor: note.style.backgroundColor }}>
            <input
                className="title"
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
                placeholder="Take a note..."
            />}
            {note.type.includes('img') && <img
                onChange={handleChange}
                name='img'
                className='note-image'
                src={note.img}
            />}
            {note.type.includes('todo') && <Fragment>
                {note.todos.map((todo, index) =>
                    <div className="todo-container">
                        <input
                            onChange={handleTodoChange}
                            id={index}
                            name='todo'
                            className='note-todo'
                            value={todo.text}
                            placeholder="Enter todo"
                        />
                        <button onClick={() => onRemoveTodo(todo.id)}>x</button>
                    </div>
                )}
                <button className="add-todo" onClick={onAddEmptyTodo}><i className="fa-solid fa-plus"></i></button>
            </Fragment>
            }
            <div className="actions-container">
                <i className="fa-solid fa-palette" onClick={onOpenColorPicker} title="Background options"></i>
                <i className={`fa-solid fa-box-archive ${note.isArchived ? 'active' : ''}`} onClick={toggleForArchive} title="Archive"></i>
                <button type="submit">{!note.isArchived ? 'Save' : 'Save to archive'}</button>
            </div>
            {colorPicker && <ColorPicker note={note} colorPicker={colorPicker} setColorPicker={setColorPicker} onSaveNote={setNote} />}
        </form>

    )
}