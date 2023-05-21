import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./home.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Starter from "./starter.jsx";
import Times from "./times.jsx";
import Context from "../context.jsx";
import Hadith from "./hadith.jsx";
import Quran from "./quran.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Context>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Starter />} />
          <Route path="/times" element={<Times />} />
          <Route path="/hadith" element={<Hadith />} />
          <Route path="/quran" element={<Quran />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </Context>
);
