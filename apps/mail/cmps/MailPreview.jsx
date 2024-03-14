const { useState, useEffect } = React

import { MailActions } from "./MailActions.jsx"

export function MailPreview({ mail, onDeleteMail, onMailSelect, onToggleProperty }) {
    const [isHovered, setIsHovered] = useState(false)
    // useEffect(() => {
    //     console.log('isHovered:', isHovered)
    // }, [isHovered])

    const previewLength = 60

    const unreadClass = mail.isRead ? '' : 'unread'
    return <React.Fragment>
        <tr className="mail-row" key={ mail.id }
            onClick={ () => onMailSelect(mail) }
            onMouseEnter={ () => setIsHovered(true) }
            onMouseLeave={ () => setIsHovered(false) }
        >
            <td><button onClick={ (ev) => onToggleProperty(ev, mail, 'isStarred') }><i className={ `fa-${mail.isStarred ? 'solid' : 'regular'} fa-star` }></i></button></td>
            <td><span className={ `sender ${unreadClass}` }>{ mail.from }</span></td>
            <td><span className={ `subject ${unreadClass}` }>{ mail.subject }</span> -
                <span className={ `mail-body` }> { mail.body.length > previewLength ? `${mail.body.slice(0, previewLength)}...` : mail.body }</span></td>
            <td>{ isHovered && <MailActions mail={ mail } onDeleteMail={ onDeleteMail } onToggleProperty={ onToggleProperty } /> }</td>
        </tr>
    </React.Fragment>
}