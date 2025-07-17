import React from 'react';

const ClaimHistory = ({ history }) => {
    return (
        <div className="claim-history">
            <h2>📜 Recent Claims</h2>
            <div className="history-list">
                {history.length === 0 ? (
                    <p>No claims yet</p>
                ) : (
                    history.map(claim => (
                        <div key={claim._id} className="history-item">
                            <span className="history-user">{claim.userName}</span>
                            <span className="history-points">+{claim.pointsClaimed} points</span>
                            <span className="history-time">
                                {new Date(claim.claimedAt).toLocaleString()}
                            </span>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ClaimHistory;