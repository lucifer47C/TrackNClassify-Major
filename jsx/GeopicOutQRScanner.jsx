import React, { useState, useEffect, useRef } from "react";
import Header from "./Header";
import Navbar from "./Navbar";
import "./css/MainQRScanner.css";
import axios from "axios";
import jsQR from "jsqr";

function GeopicOutQRScanner() {
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

    const saveVisitorLocation = async (id, passport, intern) => {
      try {
        const requestBody = { passport, intern };
        console.log(
          `Sending request to update visitor location with ID: ${id}, passport: ${passport}, intern: ${intern}`
        );
        const response = await axios.post(
          `http://localhost:5000/api/geopic-visitor-locations/${id}/out`,
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
      try {
        const videoElement = videoRef.current;
        const canvasElement = canvasRef.current;
        if (!videoElement || !canvasElement) {
          console.error("Video or Canvas element is not available");
          return;
        }
        const canvasContext = canvasElement.getContext("2d");
        canvasElement.width = videoElement.videoWidth;
        canvasElement.height = videoElement.videoHeight;
        canvasContext.drawImage(
          videoElement,
          0,
          0,
          canvasElement.width,
          canvasElement.height
        );
        const imageData = canvasContext.getImageData(
          0,
          0,
          canvasElement.width,
          canvasElement.height
        );
        const code = jsQR(imageData.data, imageData.width, imageData.height);
        if (code) {
          const qrData = JSON.parse(code.data); // Assuming QR code contains a JSON string
          const displayMessage = `${qrData.name} (${qrData.intern ? "Intern" : "Visitor"}) has Exited GEOPIC Building`;

          setQrResult(displayMessage);
          setScannerActive(false);
          console.log("QR data:", qrData); // Log QR data
          saveVisitorLocation(qrData.id, qrData.passport, qrData.intern); // Passing ObjectId, passport, and intern flag

          // Redirect after 8 seconds
          setTimeout(() => {
            window.location.href = "/student-location";
          }, 8000);
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
  }, [scannerActive]);

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
                <canvas ref={canvasRef} style={{ display: "none" }} />
              </div>
            )}
          </div>
          <button onClick={handleToggleScanner}>
            {scannerActive ? "Stop Scanner" : "Start Scanner"}
          </button>
          <div className="qr-result">
            {qrResult && <p>{qrResult}</p>}
          </div>
        </div>
      </div>
    </>
  );
}

export default GeopicOutQRScanner;
