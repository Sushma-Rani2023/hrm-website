import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../project page/Header";
import axios from "../../axios";
import 'font-awesome/css/font-awesome.min.css';
import {  } from '@fortawesome/fontawesome-svg-core'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';



function Add() {
  const navigate = useNavigate();
  const [data , setData] = useState([]);
  const getAds = async () => {
    const res = await axios.get('/project/description')
    console.log(res.data.projectData)
    setData(res.data.projectData)
  }

  
  useEffect(() => {
    getAds()
  }, [])



  function Delete (editId){
    axios.delete(`/project/deleteproject/${editId}`)
        .then(response => console.log('Delete successful'))
        .catch(error => {
            console.error('There was an error!', error);
        });
    const updated_data=data.filter((item)=>item._id!==editId)
    setData(updated_data)

    
};

console.log('data',data)
  
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
            className="btn btn-outline-success"
            onClick={() => {
              navigate("/project/add");
            }}
            style={{marginLeft:"50vw", width:"140px"}}
          >
            Add Project
          </button>
        </div>
      </div>
      <div className="col-md-9" style={{width:'100%',marginTop:'45px'}}>
  <table className="table table-hover" >
    <thead>
      <tr>
        <th>Project Name</th>
        <th>Project Action</th>
      </tr>
    </thead>
    <tbody>
    {
      data.map((data,index) => {
         return (<tr key={index}>
        <td><Link to="/project/view" state={{ data: data }} style={{textDecoration:"none"}}>
          <h4>{data.Projectname}</h4>
          </Link></td>
        <td> <div onClick={() => {
              navigate("/project/update",{state:{EditId:data._id,data:data}});
            }}> <i style={{width:"80px",height:'40px'}} className="fa-solid fa-pencil"/> 
            
           
         <img style={{ maxHeight:"40px",maxWidth:'40px' , marginLeft:"20px"}} onClick={()=>Delete(data._id)} src="/delete.jpg" alt="Del"/> </div> </td>
        
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
