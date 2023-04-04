import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
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
import { getCookie } from "./axios";
import { useState, useEffect } from "react";

function App() {
  const [authenticated, setAuthenticated] = useState(
    getCookie("token") ? true : false
  );

  return (
    <>
      <div className="main-container">
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={authenticated ? <First /> : <LoginPage />}
            />

            <Route
              path="/project/add"
              element={authenticated ? <Add_form /> : <LoginPage />}
            />

            <Route
              path="/project/update"
              element={authenticated ? <Update_form /> : <LoginPage />}
            />

            <Route
              path="/client"
              element={authenticated ? <Add_client /> : <LoginPage />}
            ></Route>

            <Route
              path="/client/add"
              element={authenticated ? <Client_form /> : <LoginPage />}
            ></Route>

            <Route
              path="/client/update"
              element={authenticated ? <Update_client /> : <LoginPage />}
            ></Route>

            <Route
              path="/role"
              element={authenticated ? <Add_Role /> : <LoginPage />}
            ></Route>

            <Route
              path="/role/add"
              element={authenticated ? <Role_form /> : <LoginPage />}
            ></Route>

            <Route
              path="/role/update"
              element={authenticated ? <Update_role /> : <LoginPage />}
            ></Route>

            <Route
              path="/"
              element={authenticated ? <First /> : <LoginPage />}
            ></Route>
            <Route
              path="/project/view"
              element={authenticated ? <View /> : <LoginPage />}
            ></Route>

            <Route
              path="/project/team/form"
              element={authenticated ? <Team_form /> : <LoginPage />}
            ></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

function PrivateRoute({ authenticated, element, ...rest }) {
  return authenticated ? element : <Navigate to="/login" />;
}

// function PrivateRoute({ authenticated, component: Component, ...rest }) {
//   return (
//     <Route
//       {...rest}
//       render={(props) =>
//         authenticated ? <Component {...props} /> : <Navigate to="/login" />
//       }
//     />
//   );
// }
function LoginPage() {
  useEffect(() => {
    window.location.href = "http://localhost:3000/login/auth/microsoft";
  }, []);
  return <h1>Login Page</h1>;
}

export default App;
