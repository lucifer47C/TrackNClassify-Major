/*import React, { useState, useEffect, useRef } from "react";
import Header from "./Header";
import Navbar from "./Navbar";
import "./css/MainQRScanner.css";
import axios from "axios";
import jsQR from "jsqr"; // Import jsQR

function MainQRScanner() {
  const [scannerActive, setScannerActive] = useState(false);
  const [qrResult, setQrResult] = useState("");
  const videoRef = useRef(null);
  const canvasRef = useRef(null); // Reference to the canvas

  useEffect(() => {
    let stream;

    const startScanner = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
          requestAnimationFrame(scanBarcode);
        }
      } catch (error) {
        console.error("Error accessing camera:", error);
      }
    };

    const stopScanner = () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };

    const saveVisitorLocation = async (id, passport, intern) => {
      try {
        const requestBody = { passport, intern };
        const response = await axios.post(
          `http://localhost:5000/api/visitor-locations/${id}`,
          requestBody
        );
        console.log("Location saved:", response.data);
      } catch (error) {
        console.error("Error saving location:", error);
      }
    };

    const scanBarcode = () => {
      if (!scannerActive) {
        stopScanner();
        return;
      }
      try {
        const videoElement = videoRef.current;
        if (!videoElement) {
          console.error("Video element is not available");
          return;
        }

        const canvas = canvasRef.current;
        const canvasContext = canvas.getContext("2d");

        // Set canvas size
        canvas.width = videoElement.videoWidth;
        canvas.height = videoElement.videoHeight;

        // Draw the current frame on the canvas
        canvasContext.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

        // Get image data from the canvas
        const imageData = canvasContext.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, canvas.width, canvas.height);

        if (code) {
          const qrData = JSON.parse(code.data); // Assuming QR code contains a JSON string
          setQrResult(code.data);
          setScannerActive(false);
          console.log("QR data:", qrData); // Log QR data
          saveVisitorLocation(qrData.id, qrData.passport, qrData.intern); // Passing ObjectId, passport, and intern flag
        } else {
          requestAnimationFrame(scanBarcode);
        }
      } catch (err) {
        console.error("Barcode detection error:", err);
        requestAnimationFrame(scanBarcode);
      }
    };

    if (scannerActive) {
      startScanner();
    } else {
      stopScanner();
    }

    return () => {
      stopScanner();
    };
  }, [scannerActive]);

  const handleToggleScanner = () => {
    setScannerActive(!scannerActive);
  };

  return (
    <div>
      <Header />
      <Navbar />
      <h3>QR Scanner</h3>
      <div id="container2">
        <div id="container">
          <div id="Details">
            {scannerActive && (
              <div className="scanner-container">
                <video
                  ref={videoRef}
                  style={{ width: "450px", height: "340px" }}
                  autoPlay
                  playsInline
                />
                <canvas
                  ref={canvasRef}
                  style={{ display: "none" }} // Hide canvas element
                />
              </div>
            )}
          </div>
          <button onClick={handleToggleScanner}>
            {scannerActive ? "Stop Scanner" : "Start Scanner"}
          </button>
          <div className="qr-result">
            {qrResult && <p>QR Code Result: {qrResult}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainQRScanner;
*/

import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import Header from "./Header";
import Navbar from "./Navbar";
import "./css/MainQRScanner.css";
import axios from "axios";
import jsQR from "jsqr"; // Import jsQR

function MainQRScanner() {
  const [scannerActive, setScannerActive] = useState(false);
  const [qrResult, setQrResult] = useState("");
  const videoRef = useRef(null);
  const canvasRef = useRef(null); // Reference to the canvas
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    let stream;

    const startScanner = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
          requestAnimationFrame(scanBarcode);
        }
      } catch (error) {
        console.error("Error accessing camera:", error);
      }
    };

    const stopScanner = () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };

    const saveVisitorLocation = async (id, passport, intern) => {
      try {
        const requestBody = { passport, intern };
        const response = await axios.post(
          `http://localhost:5000/api/visitor-locations/${id}`,
          requestBody
        );
        console.log("Location saved:", response.data);
      } catch (error) {
        console.error("Error saving location:", error);
      }
    };

    const scanBarcode = () => {
      if (!scannerActive) {
        stopScanner();
        return;
      }
      try {
        const videoElement = videoRef.current;
        if (!videoElement) {
          console.error("Video element is not available");
          return;
        }

        const canvas = canvasRef.current;
        const canvasContext = canvas.getContext("2d");

        // Set canvas size
        canvas.width = videoElement.videoWidth;
        canvas.height = videoElement.videoHeight;

        // Draw the current frame on the canvas
        canvasContext.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

        // Get image data from the canvas
        const imageData = canvasContext.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, canvas.width, canvas.height);

        if (code) {
          const qrData = JSON.parse(code.data); // Assuming QR code contains a JSON string
          setQrResult(`${qrData.name} is verified`); // Display the name with verification message
          setScannerActive(false);
          console.log("QR data:", qrData); // Log QR data
          saveVisitorLocation(qrData.id, qrData.passport, qrData.intern); // Passing ObjectId, passport, and intern flag

          // Redirect to LogData.jsx after 5 seconds
          setTimeout(() => {
            navigate("/visitor-location"); // Adjust the path as needed
          }, 5000);
        } else {
          requestAnimationFrame(scanBarcode);
        }
      } catch (err) {
        console.error("Barcode detection error:", err);
        requestAnimationFrame(scanBarcode);
      }
    };

    if (scannerActive) {
      startScanner();
    } else {
      stopScanner();
    }

    return () => {
      stopScanner();
    };
  }, [scannerActive, navigate]); // Add navigate to dependency array

  const handleToggleScanner = () => {
    setScannerActive(!scannerActive);
  };

  return (
    <div>
      <Header />
      <Navbar />
      <h3>QR Scanner</h3>
      <div id="container2">
        <div id="container">
          <div id="Details">
            {scannerActive && (
              <div className="scanner-container">
                <video
                  ref={videoRef}
                  style={{ width: "450px", height: "340px" }}
                  autoPlay
                  playsInline
                />
                <canvas
                  ref={canvasRef}
                  style={{ display: "none" }} // Hide canvas element
                />
              </div>
            )}
          </div>
          <button onClick={handleToggleScanner}>
            {scannerActive ? "Stop Scanner" : "Start Scanner"}
          </button>
          <div className="qr-result">
            {qrResult && <p>{qrResult}</p>} {/* Display the name and verification message */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainQRScanner;