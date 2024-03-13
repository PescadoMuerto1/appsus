export function MailPreview({ mail }) {
    const previewLength = 60

    return <React.Fragment>
        <span className="sender">{ mail.from }</span>
        <span className="subject">{ mail.subject }</span>
        <span className="mail-body">{ mail.body.length > previewLength ? `${mail.body.slice(0, previewLength)}...` : mail.body }</span>
    </React.Fragment>
}