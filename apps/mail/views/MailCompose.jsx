const { useState, useEffect, Fragment } = React
const { useNavigate, useParams } = ReactRouter
const { useSearchParams } = ReactRouterDOM

import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js";
import { mailService } from "../services/mail.service.js"

export function MailCompose() {
    const [mail, setMail] = useState(mailService.getEmptyMail())
    const [searchParams, setSearchParams] = useSearchParams()
    const navigate = useNavigate()
    

    useEffect(() => {
        if (searchParams.size) {
            const subject = searchParams.get('subject') || ''
            const body = searchParams.get('content') || ''
            setMail(prevMail => ({ ...prevMail, subject, body }))
        }
    }, [])

    function handleChange({ target }) {
        let { value, name: field, type } = target
        console.log('target:', target)
        console.log('value:', value)
        setMail(prevMail => ({ ...prevMail, [field]: value }))
    }

    function onSend(ev, isSent) {
        ev.preventDefault()
        mailService.save({ ...mail, sentAt: isSent ? Date.now() : null })
            .then(mail => {
                showSuccessMsg('Mail sent')
                navigate(`/mail/list`)
            })
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('There was a problem sending this mail')
            })
    }

    function onSaveAsNote(ev) {
        ev.preventDefault()
        console.log('mail:', mail)
        navigate(`/note/?subject=${mail.subject}&content=${mail.body}`)
    }

    return <Fragment>
        <section className="mail-compose">
            <form className="grid">
                <input type="email" name="to" id="to" placeholder="To" value={ mail.value } onChange={ handleChange } />
                <input type="text" name="subject" id="subject" placeholder="Subject" value={ mail.subject } onChange={ handleChange } />
                <textarea id="body" name="body" rows="5" cols="33" placeholder="Content" value={ mail.body } onChange={ handleChange } />
                <div className="flex">
                    <button className="pill-btn" onClick={ (ev) => onSend(ev, true) }>Send <i className="fa-regular fa-paper-plane"></i></button>
                    <button className="pill-btn" onClick={ (ev) => onSend(ev, false) }>Save for later <i className="fa-regular fa-paste"></i></button>
                    <button className="pill-btn" onClick={ onSaveAsNote } >Save as note <i className="fa-regular fa-note-sticky"></i></button>
                </div>
            </form>
        </section>
    </Fragment>
}