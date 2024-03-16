
const { useState, useEffect } = React

export function NoteFilter({ filterBy, onSetFilter }) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        // console.log('target', target)

        let { value, name: field } = target

        setFilterByToEdit((prevFilterBy) => ({ ...prevFilterBy, [field]: value }))
        // onSetFilter(filterByToEdit)
    }

    return (
        <div className="search-container">
        <input type="text"
            className="search"
            placeholder="Search"
            name="text"
            onChange={handleChange}
            value={filterByToEdit.text}
            title="Search"
        />
        <button className="hidden">x</button>
        </div>
    )
}