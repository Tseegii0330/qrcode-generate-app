import React, { useState } from "react";
import QRCode from "qrcode-generator";

function QRCodeComponent() {
  const [inputValue, setInputValue] = useState("");
  const [qrCodeImage, setQRCodeImage] = useState<string | null>(null);

  const qrStyle = {
    padding: "20px",
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  const handleGenerateQRCode = () => {
    const typeNumber = 4;
    const errorCorrectionLevel = "L";
    const qr = QRCode(typeNumber, errorCorrectionLevel);
    qr.addData(inputValue);
    qr.make();

    const qrCodeSVG = qr.createSvgTag({ cellSize: 5, margin: 1 });
    setQRCodeImage(qrCodeSVG);
  };

  const handleDownload = () => {
    if (qrCodeImage) {
      const svgBlob = new Blob([qrCodeImage], { type: "image/svg+xml" });

      const svgURL = window.URL.createObjectURL(svgBlob);

      const link = document.createElement("a");
      link.href = svgURL;
      link.download = "qrcode.svg";
      link.click();

      window.URL.revokeObjectURL(svgURL);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter text for QR code"
        value={inputValue}
        onChange={handleInputChange}
      />
      <button onClick={handleGenerateQRCode}>Generate QR Code</button>
      <div
        style={qrStyle}
        id="placeHolder"
        dangerouslySetInnerHTML={{ __html: qrCodeImage || "" }}
      ></div>
      {qrCodeImage && (
        <button onClick={handleDownload}>Download QR Code as SVG</button>
      )}
    </div>
  );
}

export default QRCodeComponent;
