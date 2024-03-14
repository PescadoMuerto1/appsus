import { mailService } from "../services/mail.service.js"

const { Link, NavLink } = ReactRouterDOM

export function MailSideBar({ onChangeFolder }) {


    return <ul className="sidebar clean-list">
        <li className="flex"><Link to="/mail/compose"><button className="btn-compose">Compose</button></Link></li>
        <li className="flex" onClick={ () => onChangeFolder('inbox') }>Inbox</li>
        <li className="flex" onClick={ () => onChangeFolder('starred') }>Starred</li>
        <li className="flex" onClick={ () => onChangeFolder('sent') }>Sent</li>
        <li className="flex" onClick={ () => onChangeFolder('drafts') }>Drafts</li>
        <li className="flex" onClick={ () => onChangeFolder('trash') }>Trash</li>
    </ul>
}