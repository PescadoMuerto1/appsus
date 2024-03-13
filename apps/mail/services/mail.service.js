// mail service
import { utilService } from './../../../services/util.service.js'
import { storageService } from './../../../services/async-storage.service.js'
import { localStorageService } from './../../../services/storage.service.js'

const MAIL_KEY = 'mailDB'
const loggedinUser = {
    mail: 'peter@appsus.com',
    fullname: 'Peter Pan'
}
// var gFilterBy = { title: '' }
_createMails()

export const mailService = {
    query,
    get,
    remove,
    save,
    getEmptyMail,
    // getNextMailId,
    // getFilterBy,
    getDefaultFilter,
    setFilterBy,
    addReview,
    getEmptyReview
}

window.bs = mailService
function query(filterBy = getDefaultFilter()) {
    return storageService.query(MAIL_KEY)
        .then(mails => {
            // // console.log('mails:', mails)
            // if (filterBy.title) {
            //     const regex = new RegExp(filterBy.title, 'i')
            //     mails = mails.filter(mail => regex.test(mail.title))
            // }
            // if (filterBy.maxPrice) {
            //     mails = mails.filter(mail => mail.listPrice.amount <= filterBy.maxPrice)
            // }
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

function getEmptyMail() {
    return {
        id: '',
        subject: '',
        body: '',
        isRead: false,
        sentAt: null,
        removedAt: null,
        from: loggedinUser.mail,
        to: ''
    }
}

// function getFilterBy() {
//     return { ...gFilterBy }
// }

function getDefaultFilter() {
    return { title: '', maxPrice: 200 }
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
                sentAt: 1551133930594,
                removedAt: null,
                from: 'momo@momo.com',
                to: 'user@appsus.com'
            }, {
                id: utilService.makeId(),
                subject: 'Hi there',
                body: 'Call me sometime',
                isRead: false,
                sentAt: 1551132930594,
                removedAt: null,
                from: 'momo@momo.com',
                to: 'user@appsus.com'
            }, {
                id: utilService.makeId(),
                subject: 'Bent/Matchbox Twenty',
                body: 'Can you help me I\'m bent?\nI\'m so scared that I\'ll never\nGet put back together\nKeep breaking me in\nAnd this is how we will end\nWith you and me bent',
                isRead: false,
                sentAt: 1551133830594,
                removedAt: null,
                from: 'momo@momo.com',
                to: 'user@appsus.com'
            }, {
                id: utilService.makeId(),
                subject: 'Hey There Delilah',
                body: 'What\'s it like in New York City?\nI\'m a thousand miles away, but girl, tonight, you look so pretty, yes you do\nTimes Square can\'t shine as bright as you\nI swear it\'s true',
                isRead: true,
                sentAt: null,
                removedAt: null,
                from: 'momo@momo.com',
                to: 'user@appsus.com'
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




