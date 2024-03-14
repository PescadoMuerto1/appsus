import { NoteTodo } from "./NoteTodo.jsx";

export function NotePreview({ note, onSelectNote, onSaveNote }) {
    console.log('note preview', note);

    function onCheckTodo(ev, index) {
        console.log('hiiiiii')
        ev.stopPropagation()
        note.todos[index].isChecked = ev.target.checked
        onSaveNote(note)
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
                        <NoteTodo todo={todo} index={index} onCheckTodo={onCheckTodo} />
                    )}
                </ul>}

        </article>
    )
}