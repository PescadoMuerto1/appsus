const { Link, useSearchParams } = ReactRouterDOM

export function MailSideBar({ unreadCount, isOpen, isSideBar }) {
    const [searchParams, setSearchParams] = useSearchParams()
    const folder = searchParams.get('folder')
    const isSideBarClass = isSideBar ? '' : 'iconsOnly'
    const inboxLabel = 'Inbox' + (unreadCount ? ` (${unreadCount})` : '')

    return <ul className={ `sidebar clean-list ${isSideBarClass}` }>
        <li className="flex"><Link to="/mail/compose"><button className="btn-compose"><i className="fa-solid fa-pencil"></i><span className={ isSideBarClass }>{ isSideBar ? 'Compose' : '' }</span></button></Link></li>
        <li className={ ` ${folder === 'inbox' ? 'active' : ''}` }><Link to="/mail/list?folder=inbox"><i className="fa-solid fa-inbox"></i><span className={ isSideBarClass }>{ isSideBar ? inboxLabel : '' }</span></Link></li>
        <li className={ `flex ${folder === 'starred' ? 'active' : ''}` }><Link to="/mail/list?folder=starred" ><i className="fa-regular fa-star"></i><span className={ isSideBarClass }>{ isSideBar ? 'Starred' : '' }</span></Link></li>
        <li className={ `flex ${folder === 'sent' ? 'active' : ''}` }><Link to="/mail/list?folder=sent" ><i className="fa-regular fa-paper-plane"></i><span className={ isSideBarClass }>{ isSideBar ? 'Sent' : '' }</span></Link></li>
        <li className={ `flex ${folder === 'drafts' ? 'active' : ''}` }><Link to="/mail/list?folder=drafts" ><i className="fa-regular fa-paste"></i><span className={ isSideBarClass }>{ isSideBar ? 'Drafts' : '' }</span></Link></li>
        <li className={ `flex ${folder === 'trash' ? 'active' : ''}` }><Link to="/mail/list?folder=trash" ><i className="fa-regular fa-trash-can"></i><span className={ isSideBarClass }>{ isSideBar ? 'Trash' : '' }</span></Link></li>
    </ul>
}