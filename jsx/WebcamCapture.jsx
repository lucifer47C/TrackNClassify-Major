// WebcamCapture.jsx
import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';

const WebcamCapture = ({ onCapture, type }) => {
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
    onCapture(imageSrc, type); // Pass captured image to parent component
  };

  return (
    <div>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={320}
        height={240}
        />
      <button onClick={capture}>Capture {type}</button>
      {capturedImage && (
        <div>
          <h2>Preview</h2>
          <img src={capturedImage} alt="Captured" />
        </div>
      )}
    </div>
  );
};

export default WebcamCapture;
