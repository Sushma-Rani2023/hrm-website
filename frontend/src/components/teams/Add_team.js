import { Loader } from "../Loader";
import { useEffect, useState } from "react";
import Popup from "../Popup";
import Team_form from "./Team_form";
import axios from "../../axios";
import Update_team from "./Update_team";
import handleLogout from "../logout";

function Add_team(props) {
 
  const [data , setData] = useState([]);
  const[loader,setLoader]=useState(true)
  const getAds = async () => {
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
    await axiosInstance.get(`/Team/info/${props.project_id}`, 
    {
      headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
 }).then((res)=>{setLoader(false);setData(res.data.data)})}
 catch(err){
  console.log(err)
 }
   
  }

  useEffect(() => {
    getAds()
  }, [])

  function Delete (editId){
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
      axiosInstance.delete(`/Team//deleted/${editId}`, 
    {
      headers: {
      "Content-Type": "application/json",
      
      
      
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      
      
      
      },
      
          })
        .then(response => console.log('Delete successful'))}
        catch(error) {
            console.error('There was an error!', error);
        };
    const updated_data=data.filter((item)=>item._id!==editId)
    setData(updated_data)

    
};

const [modal, setModal] = useState(false);
const [updation,setUpdation]=useState(false)
const toggle1 = () => setModal(!modal);
const toggle2 = () => setUpdation(!updation);

  
  
  return (
    <div>
    
      

    {modal && <Popup toggle={toggle1}><Team_form  toggle={toggle1} getAds={getAds} project_id={props.project_id}/></Popup>}
    {updation && <Popup toggle={toggle2}><Update_team updation={updation} toggle={toggle2} getAds={getAds}/></Popup>}
    

      <div className="row form_container">
        
        <div className="col-md-3 col-md-offset-6 " >
          <button
            type="button"
            className="btn btn-info"
            onClick={() => {
              setModal(true)
            }}
            style={{width:"100px"}}
          >
            +
          </button>
        </div>
      </div>
      <div  style={{width:'100%',marginTop:'45px'}}>
      {
        loader&&
        <Loader/>
      }
      {!loader &&
  <table className="table table-hover">
    <thead>
      <tr>
        <th>Name</th>
        <th>Description</th>
        <th>Role</th>
        <th>Allocation Date</th>
        <th>Actions</th>
        
        
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
        <td> <i className="fa-solid fa-pencil" size="xs" onClick={() => {
             setUpdation(data)
            }} ></i>
           &nbsp;&nbsp;&nbsp;
        <i className="fa-solid fa-trash" size="xs" onClick={()=>Delete(data._id)} ></i></td>
        </tr>)
 
      }
      )
    } 
    </tbody>
  </table>
      }
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
