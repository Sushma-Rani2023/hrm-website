import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
// import dotenv from "dotenv"
import Add_form from "./components/project page/Add_form";

import Update_form from "./components/project page/Update_form";

import Add_client from "./components/client page/Add_Client";

import Client_form from "./components/client page/Client_form";

import Update_client from "./components/client page/Update_client";

import Add_Role from "./components/role/Add_role";

import Role_form from "./components/role/Role_form";

import Update_role from "./components/role/Update_role";

import First from "./components/Project/First";

import View from "./components/Project/View";

import Team_form from "./components/teams/Team_form";

import axios, { gettoken } from "./axios";

import { useEffect } from "react";
import { useLayoutEffect } from "react";

function App() {
  // dotenv.config()
  const location = window.location;

  // const login = async () => {
  //       window.location.href = `${process.env.REACT_APP_BASE_URL}/login/auth/microsoft`;
  // };

  useEffect(() => {
    if (location.pathname === "/") {
      const token = gettoken();
      if (token) {
        localStorage.setItem("token", token);
      }
      if (!token && !localStorage.getItem("token")) {
        window.location.href = `${process.env.REACT_APP_BASE_URL}/login/auth/microsoft`;
      }
    }
  }, []);
  return (
    <>
      <div className="main-container">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<First />} />

            <Route path="/project/add" element={<Add_form />} />

            <Route path="/project/update" element={<Update_form />} />

            <Route path="/client" element={<Add_client />}></Route>

            <Route path="/client/add" element={<Client_form />}></Route>

            <Route path="/client/update" element={<Update_client />}></Route>

            <Route path="/role" element={<Add_Role />}></Route>

            <Route path="/role/add" element={<Role_form />}></Route>

            <Route path="/role/update" element={<Update_role />}></Route>

            <Route path="/" element={<First />}></Route>

            <Route path="/project/view" element={<View />}></Route>

            <Route path="/project/team/form" element={<Team_form />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
