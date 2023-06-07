import React from "react";
import { useState, useEffect } from "react";
import axios from "../../axios";
import Header from "../project page/Header";
import { Loader } from "../Loader";
import Popup from "../Popup";
import Update from "./Update";
import handleLogout from "../logout";

const Team = () => {
  const [user, setUser] = useState([]);
  const [updateuser, setUpdateuser] = useState();
  const [loader, setLoader] = useState(true);
  const [show, setShow] = useState(false);
  const toggle = () => setShow(!show);

  async function Delete(editId) {

    const axiosInstance = axios.create();

    axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response.status === 401) {
          console.log("handling response ");
          handleLogout();
        }
        return Promise.reject(error);
      }
    );
    try{
      axiosInstance
      .delete(`/user/deleteuser/${editId}`, {
        headers: {
          "Content-Type": "application/json",

          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {console.log("Delete successful");const updated_user = user.filter((item) => item._id !== editId);
      setUser(updated_user);})}
      catch(error){
        console.error("There was an error!", error);
      };
    
  }
  async function getUser() {
    const token = localStorage.getItem("token");
    const axiosInstance = axios.create();

    axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response.status === 401) {
          console.log("handling response ");
          handleLogout();
        }
        return Promise.reject(error);
      }
    );
    try{
    
    await axiosInstance
      .get("/user/getuser", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUser(res.data.userdata);
        setLoader(false);
      })}

      catch(err) { console.log(err);

  }
}

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
      <Header />
      {loader && <Loader />}
      {show && (
        <Popup toggle={toggle}>
          {" "}
          <Update toggle={toggle} getUser={getUser} updateuser={updateuser} />
        </Popup>
      )}
      {!loader && (
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Team Member</th>
              <th className="align-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {user.map((data, index) => {
              return (
                <tr key={index}>
                  <td>
                    <h4>{data.fullName}</h4>
                  </td>
                  <td className="align-right">
                    <i
                      className="fa-solid fa-pencil"
                      onClick={() => {
                        setShow(true);
                        setUpdateuser(data);
                      }}
                    ></i>
                    &nbsp;&nbsp;&nbsp;
                    <i
                      className="fa-solid fa-trash"
                      size="xs"
                      onClick={() => {if (window.confirm("Are you sure you want to delete ")===true){
        console.log('Deleting')
        Delete(data._id)
      }}
                      }
                    ></i>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Team;
