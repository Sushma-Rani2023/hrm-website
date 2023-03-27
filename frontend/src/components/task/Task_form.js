import { useLocation, useNavigate } from "react-router-dom";
import { React, useState } from "react";
import axios from "../../axios";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

function Task_Form(props) {
  {console.log("hiiiiiiiiiiii");}

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const location = useLocation();
  const navigate = useNavigate();
  const [selected, setSelected] = useState("Choose");
  const [task, set] = useState({ project_id: props.project_id });
  const handleSelect = (name, value) => {
    set({ ...task, [name]: value });
    console.log(task);
    setSelected(value);
  };

  const handleform = (e) => {
    console.log("task", task);
    set({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  console.log("task", task);

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
      {console.log("Task", task)}
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
                    Status
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

                <div className="form-group row" style={{ display: "flex" }}>
                  <label for="billing" className="col-md-3 control-label">
                    {" "}
                    Task
                  </label>

                  <Dropdown
                    isOpen={dropdownOpen}
                    toggle={toggle}
                    style={{ width: "65%" }}
                  >
                    <DropdownToggle
                      className="form-control"
                      style={{
                        backgroundColor: "transparent",
                        color: "black",
                        borderColor: "#ced4da",
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
                          className="fa-sharp fa-regular fa-credit-card"
                          aria-hidden="true"
                          style={{ color: "brown", marginRight: "12px" }}
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
                          style={{ color: "yellow", marginRight: "12px" }}
                        ></i>
                        Task
                      </DropdownItem>
                      <DropdownItem
                        onClick={() => handleSelect("Taskicon", "Phase")}
                      >
                        <i
                          className="fa-sharp fa-regular fa-money-bill"
                          aria-hidden="true"
                          style={{ color: "violet", marginRight: "12px" }}
                        ></i>
                        Phase
                      </DropdownItem>

                      <DropdownItem
                        onClick={() => handleSelect("Taskicon", "Milestone")}
                      >
                        <i
                          className="fa-sharp fa-regular fa-credit-card"
                          aria-hidden="true"
                          style={{ color: "brown", marginRight: "12px" }}
                        ></i>
                        Milestone
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
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
                          name="StartDate"
                          onChange={handleform}
                          required
                        />
                      </div>
                    </div>

                    <div class="col-md-5">
                      <div class="input-group" style={{ marginTop: "10px" }}>
                        End Date
                        <div class="input-group">
                          <input
                            type="date"
                            className="form-control"
                            name="EndDate"
                            min={task.StartDate}
                            onChange={handleform}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="form-group ">
                  <div className="col-md-offset-3 col-md-3">
                    <button
                      type="submit"
                      id="add_new_user_btn"
                      className="btn btn-success single-click"
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

export default Task_Form;
