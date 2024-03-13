const { useState, useEffect } = React
const { useNavigate, useParams } = ReactRouter
const { Link } = ReactRouterDOM

import { MailList } from "../cmps/MailList.jsx";
import { mailService } from "../services/mail.service.js";

export function MailIndex() {
    const [mails, setMails] = useState(null)
    const navigate = useNavigate()
    
    useEffect(() => {
        loadMails()
    }, [])

    function loadMails() {
        mailService.query()
            .then(mails => {
                console.log('mails from load:', mails)
                setMails(mails)
            })
            .catch(err => console.log('err:', err))
    }

    function onDeleteMail(ev, mailToDelete) {
        ev.stopPropagation()
        if (mailToDelete.removedAt) {
            mailService.remove(mailToDelete.id)
                .then(mail => {
                    console.log('mail:', mail)
                    setMails(prevMails => prevMails.filter(mail => mail.id !== mailToDelete.id))
                })
                .catch(err => console.log('err:', err))
        }
        else {
            mailToDelete.removedAt = Date.now()
            mailService.save(mailToDelete)
                .then(mail => {
                    console.log('mail:', mail)
                    setMails(prevMails => prevMails.map(mail =>
                        (mail.id === mailToDelete.id) ? mailToDelete : mail))
                })
                .catch(err => console.log('err:', err))
        }
    }

    function onMailSelect(mail) {
        if (!mail.isRead) {
            mail.isRead = true
            mailService.save(mail)
                .then(mail => console.log('selected mail:', mail))
                .catch(err => console.log('err:', err))
        }
        navigate(`/mail/${mail.id}`)
    }

    if (!mails) return <div>loading...</div>
    return <section className="email-index">
        <MailList mails={ mails } onDeleteMail={ onDeleteMail } onMailSelect={ onMailSelect } />
    </section >
}

