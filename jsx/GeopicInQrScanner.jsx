import React, { useState, useEffect, useRef } from "react";
import Header from "./Header";
import Navbar from "./Navbar";
import "./css/MainQRScanner.css";
import axios from "axios";
import jsQR from "jsqr";

function GeopicInQrScanner() {
  const [scannerActive, setScannerActive] = useState(false);
  const [qrResult, setQrResult] = useState("");
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

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

    const updateVisitorLocation = async (id, passport, intern) => {
      try {
        const requestBody = { passport, intern };
        const response = await axios.put(
          `http://localhost:5000/api/geopic-visitor-locations/${id}`,
          requestBody
        );
        console.log("Visitor location updated:", response.data);
      } catch (error) {
        console.error("Error updating visitor location:", error);
      }
    };

    const scanBarcode = async () => {
      if (!scannerActive) {
        stopScanner();
        return;
      }

      const videoElement = videoRef.current;
      const canvasElement = canvasRef.current;
      if (!videoElement || !canvasElement) {
        console.error("Video or canvas element is not available");
        return;
      }

      const canvasContext = canvasElement.getContext("2d");
      canvasContext.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);
      const imageData = canvasContext.getImageData(0, 0, canvasElement.width, canvasElement.height);

      const code = jsQR(imageData.data, imageData.width, imageData.height);

      if (code) {
        const qrData = JSON.parse(code.data); // Assuming QR code contains a JSON string
        const displayMessage = `${qrData.name} (${qrData.intern ? "Intern" : "Visitor"}) has Entered Geopic,\nVerified by ${qrData.coordinator}`;
        
        setQrResult(displayMessage);
        setScannerActive(false);

        updateVisitorLocation(qrData.id, qrData.passport, qrData.intern); // Passing ObjectId, passport, and intern flag

        // Redirect after 10 seconds
        setTimeout(() => {
          window.location.href = "/student-location";
        }, 10000);
      } else {
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
                  style={{ display: "none" }}
                  autoPlay
                  playsInline
                />
                <canvas
                  ref={canvasRef}
                  style={{ width: "450px", height: "340px" }}
                />
              </div>
            )}
          </div>
          <button onClick={handleToggleScanner}>
            {scannerActive ? "Stop Scanner" : "Start Scanner"}
          </button>
          <div className="qr-result">
            {qrResult && (
              <p>{qrResult}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GeopicInQrScanner;
