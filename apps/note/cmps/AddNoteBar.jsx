
export function AddNoteBar({ onAddNote, onAddImg }) {

    return <div className="add-note-container">
        <section className="add-note">
            <div className='add-note-bar'>
                <h2 onClick={() => onAddNote('text')} >Take a note...</h2>
                <i onClick={() => onAddNote('todo')} className="fa-solid fa-square-check" title="New todo list"></i>
                {/* <i onClick={() => onAddNote('canvas')} className="fa-solid fa-paintbrush" title="Mew note with drawing"></i> */}
                <input className='hidden' type="file" name="img" id="img" accept='.png, .jpg, .jpeg' onChange={onAddImg}/>
                <label htmlFor="img"><i onClick={onAddImg} className="fa-solid fa-image" title="Mew note with image"></i></label>
                
            </div>
        </section>
    </div>
}