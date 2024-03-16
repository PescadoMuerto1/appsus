const { useState } = React
const { useNavigate } = ReactRouter

import { NoteTodo } from "./NoteTodo.jsx";
import { ColorPicker } from "./ColorPicker.jsx"

export function NotePreview({ note, onSelectNote, onSaveNote, onArchiveNote, onPinNote, onRemoveNote }) {
    const [colorPicker, setColorPicker] = useState(null)
    const navigate = useNavigate()

    function onCheckTodo(ev, index) {
        ev.stopPropagation()
        note.todos[index].isChecked = ev.target.checked
        onSaveNote(note)
    }

    function onDuplicateNote(ev, note) {
        ev.stopPropagation()
        onSaveNote({ ...note, id: '' })
    }

    function onOpenColorPicker(ev) {
        ev.stopPropagation()
        setColorPicker(true)
    }

    function onSendNote(ev, note) {
        ev.stopPropagation()
        navigate(`/mail/compose?subject=${note.title}&content=${note.text}`)
    }

    return (

        <article
            className='note-preview note-layout'
            onClick={ () => onSelectNote(note) }>

            <li key={ 42 } onClick={ (ev) => onPinNote(ev, note) } title={ `${note.isPinned ? 'Unpin note' : 'Pin note'}` }>
                <i className={ `fa-solid fa-thumbtack${note.isPinned ? ' pinned' : ''}` }></i>
            </li>

            { note.img && <img src={ note.img } alt="" /> }
            { note.title && <h2>{ note.title }</h2> }
            { note.text && <p>{ note.text }</p> }
            { note.type.includes('todo') &&
                <ul className='note-todos-list clean-list'>
                    { note.todos.map((todo, index) =>
                        <NoteTodo key={ index } todo={ todo } index={ index } onCheckTodo={ onCheckTodo } />
                    ) }
                </ul> }

            <ul className="note-actions clean-list transparent">
                <li key={ 4242 } onClick={ (ev) => onRemoveNote(ev, note.id) } title="Delete note"> <i className="fa-solid fa-trash-can"></i></li>
                <li key={ 4242458 } onClick={ (ev) => onDuplicateNote(ev, note) } title="Duplicate note"> <i className="fa-solid fa-clone"></i></li>
                <li key={ 43242 } onClick={ onOpenColorPicker } title="Background options"> <i className="fa-solid fa-palette"></i></li>
                { !note.isArchived && <li key={ 46 } onClick={ (ev) => onArchiveNote(ev, note) } title="Archive"><i className="fa-solid fa-box-archive"></i></li> }
                { note.isArchived && <li key={ 46 } onClick={ (ev) => onArchiveNote(ev, note) } title="Unarchive note"><i className="fa-solid fa-upload"></i></li> }
                <li onClick={(ev)=>onSendNote(ev,note)}><i class="fa-solid fa-paper-plane"></i></li>
            </ul>
            { colorPicker && <ColorPicker note={ note } colorPicker={ colorPicker } setColorPicker={ setColorPicker } onSaveNote={ onSaveNote } />
            }
        </article>
    )
}