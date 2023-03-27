 
import {useNavigate} from 'react-router-dom'
import Header from './Header'
import {React , useState} from 'react' 

import axios from '../../axios'

function Add_form() {
  const navigate= useNavigate();

  const [project, setProject] = useState({});
  const handleform = (e) => {
   
    
     setProject({
      ...project ,
      [e.target.name] : e.target.value 
     })
  
  }

  const handlesubmit = async (e) => {
   e.preventDefault();
   axios.post('/project/createproject',project)
   .then( (response) => {
      console.log('creating project',response.data,project)
      navigate("/")
   })
  // const response = await fetch('http://localhost:8080/project/createproject',{
  // method:'POST',
  // body:JSON.stringify(project),
  // headers:{
  //    'Content-Type':'application/json'
  //  }
  // })
  // const data = await response.json();
  // console.log(data);
  }

    return (
        <div>

        <Header/>
        <div className="row main-row_header" style={{fontSize:'1.5rem'}}>
     <p className="col-md-12">Details of new project</p>
   </div>

   
   <br/>

   <div>
   <div className="row" >
  <div className="col-md-12">

    <form className="form-horizontal" method="POST"  id="add_new_user_form" onSubmit={handlesubmit}>
     
      <div className="form-group row ">
        <label for="projectname" className="col-md-3 control-label" >Project Name</label>
        <div className="col-md-3">
          <input className="form-control" id="projectname" name="Projectname" onChange={handleform} required />
        </div>
      </div>

      <div className="form-group row">
        <label for="projectcode" className="col-md-3 control-label">Project code</label>
        <div className="col-md-3">
          <input className="form-control" id="projectcode" name="Projectcode" onChange={handleform} required />
        </div>
      </div>

      <div className="form-group row">
        <label for="projectmanager" className="col-md-3 control-label">Project Manager</label>
        <div className="col-md-3">
          <input className="form-control" id="projectmanager" name="Projectmanager" onChange={handleform} required />
        </div>
      </div>

      <div className="form-group row">
        <label for="projectstartdate" className="col-md-3 control-label">Project start date</label>
        <div className="col-md-3">
          <input  type='date' className="form-control" id="projectstartdate" name="ProjectStartDate" onChange={handleform} required />
        </div>
      </div>

      <div className="form-group row">
        <label for="billing" className="col-md-3 control-label">Project Status </label>
        <select  className='form-select col-md-3'  style={{maxWidth:'255px',marginLeft:'12px'}} name="Projectstatus" onChange={handleform} >
        <option value="" selected>Choose Here</option>
        <option value="Not started">Not Started</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>

        </select>

       </div>

 
      <div className="form-group row">
        <label for="projectdescription" className="col-md-3 control-label" >Project Description</label>
        <div className="col-md-10" style={{maxWidth:'450px'}}>
          <textarea className="form-control" id="projectdescription" rows={3} maxLength='500' name="description" onChange={handleform}/>
        </div>
      </div>

      <div className="form-group row">
        <div className="col-md-offset-3 col-md-3">
          <button type="submit" id="add_new_user_btn" className="btn btn-success  single-click" >Add new project</button>
        </div>
      </div>
    </form>

  </div>
</div>

   </div>
</div>



    )
}

export default Add_form