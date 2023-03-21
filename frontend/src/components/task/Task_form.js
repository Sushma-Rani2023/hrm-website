import {useLocation, useNavigate} from 'react-router-dom'
import {React , useState} from 'react' 

import axios from '../../axios'

function Task_form(props) {
  const location=useLocation()
  const navigate= useNavigate();

  const [task, set] = useState([]);
  const handleform = (e) => {
    
     set({
      ...task ,
      [e.target.name] : e.target.value 
     })
  
  }

  const handlesubmit = async (e) => {
   e.preventDefault();
   axios.post('task/createtask',task)
   .then( (response) => {
      //console.log('creating ',role)
      props.toggle();
      console.log(task)
      // navigate({state:{data:location.state.data}})
      props.getAds()

   })
  }
  

    return (
        <div>
        {
            
        }
        <div className="row main-row_header" style={{fontSize:'1.5rem'}}>
     <p className="col-md-12">Details of new Task</p>
   </div>

   
   <br/>

   <div>
   <div className="row" >
  <div className="col-md-12">

    <form className="form-horizontal" method="POST"  id="add_new_user_form" onSubmit={handlesubmit}>
    <div className='modal-body'>
     
      <div className="form-group row">
        <label for="name" className="col-md-3 control-label " >Name :</label>
        <div className="col-md-8">
          <input className="form-control " id="name" name="Taskname" onChange={handleform} required />
        </div>
      </div>
   
      <div className="form-group row">
        <label for="status" className="col-md-3 control-label"> Stage</label>
        <select  className=' form-select col-md-3' style={{marginLeft:'10px',height:'37px',width:'255px'}}   name="Taskstage" onChange={handleform} >
        <option value="" selected>Choose Stage</option>
        <option value="Not started">Not Started</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>

        </select>

       </div>

  


     <div className="form-group row" >
       <label for="phase" className="control-label col-md-3" >Phase :</label>
       <div className="col-md-8">
         <input type="string" className="form-control" id="phase" name="TaskPhase"  onChange={handleform} />
       </div>
     </div>

     <div className="form-group row" >
       <label for="stone" className="control-label col-md-3" >Milestone :</label>
       <div className="col-md-8">
         <input type="text" className="form-control" id="stone" name="Taskmilestone"  onChange={handleform} />
       </div>
     </div>
     
     

     <div className="form-group row">
        <label for="billing" className="col-md-3 control-label"> Billing</label>
        <select  className=' form-select col-md-3' style={{marginLeft:'10px',height:'37px',width:'255px'}}   name="Billing" onChange={handleform} required>
        <option value="" selected>Choose Task</option>
        <option value="Billable">Billable</option>
        <option value="Non-Billable">Non-Billable</option>
        

        </select>

       </div>

       <div class="form-group">
            <label for="from" class="control-label">Duration:</label>
            <div class="row" style={{marginTop:'10px'}}>
            <div class="col-md-5" style={{marginTop:'5px'}}> Start Date
                <div class="input-group">
                  
                  <input type="date" className='form-control' name="Duration" onChange={handleform} required/>
                </div>
              </div>
            
              <div class="col-md-5">
                <div class="input-group" style={{marginTop:'10px'}}> End Date
                <div class="input-group">
                  <input type="date" className='form-control' name="Duration"/>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="form-group row" >
       <label for="ass" className="control-label col-md-3" >Assignee :</label>
       <div className="col-md-8">
         <input type="string" className="form-control" id="ass" name="Assignee"  onChange={handleform} />
       </div>
     </div>


      <div className="form-group ">
        <div className="col-md-offset-3 col-md-3">
          <button type="submit" id="add_new_user_btn" className="btn btn-success pull-right single-click" >Add new Role </button>
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

export default Task_form