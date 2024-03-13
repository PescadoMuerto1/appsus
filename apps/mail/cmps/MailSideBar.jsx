const { Link, NavLink } = ReactRouterDOM

export function MailSideBar() {
    return <ul className="sidebar clean-list">
        <li><Link to="/mail/compose"><button>Compose</button></Link></li>
        <li>Inbox</li>
        <li>Starred</li>
        <li>Sent</li>
        <li>Drafts</li>
        <li>Trash</li>
    </ul>
}