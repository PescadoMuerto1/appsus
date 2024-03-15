// mail service
import { utilService } from './../../../services/util.service.js'
import { storageService } from './../../../services/async-storage.service.js'
import { localStorageService } from './../../../services/storage.service.js'

const MAIL_KEY = 'mailDB'
const loggedinUser = {
    mail: 'peter@appsus.com',
    fullname: 'Peter Pan'
}

// var getUnreadCount

_createMails()

export const mailService = {
    query,
    get,
    remove,
    save,
    getEmptyMail,
    getDefaultFilter,
    getDefaultSort,
    getFilterFromParams,
    getSortFromParams,
    getUser,
    // getUnreadCount
}

window.ms = mailService
function query(filterBy = getDefaultFilter(), sortBy = getDefaultSort()) {
    let unreadCount
    return storageService.query(MAIL_KEY)
        .then(mails => {
            unreadCount = mails.reduce((acc, mail) => (!mail.isRead && mail.to === loggedinUser.mail && !mail.removedAt) ? acc + 1 : acc, 0)
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
            if (sortBy.sortBySentAt) {
                mails.sort((mail1, mail2) => (mail1.sentAt - mail2.sentAt) * sortBy.sortBySentAt)
            }
            else if (sortBy.sortByTitle) {
                mails.sort((mail1, mail2) => (mail1.subject.localeCompare(mail2.subject) * sortBy.sortByTitle))
            }
            return { mails, unreadCount }
        })
}

// function getUnreadCount() {
//     storageService.query(MAIL_KEY)
//         .then(mails => {
//             return mails.reduce((acc, mail) => !mail.isRead ? acc + 1 : acc, 0)
//         })
// }

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

