const { Fragment } = React

export function MailActions({ mail, onDeleteMail, onToggleProperty }) {
    console.log('mail:', mail)
    return <Fragment>
        <button onClick={ (ev) => onToggleProperty(ev, mail, 'isRead') } title={ `Mark as ${mail.isRead ? 'unread' : 'read'}` }>
            <i className={ `fa-regular fa-envelope${mail.isRead ? '' : '-open'}` }></i>
        </button>
        <button onClick={ (ev) => onDeleteMail(ev, mail) } title="Delete" ><i className="fa-regular fa-trash-can"></i></button>
    </Fragment>
}