import { mailService } from "../services/mail.service.js"

const { Link, useSearchParams } = ReactRouterDOM

export function MailSideBar({ unreadCount }) {
    const [searchParams, setSearchParams] = useSearchParams()
    const folder = searchParams.get('folder')
    return <ul className="sidebar clean-list">
        <li className="flex"><Link to="/mail/compose"><button className="btn-compose">Compose</button></Link></li>
        <li className={ `flex ${folder === 'inbox' ? 'active' : ''}` }><Link to="/mail/list?folder=inbox">Inbox{ unreadCount ? ` (${unreadCount})` : '' }</Link></li>
        <li className={ `flex ${folder === 'starred' ? 'active' : ''}` }><Link to="/mail/list?folder=starred" >Starred</Link></li>
        <li className={ `flex ${folder === 'sent' ? 'active' : ''}` }><Link to="/mail/list?folder=sent" >Sent</Link></li>
        <li className={ `flex ${folder === 'drafts' ? 'active' : ''}` }><Link to="/mail/list?folder=drafts" >Drafts</Link></li>
        <li className={ `flex ${folder === 'trash' ? 'active' : ''}` }><Link to="/mail/list?folder=trash" >Trash</Link></li>
    </ul>
}