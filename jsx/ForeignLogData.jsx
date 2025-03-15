import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './css/LogData.css';
import Navbar from './Navbar';
import Header from './Header';
import { Link } from 'react-router-dom';

const ForeignLogData = () => {
  const [visitors, setVisitors] = useState([]);

  useEffect(() => {
    const fetchVisitors = async () => {
      try {
        const response = await axios.get('/api/foreign-visitors');
        setVisitors(response.data);
      } catch (error) {
        console.error('Error fetching foreign visitors:', error);
      }
    };

    fetchVisitors();
  }, []);

  return (
    <div>
      <Header />
      <Navbar />
      <h1>Foreign Visitor Log</h1>
      <Link to="/log-data"><button>Indian Log data</button></Link>
      <table>
        <thead>
          <tr>
            <th>Verified</th>
            <th>Name</th>
            <th>Dob</th>
            <th>Passport</th>
            <th>Country</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Visiting</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {visitors.map(visitor => (
            <tr key={visitor._id} style={{ backgroundColor: visitor.verified ? 'rgb(46, 255, 4)' : 'rgb(252, 38, 38)' }}>
              <td>{visitor.verified ? 'Yes' : 'No'}</td>
              <td>{visitor.name}</td>
              <td>{new Date(visitor.dob).toLocaleDateString()}</td>
              <td>{visitor.passport}</td>
              <td>{visitor.country}</td>
              <td>{visitor.email}</td>
              <td>{visitor.phone}</td>
              <td>{visitor.visiting}</td>
              <td>{new Date(visitor.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ForeignLogData;
