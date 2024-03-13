const { useState, useEffect } = React
const { Link } = ReactRouterDOM

import { MailList } from "../cmps/MailList.jsx";
import { mailService } from "../services/mail.service.js";

export function MailIndex() {
    const [mails, setMails] = useState(null)

    useEffect(() => {
        loadMails()
    }, [])

    function loadMails() {
        mailService.query()
            .then(mails => {
                console.log('mails from load:', mails)
                setMails(mails)})
            .catch(err => console.log('err:', err))
    }

    function onDeleteMail(mail) {
        if (mail.removedAt) {
            mailService.remove(mail.id)
                .then(mail => console.log('mail:', mail))
                .catch(err => console.log('err:', err))
        }
        else {
            mail.removedAt = Date.now()
            mailService.save(mail)
                .then(mail => console.log('mail:', mail))
                .catch(err => console.log('err:', err))
        }

    }

    if (!mails) return <div>loading...</div>
    return <section className="email-index">
        <MailList mails={ mails } onDeleteMail={ onDeleteMail } />
    </section >
}

