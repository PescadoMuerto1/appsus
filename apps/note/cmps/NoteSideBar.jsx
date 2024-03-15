import { mailService } from "../services/mail.service.js"

const { Link, useSearchParams } = ReactRouterDOM

export function NoteSideBar({ unreadCount }) {
    // const [searchParams, setSearchParams] = useSearchParams()
    // const folder = searchParams.get('folder')
    // return <ul className="sidebar clean-list">
    //     <li className="flex"><Link to="/mail/compose"><button className="btn-compose">Compose</button></Link></li>
    //     <li className={ `flex ${folder === 'inbox' ? 'active' : ''}` }><Link to="/mail/list?folder=notes">Inbox{ unreadCount ? ` (${unreadCount})` : '' }</Link></li>
    //     <li className={ `flex ${folder === 'starred' ? 'active' : ''}` }><Link to="/mail/list?folder=archive" >Starred</Link></li>
    // </ul>
}