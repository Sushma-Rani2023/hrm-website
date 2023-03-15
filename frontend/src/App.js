//import Header from "./components/project page/Header"
import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
//import { ReactDOM } from "react";

import Add_form from "./components/project page/Add_form"
import Update_form from "./components/project page/Update_form"
import Add_client from  "./components/client page/Add_Client"
import Client_form from "./components/client page/Client_form";
import Update_client from "./components/client page/Update_client"
import Add_Role from "./components/role/Add_role";
import Role_form from "./components/role/Role_form"
import Update_role from "./components/role/Update_role"

import First from "./components/Project/First"
import View from "./components/Project/View"

//import { render } from "@testing-library/react";
function App() {

  return (
    <div className="main-container">
    <BrowserRouter>
      <Routes>

  
        <Route path="/project/add" element={<Add_form/>}/>
        <Route path="/project/update" element={<Update_form/>}/>
        <Route path="/client" element={<Add_client/>}/>
        <Route path="/client/add" element={<Client_form/>}/>
        <Route path='/client/update' element=<Update_client/>/>
        <Route path="/role" element={<Add_Role/>}></Route>
        <Route path="/role/add" element={<Role_form/>}></Route>
        <Route path="/role/update" element={<Update_role/>}></Route>
        <Route path="/" element={<First/>}></Route>
        <Route path="/project/view" element={<View/>}></Route>
        

 
        <></>
      </Routes>

    </BrowserRouter>
    </div>
    
  ) 
}

export default App;
