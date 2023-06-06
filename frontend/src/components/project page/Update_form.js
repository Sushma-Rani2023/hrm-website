import {useNavigate} from 'react-router-dom'
import Header from './Header'
import {React ,useEffect, useState} from 'react' 
import axios from '../../axios'
import {useLocation} from 'react-router-dom'
import handleLogout from '../logout'
function Update_form() {

  const location =useLocation()
  console.log(location.state.EditId)
  const navigate= useNavigate();
  const [project, setProject] = useState(location.state.data);
 

  const handleform = (e) => {
     setProject({
      ...project ,
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
   await axiosInstance.put(`/project/updateproject/${location.state.EditId}`, 
   project,
   {
     headers: {
     "Content-Type": "application/json",
     
     
     
     Authorization: `Bearer ${localStorage.getItem("token")}`,
     
     
     
     },
     
     })
        .then(response => {console.log('Updated successful'
        )
        navigate("/")})}
        catch(error ) {
            console.error('There was an error!', error);
  
   }
  
  }

    return (
        <div>

        <Header/>
        <div className="row main-row_header" style={{fontSize:'1.5rem'}}>
     <p className="col-md-12">Update the details of project</p>
   </div>

   <br/>

   <div>
   <div className="row" >
  <div className="col-md-12">

    <form className="form-horizontal" method="POST"  id="add_new_user_form" onSubmit={handlesubmit}>
      <div className="form-group row ">
        <label for="projectname" className="col-md-3 control-label" >Project Name</label>
        <div className="col-md-3">
          <input className="form-control" id="projectname" value={project.Projectname} name="Projectname" onChange={handleform}  />
        </div>
      </div>

      <div className="form-group row">
        <label for="projectcode" className="col-md-3 control-label">Project Code</label>
        <div className="col-md-3">
          <input className="form-control" id="projectcode" value={project.Projectcode} name="Projectcode" onChange={handleform}  />
        </div>
      </div>

      <div className="form-group row">
        <label for="projectmanager" className="col-md-3 control-label">Project Manager</label>
        <div className="col-md-3">
          <input className="form-control" id="projectmanager" value={project.Projectmanager} name="Projectmanager" onChange={handleform}  />
        </div>
      </div>

      <div className="form-group row">
        <label for="projectstartdate" className="col-md-3 control-label">Project Start Date</label>
        <div className="col-md-3">
          <input  type='date' className="form-control" id="projectstartdate" value={project.ProjectStartDate} name="ProjectStartDate" onChange={handleform}  />
        </div>
      </div>


      
      <div className="form-group row">
        <label for="projectstatus" className="col-md-3 control-label">Project Status </label>
        <select  className='form-select col-md-3'  style={{maxWidth:'255px',marginLeft:'12px'}} name="Projectstatus" onChange={handleform} >
        <option value={project.Projectstatus} selected>{project.Projectstatus}</option>
        <option value="Not started">Not Started</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>

        </select>

       </div>
 
      <div className="form-group row">
        <label for="projectdescription" className="col-md-3 control-label">Project Description</label>
        <div className="col-md-10" style={{maxWidth:'450px'}}>
          <textarea className="form-control" id="projectdescription" rows={3} maxLength='500'  value={project.description} name="description" onChange={handleform}/>
        </div>
      </div>

      <div className="form-group row">
        <div className="col-md-offset-3 col-md-3">
          <button type="submit" id="add_new_user_btn" className="btn btn-success pull-right single-click">Update project</button>
        </div>
      </div>
    </form>

  </div>
</div>

   </div>
</div>
    )
}

export default Update_form