const { useState } = React
const { Link, useLocation } = ReactRouterDOM

export function MailHeaderFilter({ filterBy, onSetFilter }) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)
    const location = useLocation()
    console.log('location.pathname:', location.pathname)

    function handleChange({ target }) {
        const { value, name: field } = target

        setFilterByToEdit((prevFilterBy) => ({ ...prevFilterBy, [field]: value }))
        onSetFilter({ [field]: value })
    }

    return (
        <div className="search-container">
            { location.pathname.slice(0, 13) !== '/mail/compose' &&
                <input type="search"
                    className="search"
                    placeholder="Search"
                    name="txt"
                    onChange={ handleChange }
                    value={ filterByToEdit.text }
                    title="Search"
                /> }
        </div>
    )
}