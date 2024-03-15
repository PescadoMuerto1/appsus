const { useState, useEffect } = React

import { mailService } from "../services/mail.service.js"
import { MailActions } from "./MailActions.jsx"

export function MailPreview({ mail, onDeleteMail, onMailSelect, onToggleProperty }) {
    const [isHovered, setIsHovered] = useState(false)

    const previewLength = 60
    const { mail: userMail } = mailService.getUser()


    function getDateSent() {
        if (!mail.sentAt) return 'Draft'
        const dateSent = new Date(mail.sentAt)
        return [dateSent.getDate(), dateSent.getMonth(), dateSent.getFullYear()].join('/')

    }

    const unreadClass = mail.isRead ? '' : 'unread'
    return <article
        className={ `mail-row grid ${mail.isRead ? 'read-row' : 'unread-row'}` }
        key={ mail.id }
        onClick={ () => onMailSelect(mail) }
        onMouseEnter={ () => setIsHovered(true) }
        onMouseLeave={ () => setIsHovered(false) }
    >
        <div className="star">
            <button className="action-btn" onClick={ (ev) => onToggleProperty(ev, mail, 'isStarred') }><i className={ `fa-${mail.isStarred ? 'solid' : 'regular'} fa-star` }></i></button>
        </div>
        <div className="sender">
            { userMail !== mail.from && <span className={ `sender ${unreadClass}` }>{ mail.from }</span> }
            { userMail === mail.from && <span className={ `to ${unreadClass}` }>To: { mail.to }</span> }
        </div>
        <div className="body">
            <span className={ `subject ${unreadClass}` }>{ mail.subject }</span> -
            <span className="mail-body"> { mail.body.length > previewLength ? `${mail.body.slice(0, previewLength)}...` : mail.body }</span>
        </div>
        <div className="actions">
            { isHovered && <MailActions mail={ mail } onDeleteMail={ onDeleteMail } onToggleProperty={ onToggleProperty } /> }
        </div>
        <div className="date">
            { getDateSent() }
        </div>
    </article>

}