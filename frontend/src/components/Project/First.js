import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../project page/Header";
import axios from "../../axios";
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
            className="btn btn-outline-primary"
            onClick={() => {
              navigate("/project/add");
            }}
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
        <td><Link to="/project1/view" state={{ data: data }}>
  {data.Projectname}
</Link></td>
        <td> <button className="btn btn-outline-secondary" variant="tertiary" size="xs" onClick={() => {
              navigate("/project/update",{state:{EditId:data._id,data:data}});
            }} >Edit</button>
        <button className="btn btn-outline-secondary" variant="tertiary" size="xs" onClick={()=>Delete(data._id)} >Del</button></td>
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
