const { useState, useRef, useEffect } = React

import { NoteTodo } from "./NoteTodo.jsx";
import { ColorPicker } from "./ColorPicker.jsx"

export function NotePreview({ note, onSelectNote, onSaveNote, onArchiveNote, onPinNote, onRemoveNote }) {
    const [colorPicker, setColorPicker] = useState(null)

    function onCheckTodo(ev, index) {
        ev.stopPropagation()
        note.todos[index].isChecked = ev.target.checked
        onSaveNote(note)
    }

    function onOpenColorPicker(ev) {
        ev.stopPropagation()
        setColorPicker(true)
    }

    return (

        <article
            className='note-preview note-layout'
            onClick={() => onSelectNote(note)}
        >
            {note.img && <img src={note.img} alt="" />}
            {note.title && <h2>{note.title}</h2>}
            {note.text && <p>{note.text}</p>}
            {note.type.includes('todo') &&
                <ul className='note-todos-list clean-list'>
                    {note.todos.map((todo, index) =>
                        <NoteTodo key={index} todo={todo} index={index} onCheckTodo={onCheckTodo} />
                    )}
                </ul>}
            <ul className="note-actions clean-list transparent">
                <li key={4242} onClick={(ev) => onRemoveNote(ev, note.id)}> <i className="fa-solid fa-trash-can"></i></li>
                <li key={43242} onClick={onOpenColorPicker}> <i className="fa-solid fa-palette"></i></li>
                <li key={42} onClick={(ev) => onPinNote(ev, note)}> <i className={`fa-solid fa-thumbtack${note.isPinned ? ' pinned' : ''}`}></i></li>
                <li key={46} onClick={(ev) => onArchiveNote(ev, note)}> <i className="fa-solid fa-box-archive"></i></li>
            </ul>
            {colorPicker && <ColorPicker note={note} colorPicker={colorPicker} setColorPicker={setColorPicker} onSaveNote={onSaveNote} />
            }
        </article>
    )
}