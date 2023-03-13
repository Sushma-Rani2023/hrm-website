import {useNavigate} from 'react-router-dom'
import Header from '../project page/Header'
import {React , useState} from 'react' 

import axios from '../../axios'

function Client_form() {
  const navigate= useNavigate();

  const [role, set] = useState({});
  const handleform = (e) => {
    
     set({
      ...role ,
      [e.target.name] : e.target.value 
     })
  
  }

  const handlesubmit = async (e) => {
   e.preventDefault();
   axios.post('engineer/createengineer',role)
   .then( (response) => {
      console.log('creating ',role)
      navigate("/role")
   })
  }
  

    return (
        <div>

        <Header/>
        <div className="row main-row_header" style={{fontSize:'1.5rem'}}>
     <p className="col-md-12">Details of new Role</p>
   </div>

   
   <br/>

   <div>
   <div className="row" >
  <div className="col-md-12">

    <form className="form-horizontal" method="POST"  id="add_new_user_form" onSubmit={handlesubmit}>
     
      <div className="form-group row ">
        <label for="rolename" className="col-md-3 control-label" >Name</label>
        <div className="col-md-3">
          <input className="form-control" id="rolename" name="Name" onChange={handleform} required />
        </div>
      </div>


      <div className="form-group row">
        <label for="description" className="col-md-3 control-label" >Description</label>
        <div className="col-md-10" style={{maxWidth:'450px'}}>
          <textarea className="form-control" id="description" rows={3} maxLength="150"  name="Description" onChange={handleform} required/>
        </div>
      </div>
      
      <div className="form-group row">
        <label for="optional" className="col-md-3 control-label" >Optional</label>
        <div className="col-md-10" style={{maxWidth:'450px'}}>
          <textarea className="form-control" id="optional" rows={3} maxLength="200" name="Optional" onChange={handleform}/>
        </div>
      </div>


      <div className="form-group row">
        <div className="col-md-offset-3 col-md-3">
          <button type="submit" id="add_new_user_btn" className="btn btn-success pull-right single-click" >Add new Role </button>
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