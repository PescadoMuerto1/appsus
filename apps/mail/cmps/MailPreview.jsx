export function MailPreview({ mail, on }) {
    const previewLength = 60

    const unreadClass = mail.isRead ? '' : 'unread'
    return <React.Fragment>
        <td><span className={ `sender ${unreadClass}` }>{ mail.from }</span></td>
        <td><span className={ `subject ${unreadClass}` }>{ mail.subject }</span> -
        <span className={ `mail-body` }> { mail.body.length > previewLength ? `${mail.body.slice(0, previewLength)}...` : mail.body }</span></td>
    </React.Fragment>
}