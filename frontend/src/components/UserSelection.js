import React from 'react';

const UserSelection = ({ users, selectedUser, onSelectUser, onClaimPoints, lastClaim }) => {
    return (
        <div className="user-selection">
            <h2>Select User</h2>
            <select
                value={selectedUser || ''}
                onChange={(e) => onSelectUser(e.target.value)}
                className="user-dropdown"
            >
                <option value="">Select a user...</option>
                {users.map(user => (
                    <option key={user._id} value={user._id}>
                        {user.name}
                    </option>
                ))}
            </select>

            <button
                onClick={onClaimPoints}
                disabled={!selectedUser}
                className="claim-button"
            >
                Claim Points
            </button>

            {lastClaim && (
                <div className="claim-result">
                    <p>🎉 {lastClaim.user.name} claimed {lastClaim.pointsClaimed} points!</p>
                    <p>Total Points: {lastClaim.user.totalPoints}</p>
                </div>
            )}
        </div>
    );
};

export default UserSelection;