const { useOutletContext } = ReactRouterDOM

export function MailFilter() {
    const [, , , , , , onSetFilter, sortBy, setSortBy] = useOutletContext()
    let { sortBySentAt, sortByTitle } = sortBy
    const arrows = { up: '▴', down: '▾' }

    function changeSort(key) {
        if (key === 'title') {
            if (sortByTitle) sortByTitle = -sortByTitle
            else sortByTitle = 1
            setSortBy({ sortByTitle })
        }

        else if (key === 'sentAt') {
            if (sortBySentAt) sortBySentAt = -sortBySentAt
            else sortBySentAt = 1
            setSortBy({ sortBySentAt })
        }
    }


    return <section className="mail-filter">


        <button onClick={ () => onSetFilter({ isRead: 'read' }) }>Read</button>
        <button onClick={ () => onSetFilter({ isRead: 'unread' }) }>Unread</button>
        <button onClick={ () => onSetFilter({ isRead: '' }) }>All</button>

        <button onClick={ () => changeSort('title') }>Title { sortByTitle && sortByTitle === 1 ? arrows.up : arrows.down }</button>
        <button onClick={ () => changeSort('sentAt') }>Time Sent { sortBySentAt && sortBySentAt === 1 ? arrows.up : arrows.down }</button>
    </section>
}