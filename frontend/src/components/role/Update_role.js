import {useNavigate} from 'react-router-dom'
import Header from '../project page/Header'
import {React , useState} from 'react' 
import { useLocation } from 'react-router-dom'



import axios from '../../axios'

function Update_role(props) {
  const navigate= useNavigate();
  const location =useLocation();

  const [role, set] = useState(props.updation);
  console.log('roleeeees is',role,props.updation)
  const handleform = (e) => {
    
     set({
      ...role ,
      [e.target.name] : e.target.value 
     })
     console.log('next is',role)
  
  }

  const handlesubmit = async (e) => {
    e.preventDefault();
    axios.put(`/engineer/updateengineer/${role._id}`,role)
         .then(response => {console.log('Updated successful',role); props.toggle();
         console.log('updated role is',role)
         props.getAds();}
        )
         .catch(error => {
             console.error('There was an error!', error);
   
    })
    props.toggle();
    console.log('updated role is',role)
    props.getAds();
   
   }
    return (
        <div>
        <div className="row main-row_header" style={{fontSize:'1.5rem'}}>
     <p className="col-md-12">Update roles</p>
   </div>

   <br/>

   <div>
   <div className="row" >
  <div className="col-md-12">

  <form className="form-horizontal" method="POST"  onSubmit={handlesubmit}>
     
     <div className="form-group row ">
       <label for="rolename" className="col-md-3 control-label" >Name:</label>
       <div className="col-md-8">
         <input className="form-control" id="rolename" name="Name" defaultValue={props.updation.Name}  onChange={handleform}/>
       </div>
     </div>

     <div className="form-group row ">
       <label for="rate" className="col-md-3 control-label" >Rate per Hour</label>
       <div className="col-md-8">
         <input type="number" className="form-control" id="rate" name="Optional" defaultValue={props.updation.Optional}  onChange={handleform} />
       </div>
     </div>


     <div className="form-group row">
       <label for="description" className="col-md-3 control-label" >Description</label>
       <div className="col-md-8" style={{maxWidth:'450px'}}>
         <textarea className="form-control" id="description" rows={3} maxLength="150"  defaultValue={props.updation.Description} name="Description" onChange={handleform}/>
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