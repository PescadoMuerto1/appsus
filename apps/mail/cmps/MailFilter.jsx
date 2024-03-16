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


    return <section className="mail-filter flex">
        <div>
            Show:
            <button className="pill-btn" onClick={ () => onSetFilter({ isRead: 'read' }) }>Read</button>
            <button className="pill-btn" onClick={ () => onSetFilter({ isRead: 'unread' }) }>Unread</button>
            <button className="pill-btn" onClick={ () => onSetFilter({ isRead: '' }) }>All</button>
        </div>
        <div>
            Filter by:
            <button className="pill-btn" onClick={ () => changeSort('title') }>Title { sortByTitle && sortByTitle === 1 ? arrows.up : arrows.down }</button>
            <button className="pill-btn" onClick={ () => changeSort('sentAt') }>Time Sent { sortBySentAt && sortBySentAt === 1 ? arrows.up : arrows.down }</button>
        </div>
    </section>
}