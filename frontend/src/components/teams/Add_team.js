import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Popup from "../Popup";
import Team_form from "./Team_form";
import { useLocation } from  "react";
import axios from "../../axios";
import Update_team from "./Update_team";
function Add_team() {
  const navigate = useNavigate();
  
  const [data , setData] = useState([]);
  const getAds = async () => {
    const res = await axios.get('/Team/info')
    console.log('reeeeeeeeeeeeeeee',res)
    setData(res.data.Memberdata)
  }

  useEffect(() => {
    getAds()
  }, [])

  function Delete (editId){
    axios.delete(`/Team//deleted/${editId}`)
        .then(response => console.log('Delete successful'))
        .catch(error => {
            console.error('There was an error!', error);
        });
    const updated_data=data.filter((item)=>item._id!==editId)
    setData(updated_data)

    
};

const [modal, setModal] = useState(false);
const [updation,setUpdation]=useState(false)
const toggle1 = () => setModal(!modal);
const toggle2 = () => setUpdation(!updation);

console.log('daataaaaa',data)
  
  
  return (
    <div>
    
      

    {modal && <Popup toggle={toggle1}><Team_form  toggle={toggle1} getAds={getAds}/></Popup>}
    {updation && <Popup toggle={toggle2}><Update_team updation={updation} toggle={toggle2} getAds={getAds}/></Popup>}
    

      <div className="row form_container">
        <div className="col-md-3 lead " style={{ fontSize: "1.5rem" }}>
         Team Members
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
      <div  style={{width:'100%',marginTop:'45px'}}>
  <table className="table table-hover">
    <thead>
      <tr>
        <th>Name</th>
        <th>Description</th>
        <th>Role</th>
        <th>Allocation Date</th>
        <th>Action</th>
        
      </tr>
    </thead>
    <tbody>
    {
      data.map((data,index) => {
         return (<tr key={index}>
        <td>{data.MemberName}</td>
        <td style={{maxWidth:'200px',height:'60px',wordWrap:'break-word'}}>{data.Description}</td>
        <td style={{maxWidth:'200px',height:'60px',wordWrap:'break-word'}}>{data.Role}</td>
        <td>{data.AllocationDate}</td>
        <td> <button className="btn btn-outline-success" size="xs" onClick={() => {
             setUpdation(data)
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
// return(
//     <div>
//         hiiiiiiii
//     </div>
// )

}

export default Add_team;
