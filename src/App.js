import React, { useEffect, useMemo, useRef, useState } from "react";
import './styles/App.css';
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import About from "./pages/About";
import Posts from "./pages/Posts";


function App() {
  return(
    <BrowserRouter>
      <div className="navbar">
      
      </div>
      <Routes>
        <Route path="/about" element={<About/>}/>
        <Route path="/posts" element={<Posts/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