function getDefaultSort() {
    return {
        sortBySentAt: -1
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

function getSortFromParams(searchParams = {}) {
    if (searchParams.get('sortBySentAt')) return { sortBySentAt: +searchParams.get('sortBySentAt') }
    else if (searchParams.get('sortByTitle')) return { sortByTitle: +searchParams.get('sortByTitle') }
    else return getDefaultSort()
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
                sentAt: 1677225600000,
                removedAt: null,
                from: loggedinUser.mail,
                to: 'momo@momo.com'
            }, {
                id: utilService.makeId(),
                subject: "Dinner Invitation",
                body: "Hey there, we're having a dinner party at our place this Saturday. Would you like to join us?",
                sentAt: 1678923500000,
                from: "friend1@example.com",
                isRead: false,
                isStarred: false,
                removedAt: null,
                to: loggedinUser.mail
            }, {
                id: utilService.makeId(),
                subject: "Travel Plans",
                body: "Hi friend, I'm planning a trip to Europe next month. Do you have any recommendations for places to visit?",
                sentAt: 1678859800000,
                from: "friend2@example.com",
                isRead: true,
                isStarred: true,
                removedAt: null,
                to: loggedinUser.mail
            }, {
                id: utilService.makeId(),
                subject: "Happy Birthday!",
                body: "Dear Peter, just wanted to wish you a very happy birthday! Have a fantastic day!",
                sentAt: 1678638000000,
                from: "family1@example.com",
                isRead: true,
                isStarred: false,
                removedAt: null,
                to: loggedinUser.mail
            }, {
                id: utilService.makeId(),
                subject: "Reunion Plans",
                body: "Hi, it's been ages since we last met! Let's plan a reunion soon. What do you think?",
                sentAt: 1678612100000,
                from: "friend3@example.com",
                isRead: false,
                isStarred: false,
                removedAt: null,
                to: loggedinUser.mail
            }, {
                id: utilService.makeId(),
                subject: "Congratulations!",
                body: "Hey, just heard the good news! Congratulations on your new job!",
                sentAt: 1678572600000,
                from: "friend4@example.com",
                isRead: true,
                isStarred: true,
                removedAt: null,
                to: loggedinUser.mail
            }, {
                id: utilService.makeId(),
                subject: "Just Checking In",
                body: "Hi there, it's been a while since we last talked. How are you doing?",
                sentAt: 1678549800000,
                from: "friend5@example.com",
                isRead: true,
                isStarred: false,
                removedAt: null,
                to: loggedinUser.mail
            }, {
                id: utilService.makeId(),
                subject: "Happy Anniversary!",
                body: "Dear Peter, wishing you and your partner a wonderful anniversary filled with love and happiness.",
                sentAt: 1678405600000,
                from: "family2@example.com",
                isRead: false,
                isStarred: false,
                removedAt: null,
                to: loggedinUser.mail
            }, {
                id: utilService.makeId(),
                subject: "Congratulations on Your Graduation!",
                body: "Hi, just wanted to congratulate you on your graduation! You've worked hard for this achievement.",
                sentAt: 1678384500000,
                from: "friend6@example.com",
                isRead: true,
                isStarred: false,
                removedAt: null,
                to: loggedinUser.mail
            }, {
                id: utilService.makeId(),
                subject: "Weekend Plans",
                body: "Hey, any plans for the weekend? Let's catch up if you're free!",
                sentAt: 1678256200000,
                from: "friend7@example.com",
                isRead: true,
                isStarred: true,
                removedAt: null,
                to: loggedinUser.mail
            }, {
                id: utilService.makeId(),
                subject: "Just Saying Hi",
                body: "Hi, I was thinking about you and wanted to say hi! How have you been?",
                sentAt: 1678197600000,
                from: "friend8@example.com",
                isRead: false,
                isStarred: false,
                removedAt: null,
                to: loggedinUser.mail
            }, {
                id: utilService.makeId(),
                subject: "Weekly Newsletter",
                body: "Dear subscribers, here's our weekly newsletter with updates on recent events and promotions.",
                sentAt: 1678920000000,
                from: "newsletter@example.com",
                isRead: false,
                isStarred: true,
                removedAt: null,
                to: loggedinUser.mail
            }, {
                id: utilService.makeId(),
                subject: "Meeting Reminder",
                body: "Hello team, just a reminder that our weekly meeting is scheduled for tomorrow at 10:00 AM. Please be prepared to discuss project updates.",
                sentAt: 1678855800000,
                from: "manager@example.com",
                isRead: true,
                isStarred: false,
                removedAt: null,
                to: loggedinUser.mail
            }, {
                id: utilService.makeId(),
                subject: "Invitation to Event",
                body: "Hi everyone, you're invited to our company's annual charity event this Friday at 7:00 PM. We hope to see you there!",
                sentAt: 1678632000000,
                from: "events@example.com",
                isRead: true,
                isStarred: true,
                removedAt: null,
                to: loggedinUser.mail
            }, {
                id: utilService.makeId(),
                subject: "Account Update",
                body: "Dear customer, we've updated our terms of service. Please review the changes at your earliest convenience.",
                sentAt: 1678607100000,
                from: "support@example.com",
                isRead: false,
                isStarred: false,
                removedAt: 1678968000000,
                to: loggedinUser.mail
            }, {
                id: utilService.makeId(),
                subject: "Job Opportunity",
                body: "Hi, we're hiring for a new position in our marketing department. If you're interested, please submit your resume by the end of the week.",
                sentAt: 1678557600000,
                from: "hr@example.com",
                isRead: false,
                isStarred: true,
                removedAt: 1678915200000,
                to: loggedinUser.mail
            }, {
                id: utilService.makeId(),
                subject: "Product Launch Announcement",
                body: "Hello everyone, we're excited to announce the launch of our new product line. Check out our website for more details!",
                sentAt: 1678399200000,
                from: "marketing@example.com",
                isRead: true,
                isStarred: false,
                removedAt: null,
                to: loggedinUser.mail
            }, {
                id: utilService.makeId(),
                subject: "Payment Confirmation",
                body: "Dear Peter, this email is to confirm that your payment of $100 has been received. Thank you for your business!",
                sentAt: 1678390500000,
                from: "payments@example.com",
                isRead: true,
                isStarred: true,
                removedAt: null,
                to: loggedinUser.mail
            }, {
                id: utilService.makeId(),
                subject: "Important Update Regarding Your Account",
                body: "Dear customer, we've detected some unusual activity on your account. Please log in to review your recent transactions.",
                sentAt: 1678199400000,
                from: "security@example.com",
                isRead: false,
                isStarred: false,
                removedAt: null,
                to: loggedinUser.mail
            }, {
                id: utilService.makeId(),
                subject: "Survey Invitation",
                body: "Hi, we'd love to hear your feedback! Please take a moment to complete our survey and help us improve our services.",
                sentAt: 1678057200000,
                from: "feedback@example.com",
                isRead: true,
                isStarred: true,
                removedAt: 1678504800000,
                to: loggedinUser.mail
            }, {
                id: utilService.makeId(),
                subject: "New Product Release",
                body: "Hi there, we're thrilled to announce the release of our latest product. Check out our website for more details!",
                sentAt: 1677895200000,
                from: "marketing@example.com",
                isRead: false,
                isStarred: false,
                removedAt: null,
                to: loggedinUser.mail
            }, {
                id: utilService.makeId(),
                subject: "Holiday Greetings",
                body: "Wishing you and your loved ones a joyful holiday season filled with peace and happiness.",
                sentAt: 1677654400000,
                from: "greetings@example.com",
                isRead: true,
                isStarred: false,
                removedAt: null,
                to: loggedinUser.mail
            }, {
                id: utilService.makeId(),
                subject: "Urgent: Payment Overdue",
                body: "Dear customer, this is a reminder that your payment is overdue. Please make the payment as soon as possible to avoid any disruptions.",
                sentAt: 1677565200000,
                from: "accounts@example.com",
                isRead: true,
                isStarred: false,
                removedAt: null,
                to: loggedinUser.mail
            }, {
                id: utilService.makeId(),
                subject: "Exclusive Offer Inside!",
                body: "Hi, don't miss out on our exclusive offer! Check your inbox for details.",
                sentAt: 1677499200000,
                from: "promotions@example.com",
                isRead: false,
                isStarred: true,
                removedAt: null,
                to: loggedinUser.mail
            }, {
                id: utilService.makeId(),
                subject: "Invitation to Webinar",
                body: "Hello, you're invited to attend our upcoming webinar on digital marketing strategies. Register now to secure your spot!",
                sentAt: 1677398400000,
                from: "webinars@example.com",
                isRead: false,
                isStarred: false,
                removedAt: null,
                to: loggedinUser.mail
            }, {
                id: utilService.makeId(),
                subject: "Quarterly Performance Review",
                body: "Dear team, it's time for our quarterly performance review. Let's discuss our achievements and areas for improvement.",
                sentAt: 1677315600000,
                from: "hr@example.com",
                isRead: true,
                isStarred: true,
                removedAt: null,
                to: loggedinUser.mail
            }, {
                id: utilService.makeId(),
                subject: "Product Launch Announcement",
                body: "Hello everyone, we're excited to announce the launch of our new product line. Check out our website for more details!",
                sentAt: 1678399200000,
                from: "marketing@example.com",
                isRead: true,
                isStarred: false,
                removedAt: null,
                to: loggedinUser.mail
            }, {
                id: utilService.makeId(),
                subject: "Payment Confirmation",
                body: "Dear Peter, this email is to confirm that your payment of $100 has been received. Thank you for your business!",
                sentAt: 1678390500000,
                from: "payments@example.com",
                isRead: true,
                isStarred: true,
                removedAt: null,
                to: loggedinUser.mail
            }, {
                id: utilService.makeId(),
                subject: "Important Update Regarding Your Account",
                body: "Dear customer, we've detected some unusual activity on your account. Please log in to review your recent transactions.",
                sentAt: 1678199400000,
                from: "security@example.com",
                isRead: false,
                isStarred: false,
                removedAt: null,
                to: loggedinUser.mail
            }, {
                id: utilService.makeId(),
                subject: "Survey Invitation",
                body: "Hi, we'd love to hear your feedback! Please take a moment to complete our survey and help us improve our services.",
                sentAt: 1678057200000,
                from: "feedback@example.com",
                isRead: false,
                isStarred: false,
                removedAt: 1678741200000,
                to: loggedinUser.mail
            }, {
                id: utilService.makeId(),
                subject: "New Product Release",
                body: "Hi there, we're thrilled to announce the release of our latest product. Check out our website for more details!",
                sentAt: 1677895200000,
                from: "marketing@example.com",
                isRead: true,
                isStarred: true,
                removedAt: null,
                to: loggedinUser.mail
            }, {
                id: utilService.makeId(),
                subject: "Important Announcement: Office Closure",
                body: "Dear team, please note that our office will be closed for maintenance next Monday. We apologize for any inconvenience.",
                sentAt: 1677877200000,
                from: "admin@example.com",
                isRead: true,
                isStarred: false,
                removedAt: null,
                to: loggedinUser.mail
            }, {
                id: utilService.makeId(),
                subject: "Weekly Progress Report",
                body: "Hello team, here's your weekly progress report. Please review and let me know if you have any questions.",
                sentAt: 1677686400000,
                from: "manager@example.com",
                isRead: true,
                isStarred: true,
                removedAt: null,
                to: loggedinUser.mail
            }, {
                id: utilService.makeId(),
                subject: "Holiday Greetings",
                body: "Wishing you and your loved ones a joyful holiday season filled with peace and happiness.",
                sentAt: 1677654400000,
                from: "greetings@example.com",
                isRead: false,
                isStarred: false,
                removedAt: 1678734000000,
                to: loggedinUser.mail
            }, {
                id: utilService.makeId(),
                subject: "Urgent: Payment Overdue",
                body: "Dear customer, this is a reminder that your payment is overdue. Please make the payment as soon as possible to avoid any disruptions.",
                sentAt: 1677565200000,
                from: "accounts@example.com",
                isRead: true,
                isStarred: false,
                removedAt: null
            }, {
                id: utilService.makeId(),
                subject: "Exclusive Offer Inside!",
                body: "Hi, don't miss out on our exclusive offer! Check your inbox for details.",
                sentAt: 1677499200000,
                from: "promotions@example.com",
                isRead: true,
                isStarred: true,
                removedAt: null,
                to: loggedinUser.mail
            }, {
                id: utilService.makeId(),
                subject: "Dinner Invitation",
                body: "Hi Peter, I'm hosting a dinner party this Saturday at 7:00 PM. I hope you can join us!",
                sentAt: 1677360000000,
                to: "friend@example.com",
                isRead: false,
                isStarred: true,
                removedAt: null,
                from: loggedinUser.mail
            },
            {
                id: utilService.makeId(),
                subject: "Vacation Planning",
                body: "Hey Peter, I'm planning a vacation to the beach next month. Would you like to come along?",
                sentAt: null,
                to: "family@example.com",
                isRead: true,
                isStarred: false,
                removedAt: null,
                from: loggedinUser.mail
            },
            {
                id: utilService.makeId(),
                subject: "Happy Anniversary!",
                body: "Dear Peter, today marks our 5th anniversary together. I'm so grateful for you and the memories we've made.",
                sentAt: 1677278400000,
                to: "partner@example.com",
                isRead: true,
                isStarred: true,
                removedAt: null,
                from: loggedinUser.mail
            },
            {
                id: utilService.makeId(),
                subject: "Weekend Plans",
                body: "Hi Peter, want to catch a movie together this weekend? Let me know if you're free.",
                sentAt: 1677225600000,
                to: "friend@example.com",
                isRead: false,
                isStarred: false,
                removedAt: null,
                from: loggedinUser.mail
            },
            {
                id: utilService.makeId(),
                subject: "Birthday Surprise",
                body: "Hey Peter, I have a special surprise planned for your birthday. Can't wait to celebrate with you!",
                sentAt: null,
                to: "friend@example.com",
                isRead: true,
                isStarred: true,
                removedAt: null,
                from: loggedinUser.mail
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




