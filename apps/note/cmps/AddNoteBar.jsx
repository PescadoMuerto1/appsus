
export function AddNoteBar({ onAddNote }) {

    return <div className="add-note-container">
        <section className="add-note">
            <div className='add-note-bar'>
                <h2 onClick={() => onAddNote('text')} >Take a note...</h2>
                <i onClick={() => onAddNote('todo')} class="fa-solid fa-square-check"></i>
                <i onClick={() => onAddNote('canvas')} class="fa-solid fa-paintbrush"></i>
                <i onClick={() => onAddNote('image')} class="fa-solid fa-image"></i>
            </div>
        </section>
    </div>
}