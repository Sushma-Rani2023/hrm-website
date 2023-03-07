import React from 'react' 
import {useNavigate} from 'react-router-dom'
import Header from './Header'

function add_form() {
  const navigate= useNavigate;

    return (
        <div>

        <Header/>
        <div classNameName="row main-row_header" style={{fontSize:'1.5rem'}}>
     <p classNameName="col-md-12">Details of new project</p>
   </div>
   <br/>

   <div>
   <div className="row" >
  <div className="col-md-12">

    <form className="form-horizontal" method="POST" action="/users/add/" id="add_new_user_form">

      <div className="form-group row ">
        <label for="projectname" className="col-md-3 control-label">Project Name</label>
        <div className="col-md-3">
          <input className="form-control" id="projectname" name="projectname" required />
        </div>
      </div>

      <div className="form-group row">
        <label for="projectcode" className="col-md-3 control-label">Project code</label>
        <div className="col-md-3">
          <input className="form-control" id="projectcode" name="projectcode" required />
        </div>
      </div>

      <div className="form-group row">
        <label for="projectmanager" className="col-md-3 control-label">Project Manager</label>
        <div className="col-md-3">
          <input className="form-control" id="projectmanager" name="projectmanager" required />
        </div>
      </div>

      <div className="form-group row">
        <label for="projectstartdate" className="col-md-3 control-label">Project start date</label>
        <div className="col-md-3">
          <input  type='date' className="form-control" id="projectstartdate" name="projectstartdate" required />
        </div>
      </div>


      <div className="form-group row">
        <label for="projectstatus" className="col-md-3 control-label">Project Status</label>
        <div className="col-md-3">
          <input className="form-control" id="projectstatus" name="projectstatus" required />
        </div>
      </div>
 
      <div className="form-group row">
        <label for="projectdescription" className="col-md-3 control-label">Project Description</label>
        <div className="col-md-10">
          <textarea className="form-control" id="projectdescription" rows={3} name="projectdescription" />
        </div>
      </div>

      <div className="form-group row">
        <div className="col-md-offset-3 col-md-3">
          <button type="submit" id="add_new_user_btn" className="btn btn-success pull-right single-click" onClick={()=>navigate("/")}>Add new project</button>
        </div>
      </div>
    </form>

  </div>
</div>

   </div>
</div>



    )
}

export default add_form