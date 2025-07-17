import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import UserSelection from './components/UserSelection';
import Leaderboard from './components/Leaderboard';
import AddUser from './components/AddUser';
import ClaimHistory from './components/ClaimHistory';

const API_BASE_URL = 'http://localhost:5000/api';

function App() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [lastClaim, setLastClaim] = useState(null);
  const [claimHistory, setClaimHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch users and rankings
  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/users`);
      setUsers(response.data);
    } catch (err) {
      setError('Failed to fetch users');
      console.error(err);
    }
  };

  // Fetch claim history
  const fetchClaimHistory = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/claims/history`);
      setClaimHistory(response.data);
    } catch (err) {
      console.error('Failed to fetch claim history:', err);
    }
  };

  // Initialize app
  useEffect(() => {
    const initializeApp = async () => {
      await fetchUsers();
      await fetchClaimHistory();

      // Initialize default users if needed
      try {
        const response = await axios.get(`${API_BASE_URL}/users`);
        if (response.data.length === 0) {
          await axios.post(`${API_BASE_URL}/users/initialize`);
          await fetchUsers();
        }
      } catch (err) {
        console.error('Initialization error:', err);
      }
    };

    initializeApp();
  }, []);

  // Handle claim points
  const handleClaimPoints = async () => {
    if (!selectedUser) return;

    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/claims/claim`, {
        userId: selectedUser
      });

      setLastClaim(response.data);
      await fetchUsers(); // Refresh rankings
      await fetchClaimHistory(); // Refresh history
    } catch (err) {
      setError('Failed to claim points');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Handle add user
  const handleAddUser = async (name) => {
    try {
      await axios.post(`${API_BASE_URL}/users`, { name });
      await fetchUsers();
    } catch (err) {
      if (err.response?.data?.message) {
        alert(err.response.data.message);
      } else {
        setError('Failed to add user');
      }
    }
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>🏆 Points Leaderboard System</h1>
      </header>

      <div className="app-container">
        <div className="left-section">
          <UserSelection
            users={users}
            selectedUser={selectedUser}
            onSelectUser={setSelectedUser}
            onClaimPoints={handleClaimPoints}
            lastClaim={lastClaim}
          />

          <AddUser onAddUser={handleAddUser} />

          <ClaimHistory history={claimHistory.slice(0, 10)} />
        </div>

        <div className="right-section">
          <Leaderboard users={users} />
        </div>
      </div>

      {error && (
        <div className="error-message">
          {error}
          <button onClick={() => setError(null)}>✕</button>
        </div>
      )}

      {loading && <div className="loading-overlay">Loading...</div>}
    </div>
  );
}

export default App;