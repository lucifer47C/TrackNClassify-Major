import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './css/LogData.css';
import Navbar from './Navbar';
import Header from './Header';
import { Link } from 'react-router-dom';

const LogData = () => {
  const [visitors, setVisitors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchVisitors = async () => {
      try {
        const response = await axios.get('/api/visitors');
        const normalVisitors = response.data.filter(visitor => visitor.aadhar); // Assuming 'aadhar' field exists for normal visitors
        setVisitors(normalVisitors);
      } catch (error) {
        console.error('Error fetching visitors:', error);
      }
    };

    fetchVisitors();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredVisitors = visitors.filter((visitor) => {
    return visitor.aadhar.toString().includes(searchTerm);
  });

  return (
    <div className="logdata">
      <Header />
      <Navbar />
      <h1>Visitor Data</h1>
      <Link to="/foreign-visitor-log"><button>Foreign Log data</button></Link>
      <input type="search" value={searchTerm} onChange={handleSearch} placeholder="Search by Aadhar card number" />
      <table>
        <thead>
          <tr>
            <th>Verified</th>
            <th>Name</th>
            <th>Dob</th>
            <th>Aadhar</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Visiting</th>
            <th>Date</th>
            <th>Photo</th>
            <th>Aadhar Photo</th>
          </tr>
        </thead>
        <tbody>
          {filteredVisitors.map((visitor) => (
            <tr key={visitor._id} style={{ backgroundColor: visitor.verified ? 'rgb(46, 255, 4)' : 'rgb(252, 38, 38)' }}>
              <td>{visitor.verified ? 'Yes' : 'No'}</td>
              <td>{visitor.name}</td>
              <td>{new Date(visitor.dob).toLocaleDateString()}</td>
              <td>{visitor.aadhar}</td>
              <td>{visitor.email}</td>
              <td>{visitor.phone}</td>
              <td>{visitor.visiting}</td>
              <td>{new Date(visitor.createdAt).toLocaleString()}</td>
              <td>
                <a href={visitor.photoUrl} target="_blank" rel="noopener noreferrer">Link</a>
              </td>
              <td>
                <a href={visitor.aadharPhotoUrl} target="_blank" rel="noopener noreferrer">Link</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LogData;