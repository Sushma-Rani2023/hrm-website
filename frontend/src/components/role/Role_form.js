import {useLocation, useNavigate} from 'react-router-dom'
import {React , useState} from 'react' 
import axios from '../../axios'

function Role_form(props) {
  const location=useLocation()
  const navigate= useNavigate();

  const [role, set] = useState({project_id:props.project_id});
  const handleform = (e) => {
    
     set({
      ...role ,
      [e.target.name] : e.target.value 
     })
  
     console.log(role)
  }

  const handlesubmit = async (e) => {
   e.preventDefault();
   axios.post('engineer/createengineer',role,
   {
     headers: {
     "Content-Type": "application/json",
     
     
     
     Authorization: `Bearer ${localStorage.getItem("token")}`,
     
     
     
     },
     
         })
   .then( (response) => {
      //console.log('creating ',role)
      props.toggle();
      console.log(role)
      // navigate({state:{data:location.state.data}})
      props.getAds()

   })
  }
  

    return (
        <div>
        <div className="row main-row_header" style={{fontSize:'1.5rem'}}>
     <p className="col-md-12">Details of new Role</p>
   </div>

   
   <br/>

   <div>
   <div className="row" >
  <div className="col-md-12">

    <form className="form-horizontal" method="POST"  id="add_new_user_form" onSubmit={handlesubmit}>
    <div className='modal-body'>
     
      <div className="form-group row">
        <label for="rolename" className="col-md-3 control-label " >Name :</label>
        <div className="col-md-8">
          <input className="form-control " id="rolename" name="Name" onChange={handleform} required />
        </div>
      </div>


      <div className="form-group row" >
       <label for="rate" className="control-label col-md-3" >Rate per Hour :</label>
       <div className="col-md-8">
         <input type="number" className="form-control" id="rate" name="Optional"  onChange={handleform} />
       </div>
     </div>

     


      <div className="form-group row ">
        <label for="description" className="  control-label col-md-3" >Description :</label>
        <div className="col-md-8" >
          <textarea className="form-control" id="description" rows={3} maxLength="150"  name="Description" onChange={handleform} required/>
        </div>
      </div>
      
      

      <div className="form-group ">
        <div  >
          <button type="submit" id="add_new_user_btn" className="btn btn-success  single-click" >Add new Role </button>
        </div>
      </div>
      </div>
    </form>

  </div>
 
</div>

   </div>
</div>



    )
}

export default Role_form