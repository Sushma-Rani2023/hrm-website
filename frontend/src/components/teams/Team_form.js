import {useLocation, useNavigate} from 'react-router-dom'
import {React , useState} from 'react' 

import axios from '../../axios'

function Team_form() {
  const location=useLocation()
  const navigate= useNavigate();

  const [team, set] = useState([]);
  const handleform = (e) => {
    
     set({
      ...team ,
      [e.target.name] : e.target.value 
     })
  
     console.log(team)
  }

  const handlesubmit = async (e) => {
   e.preventDefault();
   axios.post('Team/createTeam',team)
   .then( (response) => {
      console.log('creating ',team)
      //props.toggle();
      // navigate({state:{data:location.state.data}})
      //props.getAds()

   })
  }
  

    return (
        <div>
        <div className="row main-row_header" style={{fontSize:'1.5rem'}}>
     <p className="col-md-12">Details of new team member</p>
   </div>

   
   <br/>

   <div>
   <div className="row" >
  <div className="col-md-12">

    <form className="form-horizontal" method="POST"  id="add_new_user_form" onSubmit={handlesubmit}>
     
      <div className="form-group row ">
        <label for="rolename" className="col-md-3 control-label" >Name :</label>
        <div className="col-md-3">
          <input type="text" className="form-control" id="rolename" name="MemberName" onChange={handleform} required />
        </div>
      </div>
  

      <div className="form-group row">
        <label for="role" className="col-md-3 control-label" >Role</label>
        <div className="col-md-10" style={{maxWidth:'450px'}}>
          <input type="text" className="form-control" id="role"   name="Role" onChange={handleform}/>
        </div>
      </div>

      


      <div className="form-group row">
        <label for="description" className="col-md-3 control-label" >Description :</label>
        <div className="col-md-10" style={{maxWidth:'450px'}}>
          <textarea className="form-control" id="description" rows={3} maxLength="150"  name="Description" onChange={handleform}/>
        </div>
      </div>

      <div className="form-group row">
        <label for="date" className="col-md-3 control-label" >Allocation Start Date</label>
        <div className="col-md-10" style={{maxWidth:'450px'}}>
          <input type="date" className="form-control" id="date"   name="AllocationDate" onChange={handleform} required/>
        </div>
      </div>
      
      

      <div className="form-group row">
        <div className="col-md-offset-3 col-md-3">
          <button type="submit" id="add_new_user_btn" className="btn btn-success pull-right single-click" >Add new Team Member </button>
        </div>
      </div>
    </form>

  </div>
</div>

   </div>
</div>



    )
}

export default Team_form