import React, { useState, useEffect } from "react";
import  "./css/Visitorlocation.css";
import Navbar from "./Navbar";
import Header from "./Header";
import axios from "axios";

const Visitorlocation = () => {
  const [visitors, setVisitors] = useState([]);
  const [error, setError] = useState(null);
  const [rfidTag, setRfidTag] = useState("");
  const [selectedVisitorId, setSelectedVisitorId] = useState(null);

  useEffect(() => {


    const fetchVisitors = async () => {
      try {
        const response = await axios.get("/api/visitor-locations");
        // Reverse the order of visitors to display new entries first
        setVisitors(response.data.reverse());
      } catch (error) {
        setError(error.message);
      }
    };

    fetchVisitors();
    const interval = setInterval(fetchVisitors, 5000); // Fetch visitors every 5 seconds
    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, []);

  const handleUpdateRfidTag = async (id) => {
    try {
      const response = await axios.put(`/api/visitor-locations/${id}/rfid`, {
        rfidTag,
      });
      console.log("RFID tag updated:", response.data);
      setVisitors(
        visitors.map((visitor) =>
          visitor._id === id
            ? { ...visitor, rfidTag: response.data.rfidTag }
            : visitor
        )
      );
      setRfidTag("");
      setSelectedVisitorId(null);
    } catch (error) {
      console.error("Error updating RFID tag:", error);
    }
  };

  const handleDeleteRfidTag = async (id) => {
    try {
      const response = await axios.delete(`/api/visitor-locations/${id}/rfid`);
      console.log("RFID tag deleted:", response.data);
      setVisitors(
        visitors.map((visitor) =>
          visitor._id === id ? { ...visitor, rfidTag: null } : visitor
        )
      );
    } catch (error) {
      console.error("Error deleting RFID tag:", error);
    }
  };

  return (
    <div>
      <Header />
      <Navbar />
      <h1>Visitor Log</h1>
      <h3>Main Gate</h3>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <div className="visitorlayout">
        <div id="visitcontainer">
          <table className="visitortable">
            <thead className="head">
              <tr>
                <th>Location</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Visiting</th>
                <th>Date</th>
                <th>Photo</th>
                <th>Out Time</th>
                <th>Duration Inside</th>
                <th>Building  In-Time</th>
                <th>Building Out Time</th>
                <th>RFID Tag</th>
                <th>RFID Actions</th>
              </tr>
            </thead>
            <tbody>
              {visitors.map((visitor, index) => (
                <tr
                  key={index}
                  style={{
                    backgroundColor:
                      visitor.location === "ONGC main gate"
                        ? "yellow"
                        : visitor.location === "Geopic"
                        ? "blue"
                        : visitor.location === "Out of GEOPIC"
                        ? "yellow"
                        : "white",
                    color: visitor.location === "Geopic" ? "white" : "black",
                  }}
                >
                  <td>{visitor.location}</td>
                  <td>{visitor.name}</td>
                  <td>{visitor.phone}</td>
                  <td>{visitor.visitingEmployee}</td>
                  <td>{new Date(visitor.date).toLocaleString()}</td>
                  <td>
                    <a
                      href={visitor.photoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {visitor.photoUrl && (
                        <img
                          src={visitor.photoUrl}
                          alt={visitor.name}
                          style={{ width: "100px", height: "100px" }}
                        />
                      )}
                    </a>
                  </td>
                  <td>{visitor.outTime ? new Date(visitor.outTime).toLocaleString() : 'Null'}</td>
                  <td>
                    {visitor.outTime &&
                      (() => {
                        const totalMinutes = Math.round(
                          (new Date(visitor.outTime) - new Date(visitor.date)) /
                            60000
                        );
                        const hours = Math.floor(totalMinutes / 60);
                        const minutes = totalMinutes % 60;
                        return `${hours} hour(s) and ${minutes} minutes`;
                      })()}
                  </td>
                  
                  <td>{visitor.GeopicInTime ? new Date(visitor.GeopicInTime).toLocaleString() : 'Null'}</td>
                  <td>{visitor.GeopicOutTime ? new Date(visitor.GeopicOutTime).toLocaleString() : 'Null'}</td>

                  <td>{visitor.rfidTag}</td>
                  <td>
                    <input
                      className="rfidinput"
                      type="text"
                      value={selectedVisitorId === visitor._id ? rfidTag : ""}
                      onChange={(e) => setRfidTag(e.target.value)}
                      onFocus={() => setSelectedVisitorId(visitor._id)}
                      onBlur={() => setSelectedVisitorId(null)}
                    />
                    <button
                      className="rfidbuttons"
                      onClick={() => handleUpdateRfidTag(visitor._id)}
                    >
                      Update RFID
                    </button>
                    <button
                      className="rfidbuttons"
                      onClick={() => handleDeleteRfidTag(visitor._id)}
                    >
                      Delete RFID
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Visitorlocation;
