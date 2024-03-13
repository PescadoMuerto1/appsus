
export function AddNote(onAddNote) {
    
    return (
    <section className="add-note-container">
        <form className="add-note" onSubmit={onAddNote}>
        <input type="text"placeholder="title" />
        <input type="text"placeholder="take a note" />
        <button>Save</button>
        </form>
    </section>
    )
}