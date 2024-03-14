import { NoteTodo } from "./NoteTodo.jsx";

export function NotePreview({ note, onSelectNote }) {
    console.log(note);

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
                    {note.todos.map(todo =>
                        <NoteTodo todo={todo} />
                    )}
                </ul>}

        </article>
    )
}