
const { NavLink, useSearchParams } = ReactRouterDOM

export function NoteSideBar({ unreadCount }) {
    // const [searchParams, setSearchParams] = useSearchParams()
    // const folder = searchParams.get('folder')
    return <ul className="note-sidebar clean-list">
        <li><NavLink to="/note"><i className="fa-solid fa-note-sticky"></i> Notes</NavLink></li>
        <li><NavLink to="/note/archive"><i className="fa-solid fa-box-archive"></i>Archive</NavLink></li>
    </ul>
}