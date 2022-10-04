import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import { authContextProvider } from "./context/authContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <authContextProvider>
      <App />
    </authContextProvider>
  </React.StrictMode>
);
