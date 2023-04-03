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
import { useState,useEffect} from "react";

function App() {
  const [authenticated, setAuthenticated] = useState(getCookie('token') ? true:false
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
  element={<PrivateRoute
    authenticated={authenticated}
    component={Add_form}
  />}
/>
            
            <Route path="/project/update" element={<PrivateRoute
              
              authenticated={authenticated}
              component={Update_form }
            />}></Route>
            
            <Route  path="/client" element={<PrivateRoute
             
              authenticated={authenticated}
              component={Add_client }
            />}></Route>
            
            <Route  path="/client/add" element={<PrivateRoute
             
              authenticated={authenticated}
              component={Client_form}
            />}></Route>
            
            <Route  path="/client/update" element={<PrivateRoute
             
              authenticated={authenticated}
              component={Update_client }
            />}></Route>
            
            <Route  path="/role" element={<PrivateRoute
             
              authenticated={authenticated}
              component={Add_Role }
            />}></Route>
            
            <Route path="/role/add" element={<PrivateRoute
             
              authenticated={authenticated}
              component={Role_form }
            />}></Route>
            
            <Route path="/role/update" element={<PrivateRoute
             
              authenticated={authenticated}
              component={Update_role}
            />}></Route>
            
            <Route  path="/" element={<PrivateRoute
             
              authenticated={authenticated}
              component={First}
            />}></Route>
            <Route  path="/project/view" element={<PrivateRoute
             
             authenticated={authenticated}
             component={View }
           />}></Route>
     
            <Route  path="/project/team/form" element={<PrivateRoute
             
              authenticated={authenticated}
              component={Team_form}
            />}></Route>
            
          </Routes>
          
            
          
        </BrowserRouter>
      </div>
    </>
  );
}

// function PrivateRoute({ authenticated, element, ...rest }) {
//   return (
//     <Route
//       {...rest}
//       element={authenticated ? element : <Navigate to="/login" />}
//     />
//   );
// }

function PrivateRoute({ authenticated, component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated ? <Component {...props} /> : <Navigate to="/login" />
      }
    />
  );
}
function LoginPage() {
  useEffect(()=>{window.location.href = "http://localhost:3000/login/auth/microsoft"},[]
  )
  return <h1>Login Page</h1>;
}


export default App;