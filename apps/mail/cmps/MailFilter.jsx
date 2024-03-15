const { useOutletContext } = ReactRouterDOM

export function MailFilter() {
    const [, , , , , filterBy, onSetFilter] = useOutletContext()


    function handleChange({ target }) {
        let { value, name: field, type } = target
        console.log('target:', target)

        console.log('field:', field)
        console.log('value:', value)
        onSetFilter({ [field]: value })
    }


    return <section className="mail-filter">

        <input type="search" name="txt" id="txt" placeholder="Search" value={ filterBy.txt } onChange={ handleChange } />

        <button onClick={ () => onSetFilter({ isRead: 'read' }) }>Read</button>
        <button onClick={ () => onSetFilter({ isRead: 'unread' }) }>Unread</button>
        <button onClick={ () => onSetFilter({ isRead: '' }) }>All</button>
    </section>
}