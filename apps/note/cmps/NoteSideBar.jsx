
const { Link, useSearchParams } = ReactRouterDOM

export function NoteSideBar() {
    const [searchParams] = useSearchParams()
    const isArchived = searchParams.get('isArchived')

return <ul className="note-sidebar clean-list">
        <li><Link className={ ` ${!isArchived ? 'active' : ''}` } to="/note?isArchived="><i className="fa-solid fa-note-sticky"></i> Notes</Link></li>
        <li><Link className={ ` ${isArchived ? 'active' : ''}` }to="/note?isArchived=true"><i className="fa-solid fa-box-archive"></i>Archive</Link></li>
    </ul>
}