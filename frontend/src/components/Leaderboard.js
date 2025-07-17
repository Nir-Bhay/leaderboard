import React from 'react';

const Leaderboard = ({ users }) => {
    return (
        <div className="leaderboard">
            <h2>🏆 Leaderboard</h2>
            <table className="leaderboard-table">
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Name</th>
                        <th>Total Points</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user._id} className={user.rank <= 3 ? `rank-${user.rank}` : ''}>
                            <td>
                                {user.rank === 1 && '🥇'}
                                {user.rank === 2 && '🥈'}
                                {user.rank === 3 && '🥉'}
                                {user.rank > 3 && user.rank}
                            </td>
                            <td>{user.name}</td>
                            <td>{user.totalPoints}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Leaderboard;