import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../project page/Header";
import axios from "../../axios";

function Add_Role(props) {
  const navigate = useNavigate();
  const [data , setData] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  console.log('adddd_roleeeeee',props)

  const getAds = async () => {
    const res = await axios.get('/engineer/engineerinfo')
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
    setShowPopup(!showPopup);

    
};

function myFunction() {
  alert("Deleted Successfully");
}
  
  return (
    <div>

      <div className="row form_container">
        <div className="col-md-3 lead " style={{ fontSize: "1.5rem" }}>
          Roles
        </div>
        <div className="col-md-3 col-md-offset-6 pull-right-12" style={{display:'right'}}>
          <button
            type="button"
            className="btn btn-outline-success"
            onClick={() => {
              navigate("/role/add",{state:{data:props.data}});
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
        <button className="btn btn-outline-danger" size="xs" onClick={()=>{Delete(data._id); myFunction()}  }  >Del</button></td>
        </tr>)
 
      }
      )
    } 
    </tbody>
  </table>
  {/* {
    showPopup &&
    <Popup {showPopup:showPopup}/>
  } */}
</div>
    </div>
  );
}
export default Add_Role;
