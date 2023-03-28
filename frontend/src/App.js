//import Header from "./components/project page/Header"
import React, { useState } from "react";
import { BrowserRouter, Route, Routes,useNavigate, redirect} from 'react-router-dom'
import {useEffect } from 'react'
//import { ReactDOM } from "react";

import Add_form from "./components/project page/Add_form"
import Update_form from "./components/project page/Update_form"
import Add_client from  "./components/client page/Add_Client"
import Client_form from "./components/client page/Client_form";
import Update_client from "./components/client page/Update_client"
import Add_Role from "./components/role/Add_role";
import Role_form from "./components/role/Role_form"
import Update_role from "./components/role/Update_role"
import axios from "./axios";
import First from "./components/Project/First"
import View from "./components/Project/View"
import Add_team from "./components/teams/Add_team";
import Team_form from "./components/teams/Team_form";

//import { render } from "@testing-library/react";
function App() {

console.log(typeof(First))
  const [authorized,setAuthorized]=useState(false)
  const login = async  ()=>{
    await axios.get("http://localhost:3000/login")
    .then((res)=> {console.log('succesfully login',res);setAuthorized(true)})
    .catch((err)=>console.log('invalid',err))
    console.log('login')
    
     }

  //useEffect(()=>{login()},[])
//redirect("/project/team/form")

  const PrivateOutlet = async (children ) => {
    console.log('privte')
    return authorized ? children : await axios.get("http://localhost:3000/login").then(()=>{console.log('successfull')})
  };
  return (
    <div className="main-container">
    <BrowserRouter>
      <Routes>

  
        <Route path="/project/add" element={<><Add_form/></>}></Route>
        <Route path="/project/update" element={<><Update_form/></>}></Route>
        <Route path="/client" element={<><Add_client/></>}></Route>
        <Route path="/client/add" element={<><Client_form/></>}></Route>
        <Route path='/client/update' element={<><Update_client/></>}></Route>
        <Route path="/role" element={<><Add_Role/></>}></Route>
        <Route path="/role/add" element={<><Role_form/></>}></Route>
        <Route path="/role/update" element={<><Update_role/></>}></Route>
        <Route path="/" element={<><First/></>}></Route>
        <Route path="/project/view" element={<><View/></>}></Route>
        <Route path="/project/team/form" element={<><Team_form/></>}></Route>
        
 
        <></>
      </Routes>

    </BrowserRouter>
    </div>
    
  ) 
}


export default App;
