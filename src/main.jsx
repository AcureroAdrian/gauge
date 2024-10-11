import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { HMI_VALUE_PROVIDER } from "./Context/HMI_VALUE.jsx";

ReactDOM.createRoot(document.getElementById("main")).render(
  <React.StrictMode>
    <HMI_VALUE_PROVIDER>
      <App />
    </HMI_VALUE_PROVIDER>
  </React.StrictMode>
);
