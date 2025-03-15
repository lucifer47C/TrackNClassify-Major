import React from 'react';
import QRCode from 'react-qrcode';

const QrCodeComponent = ({ qrCodeData }) => {
  return (
    <div>
      <QRCode value={qrCodeData} size={200} />
    </div>
  );
};

export default QrCodeComponent;