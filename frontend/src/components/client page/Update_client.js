import {useNavigate} from 'react-router-dom'
import Header from '../project page/Header'
import {React , useState} from 'react' 
import { useLocation } from 'react-router-dom'
import SelectCurrency from 'react-select-currency'
import handleLogout from '../logout'

import axios from '../../axios'

function Update_Client() {
  const navigate= useNavigate();
  const location =useLocation();

  const [client, set] = useState(location.state.data);
  const handleform = (e) => {
    
     set({
      ...client ,
      [e.target.name] : e.target.value 
     })
  
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
      axiosInstance.put(`/client/updateclient/${client._id}`,client,{
      headers: {
      "Content-Type": "application/json",
      
      
      
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      
      
      
      },
      
    })
         .then(response => {console.log('Updated successful')
         navigate("/client")})}

         catch(error){
             console.error('There was an error!', error);
   
    }
   
   }
    return (
        <div>

        <Header/>
        <div className="row main-row_header" style={{fontSize:'1.5rem'}}>
     <p className="col-md-12">Details of Client</p>
   </div>

   <br/>

   <div>
   <div className="row" >
  <div className="col-md-12">

    <form className="form-horizontal" method="POST" id="add_new_user_form" onSubmit={handlesubmit}>
     
      <div className="form-group row ">
        <label for="clientname" className="col-md-3 control-label" >Client Name</label>
        <div className="col-md-5">
          <input className="form-control" id="clientname" value={client.Clientname} name="Clientname"  onChange={handleform}  />
        </div>
      </div>

      <div className="form-group row">
        <label for="clientcode" className="col-md-3 control-label">Client code</label>
        <div className="col-md-5">
          <input className="form-control" id="clientcode" name="Clientcode" value={client.Clientcode} onChange={handleform} />
        </div>
      </div>

      <div className="form-group row">
        <label for="clientmanager" className="col-md-3 control-label">Client Manager</label>
        <div className="col-md-5">
          <input className="form-control" id="clientmanager" name="Clientmanager" value={client.Clientmanager} onChange={handleform} />
        </div>
      </div>

      <div className="form-group row">
        <label for="currencyselector" className="col-md-3 control-label">Currency </label>
        <div  className="col-md-5">
        <SelectCurrency className='form-select '  value={client.Currencyselector} name="Currencyselector" onChange={handleform} />
</div>
      </div>


      <div className="form-group row">
        <label for="billing" className="col-md-3 control-label">Billing </label>
        <div className="col-md-5">
       <select  name='Billing' onChange={handleform} className='form-select '  >
       <option value={client.Billing} selected>{client.Billing}</option>
           <option value="Hourly Cost">Hourly Cost</option>
           <option value="Fixed Cost">Fixed Cost</option>
       </select>
</div>
       </div>
    
 
      <div className="form-group row">
        <label for="description" className="col-md-3 control-label" > Description</label>
        <div className="col-md-5" >
          <textarea className="form-control" id="description" maxLength='200' rows={3} value={client.Optional} name="Optional" onChange={handleform}/>
        </div>
      </div>

      <div className="form-group row">
        <div >
          <button type="submit" id="add_new_user_btn" className="btn btn-success single-click" >Update Client </button>
        </div>
      </div>
    </form>

  </div>
</div>

   </div>
</div>



    )
}

export default Update_Client