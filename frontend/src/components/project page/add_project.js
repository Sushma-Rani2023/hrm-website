import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "./Header";
import axios from "../../axios";
function Add() {
  const navigate = useNavigate();
  const [data , setData] = useState([]);
  const getAds = async () => {
    const res = await axios.get('/project/description')
    setData(res.data.projectData)
  }


  useEffect(() => {
    getAds()
  }, [])
  
  return (
    <div>
      <Header />

      <div className="row form_container">
        <div className="col-md-3 lead " style={{ fontSize: "1.5rem" }}>
          Inzint's project 
        </div>
        <div className="col-md-3 col-md-offset-6 pull-right-12" style={{display:'right'}}>
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={() => {
              navigate("/add_project/");
            }}
          >
            Add Project
          </button>
        </div>
      </div>
      <div className="col-md-9" style={{width:'100%',marginTop:'45px'}}>
  <table class="table table-hover">
    <thead>
      <tr>
        <th>Project Name</th>
        <th>Project Code</th>
        <th>Project Manager</th>
        <th>Project StartDate</th>
        <th>Project Status</th>
        <th>Project Action</th>
      </tr>
    </thead>
    <tbody>
    {
      data.map((data,index) => {
         return (<tr key={index}>
        <td>{data.Projectname}</td>
        <td>{data.Projectcode}</td>
        <td>{data.Projectmanager}</td>
        <td>{data.ProjectStartDate}</td>
        <td>{data.Projectstatus}</td>
        <td> <button className="edit-delete-buttons" variant="tertiary" size="xs" >Edit</button>
        <button className="edit-delete-buttons" variant="tertiary" size="xs" >Delete</button></td>
        </tr>)
 
      }
      )
    } 
    </tbody>
  </table>
</div>
    </div>
  );
}
export default Add;
