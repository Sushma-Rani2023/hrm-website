import {useNavigate} from 'react-router-dom'
import Header from '../project page/Header'
import {React , useState} from 'react' 
import { useLocation } from 'react-router-dom'



import axios from '../../axios'

function Update_role() {
  const navigate= useNavigate();
  const location =useLocation();

  const [role, set] = useState(location.state.data);
  const handleform = (e) => {
    
     set({
      ...role ,
      [e.target.name] : e.target.value 
     })
  
  }

  const handlesubmit = async (e) => {
    e.preventDefault();
    axios.put(`/engineer/updateengineer/${role._id}`,role)
         .then(response => {console.log('Updated successful')
         navigate("/role")})
         .catch(error => {
             console.error('There was an error!', error);
   
    })
   
   }
    return (
        <div>

        <Header/>
        <div className="row main-row_header" style={{fontSize:'1.5rem'}}>
     <p className="col-md-12">Update roles</p>
   </div>

   <br/>

   <div>
   <div className="row" >
  <div className="col-md-12">

  <form className="form-horizontal" method="POST"  id="add_new_user_form" onSubmit={handlesubmit}>
     
     <div className="form-group row ">
       <label for="rolename" className="col-md-3 control-label" >Name</label>
       <div className="col-md-3">
         <input className="form-control" id="rolename" name="Name" value={role.Name}  onChange={handleform} required />
       </div>
     </div>

     <div className="form-group row ">
       <label for="rate" className="col-md-3 control-label" >Rate per Hour</label>
       <div className="col-md-3">
         <input className="form-control" id="rate" name="Optional" value={role.Optional}  onChange={handleform} />
       </div>
     </div>


     <div className="form-group row">
       <label for="description" className="col-md-3 control-label" >Description</label>
       <div className="col-md-10" style={{maxWidth:'450px'}}>
         <textarea className="form-control" id="description" rows={3} maxLength="150"  value={role.Description} name="Description" onChange={handleform}/>
       </div>
     </div>
     
     

     <div className="form-group row">
       <div className="col-md-offset-3 col-md-3">
         <button type="submit" id="add_new_user_btn" className="btn btn-success pull-right single-click" >Update Role </button>
       </div>
     </div>
   </form>

  </div>
</div>

   </div>
</div>



    )
}

export default Update_role