import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import VideoUpload from "./pages/VideoUpload";
import VideoDisplay from "./pages/VideoDisplay";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/admin" element={< VideoUpload/>} />
          <Route path="/user" element={< VideoDisplay />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
