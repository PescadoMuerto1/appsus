// mail service
import { utilService } from './../../../services/util.service.js'
import { storageService } from './../../../services/async-storage.service.js'
import { localStorageService } from './../../../services/storage.service.js'

const MAIL_KEY = 'mailDB'
const loggedinUser = {
    mail: 'peter@appsus.com',
    fullname: 'Peter Pan'
}

_createMails()

export const mailService = {
    query,
    get,
    remove,
    save,
    getEmptyMail,
    getDefaultFilter,
    getFilterFromParams,
    setFilterBy,
    addReview,
    getEmptyReview,
    getUser
}

window.ms = mailService
function query(filterBy = getDefaultFilter()) {
    return storageService.query(MAIL_KEY)
        .then(mails => {
            if (filterBy.folder === 'inbox') {
                mails = mails.filter(mail => mail.to === loggedinUser.mail && !mail.removedAt)
            }
            if (filterBy.folder === 'sent') {
                mails = mails.filter(mail => mail.from === loggedinUser.mail && mail.sentAt && !mail.removedAt)
            }
            if (filterBy.folder === 'drafts') {
                mails = mails.filter(mail => mail.from === loggedinUser.mail && !mail.sentAt && !mail.removedAt)
            }
            if (filterBy.folder === 'trash') {
                mails = mails.filter(mail => mail.removedAt)
            }
            if (filterBy.folder === 'starred') {
                mails = mails.filter(mail => mail.isStarred && !mail.removedAt)
            }
            if (filterBy.txt) {
                const regex = new RegExp(filterBy.txt, 'i')
                mails = mails.filter(mail => regex.test(mail.subject) || regex.test(mail.body))
            }
            if (filterBy.isRead) {
                if (filterBy.isRead === 'read') mails = mails.filter(mail => mail.isRead)
                else if (filterBy.isRead === 'unread') mails = mails.filter(mail => !mail.isRead)
            }
            if (filterBy.from) {
                mails = mails.filter(mail => mail.from === filterBy.from)
            }
            if (filterBy.to) {
                mails = mails.filter(mail => mail.to === filterBy.to)
            }
            return mails
        })
}

function get(mailId) {
    return storageService.get(MAIL_KEY, mailId)
        .then(mail => _setNextPrevMailId(mail))
}

function remove(mailId) {
    return storageService.remove(MAIL_KEY, mailId)
}

function save(mail) {
    if (mail.id) {
        return storageService.put(MAIL_KEY, mail)
    } else {
        return storageService.post(MAIL_KEY, mail)
    }
}

function getUser() {
    return loggedinUser
}

function getEmptyMail() {
    return {
        id: '',
        subject: '',
        body: '',
        isRead: null,
        sentAt: null,
        removedAt: null,
        from: loggedinUser.mail,
        to: ''
    }
}

function getDefaultFilter() {
    return {
        folder: 'inbox',
        txt: '',
        isRead: null,
        sentAt: null,
        removedAt: null,
        from: '',
        to: ''
    }
}

function getFilterFromParams(searchParams = {}) {
    const defaultFilter = getDefaultFilter()
    return {
        folder: searchParams.get('folder') || defaultFilter.folder,
        txt: searchParams.get('txt') || defaultFilter.txt,
        isRead: searchParams.get('isRead') || defaultFilter.isRead,
        sentAt: searchParams.get('sentAt') || defaultFilter.sentAt,
        removedAt: searchParams.get('removedAt') || defaultFilter.removedAt,
        from: searchParams.get('from') || defaultFilter.from,
        to: searchParams.get('to') || defaultFilter.to,
    }
}

function setFilterBy(filterBy = {}) {
    if (filterBy.txt !== undefined) gFilterBy.txt = filterBy.txt
    if (filterBy.minSpeed !== undefined) gFilterBy.minSpeed = filterBy.minSpeed
    return gFilterBy
}

function addReview(mail, review) {

    if (!mail.reviews) mail.reviews = []
    mail.reviews.push({ ...review, id: utilService.makeId() })
    console.log('mail:', mail)
    return save(mail)

}

function getEmptyReview() {
    return { fullname: '', rating: 3, readOn: new Date().toISOString().substring(0, 10) }
}

function _setNextPrevMailId(mail) {
    return storageService.query(MAIL_KEY).then((mails) => {
        const mailIdx = mails.findIndex((currMail) => currMail.id === mail.id)
        const nextMail = mails[mailIdx + 1] ? mails[mailIdx + 1] : mails[0]
        const prevMail = mails[mailIdx - 1] ? mails[mailIdx - 1] : mails[mails.length - 1]
        mail.nextMailId = nextMail.id
        mail.prevMailId = prevMail.id
        return mail
    })
}

function _createMails() {
    let mails = localStorageService.loadFromStorage(MAIL_KEY)
    if (!mails || !mails.length) {
        mails = [
            {
                id: utilService.makeId(),
                subject: 'Miss you!',
                body: 'Would love to catch up sometimes',
                isRead: false,
                isStarred: false,
                sentAt: 1551133930594,
                removedAt: null,
                from: 'momo@momo.com',
                to: loggedinUser.mail
            }, {
                id: utilService.makeId(),
                subject: 'Hi there',
                body: 'Call me sometime',
                isRead: false,
                isStarred: false,
                sentAt: 1551132930594,
                removedAt: null,
                from: 'momo@momo.com',
                to: loggedinUser.mail
            }, {
                id: utilService.makeId(),
                subject: 'Bent/Matchbox Twenty',
                body: 'Can you help me I\'m bent?\nI\'m so scared that I\'ll never\nGet put back together\nKeep breaking me in\nAnd this is how we will end\nWith you and me bent',
                isRead: false,
                isStarred: true,
                sentAt: 1551133830594,
                removedAt: null,
                from: 'momo@momo.com',
                to: loggedinUser.mail
            }, {
                id: utilService.makeId(),
                subject: 'Hey There Delilah',
                body: 'What\'s it like in New York City?\nI\'m a thousand miles away, but girl, tonight, you look so pretty, yes you do\nTimes Square can\'t shine as bright as you\nI swear it\'s true',
                isRead: true,
                isStarred: true,
                sentAt: null,
                removedAt: null,
                from: 'momo@momo.com',
                to: loggedinUser.mail
            }
        ]
        localStorageService.saveToStorage(MAIL_KEY, mails)
    }
}

function _createMail(title, price = 50) {
    const mail = getEmptyMail(title, price)
    mail.id = utilService.makeId()
    return mail
}

// const mail = {
//     id: 'e101',
//     subject: 'Miss you!',
//     body: 'Would love to catch up sometimes',
//     isRead: false, sentAt: 1551133930594,
//     removedAt: null, from: 'momo@momo.com',
//     to: 'user@appsus.com'
// }




