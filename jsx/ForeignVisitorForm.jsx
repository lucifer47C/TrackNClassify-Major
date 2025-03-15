import "./css/IndianVisitorForm.css";
import React, { useState, useEffect } from "react";
import Header from "./Header";
import Navbar from "./Navbar";

function ForeignVisitorForm() {
  const [visitor, setVisitor] = useState({
    name: '',
    dob: '',
    passport: '',
    country: '',
    email: '',
    phone: '',
    visiting: '',
    employeeEmail: '',
    photoUrl: '',
    passportPhotoUrl: '',
  });

  const [selectedVisitingEmployee, setSelectedVisitingEmployee] =
    useState(null);
  const [employeeQuery, setEmployeeQuery] = useState("");
  const [employees, setEmployees] = useState([]);
  const [visitorUploadStatus, setVisitorUploadStatus] = useState("idle");
  const [passportUploadStatus, setPassportUploadStatus] = useState("idle");
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (employeeQuery.length > 1) {
      fetchEmployees(employeeQuery);
    } else {
      setEmployees([]);
    }
  }, [employeeQuery]);

  const handleEmployeeQueryChange = (e) => {
    setEmployeeQuery(e.target.value);
  };

  const fetchEmployees = async (query) => {
    try {
      const response = await fetch(`/api/employees/search?name=${query}`);
      if (!response.ok) throw new Error("Failed to fetch employees");
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const handleEmployeeSelect = (employee) => {
    setSelectedVisitingEmployee(employee);
    setEmployeeQuery(employee.NAME);
    setVisitor({
      ...visitor,
      visiting: employee.NAME,
      employeeEmail: employee.EMAIL,
    });
    setEmployees([]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVisitor({ ...visitor, [name]: value });
  };

  const handleVisitorPhotoUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);

    try {
      setVisitorUploadStatus('uploading');
      const response = await fetch('/api/upload/visitor-photo', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) throw new Error('Upload failed');
      const data = await response.json();
      setVisitor({ ...visitor, photoUrl: data.url });
      setVisitorUploadStatus('success');
    } catch (error) {
      console.error('Error uploading image:', error);
      setVisitorUploadStatus('error');
    }
  };

  const handlePassportPhotoUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);

    try {
      setPassportUploadStatus('uploading');
      const response = await fetch('/api/upload/passport-photo', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) throw new Error('Upload failed');
      const data = await response.json();
      setVisitor({ ...visitor, passportPhotoUrl: data.url });
      setPassportUploadStatus('success');
    } catch (error) {
      console.error('Error uploading image:', error);
      setPassportUploadStatus('error');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    const confirmed = window.confirm('Are you sure you want to submit?');
    if (!confirmed) {
      setProcessing(false);
      return;
    }

    try {
      const response = await fetch('/api/foreign-visitors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(visitor),
      });

      if (response.ok) {
        alert('Foreign visitor details submitted!');
        setVisitor({
          name: '',
          dob: '',
          passport: '',
          country: '',
          email: '',
          phone: '',
          visiting: '',
          employeeEmail: '',
          photoUrl: '',
          passportPhotoUrl: '',
        });
        setVisitorUploadStatus("idle");
        setPassportUploadStatus("idle");
      } else {
        alert('Failed to submit foreign visitor details.');
      }
      document.getElementById('visitor-photo-input').value = '';
      document.getElementById('passport-photo-input').value = '';

    } catch (error) {
      console.error('Error submitting foreign visitor details:', error);
      alert('Failed to submit foreign visitor details.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div>
      <Header />
      <Navbar />
      <h1>Foreign Visitor Form</h1>
      <form onSubmit={handleSubmit}>
        {/* Visitor Details Fields */}
        <p>
          <label>Visitor's Name:</label>
          <input
            name="name"
            value={visitor.name}
            onChange={handleChange}
            placeholder="Name"
            required
          />
        </p>
        <p>
          <label>Date of Birth:</label>
          <input
            type="date"
            name="dob"
            value={visitor.dob}
            onChange={handleChange}
            required
          />
        </p>
        <p>
          <label>Passport:</label>
          <input
            name="passport"
            value={visitor.passport}
            onChange={handleChange}
            required
          />
        </p>
        <p>
          <label>Country:</label>
          <input
            name="country"
            value={visitor.country}
            onChange={handleChange}
            required
          />
        </p>
        <p>
          <label>Visitor's Email:</label>
          <input
            name="email"
            value={visitor.email}
            onChange={handleChange}
            required
          />
        </p>
        <p>
          <label>Visitor's Phone:</label>
          <input
            name="phone"
            value={visitor.phone}
            onChange={handleChange}
            required
            pattern="\d{10}"
          />
        </p>
        <div className="autocomplete-container">
          <label>Visiting Employee:</label>
          <input
            name="visiting"
            value={employeeQuery}
            onChange={handleEmployeeQueryChange}
            required
          />
          <ul className="autocomplete-dropdown">
            {employees.map((employee) => (
              <li
                key={employee.EMAIL}
                onClick={() => handleEmployeeSelect(employee)}
              >
                {employee.NAME} ({employee.EMAIL})
              </li>
            ))}
          </ul>
        </div>
        {selectedVisitingEmployee && (
          <p>
            
          </p>
        )}
        <p>
          <label>Employee Email:</label>
          <input
            name="employeeEmail"
            value={visitor.employeeEmail}
            onChange={handleChange}
            required
          />
        </p>

        {/* Upload Fields */}
        <p>
          <label>Upload Visitor Photo:</label>
          <input
            type="file"
            id="visitor-photo-input"
            onChange={handleVisitorPhotoUpload}
          />
          {visitorUploadStatus === "uploading" && (
            <span>Uploading visitor photo...</span>
          )}
          {visitorUploadStatus === "success" && (
            <span>Visitor photo uploaded successfully!</span>
          )}
          {visitorUploadStatus === "error" && (
            <span>Error uploading visitor photo. Please try again.</span>
          )}
        </p>
        <p>
          <label>Upload Passport Photo:</label>
          <input
            type="file"
            id="passport-photo-input"
            onChange={handlePassportPhotoUpload}
          />
          {passportUploadStatus === "uploading" && (
            <span>Uploading passport photo...</span>
          )}
          {passportUploadStatus === "success" && (
            <span>Passport photo uploaded successfully!</span>
          )}
          {passportUploadStatus === "error" && (
            <span>Error uploading passport photo. Please try again.</span>
          )}
        </p>

        <button className="submit" type="submit" disabled={processing}>
          {processing ? 'Processing...' : 'Submit'}
        </button>
      </form>
      {processing && <span>Processing...</span>}
    </div>
  );
}

export default ForeignVisitorForm;
