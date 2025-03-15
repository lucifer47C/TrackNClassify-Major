
import React, { useState } from "react";
import { useAuth } from "./auth/AuthContext";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Header from "./Header";
import "./css/Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth(); // Use login from context
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const idToken = await userCredential.user.getIdToken();

      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idToken }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Logged in successfully");
        login(data.token); // Use login from context

        setTimeout(() => {
          navigate("/home");
        }, 100);
      } else {
        alert(data.message);
      }

      setLoading(false);
    } catch (error) {
      console.error("Error logging in:", error);
      alert("Login failed! Check credentials.");
      document.getElementById("email").style.borderColor = "red";
      document.getElementById("password").style.borderColor = "red";
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <Navbar />
      <div className="login">
        <form id="login-form" onSubmit={handleLogin}>
          <div className="top">
            <div className="logo">TrackNclassify</div>
            <div>
              <input
                className="userid"
                type="email"
                placeholder="Email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <input
                className="password"
                type="password"
                placeholder="Password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <button id="submit" type="submit" disabled={loading}>
                {loading ? "Authenticating..." : "Log in"}
              </button>
            </div>
            <div className="forgot-password">Forgot password?</div>
          </div>
          <div className="middle">
            <div className="signup">
              Don't have an account?
              <a className="signup-button" href="">
                Contact Admin
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;

