const { useState, useEffect, useRef, Fragment } = React
const { useNavigate } = ReactRouter
const { useSearchParams, Outlet } = ReactRouterDOM

import { MailHeader } from "../cmps/MailHeader.jsx";
import { MailSideBar } from "../cmps/MailSideBar.jsx";
import { mailService } from "../services/mail.service.js";

export function MailIndex() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [mails, setMails] = useState(null)
    const [unreadCount, setUnreadCount] = useState(null)
    const [filterBy, setFilterBy] = useState(mailService.getFilterFromParams(searchParams))
    const [sortBy, setSortBy] = useState(mailService.getSortFromParams(searchParams))
    const [isSideBar, setIsSideBar] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        document.documentElement.style.setProperty('--sideBarWidth', isSideBar ? '16rem' : '5rem');
    }, [isSideBar])

    useEffect(() => {
        const filter = mailService.getFilterFromParams(searchParams)
        let flag = false
        for (const key in filter) {
            if (filter[key] !== filterBy[key]) {
                flag = true
                break
            }
        }
        if (flag) {
            setFilterBy(mailService.getFilterFromParams(searchParams))
        }

        const sort = mailService.getSortFromParams(searchParams)
        if (sort.sortBySentAt && sort.sortBySentAt !== sortBy.sortBySentAt) setSortBy(sort)
        else if (sort.sortByTitle && sort.sortByTitle !== sortBy.sortByTitle) setSortBy(sort)

    }, [searchParams])


    useEffect(() => {
        setSearchParams(getCleanParams())
        loadMails()
    }, [filterBy, sortBy])

    function loadMails() {
        mailService.query(filterBy, sortBy)
            .then(({ mails, unreadCount }) => {
                setMails(mails)
                setUnreadCount(unreadCount)
            })
            .catch(err => console.log('err:', err))
    }

    function getCleanParams() {
        const cleanParams = { ...sortBy }
        for (const key in filterBy) {
            if (filterBy[key]) cleanParams[key] = filterBy[key]
        }
        return cleanParams
    }

    function onDeleteMail(ev, mailToDelete) {
        ev.stopPropagation()
        if (mailToDelete.removedAt) {
            mailService.remove(mailToDelete.id)
                .then(mail => {
                    setMails(prevMails => prevMails.filter(mail => mail.id !== mailToDelete.id))
                })
                .catch(err => console.log('err:', err))
        }
        else {
            mailToDelete.removedAt = Date.now()
            mailService.save(mailToDelete)
                .then(mail => {
                    setMails(prevMails => prevMails.filter(mail => mail.id !== mailToDelete.id))
                })
                .catch(err => console.log('err:', err))
        }
    }

    function onMailSelect(mail) {
        if (!mail.isRead) {
            mail.isRead = true
            setUnreadCount(prevCount => prevCount - 1)
            mailService.save(mail)
                .then(mail => {
                    navigate(`/mail/read/${mail.id}?folder=${filterBy.folder}`)
                })
                .catch(err => console.log('err:', err))
        }
        else navigate(`/mail/read/${mail.id}?folder=${filterBy.folder}`)
    }

    function onToggleProperty(ev, mailToToggle, key) {
        ev.stopPropagation()
        mailToToggle[key] = !mailToToggle[key]
        mailService.save(mailToToggle)
            .then(mail => {
                if (key === 'isStarred' && filterBy.folder === 'starred') {
                    setMails(prevMails => prevMails.filter(mail => mail.id !== mailToToggle.id))
                }
                else if (key === 'isRead') {
                    if (filterBy.isRead !== null && mail.isRead !== filterBy.isRead) {
                        setMails(prevMails => prevMails.filter(mail => mail.id !== mailToToggle.id))
                    }
                    if (searchParams.get('folder') === 'inbox') {
                        if (mail.isRead) setUnreadCount(prevCount => prevCount - 1)
                        else setUnreadCount(prevCount => prevCount + 1)
                    }
                }
                else {
                    setMails(prevMails => ([...prevMails]))
                }
            })
    }


    function onSetFilter(fieldsToUpdate) {
        setFilterBy({ ...filterBy, ...fieldsToUpdate })
    }

    return <Fragment>
        <MailHeader filterBy={ filterBy } onSetFilter={ onSetFilter } setIsSideBar={ setIsSideBar } />
        <section className={ `mail-index full grid main-layout ${isSideBar ? 'menu-open' : ''}` }>
            <MailSideBar
                unreadCount={ mails ? unreadCount : '' } isSideBar={ isSideBar } />
            <Outlet context={ [mails, setMails, onDeleteMail, onMailSelect, onToggleProperty, filterBy, onSetFilter, sortBy, setSortBy, setUnreadCount] } />
        </section >
    </Fragment>
}

