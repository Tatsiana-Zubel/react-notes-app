import { SHOW_LOADER, ADD_NOTE, FETCH_NOTES, REMOVE_NOTE, EDIT_NOTE } from '../types'

const handlers = {
    [SHOW_LOADER]: state => ({ ...state, loading: true }),
    [ADD_NOTE]: (state, { payload }) => ({
        ...state,
        notes: [payload, ...state.notes]
    }),
    [FETCH_NOTES]: (state, { payload }) => ({ ...state, notes: payload, loading: false }),
    [REMOVE_NOTE]: (state, { payload }) => ({
        ...state,
        notes: state.notes.filter(note => note.id !== payload)
    }),
    [EDIT_NOTE]: (state, { payload }) => ({
        ...state,
        notes: getAfterEditable(state.notes.slice(), payload)
    }),
    DEFAULT: state => state
}

export const firebaseReducer = (state, action) => {
    const handle = handlers[action.type] || handlers.DEFAULT
    return handle(state, action)
}

const getAfterEditable = (notes, payload) => {
    const noteIndex = Object.values(notes).findIndex(obj => obj.id === payload.id)
    if (noteIndex !== -1) {
        notes[noteIndex].editable = !notes[noteIndex].editable
        notes[noteIndex].message = payload.message
    }
    return notes
}