import React from "react";
import logo from "./logo.svg";
import "./App.css";
import QRCodeComponent from "./components/QrcodeGenerate";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Qr generate app</h1>
        <QRCodeComponent />
      </header>
    </div>
  );
}

export default App;
