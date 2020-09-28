import React, { useReducer } from 'react';
import { FirebaseContext } from './firebaseContext'
import axios from 'axios';
import { firebaseReducer } from './firebaseReduser';
import { SHOW_LOADER, REMOVE_NOTE, ADD_NOTE, FETCH_NOTES, EDIT_NOTE, REFRESH_NOTE } from '../types'

const url = process.env.REACT_APP_NOTES_APP_DB_URL

export const FirebaseState = ({ children }) => {
    const initialState = {
        notes: [],
        loading: false
    }
    const [state, dispatch] = useReducer(firebaseReducer, initialState)

    const showLoader = () => dispatch({ type: SHOW_LOADER })

    const fetchNotes = async () => {
        showLoader()
        const res = await axios.get(`${url}/notes.json`)
        const payload = getFetchedPayload (res)
        dispatch({ type: FETCH_NOTES, payload })
    }

    const addNote = async (name, message) => {
        const note = {
            name, message, date: new Date().toJSON(), editable: false
        }
        try {
            const res = await axios.post(`${url}/notes.json`, note)
            const payload = {
                ...note,
                id: res.data.name
            }
            dispatch({ type: ADD_NOTE, payload })
        } catch (e) {
            throw new Error(e.message)
        }
    }

    const removeNote = async id => {
        await axios.delete(`${url}/notes/${id}.json`)
        dispatch({ type: REMOVE_NOTE, payload: id })
    }

    const editNote = async note => {
        if (note.editable) {
            note.editable = !note.editable
            await axios.put(`${url}/notes/${note.id}.json`, note)
            dispatch({ type: EDIT_NOTE, payload: note })
        } else {
            note.editable = !note.editable
            dispatch({ type: REFRESH_NOTE, payload: note })
        }
    }

    const getFetchedPayload = (res) => {
        if (res.data !== null) {
           const arr = Object.keys(res.data).reverse().map(key => {
                return {
                    ...res.data[key],
                    id: key
                }
            })
            return arr
        } else return []
    }

    return (
        <FirebaseContext.Provider value={{
            showLoader, fetchNotes, addNote, removeNote, editNote,
            loading: state.loading,
            notes: state.notes

        }}>
            {children}
        </FirebaseContext.Provider>
    )
}