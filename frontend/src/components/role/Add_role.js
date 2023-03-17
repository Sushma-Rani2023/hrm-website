import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Popup from "../Popup";
import Role_form from './Role_form'
import { useLocation } from  "react";


import axios from "../../axios";
function Add_Role(props) {
  const navigate = useNavigate();
  // const location = useLocation();
   console.log(props)
  const [data , setData] = useState([]);
  const getAds = async () => {
    const res = await axios.get('/engineer/engineerinfo')
    setData(res.data)
    console.log('rolessss',data)
  }

  useEffect(() => {
    getAds()
  }, [])

  function Delete (editId){
    axios.delete(`/engineer/deleteengineer/${editId}`)
        .then(response => console.log('Delete successful'))
        .catch(error => {
            console.error('There was an error!', error);
        });
    const updated_data=data.filter((item)=>item._id!==editId)
    setData(updated_data)

    
};

const [modal, setModal] = useState(false);
const toggle = () => setModal(!modal);


  
  
  return (
    <div>
    {modal && <Popup toggle={toggle}><Role_form project_id={props.project_id } toggle={toggle} getAds={getAds}/></Popup>}
    
      <div className="row form_container">
        <div className="col-md-3 lead " style={{ fontSize: "1.5rem" }}>
          Roles
        </div>
        <div className="col-md-3 col-md-offset-6 pull-right-12" style={{display:'right'}}>
          <button
            type="button"
            className="btn btn-outline-success"
            onClick={() => {
              setModal(true)
            }}
            style={{marginLeft:"50vw", width:"100px"}}
          >
            +
          </button>
        </div>
      </div>
      <div className="col-md-9" style={{width:'100%',marginTop:'45px'}}>
  <table className="table table-hover">
    <thead>
      <tr>
        <th>Name</th>
        <th>Description</th>
        <th>Rate per Hour</th>
        <th>Action</th>
        
      </tr>
    </thead>
    <tbody>
    {
      data.map((data,index) => {
         return (<tr key={index}>
        <td>{data.Name}</td>
        <td style={{maxWidth:'200px',height:'60px',wordWrap:'break-word'}}>{data.Description}</td>
        <td style={{maxWidth:'200px',height:'60px',wordWrap:'break-word'}}>{data.Optional}</td>
        <td> <button className="btn btn-outline-success" size="xs" onClick={() => {
              navigate("/role/update",{state:{data:data}});
            }} >Edit</button>
        <button className="btn btn-outline-danger" size="xs" onClick={()=>Delete(data._id)} >Del</button></td>
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
export default Add_Role;
