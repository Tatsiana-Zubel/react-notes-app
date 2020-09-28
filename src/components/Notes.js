import React, { useState } from 'react';
import ContentEditable from 'react-contenteditable'

export const Notes = ({ notes: notesState, onRemove, onEdit }) => {
    const [notes, setNotes] = useState(notesState)

    if (notes !== notesState) {
        setNotes (notesState)
    }

    const handleChange = (e, note) => {
        const notesEdited = notes.slice()
        const index = notesEdited.findIndex(obj => obj.id === note.id)
        notesEdited[index].message = e.target.value
        setNotes(notesEdited)
    }

    return (
        <ul className="list-group">
            {notesState.map(note => (
                <li
                    className="list-group-item note"
                    key={note.id}
                >
                    <div className="container">
                        <div className="row">
                            <div className="col-10 note-container">
                                <small>{new Date().toLocaleDateString()}</small>
                                <div className="note-name">{note.name}</div>
                                <ContentEditable
                                    html={note.message}
                                    disabled={!note.editable}
                                    className={note.editable ? 'message editable' : 'message'}
                                    onChange = {e => handleChange(e, note)}
                                />
                            </div>
                            <div className="col-2">
                                <button
                                    type="button"
                                    className="btn btn-info m-2"
                                    onClick={() => onEdit(note)}
                                >
                                {note.editable ? 'Save' : 'Edit'}
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-danger m-2"
                                    onClick={() => onRemove(note.id)}
                                >
                                &times;
                                </button>
                            </div>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    )
}