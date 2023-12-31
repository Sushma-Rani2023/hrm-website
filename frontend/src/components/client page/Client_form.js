import {useNavigate} from 'react-router-dom'
import Header from '../project page/Header'
import {React , useState} from 'react' 
import SelectCurrency from 'react-select-currency';
import handleLogout from '../logout';

import axios from '../../axios'

function Client_form() {
  const navigate= useNavigate();

  const [client, set] = useState({});
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
      axiosInstance.post('/client/info',client,{
    headers: {
    "Content-Type": "application/json",
    
    
    
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    
    
    
    },
    
  })
   .then( (response) => {
      console.log('creating ',client)
      navigate("/client")
   })
  }
  catch(error){
    console.log(error,client)
  }
  }

    return (
        <div>

        <Header/>
        <div className="row main-row_header" style={{fontSize:'1.5rem'}}>
     <p className="col-md-12">Details of new Client</p>
   </div>

   
   <br/>

   <div>
   <div className="row" >
  <div className="col-md-12">

    <form className="form-horizontal" method="POST" zzs id="add_new_user_form" onSubmit={handlesubmit}>
     
      <div className="form-group row ">
        <label htmlFor="clientname" className="col-md-3 control-label" >Client Name</label>
        <div className="col-md-5">
          <input className="form-control" placeholder='Name'  id="clientname" name="Clientname"  onChange={handleform} required />
        </div>
      </div>

      <div className="form-group row">
        <label htmlFor="clientcode" className="col-md-3 control-label">Client code</label>
        <div className="col-md-5">
          <input className="form-control" id="clientcode" placeholder='Code' name="Clientcode"  onChange={handleform} required />
        </div>
      </div>

      <div className="form-group row">
        <label htmlFor="clientmanager" className="col-md-3 control-label">Client Manager</label>
        <div className="col-md-5">
          <input className="form-control" id="clientmanager"  placeholder='Manager' name="Clientmanager" onChange={handleform} required />
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="clientmanager" className="col-md-3 control-label">Client Phone No.</label>
        <div className="col-md-5">
          <input type='tel' maxLength={10} className="form-control" id="clientmanager"  placeholder='Phone Number ' name="Clientphone" onChange={handleform} required />
        </div>
      </div>

      <div className="form-group row">
        <label htmlFor="clientmanager" className="col-md-3 control-label">Client Email Id</label>
        <div className="col-md-5">
          <input type="email" className="form-control" id="clientmanager"  placeholder='Email Id' name="Clientmail" onChange={handleform} required />
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="clientmanager" className="col-md-3 control-label">Client Company</label>
        <div className="col-md-5">
          <input type='string' className="form-control" id="clientmanager"  placeholder='Company Name' name="Clientcompany" onChange={handleform} />
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="clientmanager" className="col-md-3 control-label">Client Country</label>
        <div className="col-md-5">
          <input type='string' className="form-control" id="clientmanager"  placeholder='Country Name' name="Clientcountry" onChange={handleform}  />
        </div>
      </div>

      <div className="form-group row">
        <label htmlFor="currencyselector" className="col-md-3 control-label">Currency </label>
    <div className="col-md-5">
        <SelectCurrency className='form-select'   name="Currencyselector" onChange={handleform} />

         
          </div>
          {/* <input  type='string' className="form-control" id="currencyselector"  name="Currencyselector" onChange={handleform} required /> */}
        </div>
      


      <div className="form-group row">
        <label htmlFor="billing" className="col-md-3 control-label">Billing </label>
        <div className="col-md-5">
        <select  className='form-select' name="Billing" onChange={handleform} >
        <option value="" selected>Choose Here</option>
        <option value="Hourly cost">Hourly cost</option>
        <option value="Fixed cost">Fixed cost</option>
    
        </select>
        </div>

       </div>
    
 
      <div className="form-group row">
        <label htmlFor="description" className="col-md-3 control-label" >Description</label>
        <div className="col-md-5" >
          <textarea className="form-control" id="description" rows={3} maxLength='200' name="Optional" onChange={handleform}/>
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

export default Client_form