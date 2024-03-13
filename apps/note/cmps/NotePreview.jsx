import { NoteTodo } from "./NoteTodo.jsx";

export function NotePreview({ note }) {
    console.log(note);
    return (
        <article className='note-preview note-layout'>
            {note.img && <img src={note.img} alt="" />}
            {note.title && <h2>{note.title}</h2>}
            {note.text && <p>{note.text}</p>}
            {note.todos &&
                <ul className='note-todos-list'>
                    {note.todos.map(todo => 
                        <NoteTodo todo={todo}/>
                    )}
                </ul>}

        </article>
    )
}