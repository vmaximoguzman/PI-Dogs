import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";

// axios.defaults.baseURL = "http://localhost:3001";
axios.defaults.baseURL = "https://pi-dogs-api-production-3fb1.up.railway.app/";
//Para trabajar de manera local, utilizaremos la línea de arriba y esta quedará comentada. Cuando querramos pushear o deployear, usaremos la de abajo.

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
