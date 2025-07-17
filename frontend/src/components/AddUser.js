import React, { useState } from 'react';

const AddUser = ({ onAddUser }) => {
    const [newUserName, setNewUserName] = useState('');
    const [showForm, setShowForm] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newUserName.trim()) {
            onAddUser(newUserName.trim());
            setNewUserName('');
            setShowForm(false);
        }
    };

    return (
        <div className="add-user">
            {!showForm ? (
                <button onClick={() => setShowForm(true)} className="add-user-button">
                    ➕ Add New User
                </button>
            ) : (
                <form onSubmit={handleSubmit} className="add-user-form">
                    <input
                        type="text"
                        value={newUserName}
                        onChange={(e) => setNewUserName(e.target.value)}
                        placeholder="Enter user name"
                        className="user-input"
                        autoFocus
                    />
                    <button type="submit" className="submit-button">Add</button>
                    <button
                        type="button"
                        onClick={() => {
                            setShowForm(false);
                            setNewUserName('');
                        }}
                        className="cancel-button"
                    >
                        Cancel
                    </button>
                </form>
            )}
        </div>
    );
};

export default AddUser;