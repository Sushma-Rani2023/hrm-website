import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../project page/Header";
import axios from "../../axios";
import "font-awesome/css/font-awesome.min.css";
import {} from "@fortawesome/fontawesome-svg-core";
import { Loader } from "../Loader";

function Add() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loader,setLoader]=useState(true)
  const[user,setUser]=useState()

  async function getUser(){
    const token=localStorage.getItem("token")
   await axios.get("/user/getuser",{
      headers: {
        "Content-Type": "application/json",  
        Authorization: `Bearer ${token}`,
         
        },
    }).then((res)=>{;setUser(res.data.userdata)})
    .catch((err)=>console.log(err))

console.log(user)
  }
  const getAds = async () => {
    const token=localStorage.getItem("token")
    await axios.get("/project/description", 
    {
      headers: {
      "Content-Type": "application/json",  
      Authorization: `Bearer ${token}`,
       
      },
      
      }).then((result)=>{setLoader(false);setData(result.data.projectData)})
      .catch((error)=>console.log(error))

  
  
     
  };

  useEffect(() => {
    if(localStorage.getItem('token')){
      getAds();
      getUser();

    }else{
      setTimeout(()=>{getAds()},1000)
    }
  }, []);

  function Delete(editId) {
    axios
      .delete(`/project/deleteproject/${editId}`, 
      {
        headers: {
        "Content-Type": "application/json",
        
        
        
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        
        
        
        },
        
         })
      .then((response) => console.log("Delete successful"))
      .catch((error) => {
        console.error("There was an error!", error);
      });
    const updated_data = data.filter((item) => item._id !== editId);
    setData(updated_data);
  }

  

  return (
    
    <div>
    
      <Header />

      <div className="row form_container ">
        <div className="col-md-3 lead " style={{ fontSize: "1.5rem" }}>
          Inzint's project
        </div>
        <div
          className="col-md-12 "
          style={{ display: "right" }}
        >
          <button
            type="button"
            className="btn btn-info float-right"
            onClick={() => {
              navigate("/project/add",{state:{userdata:user}});
            }}
            // style={{ marginLeft: "50vw", width: "113px" }}
          >
            Add Project
          </button>
        </div>
      </div>
      <div  style={{ width: "100%", marginTop: "45px" }}>
      {
      loader &&
      <Loader/>
    }
    {!loader &&
        <table className="table table-hover" >
          <thead>
            <tr>
              <th>Project Name</th>
              <th className="align-right">Project Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((data, index) => {
              return (
                <tr key={index}>
                  <td>
                    <Link
                      to="/project/view"
                      state={{ data: data }}
                      style={{ textDecoration: "none",marginTop:'50px' }}
                    >
                      <h4>{data.Projectname}</h4>
                    </Link>
                  </td>

                  <td className="align-right" >
                  
                    <i className="fa-solid fa-pencil" onClick={() => {
                          navigate("/project/update", {
                            state: { EditId: data._id, data: data },
                          });
                        }} > 
                    </i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                   
                    

                    <i className="fa-solid fa-trash" onClick={() => Delete(data._id)} > 
                    </i>
                    </td>

                 
                  
                </tr>
              );
            })}
          </tbody>
        </table>
    }
      </div>
    </div>
  );
}
export default Add;
