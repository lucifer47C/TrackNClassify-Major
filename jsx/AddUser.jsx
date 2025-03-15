import React, { useState } from "react";
import "./css/AddUser.css";
import Header from "./Header";
import Navbar from "./Navbar";

const AddUser = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "Employee",
  });
  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch("http://localhost:5000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setResponseMessage("User created successfully!");
      } else {
        setResponseMessage(`Error: ${data.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Submit Error:', error);
      setResponseMessage('An unexpected error occurred. Please try again.');
    }
  };
  

  return (
    <div>
      <Header />
      <Navbar />

      <h2>Add User</h2>
      <div className="AddUserContainer2">
        <div className="AddUserContainer">
          <form onSubmit={handleSubmit}>
            <div className="formGroup">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                className="input"
              />
            </div>
            <div className="formGroup">
              <label htmlFor="email">Email ID:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="input"
              />
            </div>
            <div className="formGroup">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="input"
              />
            </div>
            <div className="formGroup">
              <label htmlFor="role">Role:</label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
                className="input"
              >
                <option value="Admin">Admin</option>
                <option value="Security">Security</option>
                <option value="Employee">Employee</option>
              </select>
            </div>
            <button type="submit" className="button">
              Submit
            </button>
          </form>
          {responseMessage && <div>{responseMessage}</div>}
        </div>
      </div>
    </div>
  );
};

export default AddUser;


