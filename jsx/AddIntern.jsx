import "./css/AddIntern.css";
import React, { useState, useEffect } from "react";
import Header from "./Header";
import Navbar from "./Navbar";

function AddIntern() {
  const [visitor, setVisitor] = useState({
    name: "",
    dob: "",
    aadhar: "",
    email: "",
    phone: "",
    coordinator: "",
    employeeEmail: "",
    photoUrl: "",
    aadharPhotoUrl: "",
    isIntern: false,
    internshipFrom: "",
    internshipTo: ""
  });

  const [selectedCoordinator, setSelectedCoordinator] = useState(null);
  const [employeeQuery, setEmployeeQuery] = useState("");
  const [employees, setEmployees] = useState([]);
  const [visitorUploadStatus, setVisitorUploadStatus] = useState("idle");
  const [aadharUploadStatus, setAadharUploadStatus] = useState("idle");
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
    setSelectedCoordinator(employee);
    setEmployeeQuery(employee.NAME);
    setVisitor({
      ...visitor,
      coordinator: employee.NAME,
      employeeEmail: employee.EMAIL,
    });
    setEmployees([]);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setVisitor({
      ...visitor,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleVisitorPhotoUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    try {
      setVisitorUploadStatus("uploading");
      const response = await fetch("/api/upload/visitor-photo", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) throw new Error("Upload failed");
      const data = await response.json();
      setVisitor({ ...visitor, photoUrl: data.url });
      setVisitorUploadStatus("success");
    } catch (error) {
      setVisitorUploadStatus("error");
    }
  };

  const handleAadharPhotoUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    try {
      setAadharUploadStatus("uploading");
      const response = await fetch("/api/upload/aadhar-photo", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) throw new Error("Upload failed");
      const data = await response.json();
      setVisitor({ ...visitor, aadharPhotoUrl: data.url });
      setAadharUploadStatus("success");
    } catch (error) {
      setAadharUploadStatus("error");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
  
    const confirmed = window.confirm("Are you sure you want to submit?");
    if (!confirmed) {
      setProcessing(false);
      return;
    }
  
    try {
      const response = await fetch("/api/interns", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(visitor),
      });
  
      if (response.ok) {
        const savedIntern = await response.json(); // Parse the JSON response
        console.log("Intern details submitted successfully:", savedIntern);
        alert("Intern details submitted successfully!");
        // Reset form state after successful submission
        setVisitor({
          name: "",
          dob: "",
          aadhar: "",
          email: "",
          phone: "",
          coordinator: "",
          employeeEmail: "",
          photoUrl: "",
          aadharPhotoUrl: "",
          isIntern: false,
          internshipFrom: "",
          internshipTo: "",
        });
      } else {
        throw new Error("Failed to submit intern details.");
      }
    } catch (error) {
      console.error("Error submitting intern details:", error);
      alert("Failed to submit intern details. Please try again later.");
    } finally {
      setProcessing(false);
    }
  };
  
  
  
  
  return (
    <div>
      <Header />
      <Navbar />
      <h1>Add Intern Form</h1>
      <form onSubmit={handleSubmit}>
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
          <label>Aadhar ID:</label>
          <input
            name="aadhar"
            value={visitor.aadhar}
            onChange={handleChange}
            required
            pattern="\d{12}"
            title="Aadhar ID must be a 12-digit number"
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
          <label>Coordinator:</label>
          <input
            name="coordinator"
            value={employeeQuery}
            onChange={handleEmployeeQueryChange}
            placeholder="Enter Coordinator Name"
            required
          />
          <ul className="autocomplete-list">
            {employees.map((employee) => (
              <li
                key={employee._id}
                onClick={() => handleEmployeeSelect(employee)}
              >
                {employee.NAME} ({employee.EMAIL})
              </li>
            ))}
          </ul>
        </div>
        {selectedCoordinator && (
          <p>
            <label>Coordinator's Email:</label>
            <input
              name="employeeEmail"
              value={selectedCoordinator.EMAIL}
              readOnly
            />
          </p>
        )}
        <p>
          <label>Visitor Photo:</label>
          <input type="file" onChange={handleVisitorPhotoUpload} required />
          {visitorUploadStatus === "uploading" && <span>Uploading...</span>}
          {visitorUploadStatus === "success" && <span>Photo uploaded successfully!</span>}
          {visitorUploadStatus === "error" && <span>Error uploading photo.</span>}
        </p>
        <p>
          <label>Aadhar Photo:</label>
          <input type="file" onChange={handleAadharPhotoUpload} required />
          {aadharUploadStatus === "uploading" && <span>Uploading...</span>}
          {aadharUploadStatus === "success" && <span>Photo uploaded successfully!</span>}
          {aadharUploadStatus === "error" && <span>Error uploading photo.</span>}
        </p>
        <p>
          <label>
            
            Is Intern
            <input
              id="is-intern-checkbox"
              type="checkbox"
              name="isIntern"
              checked={visitor.isIntern}
              onChange={handleChange}
            />
          </label>
        </p>
        {visitor.isIntern && (
          <>
            <p>
              <label>Internship From:</label>
              <input
                type="date"
                name="internshipFrom"
                value={visitor.internshipFrom}
                onChange={handleChange}
                required={visitor.isIntern}
              />
            </p>
            <p>
              <label>Internship To:</label>
              <input
                type="date"
                name="internshipTo"
                value={visitor.internshipTo}
                onChange={handleChange}
                required={visitor.isIntern}
              />
            </p>
          </>
        )}
        <p>
          <button type="submit" disabled={processing}>
            {processing ? "Processing..." : "Submit"}
          </button>
        </p>
      </form>
    </div>
  );
}

export default AddIntern;
