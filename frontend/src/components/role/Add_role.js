import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Popup from "../Popup";
import Role_form from './Role_form'
import Update_roles from "../role/Update_role"
import axios from "../../axios";
import "font-awesome/css/font-awesome.min.css";
import {} from "@fortawesome/fontawesome-svg-core";


function Add_Role(props) {
  const [data , setData] = useState([]);
  const getAds = async () => {
    const res = await axios.get(`/engineer/engineerinfo/${props.project_id}`)
    setData(res.data)
   
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
const [updation,setUpdation]=useState(false)

const [modal, setModal] = useState(false);
const toggle1 = () => setModal(!modal);
const toggle2 =()=>setUpdation(!updation)


  
  
  return (
    <div>
    {modal && <Popup toggle={toggle1}><Role_form project_id={props.project_id } toggle={toggle1} getAds={getAds}/></Popup>}
    {updation && <Popup toggle={toggle2}><Update_roles updation={updation} toggle={toggle2} getAds={getAds}/></Popup>}
    
      <div className="row form_container">
        
        <div className="col-md-3 col-md-offset-6 " >
          <button
            type="button"
            className="btn btn-outline-success"
            onClick={() => {
              setModal(true)
             
            }}
            style={{marginLeft:"10px", width:"100px"}}
          >
            +
          </button>
        </div>
      </div>
      <div  style={{width:'100%',marginTop:'45px'}}>
  <table className="table table-hover" >
    <thead>
      <tr>
        <th>Name</th>
        <th>Description</th>
        <th>Rateper Hour</th>
        <th>Edit</th>
        <th>Delete</th>

      </tr>
    </thead>
    <tbody>
    {
      data.map((data,index) => {
         return (<tr key={index}>
        <td>{data.Name}</td>
        <td style={{maxWidth:'150px',height:'60px',wordWrap:'break-word'}}>{data.Description}</td>
        <td >{data.Optional}</td>
        <td  > <i className="fa-solid fa-pencil" size="xs" onClick={() => {
           
              setUpdation(data)
            }} ></i>
            </td>
            <td>
        <i className="fa-solid fa-trash" size="xs" onClick={()=>Delete(data._id)} ></i> </td>
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
