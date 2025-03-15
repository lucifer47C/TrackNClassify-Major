import './css/Navbar.css';
import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <nav className="navbar">
        <ul>
            <li><Link to="/home">Home</Link></li>  
            <li><Link to="/log-data">Log Data</Link></li>
            <li><Link to="/student-data">Student Data</Link></li>
            <li><Link to="/visitor-location">Visitor Location</Link></li>
            <li><Link to="/student-location">Student Location </Link></li>
            <li><Link to="/change-password">Change Password</Link></li>
            <li><Link to="/history">RFID Logs</Link></li>
            <li><Link to="/employee-verification">Employee Verification</Link></li>
            <li><Link to ="/logout">Logout</Link></li>
        </ul>
        <ul>
            <li><Link to="/admin-panel">Admin Panel</Link></li>
        </ul>
    </nav>
    );
}