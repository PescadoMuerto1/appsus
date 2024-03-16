import { utilService } from './../../../services/util.service.js'
import { storageService } from './../../../services/async-storage.service.js'
import { localStorageService } from './../../../services/storage.service.js'

const NOTE_KEY = 'noteDB'

_createNotes()

export const noteService = {
    query,
    get,
    remove,
    save,
    getEmptyNote,
    getDefaultFilter,
    getEmptyTodo,
    getFilterFromParams
}

function query(filterBy = getDefaultFilter()) {

    return storageService.query(NOTE_KEY)
        .then(notes => {
            notes = notes.filter(note => !!note.isArchived === !!filterBy.isArchived)
            if (filterBy.text) {
                const regex = new RegExp(filterBy.text, 'i')
                notes = notes.filter(note => regex.test(note.title) || regex.test(note.text))
            }
            return notes
        })
}

function get(noteId) {
    return storageService.get(NOTE_KEY, noteId)
}

function remove(noteId) {
    return storageService.remove(NOTE_KEY, noteId)
}

function save(note) {
    if (note.id) {
        note.createdAt = Date.now()
        return storageService.put(NOTE_KEY, note)
    } else {
        return storageService.post(NOTE_KEY, note)
    }
}

function getEmptyNote(type) {
    return {
        type: [type],
        title: "",
        text: "",
        img: "",
        isPinned: false,
        todos: [{ id: utilService.makeId(), text: '', isChecked: false }],
        style: {
            backgroundColor: '#ffff'
        },
    }
}

function getEmptyTodo() {
    return { id: utilService.makeId(), text: '', isChecked: false }
}

function getDefaultFilter() {
    return { text: '', isArchived: '' }
}

function getFilterFromParams(searchParams = {}) {
    const defaultFilter = getDefaultFilter()
    return {
        text: searchParams.get('text') || defaultFilter.text,
        isArchived: searchParams.get('isArchived') || defaultFilter.isArchived
    }
}

function _createNotes() {
    let notes = localStorageService.loadFromStorage(NOTE_KEY)
    if (!notes || !notes.length) {
        notes = [
            {
                id: 'sklj9dflk3',
                img: '',
                title: 'Meeting Notes',
                text: 'Meeting with the team went well. Discussed the upcoming project milestones.',
                todos: [],
                isPinned: true,
                style: {
                    backgroundColor: '#ffcccc'
                },
                createdAt: 1710344094033,
                type: ['text']
            },
            {
                id: 'klsdfj94',
                img: '',
                title: 'Grocery List',
                text: 'Milk, eggs, bread, fruits, vegetables.',
                todos: [{ id: utilService.makeId, text: 'Buy milk', isChecked: false }],
                isPinned: true,
                style: {
                    backgroundColor: '#ccffcc'
                },
                createdAt: 1710354094033,
                type: ['todo', 'text']
            },
            {
                id: 'klsj8sdf',
                img: '',
                title: 'Book Recommendation',
                text: 'Just finished reading "The Alchemist" by Paulo Coelho. Highly recommend it!',
                todos: [],
                isPinned: false,
                style: {
                    backgroundColor: '#ccccff'
                },
                createdAt: 1710364094033,
                type: []
            },
            {
                id: 'lkj90jhd',
                img: 'assets/img/DSC00567.jpg',
                title: 'Travel Plans',
                text: 'Planning a trip to Europe next summer. Excited!',
                todos: [],
                isPinned: true,
                style: {
                    backgroundColor: '#ffffcc'
                },
                createdAt: 1710374094033,
                type: ['image', 'text']
            },
            {
                id: '3jh4k5lj',
                img: '',
                title: 'Workout Routine',
                text: 'Monday: Cardio, Tuesday: Strength training, Wednesday: Rest, Thursday: Yoga, Friday: HIIT, Saturday: Rest, Sunday: Outdoor activity.',
                todos: [],
                isPinned: false,
                style: {
                    backgroundColor: '#ffccff'
                },
                createdAt: 1710384094033,
                type: ['text']
            },
            {
                id: 'sdjfklsd7',
                img: 'assets/img/a (1).jpg',
                title: 'Inspiration',
                text: 'A picture of my beautiful dog.',
                todos: [],
                isPinned: false,
                style: {
                    backgroundColor: '#ccffff'
                },
                createdAt: 1710394094033,
                type: ['image', 'text']
            },
            {
                id: 'sdjf8jfls',
                img: '',
                title: 'Project Ideas',
                text: 'Brainstorming session for new project concepts.',
                todos: [],
                isPinned: false,
                style: {
                    backgroundColor: '#ffcc99'
                },
                createdAt: 1710404094033,
                type: ["text"]
            },
            {
                id: 'sldkjf8js',
                img: '',
                title: 'Gift Ideas',
                text: 'Mom\'s birthday coming up. Need to buy a gift!',
                todos: [{ id: 'sgasfdh3', text: 'Research gift ideas', isChecked: false }],
                isPinned: false,
                style: {
                    backgroundColor: '#ccff99'
                },
                createdAt: 1710414094033,
                type: ['todo', 'text']
            },
            {
                id: 'sdkfj4lkj',
                img: '',
                title: 'Recipe',
                text: 'Delicious recipe for homemade pizza.',
                todos: [],
                isPinned: true,
                style: {
                    backgroundColor: '#ff99cc'
                },
                createdAt: 1710424094033,
                type: ['text']
            },
            {
                id: 'sldkj8huf',
                img: '',
                title: 'Favorite Quotes',
                text: 'A collection of inspirational quotes from various authors and thinkers.',
                todos: [],
                isPinned: false,
                isArchived: true,
                style: {
                    backgroundColor: '#cccccc'
                },
                createdAt: 1710434094033,
                type: []
            },
            {
                id: 'skdjf98l',
                img: '',
                title: 'Project Deadline',
                text: 'Reminder: Project deadline is approaching. Need to finalize presentation.',
                todos: [],
                isPinned: true,
                isArchived: true,
                style: {
                    backgroundColor: '#eeeeee'
                },
                createdAt: 1710444094033,
                type: []
            },
            {
                id: 'slkdfj987',
                img: '',
                title: 'Monthly Budget',
                text: 'Budget planning for the upcoming month.',
                todos: [{ id: 'sdfj98h', text: 'Pay rent', isChecked: true }],
                isPinned: false,
                isArchived: true,
                style: {
                    backgroundColor: '#dddddd'
                },
                createdAt: 1710454094033,
                type: ['todo']
            },
            {
                id: 'slkdfj398',
                img: '',
                title: 'Learning Goals',
                text: 'Goals for personal and professional development.',
                todos: [{ id: 'sdkfj98', text: 'Read one book per month', isChecked: false }],
                isPinned: false,
                isArchived: true,
                style: {
                    backgroundColor: '#bbbbbb'
                },
                createdAt: 1710464094033,
                type: ['todo']
            },
            {
                id: 'lskdj8932',
                img: '',
                title: 'Holiday Plans',
                text: 'Planning a vacation for the upcoming holiday season.',
                todos: [],
                isPinned: true,
                isArchived: true,
                style: {
                    backgroundColor: '#aaaaaa'
                },
                createdAt: 1710474094033,
                type: []
            }

        ]


        localStorageService.saveToStorage(NOTE_KEY, notes)
    }
}