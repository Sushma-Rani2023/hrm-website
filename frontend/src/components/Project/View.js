import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../project page/Header";
import axios from "../../axios";
import Add_Role from "../role/Add_role";
import Add_Client from "../client page/Add_Client";

function View() {
  const location = useLocation();
  //const [data, setData]=useState(location.state.data);
  const data = location.state.data;
  console.log(data);
  const [role,setRole]=useState(false)
  const [task,setTask]=useState(false)
  const [team,setTeam]=useState(false)
  return (
    <>
    <div>
      <Header />

      <div>

        <h6>
          <Link to={"/"} style={{textDecoration:"none"}}><h2 style={{color:"#1464d4"}}>{data.Projectname}</h2></Link>{" "}
        </h6>
      </div>
      <div  style={{marginTop:'20px',backgroundColor: "#f8f9fa" ,maxHeight:"200px"}}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          
        }}
      >
        <div  style={{ marginTop: "15px" }}>
          <p><h8  style={{ color: "black" }}> Code </h8>
          </p>
          <p>{data.Projectcode}</p>
        </div>
        <div style={{ marginTop: "15px" }}>
          <p>
            {" "}
            <h8 style={{ color: "black" }}> Status </h8>
          </p>
          <p>{data.Projectstatus}</p>
        </div>
        <div style={{ marginTop: "15px" }}>
          <p>
            {" "}
            <h8 style={{ color: "black" }}>Manager</h8>
          </p>
          <p>{data.Projectmanager}</p>
        </div>
        <div style={{ marginTop: "15px" }}>
          <p>
            <h8 style={{ color: "black" }}>Start Date</h8>
          </p>
          <p>{data.ProjectStartDate}</p>
        </div>
        <div
          style={{
            marginTop: "15px",
            maxWidth: "300px",
            wordWrap: "break-word",
          }}
        >
          <p>
            <h8 style={{ color: "black" }}> Description </h8>
          </p>
          <p>{data.description}</p>
        </div>
      </div>

      <div style={{
        marginLeft:"10px",
          display: "flex",
          whiteSpace:'100px'
         }}>
      </div>
    </div>
    <div className="header ">
<nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavAltM <>arkup">
      <div className="navbar-nav">
      <div>
      
      <button  className="btn btn-outline-success" onClick={()=>{setTask((prev) => !prev) ; setRole(false) ; setTeam(false)} }>Task</button>
     
      </div>
      <button style={{marginLeft:'10px'}} className="btn btn-outline-success" onClick={()=>{setTeam((prev) => !prev); setRole(false);setTask(false)} }>Team Member</button>
        <button style={{marginLeft:'10px'}} className="btn btn-outline-success" onClick={()=>{setRole((prev) => !prev); setTeam(false); setTask(false)}}>Role</button>
        
      </div>
    </div>
  </div>
</nav> 
</div>
    </div>
    {role &&
        <div style={{marginLeft:"20px"}}>
            <Add_Role data={data} />
        </div>
    
    }

    {team &&
        <div style={{marginLeft:"20px"}}>
            <Add_Client/>
        </div>
    
    }
    </>
  );
}

export default View;
