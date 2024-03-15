const { useParams } = ReactRouter
const { useState, useEffect, Fragment } = React

import { mailService } from "../services/mail.service.js"

export function MailDetails() {
    const [mail, setMail] = useState(null)
    const { mailId } = useParams()

    useEffect(() => {
        loadMail()
    }, [])

    function loadMail() {
        mailService.get(mailId)
            .then(mail => setMail(mail))
    }

    if (!mail) return <div><img src="assets/img/planeloader.gif"/></div>
    return <section>
        <h2>{ mail.subject }</h2>
        <span>{ mail.from }</span>
        <div>
            { mail.body }
        </div>
    </section>

}