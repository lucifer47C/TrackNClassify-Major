import React from "react";
import { Link } from "react-router-dom";
import "./css/Home.css";
import Header from "./Header";
import Navbar from "./Navbar";

function Home() {
  return (
    <div>
      <Header />
      <Navbar />
      <h1>Welcome to TrackNClassify</h1>
      <div className="home-box">
        <Link to="/add-indian-visitor">
          <button>Add Indian Visitor</button>
        </Link>
        <Link to="/add-foreign-visitor">
          <button>Add Foreign Visitor</button>
        </Link>
        <Link to="/add-intern">
          <button>Add Intern</button>
        </Link>
        <Link to="/main-gate-scanner">
          <button>Main Gate Scanner</button>
        </Link>
        <Link to="/geopic-gate-scanner">
          <button>Geopic Gate Scanner</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;