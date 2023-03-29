import {useNavigate} from 'react-router-dom'
import {React , useState} from 'react' 
import { useLocation } from 'react-router-dom'
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
  } from "reactstrap";
  


import axios from '../../axios'

function Update_role(props) {
  const navigate= useNavigate();
  const location =useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selected, setSelected] = useState("Choose");
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const [task, set] = useState(props.updation);
  console.log('roleeeees is',props.updation)
  const handleSelect = (name, value) => {
    set({ ...task, [name]: value });
    console.log(task);
    setSelected(value);
  };
  const handleform = (e) => {
    
     set({
      ...task ,
      [e.target.name] : e.target.value 
     })
     console.log('next is',task)
  
  }

  const handlesubmit = async (e) => {
    e.preventDefault();
    axios.put(`/task/updatetask/${task._id}`,task )
         .then(response => {console.log('Updated successful',task); props.toggle2();
         console.log('updated role is',task)
         props.getAds();}
        )
         .catch(error => {
             console.error('There was an error!', error);
   
    })
    props.toggle2();
    console.log('updated role is',task)
    props.getAds();
   
   }
    return (
        <div>
      {}
      <div className="row main-row_header" style={{ fontSize: "1.5rem" }}>
        <p className="col-md-12">Details of  Task</p>
      </div>

      <br />

      <div>
        <div className="row">
          <div className="col-md-12">
            <form
              className="form-horizontal"
              method="POST"
              id="add_new_user_form"
              onSubmit={handlesubmit}
            >
              <div className="modal-body">
                <div className="form-group row">
                  <label for="name" className="col-md-3 control-label ">
                    Name :
                  </label>
                  <div className="col-md-8">
                    <input
                      className="form-control "
                      id="name"
                      name="Taskname"
                      onChange={handleform}
                      defaultValue={props.updation.Taskname}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label for="phase" className="control-label col-md-3">
                    Phase :
                  </label>
                  <div className="col-md-8">
                    <input
                      type="string"
                      className="form-control"
                      id="phase"
                      name="Taskphase"
                      defaultValue={props.updation.Taskphase}
                      onChange={handleform}
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label for="stone" className="control-label col-md-3">
                    Milestone :
                  </label>
                  <div className="col-md-8">
                    <input
                      type="text"
                      className="form-control"
                      id="stone"
                      name="Taskmilestone"
                      defaultValue={props.updation.Taskmilestone}
                      onChange={handleform}
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label for="ass" className="control-label col-md-3">
                    Assignee :
                  </label>
                  <div className="col-md-8">
                    <input
                      type="string"
                      className="form-control"
                      id="ass"
                      name="Assignee"
                      defaultValue={props.updation.Assignee}
                      onChange={handleform}
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label for="status" className="col-md-3 control-label">
                    Status
                  </label>
                  <div className='col-md-8'>
                  <select
                    className="form-select "
                    name="Taskstage"
                    defaultValue={props.updation.Taskstage}
                    onChange={handleform}
                  >
                    <option value="" selected>
                      Choose
                    </option>
                    <option value="Not started">Not Started</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                  </div>
                </div>

                <div className="form-group row">
                  <label for="billing" className="col-md-3 control-label">
          
                    Billing
                  </label>
                  <div className='col-md-8'>
                  <select
                    className=" form-select "
        
                    name="Billing"
                    onChange={handleform}
                    defaultValue={props.updation.Billing}
        
                  >
                    <option value="" selected>
                      Choose
                    </option>
                    <option value="Billable">Billable</option>
                    <option value="Non-Billable">Non-Billable</option>
                  </select>
                  </div>
                </div>

                <div className="form-group row" style={{ display: "flex" }}>
                  <label for="billing" className="col-md-3 control-label">
                    {" "}
                    Task
                  </label>
                 <div className='col-md-8'>
                  <Dropdown
                    isOpen={dropdownOpen}
                    toggle={toggle}
                    
                  >
                    <DropdownToggle
                      className="form-control"
                      style={{
                    backgroundColor:'transparent',
                        color: "black",
                        borderColor:"#ced4da",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                      caret
                    >
                      {selected}
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem
                        onClick={() => handleSelect("Taskicon", "Epic")}
                      >
                        <i
                          className="fas fa-bolt"
                          aria-hidden="true"
                          style={{ color: "yellow", marginRight: "12px" }}
                        ></i>
                       Epic
                      </DropdownItem>
                      <DropdownItem
                        onClick={() => handleSelect("Taskicon", "Story")}
                      >
                        <i
                          className="fa-sharp fa-solid fa-square"
                          aria-hidden="true"
                          style={{ color: "red", marginRight: "12px" }}
                        ></i>
                        Story
                      </DropdownItem>
                      <DropdownItem
                        onClick={() => handleSelect("Taskicon", "Task")}
                      >
                        <i
                          className="fa-solid fa-square-check"
                          aria-hidden="true"
                          style={{ color: "blue", marginRight: "12px" }}
                        ></i>
                        Task
                      </DropdownItem>
                      <DropdownItem
                        onClick={() => handleSelect("Taskicon", "Phase")}
                      >
                        <i
                          className="fa-solid fa-circle"
                          aria-hidden="true"
                          style={{ color: "violet", marginRight: "12px" }}
                        ></i>
                        Phase
                      </DropdownItem>

                      <DropdownItem
                        onClick={() => handleSelect("Taskicon", "Milestone")}
                      >
                        <i
                          className="fab fa-ethereum"
                          aria-hidden="true"
                          style={{ color: "green", marginRight: "12px" }}
                        ></i>
                        Milestone
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                  </div>
                </div>


                <div class="row">
                  <div class="col-md-5">
                    <label for="start-date">Start Date</label>
                    <input
                      type="date"
                      id="start-date"
                      class="form-control"
                      name="StartDate"
                      onChange={handleform}
                      defaultValue={props.updation.StartDate}
                      required
                    />
                  </div>
                  <div class="col-md-5" style={{ marginLeft: "58px" }}>
                    <label for="end-date">End Date</label>
                    <input
                      type="date"
                      id="end-date"
                      name="EndDate"
                      class="form-control"
                      min={task.StartDate}
                      defaultValue={props.updation.EndDate}
                      onChange={handleform}
                    />
                  </div>
                </div>
                
                <div className="form-group " style={{marginTop:'10px'}}>
                  <div >
                    <button
                      type="submit"
                      id="add_new_user_btn"
                      className="btn btn-success single-click"
                    >
                      Update  Task{" "}
                    </button>
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

export default Update_role