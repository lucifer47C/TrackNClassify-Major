import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './css/StudentData.css'; // Adjust as per your CSS file location
import Navbar from './Navbar';
import Header from './Header';

const StudentData = () => {
  const [interns, setInterns] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchInterns = async () => {
      try {
        const response = await axios.get('/api/interns');
        setInterns(response.data);
      } catch (error) {
        console.error('Error fetching interns:', error);
      }
    };

    fetchInterns();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredInterns = interns.filter((intern) => {
    // Modify the filter condition as per your requirements
    return (
      intern.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      intern.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      intern.aadhar.toString().includes(searchTerm)

    );
  });

  return (
    <div className='studentdata'>
      <Header />
      <Navbar />
      <h1>Student Data</h1>
      <input type="search" value={searchTerm} onChange={handleSearch} placeholder="Search by name or email" />
      <table>
        <thead>
          <tr>
            <th>Verfied</th>
            <th>Name</th>
            <th>DOB</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Coordinator</th>
            <th>Aadhar Card</th>
            <th>Photo</th>
            <th>Aadhar</th>
            <th>From</th>
            <th>To</th>
          </tr>
        </thead>
        <tbody>
          {filteredInterns.map((intern) => (
            <tr key={intern._id} style={{ backgroundColor: intern.verified ? 'rgb(46, 255, 4)' : 'rgb(252, 38, 38)' }}>
              <td>{intern.verified ? 'Yes' : 'No'}</td>  
              <td>{intern.name}</td>
              <td>{new Date(intern.dob).toLocaleDateString()}</td>
              <td>{intern.phone}</td>
              <td>{intern.email}</td>
              <td>{intern.coordinator}</td>
              <td>{intern.aadhar}</td>
              <td>
                <a href={intern.photoUrl} target="_blank" rel="noopener noreferrer">Link</a>
              </td>
              <td>
                <a href={intern.aadharPhotoUrl} target="_blank" rel="noopener noreferrer">Link</a>
              </td>
              <td>{new Date(intern.internshipFrom).toLocaleDateString()}</td>
              <td>{new Date(intern.internshipTo).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentData;
