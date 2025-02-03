import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";  // Ensure the correct file path
import "./index.css";  // Ensure styles load

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
