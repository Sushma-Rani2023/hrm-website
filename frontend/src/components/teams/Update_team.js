import {useNavigate} from 'react-router-dom'
import {React , useState} from 'react' 
import { useLocation } from 'react-router-dom'


import axios from '../../axios'

function Update_team(props) {
  const [team, set] = useState(props.updation);
  console.log('roleeeees is',team,props.updation)
  const handleform = (e) => {
    
     set({
      ...team ,
      [e.target.name] : e.target.value 
     })
     console.log('next is',team)
  
  }

  const handlesubmit = async (e) => {
    e.preventDefault();
    axios.put(`/Team/updateTeam/${team._id}`,team)
         .then(response => {console.log('Updated successful',team); props.toggle();
         console.log('updated role is',team)
         props.getAds();}
        )
         .catch(error => {
             console.error('There was an error!', error);
   
    })
    props.toggle();
    console.log('updated role is',team)
    props.getAds();
   
   }
   return (
    <div>
    <div className="row main-row_header" style={{fontSize:'1.5rem'}}>
 <p className="col-md-12">Update Team Member</p>
</div>

<br/>

<div>
<div className="row" >
<div className="col-md-12">

<form className="form-horizontal" method="POST"  id="add_new_user_form" onSubmit={handlesubmit}>
     
      <div className="form-group row ">
        <label for="rolename" className="col-md-3 control-label" >Name :</label>
        <div className="col-md-8">
          <input type="text" className="form-control" defaultValue={props.updation.MemberName} id="rolename" name="MemberName" onChange={handleform}  />
        </div>
      </div>
  

      <div className="form-group row">
        <label for="role" className="col-md-3 control-label" >Role</label>
        <div className="col-md-8" style={{maxWidth:'450px'}}>
          <input type="text" className="form-control" id="role"  defaultValue={props.updation.Role}  name="Role" onChange={handleform}/>
        </div>
      </div>

      


      <div className="form-group row">
        <label for="description" className="col-md-3 control-label" >Description :</label>
        <div className="col-md-8" style={{maxWidth:'450px'}}>
          <textarea className="form-control" id="description" rows={3} maxLength="150" defaultValue={props.updation.Description} name="Description" onChange={handleform}/>
        </div>
      </div>

      <div className="form-group row">
        <label for="date" className="col-md-3 control-label" >Allocation Start Date</label>
        <div className="col-md-8" style={{maxWidth:'450px'}}>
          <input type="date" className="form-control" id="date" defaultValue={props.updation.AllocationDate}  name="AllocationDate" onChange={handleform} required/>
        </div>
      </div>
      
      

      <div className="form-group row">
        <div className="col-md-offset-3 col-md-3">
          <button type="submit" id="add_new_user_btn" className="btn btn-success pull-right single-click" >Update member  </button>
        </div>
      </div>
    </form>

</div>
</div>

</div>
</div>



)
}

export default Update_team