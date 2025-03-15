import Navbar from "./Navbar";
import Header from "./Header";
import React, { useState, useRef } from 'react';
import axios from 'axios';
import './css/EmployeeVerification.css'; // Import the CSS file

const API_URL = 'http://localhost:5000';  // Update this URL to match your backend

const EmployeeManagement = () => {
    const [view, setView] = useState('add');  // 'add', 'view', 'authenticate', 'delete'
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const videoRef = useRef(null);

    const handleAddEmployee = async (e) => {
        e.preventDefault();
        if (name) {
            setLoading(true);
            // Start video capture
            navigator.mediaDevices.getUserMedia({ video: true })
                .then(async (stream) => {
                    videoRef.current.srcObject = stream;
                    videoRef.current.play();

                    // Capture frames from the video stream
                    const interval = setInterval(async () => {
                        const canvas = document.createElement('canvas');
                        canvas.width = videoRef.current.videoWidth;
                        canvas.height = videoRef.current.videoHeight;
                        const ctx = canvas.getContext('2d');
                        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

                        // Send frame to backend for processing
                        const formData = new FormData();
                        canvas.toBlob(async (blob) => {
                            formData.append('image', blob, 'frame.jpg');
                            formData.append('name', name);
                            await axios.post(`${API_URL}/add-employee`, formData);
                        });

                        // Stop capturing after a certain time or number of frames
                        // Adjust timing as needed
                    }, 1000); // Capture frame every second

                    // Stop video capture after 10 seconds for example
                    setTimeout(() => {
                        clearInterval(interval);
                        stream.getTracks().forEach(track => track.stop());
                        videoRef.current.srcObject = null;
                        setLoading(false);
                    }, 10000);
                })
                .catch(err => {
                    console.error('Error accessing webcam:', err);
                    setLoading(false);
                });
        }
    };

    return (
        <div>
            <Header />
            <Navbar />
            <h1>Employee Verification System</h1>
            <nav>
                <button onClick={() => setView('add')}>Add Employee</button>
                <button onClick={() => setView('view')}>View Employees</button>
                <button onClick={() => setView('authenticate')}>Authenticate Employee</button>
                <button onClick={() => setView('delete')}>Delete Employee</button>
            </nav>

            {view === 'add' && (
                <div>
                    <h2>Add New Employee</h2>
                    <form onSubmit={handleAddEmployee}>
                        <label>
                            Name:
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </label>
                        <br />
                        <button type="submit" disabled={loading}>
                            {loading ? 'Adding...' : 'Add Employee'}
                        </button>
                    </form>
                    <video ref={videoRef} style={{ width: '100%', height: 'auto', display: view === 'add' ? 'block' : 'none' }}></video>
                </div>
            )}

            {view === 'view' && (
                <div>
                    <h2>Existing Employees</h2>
                    <ul>
                        {/* List employees here */}
                    </ul>
                </div>
            )}

            {view === 'authenticate' && (
                <div>
                    <h2>Authenticate Employee</h2>
                    <button onClick={() => {/* Implement authentication */}}>Start Authentication</button>
                </div>
            )}

            {view === 'delete' && (
                <div>
                    <h2>Delete Employee</h2>
                    <label>
                        Name:
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </label>
                    <button onClick={() => {/* Implement delete */}}>Delete Employee</button>
                </div>
            )}
        </div>
    );
};

export default EmployeeManagement;
