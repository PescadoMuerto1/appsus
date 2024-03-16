
const { Link, useSearchParams } = ReactRouterDOM

export function NoteSideBar({ isSidebarExtended }) {
    const [searchParams] = useSearchParams()
    const isArchived = searchParams.get('isArchived')

    return (
        <ul className={`note-sidebar clean-list ${isSidebarExtended ? '' : 'not-extended'}`}>
            <li><Link className={` ${!isArchived ? 'active' : ''}`} to="/note?isArchived="><i className="fa-solid fa-note-sticky"></i><span>Notes</span></Link></li>
            <li><Link className={` ${isArchived ? 'active' : ''}`} to="/note?isArchived=true"><i className="fa-solid fa-box-archive"></i><span>Archive</span></Link></li>
        </ul>)
}