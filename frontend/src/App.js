import React from "react";
import Home from "./Components/Home";
import { BrowserRouter,Routes, Route } from "react-router-dom";
import About from "./Components/About";
import All from './Components/All'

function App() {

  return(
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/employee" element={<Home />} />
        <Route path="/employee/:id" element={<All />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  </>
  )

}

export default App;
