
import {useNavigate} from 'react-router-dom'
import {React , useState} from 'react' 
import { useLocation } from 'react-router-dom'
import { getCookie } from '../../axios'
import handleLogout from '../logout'

import axios from '../../axios'

const Update_lead = (props) => {
    const navigate= useNavigate();
    const location =useLocation();
  
    const [lead, setLead] = useState(props.updation);
    
    const handleform = (e) => {
      
       setLead({
        ...lead ,
        [e.target.name] : e.target.value 
       })
       console.log('next is',lead)
    
    }
  
    const handlesubmit = async (e) => {
      e.preventDefault();
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
        axiosInstance.put(`/lead/updatelead/${lead._id}`,lead, 
      {
        headers: {
        "Content-Type": "application/json",
        
        
        
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        
        
        
        },
        
         })
           .then(response => {console.log('Updated successful',lead); props.toggle();
           
           props.getAds();}
          )}
           catch(error) {
               console.error('There was an error!', error);
     
      }
      
     }
      return (
          <div>
          <div className="row main-row_header" style={{fontSize:'1.5rem'}}>
       <p className="col-md-12">Update Lead </p>
     </div>
  
     <br/>
  
     <div>
     <div className="row" >
    <div className="col-md-12">
  
    <form className="form-horizontal" method="POST" zzs id="add_new_user_form" onSubmit={handlesubmit}>
     
      <div className="form-group row ">
        <label htmlFor="clientname" className="col-md-3 control-label" > Name</label>
        <div className="col-md-5">
          <input className="form-control" placeholder='Name'  id="clientname" name="Name"  onChange={handleform} defaultValue={props.updation.Name} />
        </div>
      </div>

      
      <div className="form-group row">
        <label htmlFor="clientmanager" className="col-md-3 control-label">Phone No.</label>
        <div className="col-md-5">
          <input type='tel' maxLength={10} className="form-control" id="clientmanager"  placeholder='Phone Number ' name="Phone" onChange={handleform}  defaultValue={props.updation.Phone}/>
        </div>
      </div>

      <div className="form-group row">
        <label htmlFor="clientmanager" className="col-md-3 control-label"> Email Id</label>
        <div className="col-md-5">
          <input type="email" className="form-control" id="clientmanager"  placeholder='Email Id' name="Email" onChange={handleform} defaultValue={props.updation.Email} />
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="clientmanager" className="col-md-3 control-label">Company</label>
        <div className="col-md-5">
          <input type='string' className="form-control" id="clientmanager"  placeholder='Company Name' name="Company" onChange={handleform} defaultValue={props.updation.Company} />
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="clientmanager" className="col-md-3 control-label">Country</label>
        <div className="col-md-5">
          <input type='string' className="form-control" id="clientmanager" placeholder='Country Name' name="Country" onChange={handleform} defaultValue={props.updation.Country}  />
        </div>
      </div>

    
      <div className="form-group row">
        <div >
          <button type="submit" id="add_new_user_btn" className="btn btn-success  single-click" >Update  </button>
        </div>
      </div>
    </form>
  
    </div>
  </div>
  
     </div>
  </div>
  
  
  
      )
  }

export default Update_lead