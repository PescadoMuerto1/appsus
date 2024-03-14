import { mailService } from "../services/mail.service.js"

const { Link, NavLink } = ReactRouterDOM

export function MailSideBar({ onChangeFolder, unreadCount }) {

    return <ul className="sidebar clean-list">
        
        <li className="flex"><Link to="/mail/compose"><button className="btn-compose">Compose</button></Link></li>
        <li className="flex"><Link to="/mail/list?folder=inbox" >Inbox{ unreadCount ? ` (${unreadCount})` : '' }</Link></li>
        <li className="flex"><Link to="/mail/list?folder=starred" >Starred</Link></li>
        <li className="flex"><Link to="/mail/list?folder=sent" >Sent</Link></li>
        <li className="flex"><Link to="/mail/list?folder=drafts" >Drafts</Link></li>
        <li className="flex"><Link to="/mail/list?folder=trash" >Trash</Link></li>
    </ul>
}