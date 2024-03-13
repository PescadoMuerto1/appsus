import { NoteTodo } from "./NoteTodo.jsx";

export function NotePreview({ note }) {
    console.log(note);

    return (
        <article className='note-preview note-layout'>
            {note.img && <img src={note.img} alt="" />}
            {note.title && <h2>{note.title}</h2>}
            {note.text && <p>{note.text}</p>}
            {note.todos &&
                <ul className='note-todos-list clean-list'>
                    {note.todos.map(todo => 
                        <NoteTodo todo={todo}/>
                    )}
                </ul>}
                <ul className="note-actions clean-list">
                    <li> <i class="fa-solid fa-trash-can"></i></li>
                    <li> <i class="fa-solid fa-palette"></i></li>
                    <li> <i class="fa-solid fa-thumbtack"></i></li>
                    <li> <i class="fa-solid fa-box-archive"></i></li>
                </ul>
        </article>
    )
}