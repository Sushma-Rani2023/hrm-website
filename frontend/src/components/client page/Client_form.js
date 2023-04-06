import {useNavigate} from 'react-router-dom'
import Header from '../project page/Header'
import {React , useState} from 'react' 
import SelectCurrency from 'react-select-currency';


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
   axios.post('/client/info',{
    headers: {
    "Content-Type": "application/json",
    
    
    
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    
    
    
    },
    
  },client)
   .then( (response) => {
      console.log('creating ',client)
      navigate("/client")
   })
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
        <label for="clientname" className="col-md-3 control-label" >Client Name</label>
        <div className="col-md-5">
          <input className="form-control" id="clientname" name="Clientname"  onChange={handleform} required />
        </div>
      </div>

      <div className="form-group row">
        <label for="clientcode" className="col-md-3 control-label">Client code</label>
        <div className="col-md-5">
          <input className="form-control" id="clientcode" name="Clientcode"  onChange={handleform} required />
        </div>
      </div>

      <div className="form-group row">
        <label for="clientmanager" className="col-md-3 control-label">Client Manager</label>
        <div className="col-md-5">
          <input className="form-control" id="clientmanager" name="Clientmanager" onChange={handleform} required />
        </div>
      </div>

      <div className="form-group row">
        <label for="currencyselector" className="col-md-3 control-label">Currency </label>
    <div className="col-md-5">
        <SelectCurrency className='form-select'  value={'USD'} name="Currencyselector" onChange={handleform} />

         
          </div>
          {/* <input  type='string' className="form-control" id="currencyselector"  name="Currencyselector" onChange={handleform} required /> */}
        </div>
      


      <div className="form-group row">
        <label for="billing" className="col-md-3 control-label">Billing </label>
        <div className="col-md-5">
        <select  className='form-select' name="Billing" onChange={handleform} >
        <option value="" selected>Choose Here</option>
        <option value="Hourly cost">Hourly cost</option>
        <option value="Fixed cost">Fixed cost</option>

        </select>
        </div>

       </div>
    
 
      <div className="form-group row">
        <label for="description" className="col-md-3 control-label" >Description</label>
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