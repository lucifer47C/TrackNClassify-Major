import React, { useState, useEffect } from "react";
import axios from "axios";
import "./css/StudentLocation.css";
import Navbar from "./Navbar"; // Ensure this component exists or remove if not needed
import Header from "./Header"; // Ensure this component exists or remove if not needed

const StudentLocation = () => {
  const [studentLocations, setStudentLocations] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudentLocations = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/student-locations");
        setStudentLocations(response.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchStudentLocations();
  }, []);

  return (
    <div className="studentlocation">
      <Header />
      <Navbar />
      <h1>Student Locations</h1>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <div className="studentlayout">
        <div id="studentcontainer">
          <table>
            <thead className="head">
              <tr>
                <th>Loation</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Coordinator</th>
                <th>Date</th>
                <th>Photo</th>
                <th>Geopic IN Time</th>
                <th>Geopic OUT Time</th>
              </tr>
            </thead>
            <tbody>
              {studentLocations.map((student, index) => (
                <tr key={index}
                style={{
                  backgroundColor:
                    student.location === "ONGC main gate"
                      ? "yellow"
                      : student.location === "Geopic"
                      ? "blue"
                      : student.location === "Out of GEOPIC"
                      ? "yellow"
                      : "white",
                  color: student.location === "Geopic" ? "white" : "black",
                }}
                >
                  <td>{student.location}</td>
                  <td>{student.name}</td>
                  <td>{student.phone}</td>
                  <td>{student.coordinator}</td>
                  <td>{new Date(student.date).toLocaleString()}</td>
                  <td>
                  <a
                    href={student.photoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {student.photoUrl && (
                      <img
                        src={student.photoUrl}
                        alt={student.name}
                        style={{ width: "100px", height: "100px" }}
                      />
                    )}
                  </a>
                  </td>
                  <td>{new Date(student.GeopicInTime).toLocaleString()}</td>
                  <td>{new Date(student.GeopicOutTime).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentLocation;
