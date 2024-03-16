
const { useState, useEffect } = React

export function NoteFilter({ filterBy, onSetFilter }) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { value, name: field } = target
        setFilterByToEdit((prevFilterBy) => ({ ...prevFilterBy, [field]: value }))
    }

    return (
        <div className="search-container">
        <input type="search"
            className="search"
            placeholder="Search"
            name="text"
            onChange={handleChange}
            value={filterByToEdit.text}
            title="Search"
        />
        </div>
    )
}