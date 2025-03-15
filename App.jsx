/*
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './jsx/Home';
import IndianVisitorForm from './jsx/IndianVisitorForm';
import ForeignVisitorForm from './jsx/ForeignVisitorForm';
import LogData from './jsx/LogData';
import ForeignLogData from './jsx/ForeignLogData';
import Login from './jsx/Login';
import ProtectedRoute from './jsx/auth/ProtectedRoute'; // Assuming this component is modified to not check roles
import { AuthProvider } from './jsx/auth/AuthContext';
import Logout from './jsx/Logout';
import AddIntern from './jsx/AddIntern';
import StudentData from './jsx/StudentData';
import Visitorlocation from './jsx/Visitorlocation';
import StudentLocation from './jsx/StudentLocation';
import MainGateScanner from './jsx/MainGateScanner';
import MainQRScanner from './jsx/MainQRScanner';
import MainOutQRScanner from './jsx/MainOutQRScanner';
import GeopicGateScanner from './jsx/GeopicGateScanner';
import GeopicInQrScanner from './jsx/GeopicInQrScanner';
import GeopicOutQrScanner from './jsx/GeopicOutQRScanner';
import AdminPanel from './jsx/AdminPanel';
import History from './jsx/History';
import EmployeeVerification from './jsx/EmployeeVerification';
import AddUser from './jsx/AddUser';
import ChangePassword from './jsx/ChangePassword';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/add-indian-visitor" element={<ProtectedRoute><IndianVisitorForm /></ProtectedRoute>} />
        <Route path="/add-foreign-visitor" element={<ProtectedRoute><ForeignVisitorForm /></ProtectedRoute>} />
        <Route path="/add-intern" element={<ProtectedRoute><AddIntern /></ProtectedRoute>} />
        <Route path="/log-data" element={<ProtectedRoute><LogData /></ProtectedRoute>} />
        <Route path="/foreign-visitor-log" element={<ProtectedRoute><ForeignLogData /></ProtectedRoute>} />
        <Route path="/logout" element={<ProtectedRoute><Logout /></ProtectedRoute>} />
        <Route path="/student-data" element={<ProtectedRoute><StudentData /></ProtectedRoute>} />
        <Route path="/visitor-location" element={<ProtectedRoute><Visitorlocation /></ProtectedRoute>} />
        <Route path="/student-location" element={<ProtectedRoute><StudentLocation /></ProtectedRoute>} />
        <Route path="/main-gate-scanner" element={<ProtectedRoute><MainGateScanner /></ProtectedRoute>} />
        <Route path="/main-qrscanner" element={<ProtectedRoute><MainQRScanner /></ProtectedRoute>} />
        <Route path="/main-outqrscanner" element={<ProtectedRoute><MainOutQRScanner /></ProtectedRoute>} />
        <Route path="/geopic-gate-scanner" element={<ProtectedRoute><GeopicGateScanner /></ProtectedRoute>} />
        <Route path="/geopic-in-qrscanner" element={<ProtectedRoute><GeopicInQrScanner /></ProtectedRoute>} />
        <Route path="/geopic-out-qrscanner" element={<ProtectedRoute><GeopicOutQrScanner /></ProtectedRoute>} />
        <Route path="/history" element={<ProtectedRoute><History /></ProtectedRoute>} />
        <Route path="/employee-verification" element={<ProtectedRoute><EmployeeVerification /></ProtectedRoute>} />
        <Route path="/admin-panel" element={<ProtectedRoute><AdminPanel /></ProtectedRoute>} />
        <Route path="/add-user" element={<ProtectedRoute><AddUser /></ProtectedRoute>} />
        <Route path="/change-password" element={<ProtectedRoute><ChangePassword /></ProtectedRoute>} />
      </Routes>
      <ToastContainer />
    </AuthProvider>
  );
}

export default App;


*/
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './jsx/Home';
import IndianVisitorForm from './jsx/IndianVisitorForm';
import ForeignVisitorForm from './jsx/ForeignVisitorForm';
import LogData from './jsx/LogData';
import ForeignLogData from './jsx/ForeignLogData';
import Login from './jsx/Login';
import ProtectedRoute from './jsx/auth/ProtectedRoute';
import { AuthProvider } from './jsx/auth/AuthContext';
import Logout from './jsx/Logout';
import AddIntern from './jsx/AddIntern';
import StudentData from './jsx/StudentData';
import Visitorlocation from './jsx/Visitorlocation';
import StudentLocation from './jsx/StudentLocation';
import MainGateScanner from './jsx/MainGateScanner';
import MainQRScanner from './jsx/MainQRScanner';
import MainOutQRScanner from './jsx/MainOutQRScanner';
import GeopicGateScanner from './jsx/GeopicGateScanner';
import GeopicInQrScanner from './jsx/GeopicInQrScanner';
import GeopicOutQrScanner from './jsx/GeopicOutQRScanner';
import AdminPanel from './jsx/AdminPanel';
import EmployeeVerification from './jsx/EmployeeVerification';
import History from './jsx/History';
import AddUser from './jsx/AddUser';
import ChangePassword from './jsx/ChangePassword';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <AuthProvider>
      
      
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<ProtectedRoute allowedRoles={['Admin', 'Employee', 'Security']}><Home /></ProtectedRoute>} />
          <Route path="/add-indian-visitor" element={<ProtectedRoute allowedRoles={['Admin', 'Employee', 'Security']}><IndianVisitorForm /></ProtectedRoute>} />
          <Route path="/add-foreign-visitor" element={<ProtectedRoute allowedRoles={['Admin', 'Employee', 'Security']}><ForeignVisitorForm /></ProtectedRoute>} />
          <Route path="/add-intern" element={<ProtectedRoute allowedRoles={['Admin', 'Employee']}><AddIntern /></ProtectedRoute>} />
          <Route path="/log-data" element={<ProtectedRoute allowedRoles={['Admin', 'Security']}><LogData /></ProtectedRoute>} />
          <Route path="/foreign-visitor-log" element={<ProtectedRoute allowedRoles={['Admin', 'Security']}><ForeignLogData /></ProtectedRoute>} />
          <Route path="/logout" element={<ProtectedRoute allowedRoles={['Admin', 'Employee', 'Security']}><Logout /></ProtectedRoute>} />
          <Route path="/student-data" element={<ProtectedRoute allowedRoles={['Admin', 'Employee', 'Security']}><StudentData /></ProtectedRoute>} />
          <Route path="/visitor-location" element={<ProtectedRoute allowedRoles={['Admin', 'Security']}><Visitorlocation /></ProtectedRoute>} />
          <Route path="/student-location" element={<ProtectedRoute allowedRoles={['Admin', 'Security']}><StudentLocation /></ProtectedRoute>} />
          <Route path="/main-gate-scanner" element={<ProtectedRoute allowedRoles={['Admin', 'Security']}><MainGateScanner /></ProtectedRoute>} />
          <Route path="/main-qrscanner" element={<ProtectedRoute allowedRoles={['Admin', 'Security']}><MainQRScanner /></ProtectedRoute>} />
          <Route path="/main-outqrscanner" element={<ProtectedRoute allowedRoles={['Admin', 'Security']}><MainOutQRScanner /></ProtectedRoute>} />
          <Route path="/geopic-gate-scanner" element={<ProtectedRoute allowedRoles={['Admin', 'Security']}><GeopicGateScanner /></ProtectedRoute>} />
          <Route path="/geopic-in-qrscanner" element={<ProtectedRoute allowedRoles={['Admin', 'Security']}><GeopicInQrScanner /></ProtectedRoute>} />
          <Route path="/geopic-out-qrscanner" element={<ProtectedRoute allowedRoles={['Admin', 'Security']}><GeopicOutQrScanner /></ProtectedRoute>} />
          <Route path="/history" element={<ProtectedRoute allowedRoles={['Admin', 'Security']}><History /></ProtectedRoute>} />
          <Route path="/employee-verification" element={<ProtectedRoute><EmployeeVerification /></ProtectedRoute>} />
          <Route path="/admin-panel" element={<ProtectedRoute allowedRoles={['Admin']}><AdminPanel /></ProtectedRoute>} />
          <Route path="/add-user" element={<ProtectedRoute allowedRoles={['Admin']}><AddUser /></ProtectedRoute>} />
          <Route path="/change-password" element={<ProtectedRoute allowedRoles={['Admin', 'Employee', 'Security']}><ChangePassword /></ProtectedRoute>} />
        </Routes>
        <ToastContainer />
        
    </AuthProvider>
  );
}

export default App;
