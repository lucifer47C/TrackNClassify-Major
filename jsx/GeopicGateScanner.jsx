import React from "react";
import { Link } from "react-router-dom";

import Header from "./Header";
import Navbar from "./Navbar";
import styles from "./css/MainGateScanner.module.css"; // Import as a module

function GeopicGateScanner() {
  return (
    <div>
      <Header />
      <Navbar />
      <h1>Geopic Gate Scanner</h1>
      <div className={styles.homecontainer}> {/* Use CSS module class */}
        <h3>Click on the buttons below to Scan a visitor</h3>
        <Link to="/geopic-in-qrscanner">
          <button className={styles.button}>Scan In QR code</button> {/* Use CSS module class */}
        </Link>
        <Link to="/geopic-out-qrscanner">
          <button className={styles.button}>Scan QR code out</button> {/* Use CSS module class */}
        </Link>
      </div>
    </div>
  );
}

export default GeopicGateScanner;
