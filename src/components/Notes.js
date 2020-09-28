import React from 'react';
import ContentEditable from 'react-contenteditable'

export const Notes = ({ notes, onRemove, onEdit }) => {
    return (
        <ul className="list-group">
            {notes.map(note => (
                <li
                    className="list-group-item note"
                    key={note.id}
                >
                    <div className="container">
                        <div className="row">
                            <div className="col-10">
                                <small>{new Date().toLocaleDateString()}</small>
                                &nbsp;<strong>{note.name}</strong>
                                <ContentEditable
                                    html={note.message}
                                    disabled={!note.editable}
                                    className={note.editable ? 'message editable' : 'message'}
                                // onChange={this.handleChange}
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