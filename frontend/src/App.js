//import Header from "./components/project page/Header"
import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
//import { ReactDOM } from "react";
import Add_project from "./components/project page/Add_project"
import Add_form from "./components/project page/Add_form"
import Update_form from "./components/project page/Update_form"
import Add_client from  "./components/client page/Add_Client"
import Client_form from "./components/client page/Client_form";
import Update_client from "./components/client page/Update_client"
import Add_Role from "./components/role/Add_role";
import Role_form from "./components/role/Role_form"
import Update_role from "./components/role/Update_role"
import Add_mem from "./components/team member/Add_mem";
//import { render } from "@testing-library/react";
function App() {

  return (
    <div className="main-container">
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Add_project/>}/>
        <Route path="/project/add" element={<Add_form/>}/>
        <Route path="/project/update" element={<Update_form/>}/>
        <Route path="/client" element={<Add_client/>}/>
        <Route path="/client/add" element={<Client_form/>}/>
        <Route path='/client/update' element=<Update_client/>/>
        <Route path="/role" element={<Add_Role/>}></Route>
        <Route path="/role/add" element={<Role_form/>}></Route>
        <Route path="/role/update" element={<Update_role/>}></Route>
        <Route path="team member" element={<Add_mem/>}></Route>
      </Routes>

    </BrowserRouter>
    </div>
    
  ) 
}

export default App;
