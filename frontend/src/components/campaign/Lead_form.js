import React from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import {useState,useEffect} from "react"
import axios from '../../axios'
import handleLogout from '../logout'
const Lead_form = (props) => {
    const location=useLocation()
    const navigate= useNavigate();
  
    const [lead, setLead] = useState();
    const handleform = (e) => {
      
       setLead({
        ...lead ,
        [e.target.name] : e.target.value 
       })
    
       console.log(lead)
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
        
        try {axiosInstance.post('lead/createlead',lead,
        {
          headers: {
          "Content-Type": "application/json",
          
          
          
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          
          
          
          },
          
              })
        .then( (response) => {

           props.toggle();
           console.log(lead)
           
          props.getAds()
     
        })}
        catch(err){
         console.log(err)
        }
       }
       


  return (
    <div>
    <div className="row main-row_header" style={{fontSize:'1.5rem'}}>
     <p className="col-md-12">Details of new Lead</p>
   </div>
   <div>
   <div className="row" >
  <div className="col-md-12">

    <form className="form-horizontal" method="POST" zzs id="add_new_user_form" onSubmit={handlesubmit}>
     
      <div className="form-group row ">
        <label htmlFor="clientname" className="col-md-3 control-label" > Name</label>
        <div className="col-md-5">
          <input className="form-control" placeholder='Name'  id="clientname" name="Name"  onChange={handleform} required />
        </div>
      </div>

      
      <div className="form-group row">
        <label htmlFor="clientmanager" className="col-md-3 control-label">Phone No.</label>
        <div className="col-md-5">
          <input type='tel' maxLength={10} className="form-control" id="clientmanager"  placeholder='Phone Number ' name="Phone" onChange={handleform} required />
        </div>
      </div>

      <div className="form-group row">
        <label htmlFor="clientmanager" className="col-md-3 control-label"> Email Id</label>
        <div className="col-md-5">
          <input type="email" className="form-control" id="clientmanager"  placeholder='Email Id' name="Email" onChange={handleform} required />
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="clientmanager" className="col-md-3 control-label">Company</label>
        <div className="col-md-5">
          <input type='string' className="form-control" id="clientmanager"  placeholder='Company Name' name="Company" onChange={handleform} required />
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="clientmanager" className="col-md-3 control-label">Country</label>
        <div className="col-md-5">
          <input type='string' className="form-control" id="clientmanager"  placeholder='Country Name' name="Country" onChange={handleform} required  />
        </div>
      </div>

    
      <div className="form-group row">
        <div >
          <button type="submit" id="add_new_user_btn" className="btn btn-success  single-click" >Add new Client </button>
        </div>
      </div>
    </form>

  </div>
</div>

   </div>



    </div>
  )
}

export default Lead_form