const { useState, useEffect, useRef, Fragment } = React
const { useNavigate } = ReactRouter
const { useSearchParams, Outlet } = ReactRouterDOM

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
                    setMails(prevMails => prevMails.filter(mail => mail.id !== mailToDelete.id))
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
        navigate(`/mail/read/${mail.id}`)
    }

    function onToggleProperty(ev, mailToToggle, key) {
        ev.stopPropagation()
        mailToToggle[key] = !mailToToggle[key]
        mailService.save(mailToToggle)
            .then(mail => {
                console.log('selected mail:', mail)
                if (key === 'isStarred' && filterBy.folder === 'starred') {
                    setMails(prevMails => prevMails.filter(mail => mail.id !== mailToToggle.id))
                }
                else if (key === 'isRead' && filterBy.isRead !== null && mail.isRead !== filterBy.isRead) {
                    setMails(prevMails => prevMails.filter(mail => mail.id !== mailToToggle.id))
                }
                else {
                    setMails(prevMails => ([...prevMails]))
                }
            })
    }



    function onChangeFolder(folder) {
        setFilterBy(prevFilter => ({ ...prevFilter, folder }))
    }

    return <Fragment>
        <MailSideBar onChangeFolder={ onChangeFolder }
            unreadCount={ mails ? mails.reduce((acc, mail) => !mail.isRead ? acc + 1 : acc, 0) : '' } />
        <section className="mail-index">
        <Outlet context={[mails, setMails, onDeleteMail, onMailSelect, onToggleProperty]}/>
            {/* <MailFilter />
            { !mails && <div>loading...</div> }
            { mails && <MailList mails={ mails } onDeleteMail={ onDeleteMail } onMailSelect={ onMailSelect } onToggleProperty={ onToggleProperty } /> } */}
        </section >
    </Fragment>
}

