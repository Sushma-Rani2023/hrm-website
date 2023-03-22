import { useLocation, useNavigate } from "react-router-dom";
import { React, useState } from "react";

import axios from "../../axios";

function Task_form(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const [selected, setSelected] = useState("Choose");
  const [task, set] = useState({ project_id: props.project_id });
  const handleSelect = (e) => {
    console.log(e)
    setSelected(e.target.value);
    set({...task,
      [e.target.name]: e.target.value})
      console.log(task)

  };
  const handleform = (e) => {
    set({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    console.log(task);
    axios.post("task/createtask", task).then((response) => {
      //console.log('creating ',role)
      props.toggle();
      console.log(task);
      // navigate({state:{data:location.state.data}})
      props.getAds();
    });
  };

  return (
    <div>
      {}
      <div className="row main-row_header" style={{ fontSize: "1.5rem" }}>
        <p className="col-md-12">Details of new Task</p>
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
                      required
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
                      onChange={handleform}
                    />
                  </div>
                </div>


                <div className="form-group row">
                  <label for="status" className="col-md-3 control-label">
                    Stage
                  </label>
                  <select
                    className="form-select "
                    style={{
                      marginLeft: "10px",
                      height: "37px",
                      width: "470px",
                    }}
                    name="Taskstage"
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

                
                <div className="form-group row">
                  <label for="billing" className="col-md-3 control-label">
                    {" "}
                    Billing
                  </label>
                  <select
                    className=" form-select "
                    style={{
                      marginLeft: "10px",
                      height: "37px",
                      width: "470px",
                    }}
                    name="Billing"
                    onChange={handleform}
                    required
                  >
                    <option value="" selected>
                      Choose 
                    </option>
                    <option value="Billable">Billable</option>
                    <option value="Non-Billable">Non-Billable</option>
                  </select>
                </div>

                <div className="form-group row">
                  <label for="billing" className="col-md-3 control-label">
                    {" "}
                    Task 
                  </label>
                  {/* <select
                    className=" form-select col-md-3"
                    style={{
                      marginLeft: "10px",
                      height: "37px",
                      width: "255px",
                    }}
                    name="Billing"
                    onChange={handleform}
                    required
                  >
                    <option value="" selected>
                      Choose Task type
                    </option>
                    <option value="Epic">
                    <i
                        className="fa-sharp fa-solid fa-circle"
                        style={{ color: "#00cc6a", marginRight: "12px" ,height:'12px',width:'12px'}}
                        aria-hidden="true"
                      />
                      Epiv
        
                    </option>
                    
                    <option value="Non-Billable">Non-Billable</option>
                  </select> */}
                  <div
                  class="dropdown  "
                  style={{ width: "480px", marginRight: "50px" }}
                >
                  <button
                    class="form-control  form-select" 
                    type="button"
                    id="dropdown"
                    data-bs-toggle="dropdown"
                    
                    aria-haspopup="true"
                    aria-expanded="false"
                    onSelect={handleSelect}
                    
                  >
                    <span style={{display:"flex",flex:'1' ,color:'black'}}> {selected}</span>
                  </button>
                  <div
                    class="dropdown-menu"
                    aria-labelledby="dropdownMenu2"
                    style={{ width: "470px",marginLeft:'10px' }}
                  >
                    <button
                      class="dropdown-item"
                      type="button"
                      onClick={handleSelect}
                      value={"Epic"}
                      name="Taskicon"
                    >
                      <i
                        className="fa-sharp fa-solid fa-circle"
                        aria-hidden="true"
                        style={{ color: "#00cc6a", marginRight: "12px" }}
                      ></i>
                     Epic
                    </button>
                    <button
                      class="dropdown-item"
                      type="button"
                      onClick={handleSelect}
                      value={"Story"}
                      name="Taskicon"
                      

                      
                    >
                      <i
                        className="fa-sharp fa-solid fa-square"
                        aria-hidden="true"
                        style={{ color: "red", marginRight: "12px" }}
                      ></i>
                      Story
                    </button>
                    <button
                      class="dropdown-item"
                      type="button"
                      onClick={handleSelect}
                      value={"Task"}
                      name="Taskicon"
                    >
                      <i
                        className="fa-solid fa-square-check"
                        aria-hidden="true"
                        style={{ color: "yellow", marginRight: "12px" }}
                      ></i>
                      Task
                    </button>
                    <button
                      class="dropdown-item"
                      type="button"
                      onClick={handleSelect}
                      value={"Phase"}
                      name="Taskicon"
                    >
                      <i
                        className="fa-sharp fa-regular fa-money-bill"
                        aria-hidden="true"
                        style={{ color: "violet", marginRight: "12px" }}
                      ></i>
                      Phase
                    </button>
                    <button
                      class="dropdown-item"
                      type="button"
                      onClick={handleSelect}
                      value={"Milestone"}
                      name="Taskicon"
                    >
                      <i
                        className="fa-sharp fa-regular fa-credit-card"
                        aria-hidden="true"
                        style={{ color: "brown", marginRight: "12px" }}
                      ></i>
                      Milestone
                    </button>
                  </div>
                </div> 

                </div>

                <div class="form-group">
                  {/* <label for="from" class="control-label">Duration:</label> */}
                  <div class="row" style={{ marginTop: "10px" }}>
                    <div class="col-md-5" style={{ marginTop: "5px" }}>
                      {" "}
                      Start Date
                      <div class="input-group">
                        <input
                          type="date"
                          className="form-control"
                          name="Duration"
                          onChange={handleform}
                          required
                        />
                      </div>
                    </div>

                    <div class="col-md-5">
                      <div class="input-group" style={{ marginTop: "10px" }}>
                        {" "}
                        End Date
                        <div class="input-group">
                          <input
                            type="date"
                            className="form-control"
                            name="Duration"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                
                 {/* <div
                  class="dropdown  "
                  style={{ width: "200px", marginRight: "50px" }}
                >
                  <button
                    class="form-control "
                    type="button"
                    id="dropdown"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                    onSelect={handleSelect}
                  >
                    {selected}
                  </button>
                  <div
                    class="dropdown-menu"
                    aria-labelledby="dropdownMenu2"
                    style={{ width: "25px" }}
                  >
                    <button
                      class="dropdown-item"
                      type="button"
                      onClick={handleSelect}
                      value={"Epic"}
                    >
                      <i
                        className="fa-sharp fa-solid fa-circle"
                        aria-hidden="true"
                        style={{ color: "#00cc6a", marginRight: "12px" }}
                      ></i>
                     Epic
                    </button>
                    <button
                      class="dropdown-item"
                      type="button"
                      onClick={handleSelect}
                      value={"Story"}
                    >
                      <i
                        className="fa-sharp fa-solid fa-square"
                        aria-hidden="true"
                        style={{ color: "red", marginRight: "12px" }}
                      ></i>
                      Story
                    </button>
                    <button
                      class="dropdown-item"
                      type="button"
                      onClick={handleSelect}
                      value={"Task"}
                    >
                      <i
                        className="fa-solid fa-square-check"
                        aria-hidden="true"
                        style={{ color: "yellow", marginRight: "12px" }}
                      ></i>
                      Task
                    </button>
                    <button
                      class="dropdown-item"
                      type="button"
                      onClick={handleSelect}
                      value={"Phase"}
                    >
                      <i
                        className="fa-sharp fa-regular fa-money-bill"
                        aria-hidden="true"
                        style={{ color: "violet", marginRight: "12px" }}
                      ></i>
                      Phase
                    </button>
                    <button
                      class="dropdown-item"
                      type="button"
                      onClick={handleSelect}
                      value={"Milestone"}
                    >
                      <i
                        className="fa-sharp fa-regular fa-credit-card"
                        aria-hidden="true"
                        style={{ color: "brown", marginRight: "12px" }}
                      ></i>
                      Milestone
                    </button>
                  </div>
                </div>  */}

                
                <div className="form-group ">
                  <div className="col-md-offset-3 col-md-3">
                    <button
                      type="submit"
                      id="add_new_user_btn"
                      className="btn btn-success pull-right single-click"
                    >
                      Add new Task{" "}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Task_form;
