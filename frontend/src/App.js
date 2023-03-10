//import Header from "./components/project page/Header"
import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
//import { ReactDOM } from "react";
import Add_project from "./components/project page/Add_project"
import Add_form from "./components/project page/Add_form"
import Update_form from "./components/project page/Update_form"
import Add_client from  "./components/client page/Add_Client"
import Client_form from "./components/client page/Client_form";
//import { render } from "@testing-library/react";
function App() {

  return (
    <div className="main-container">
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Add_project/>}/>
        <Route path="/add_project/" element={<Add_form/>}/>
        <Route path="/update_project" element={<Update_form/>}/>
        <Route path="/create_client" element={<Add_client/>}/>
        <Route path="/Add_client" element={<Client_form/>}/>
      </Routes>

    </BrowserRouter>
    </div>
    
  ) 
}

export default App;
