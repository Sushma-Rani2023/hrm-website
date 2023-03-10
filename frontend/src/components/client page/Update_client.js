import {useNavigate} from 'react-router-dom'
import Header from '../project page/Header'
import {React , useState} from 'react' 
import { useLocation } from 'react-router-dom'


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
    axios.put(`/client/updateclient/${client._id}`,client)
         .then(response => {console.log('Updated successful')
         navigate("/create_client")})
         .catch(error => {
             console.error('There was an error!', error);
   
    })
   
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

    <form className="form-horizontal" method="POST" action="/users/add/" id="add_new_user_form" onSubmit={handlesubmit}>
     
      <div className="form-group row ">
        <label for="clientname" className="col-md-3 control-label" >Client Name</label>
        <div className="col-md-3">
          <input className="form-control" id="clientname" value={client.Clientname} name="Clientname"  onChange={handleform}  />
        </div>
      </div>

      <div className="form-group row">
        <label for="clientcode" className="col-md-3 control-label">Client code</label>
        <div className="col-md-3">
          <input className="form-control" id="clientcode" name="Clientcode" value={client.Clientcode} onChange={handleform} />
        </div>
      </div>

      <div className="form-group row">
        <label for="clientmanager" className="col-md-3 control-label">Client Manager</label>
        <div className="col-md-3">
          <input className="form-control" id="clientmanager" name="Clientmanager" value={client.Clientmanager} onChange={handleform} />
        </div>
      </div>

      <div className="form-group row">
        <label for="currencyselector" className="col-md-3 control-label">Currency Selector</label>
        <div className="col-md-3">
          <input  type='string' className="form-control" id="currencyselector" value={client.Currencyselector} name="Currencyselector" onChange={handleform} />
        </div>
      </div>


      <div className="form-group row">
        <label for="billing" className="col-md-3 control-label">Billing </label>
       <select  name='Billing' onChange={handleform} className='form-select ' style={{maxWidth:'255px',marginLeft:'10px'}} >
       <option value={client.Billing} selected>Choose Here...</option>
           <option value="Hourly Cost">Hourly Cost</option>
           <option value="Fixed Cost">Fixed Cost</option>
       </select>

       </div>
    
 
      <div className="form-group row">
        <label for="description" className="col-md-3 control-label" > Optional</label>
        <div className="col-md-10" style={{maxWidth:'450px'}}>
          <textarea className="form-control" id="description" rows={3} value={client.Optional} name="Optional" onChange={handleform}/>
        </div>
      </div>

      <div className="form-group row">
        <div className="col-md-offset-3 col-md-3">
          <button type="submit" id="add_new_user_btn" className="btn btn-success pull-right single-click" >Update Client </button>
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