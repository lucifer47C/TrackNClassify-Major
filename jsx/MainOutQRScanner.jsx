import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import Header from "./Header";
import Navbar from "./Navbar";
import "./css/MainQRScanner.css";
import axios from "axios";
import jsQR from "jsqr"; // Import jsQR

function MainOutQRScanner() {
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

    const saveVisitorLocation = async (id, passport) => {
      try {
        const requestBody = passport ? { passport } : {};
        const response = await axios.post(
          `http://localhost:5000/api/visitor-locations/${id}/out`,
          requestBody
        );
        console.log("Visitor location updated:", response.data);
      } catch (error) {
        console.error("Error updating visitor location:", error);
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

        // Set canvas size to match video frame
        canvas.width = videoElement.videoWidth;
        canvas.height = videoElement.videoHeight;

        // Draw the current frame on the canvas
        canvasContext.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

        // Get image data from the canvas
        const imageData = canvasContext.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, canvas.width, canvas.height);

        if (code) {
          const qrData = JSON.parse(code.data); // Assuming QR code contains a JSON string
          setQrResult(`${qrData.name} is Outscanned`); // Format result to include only the name and the "Outscanned" message
          setScannerActive(false);
          console.log("QR data:", qrData); // Log QR data
          saveVisitorLocation(qrData.id, qrData.passport); // Passing ObjectId and passport

          // Redirect to visitor-location page after 5 seconds
          setTimeout(() => {
            navigate("/visitor-location"); // Adjust the path as needed
          }, 5000);
        } else {
          requestAnimationFrame(scanBarcode);
        }
      } catch (err) {
        console.error("QR code detection error:", err);
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
    <>
      <Header />
      <Navbar />
      <h3>Out QR Scanner</h3>
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
            {qrResult && <p>{qrResult}</p>} {/* Display the name and "Outscanned" message */}
          </div>
        </div>
      </div>
    </>
  );
}

export default MainOutQRScanner;