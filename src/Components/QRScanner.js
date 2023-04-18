import React from "react";
import QrReader from 'react-qr-scanner'
import "./Stylesheets/QRScanner.css";
import swal from 'sweetalert';
export default function QRScanner({setId}) {
  let handleScan = data => {
    if (data) {
      setId(data.text);
    }
  };

  let handleError = err => {
    swal({
      title: "Operation Failed",
      text: err,
      icon: "error",
      button: "Okay",
  });
  };
  const previewStyle = {
    height: 240,
    width: 320,
  }
  return (
    <div className="QRScanner">
      <QrReader
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={previewStyle}
        facingMode="environment"
      />
    </div>
  );
}