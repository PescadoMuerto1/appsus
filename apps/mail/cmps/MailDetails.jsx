const { useParams, useNavigate } = ReactRouter
const { useState, useEffect, Fragment } = React
const { useSearchParams, useOutletContext } = ReactRouterDOM


import { mailService } from "../services/mail.service.js"
import { MailActions } from "./MailActions.jsx"

export function MailDetails() {
    const [, setMails, onDeleteMail, , onToggleProperty, filterBy, , , , setUnreadCount] = useOutletContext()
    const [mail, setMail] = useState(null)
    const { mailId } = useParams()
    const navigate = useNavigate()


    useEffect(() => {
        loadMail()
    }, [])

    function loadMail() {
        mailService.get(mailId)
            .then(mail => setMail(mail))
    }

    function onMarkUnread() {
        const readMail = { ...mail, isRead: false }
        mailService.save(readMail)
            .then(() => {
                setMails(prevMails => prevMails.map(mail => mail.id == readMail.id ? readMail : mail))
                if (filterBy.folder === 'inbox') setUnreadCount(prevCount => prevCount + 1)
                navigate(`/mail/list?folder=${filterBy.folder}`)
            })
    }

    if (!mail) return <div><img src="assets/img/planeloader.gif" /></div>
    return <section className="mail-details flex column">
        <span className="flex actions">
            <button onClick={ (ev) => onToggleProperty(ev, mail, 'isStarred') }><i className={ `fa-${mail.isStarred ? 'solid' : 'regular'} fa-star` }></i></button>
            <MailActions mail={ mail } onDeleteMail={ onDeleteMail } onToggleProperty={ onMarkUnread } />
        </span>
        <h2>{ mail.subject }</h2>
        <span className="sender">From: { mail.from }</span>
        <div className="body">
            { mail.body }
        </div>

        <div className="answers">
            <button className="pill-btn" disabled><i className="fa-solid fa-reply"></i> Reply</button>
            <button className="pill-btn" disabled>Forward <i className="fa-solid fa-share"></i></button>
        </div>
    </section>

}