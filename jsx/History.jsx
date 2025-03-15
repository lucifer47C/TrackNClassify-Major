import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from "./Header";
import Navbar from "./Navbar";
import './css/History.css';

const History = () => {
  const [combinedHistory, setCombinedHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState(''); // Add state for search query

  useEffect(() => {
    // Fetch combined history from the API
    const fetchCombinedHistory = async () => {
      try {
        const response = await axios.get('/api/combined-history');
        setCombinedHistory(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCombinedHistory();
  }, []);

  // Filter data based on search query
  const filteredHistory = combinedHistory.filter(item => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    return (
      item.rfidTag.toLowerCase().includes(lowerCaseQuery) ||
      item.name.toLowerCase().includes(lowerCaseQuery) ||
      new Date(item.GeopicInTime).toLocaleString().toLowerCase().includes(lowerCaseQuery) ||
      (item.GeopicOutTime ? new Date(item.GeopicOutTime).toLocaleString().toLowerCase().includes(lowerCaseQuery) : '')
    );
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="history-container">
      <Header />
      <Navbar />
      <h1>RFID History</h1>
      <div className="search-container">
        <input
          className="search-input"
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>RFID Tag</th>
            <th>Name</th>
            <th>Geopic In Time</th>
            <th>Geopic Out Time</th>
          </tr>
        </thead>
        <tbody>
          {filteredHistory.map((item) => (
            <tr key={item._id}>
              <td>{item.rfidTag}</td>
              <td>{item.name}</td>
              <td>{new Date(item.GeopicInTime).toLocaleString()}</td>
              <td>{item.GeopicOutTime ? new Date(item.GeopicOutTime).toLocaleString() : 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default History;
