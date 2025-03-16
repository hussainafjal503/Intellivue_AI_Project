import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ToastContainer } from 'react-toastify';
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from './Redux/store.js'

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      
        <App />
      
      <ToastContainer position="bottom-right" autoClose={800}/>
    </Provider>
  </BrowserRouter>
);
