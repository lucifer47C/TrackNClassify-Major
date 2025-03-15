// MainGateScanner.js
import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import Navbar from "./Navbar";
import styles from "./css/MainGateScanner.module.css"; // Import as a module

function MainGateScanner() {
  return (
    <div>
      <Header />
      <Navbar />
      <h1>Main Gate Scanner</h1>
      <div className={styles.homecontainer}>
        <h3>Click on the buttons below to Scan a visitor</h3>
        <Link to="/main-qrscanner">
          <button className={styles.button}>Scan QR code</button>
        </Link>
        <Link to="/main-outqrscanner">
          <button className={styles.button}>Scan QR code out</button>
        </Link>
      </div>
    </div>
  );
}

export default MainGateScanner;
