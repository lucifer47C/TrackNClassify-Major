import React, { useEffect, useState } from "react";
import axios from "axios";
import "./css/AdminPanel.css";
import Header from "./Header";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [roleUpdate, setRoleUpdate] = useState({
    username: "",
    email: "",
    newRole: "",
  });
  const [roleOptions] = useState(["Admin", "Security", "Employee"]); // Available roles
  const [searchQuery, setSearchQuery] = useState(""); // Search query state

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/users");
        setUsers(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (username, email) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete user ${username}?`
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch("http://localhost:5000/api/users", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log(result.message); // Success message

      // Remove the deleted user from the state
      setUsers(
        users.filter(
          (user) => user.username !== username || user.email !== email
        )
      );
    } catch (err) {
      console.error("Failed to delete user:", err);
      setError("Failed to delete user");
    }
  };

  const handleRoleUpdate = async () => {
    try {
      const { username, email, newRole } = roleUpdate;
      console.log("Sending role update request with:", { username, email, newRole }); // Log values
  
      const response = await fetch("http://localhost:5000/api/users/role", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, newRole }),
      });
  
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
  
      const result = await response.json();
      console.log(result.message); // Success message
      console.log("Updated user:", result.user); // Updated user info
  
      // Update the user's role in the state
      setUsers(
        users.map((user) =>
          user.username === username && user.email === email
            ? { ...user, role: newRole }
            : user
        )
      );
    } catch (err) {
      console.error("Failed to update user role:", err);
      setError("Failed to update user role");
    }
  };
  

  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching users: {error.message}</p>;
  }

  return (
    <div className="adminpanel">
      <Header />
      <Navbar />
      <h2>User List</h2>
      <div>
        <Link to="/add-user">
          <button id="add">Add User</button>
        </Link>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button onClick={() => setSearchQuery(searchQuery)}>Search</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user._id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  {roleUpdate.username === user.username &&
                  roleUpdate.email === user.email ? (
                    <select
                      value={roleUpdate.newRole}
                      onChange={(e) =>
                        setRoleUpdate({
                          ...roleUpdate,
                          newRole: e.target.value,
                        })
                      }
                    >
                      {roleOptions.map((role) => (
                        <option key={role} value={role}>
                          {role}
                        </option>
                      ))}
                    </select>
                  ) : (
                    user.role
                  )}
                </td>
                <td>
                  {roleUpdate.username === user.username &&
                  roleUpdate.email === user.email ? (
                    <button id="update" onClick={handleRoleUpdate}>Update Role</button>
                  ) : (
                    <>
                      <button id="delete"
                        onClick={() => handleDelete(user.username, user.email)}
                      >
                        Delete
                      </button>
                      <button id="update"
                        onClick={() =>
                          setRoleUpdate({
                            username: user.username,
                            email: user.email,
                            newRole: user.role,
                          })
                        }
                      >
                        Update Role
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPanel;

