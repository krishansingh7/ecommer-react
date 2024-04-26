import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import 'react-toastify/dist/ReactToastify.css';
import store from "./utils/store.jsx";
import { app } from "./utils/firebase.config.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store} app={app}>
      <App />
    </Provider>
  </React.StrictMode>
);
