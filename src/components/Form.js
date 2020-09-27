import React, {useState, useContext} from 'react';
import {AlertContext} from '../context/alert/alertContext';
import {FirebaseContext} from '../context/firebase/firebaseContext'

export const Form = () => {
    const [name, setName] = useState('')
    const [message, setMessage] = useState('')
    const alert = useContext(AlertContext)
    const firebase =  useContext(FirebaseContext)

    const submitHandler = event => {
        event.preventDefault()

        if (name.trim() && message.trim()) {
            firebase.addNote(name.trim(), message.trim()).then (() => {
                alert.show('Note was created!', 'success')
            }).catch(() => {
                alert.show('Ups! Something went wrong...', 'danger')
            })
            setName('')
        } else {
            alert.show('All field are required')
        }
    }

    return (
        <form>
            <div className="form-group">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Name"
                    value = {name}
                    onChange = {e => setName(e.target.value)}
                />
            </div>
            <div className="form-group">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Message"
                    value = {message}
                    onChange = {e => setMessage(e.target.value)}
                />
            </div>
            <button 
            className="btn btn-primary" 
            type="submit" 
            value="Submit" 
            onClick={submitHandler}
            >Create
            </button>
        </form>
                
    )
}