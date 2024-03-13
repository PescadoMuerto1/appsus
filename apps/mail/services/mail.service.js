// mail service
import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

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
    getEmptyReview,
    addGoogleMail
}

window.bs = mailService
function query(filterBy = getDefaultFilter()) {
    return storageService.query(MAIL_KEY)
        .then(mails => {
            // console.log('mails:', mails)
            if (filterBy.title) {
                const regex = new RegExp(filterBy.title, 'i')
                mails = mails.filter(mail => regex.test(mail.title))
            }
            if (filterBy.maxPrice) {
                mails = mails.filter(mail => mail.listPrice.amount <= filterBy.maxPrice)
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

function getEmptyMail(title = '', price = 50) {
    return {
        id: '',
        title,
        subtitle: '',
        authors: [''],
        publishedDate: 1900,
        pageCount: 0,
        listPrice: { amount: price, currencyCode: 'ILS', isOnSale: false },
        thumbnail: 'assets/imgs/default-mail.png'
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
    let mails = utilService.loadFromStorage(MAIL_KEY)
    if (!mails || !mails.length) {

        utilService.saveToStorage(MAIL_KEY, mails)
    }
}

function _createMail(title, price = 50) {
    const mail = getEmptyMail(title, price)
    mail.id = utilService.makeId()
    return mail
}

// const mail = { id: 'e101', subject: 'Miss you!', body: 'Would love to catch up sometimes', isRead: false, sentAt : 1551133930594, removedAt : null, from: 'momo@momo.com', to: 'user@appsus.com' }
///////////////////////////
const a = {
    "id": "OXeMG8wNskc",
    "title": "metus hendrerit",
    "subtitle": "mi est eros convallis auctor arcu dapibus himenaeos",
    "authors": ["Barbara Mailtland"],
    "publishedDate": 1999,
    "description": "placerat nisi sodales suscipit tellus tincidunt mauris elit sit luctus interdum ad dictum platea vehicula conubia fermentum habitasse congue suspendisse",
    "pageCount": 713,
    "categories": ["Computers", "Hack"],
    "thumbnail": "assets/imgs/20.jpg",
    "language": "en",
    "listPrice": {
        "amount": 109,
        "currencyCode": "EUR",
        "isOnSale": false
    }
}




