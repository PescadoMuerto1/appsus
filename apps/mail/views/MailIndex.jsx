const { useState, useEffect, useRef, Fragment } = React
const { useNavigate } = ReactRouter
const { useSearchParams } = ReactRouterDOM

import { MailFilter } from "../cmps/MailFilter.jsx";
import { MailList } from "../cmps/MailList.jsx";
import { MailSideBar } from "../cmps/MailSideBar.jsx";
import { mailService } from "../services/mail.service.js";

export function MailIndex() {
    const [searchParams, setSearchParams] = useSearchParams()

    const [mails, setMails] = useState(null)
    const [filterBy, setFilterBy] = useState(mailService.getFilterFromParams(searchParams))

    const userRef = useRef()
    const navigate = useNavigate()

    useEffect(() => {
        userRef.current = mailService.getUser()
        console.log('hi');
        // setFilterBy(prevFilter => ({ ...prevFilter, to: userRef.mail }))
    }, [])

    useEffect(() => {
        setFilterBy(mailService.getFilterFromParams(searchParams))
    }, [searchParams])

    useEffect(() => {
        console.log('filterBy:', filterBy)

        setSearchParams(getCleanFilter())
        console.log('searchParams:', searchParams.get('folder'))

        loadMails()
    }, [filterBy])

    function loadMails() {
        mailService.query(filterBy)
            .then(mails => {
                console.log('mails from load:', mails)
                setMails(mails)
            })
            .catch(err => console.log('err:', err))
    }

    function getCleanFilter() {
        const cleanFilter = {}
        for (const key in filterBy) {
            if (filterBy[key]) cleanFilter[key] = filterBy[key]
        }
        return cleanFilter
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

    function onChangeFolder(folder) {
        setFilterBy(prevFilter => ({ ...prevFilter, folder }))
    }

    return <Fragment>
        <MailSideBar onChangeFolder={ onChangeFolder } />
        <section className="mail-index">
            <MailFilter />
            { !mails && <div>loading...</div> }
            { mails && <MailList mails={ mails } onDeleteMail={ onDeleteMail } onMailSelect={ onMailSelect } /> }
        </section >
    </Fragment>
}

