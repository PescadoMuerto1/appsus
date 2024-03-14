const { Link, NavLink } = ReactRouterDOM

export function MailSideBar() {
    return <ul className="sidebar clean-list">
        <li className="flex"><Link to="/mail/compose"><button className="btn-compose">Compose</button></Link></li>
        <li className="flex">Inbox</li>
        <li className="flex">Starred</li>
        <li className="flex">Sent</li>
        <li className="flex">Drafts</li>
        <li className="flex">Trash</li>
    </ul>
}