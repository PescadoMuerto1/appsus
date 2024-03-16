const { useState } = React

export function MailHeaderFilter({ filterBy, onSetFilter }) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    function handleChange({ target }) {
        const { value, name: field } = target

        setFilterByToEdit((prevFilterBy) => ({ ...prevFilterBy, [field]: value }))
        onSetFilter({ [field]: value })
    }

    return (
        <div className="search-container">
            <input type="search"
                className="search"
                placeholder="Search"
                name="txt"
                onChange={ handleChange }
                value={ filterByToEdit.text }
                title="Search"
            />
        </div>
    )
}