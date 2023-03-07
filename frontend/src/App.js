//import Header from "./components/project page/Header"
import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
//import { ReactDOM } from "react";
import Add_project from "./components/project page/Add_project"
import Add_form from "./components/project page/Add_form"
//import { render } from "@testing-library/react";
function App() {

  return (
    <div className="main-container">
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Add_project/>}/>
        <Route path="/add_project/" element={<Add_form/>}/>
      </Routes>

    </BrowserRouter>
    </div>
    
  ) 
}

export default App;
