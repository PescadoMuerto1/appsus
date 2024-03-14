const { useState, useEffect, Fragment } = React
const { useNavigate, useParams } = ReactRouter

import { mailService } from "../services/mail.service.js"
import { MailSideBar } from "../cmps/MailSideBar.jsx"

export function MailCompose() {
    const [mail, setMail] = useState(mailService.getEmptyMail())
    const navigate = useNavigate()


    function handleChange({ target }) {
        let { value, name: field, type } = target
        console.log('target:', target)
        console.log('value:', value)
        setMail(prevMail => ({ ...prevMail, [field]: value }))
    }

    function onSend(ev) {
        ev.preventDefault()
        mailService.save({ ...mail, sentAt: Date.now() })
            .then(mail => {
                console.log('mail:', mail)
                navigate(`/mail/list`)
            })
            .catch(err => console.log('err:', err))
    }

    return <Fragment>
        <section>
            <form className="grid" onSubmit={ onSend }>
                <input type="email" name="to" id="to" placeholder="To" value={ mail.value } onChange={ handleChange } />
                <input type="text" name="subject" id="subject" placeholder="Subject" value={ mail.subject } onChange={ handleChange } />
                <textarea id="body" name="body" rows="5" cols="33" placeholder="Content" value={ mail.body } onChange={ handleChange } />
                <button>Send</button>
                <button>Save for later</button>
            </form>
        </section>
    </Fragment>
}