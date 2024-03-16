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
    console.log(filterBy);

    return storageService.query(NOTE_KEY)
        .then(notes => {
            console.log(notes);
            // notes = notes.filter(note => !!note.isArchive === filterBy.isArchive)
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
    return { text: '', isArchive: false }
}

function getFilterFromParams(searchParams = {}) {
    const defaultFilter = getDefaultFilter()
    return {
        text: searchParams.get('text') || defaultFilter.text,
    }
}

function _createNotes() {
    let notes = localStorageService.loadFromStorage(NOTE_KEY)
    if (!notes || !notes.length) {
        notes = [{
            id: 'shkj8dsf87',
            img: 'assets/img/DSC00157.jpg',
            title: 'hello world',
            text: 'lajlkfjds sdlhflksa dfhlakh f asdfhklas;hf; ashlkas ',
            todos: [{ id: 'sgasfdh3', text: 'todo 1', isChecked: true }],
            isPinned: false,
            style: {
                backgroundColor: '#ffff'
            },
            createdAt: 1710334094033,
            type: ['image', 'todo']
        },
        {
            id: 'shkf87s',
            img: 'assets/img/a (1).jpg',
            title: 'bye world',
            todos: [{ id: 'sghrrt3', text: 'todo 1', isChecked: true }, { id: 's56q2g43', text: 'todo 2', isChecked: false }],
            isPinned: true,
            style: {
                backgroundColor: 'lightblue'
            },
            createdAt: 1710334094033,
            type: ['image', 'todo'],

        },
        {
            id: 'fsfdfds',
            img: '',
            title: 'bye world',
            text: 'lajlkfjds sdlhflksa dfhlakh f asdfhklas;hf; ashlkas ',
            todos: [{ id: 'sgsh3', text: 'todo 1', isChecked: true }, { id: 's564g43', text: 'todo 2', isChecked: false }],
            isPinned: false,
            style: {
                backgroundColor: '#ffff'
            },
            createdAt: 1710334094033,
            type: ['text', 'todo']
        }
        ]

        localStorageService.saveToStorage(NOTE_KEY, notes)
    }
}