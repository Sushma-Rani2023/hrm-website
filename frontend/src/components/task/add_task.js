import Popup from "../Popup";
import { useState, useEffect } from "react";
import axios from "../../axios";
import Task_form from "./Task_form";
import { MDBCol, MDBIcon } from "mdbreact";
import Taskicon from "./Taskicon";
import { UncontrolledDropdown,Button,DropdownToggle,DropdownItem,DropdownMenu } from "reactstrap";
function Add_task(props) {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [data, setData] = useState([]);
  const [userInput, setUserInput] = useState([]);
  const [status,setStatus]=useState([])
  const [assignee,setAssginee]=useState([])
  
  async function getAds() {
    const res = await axios.get(`/task/taskdetails/${props.project_id}`);

    setData(res.data);
  }
  useEffect(() => {
    getAds();
  }, []);

  function Delete(id) {
    const res = axios.delete(`/task/deletetask/${id}`);
    res.then(() => console.log("Deleted Successfully"));
    setData(data.filter((item) => data._id !== id));
    getAds();
  }
  console.log("data is", data);
  const [selected, setSelected] = useState(["Choose Here"]);
  const handleSelect = (event) => {
    setSelected(event.target.value);
  };

  function Find_task(e) {
    setUserInput(e.target.value);
  }


  //  function Find_task(e){
  //   setData(data.filter((item)=> e.target.value===item.Taskname))

  //   getAds(),
console.log(data)
  return (
    <div
      className="row form container "
      style={{ display: "flex", minWidth: "100%" }}
    >
      {modal && (
        <Popup toggle={toggle}>
          <Task_form
            toggle={toggle}
            getAds={getAds}
            project_id={props.project_id}
          />
        </Popup>
      )}
      <div style={{ width: "100px" }}>
        <button
          class="btn btn-outline-danger "
          type="button"
          onClick={() => setModal(true)}
        >
          Create
        </button>
      </div>
      <MDBCol md="4">
        <div className="input-group md-form form-sm form-1 pl-0">
          <div className="input-group-prepend">
            <span
              className="input-group-text purple lighten-3"
              id="basic-text1"
            >
              <MDBIcon className="text-white" icon="search" />
            </span>
          </div>
          <input
            className="form-control my-0 py-1"
            type="text"
            placeholder="Search"
            aria-label="Search"
            name="search"
            onChange={Find_task}
          />
        </div>
      </MDBCol>

      <UncontrolledDropdown group style={{width:"100px"}}>
  <Button color="primary">
    Status
  </Button>
  <DropdownToggle
    caret
    color="primary"
  />
  <DropdownMenu>
  <DropdownItem onClick={()=>setStatus(false)}  >
      All
    </DropdownItem>
    <DropdownItem onClick={()=>setStatus("Not started")}  >
      Not Started
    </DropdownItem>
    <DropdownItem onClick={()=>setStatus("In Progress")}>
      In Progress
    </DropdownItem>
    <DropdownItem onClick={()=>setStatus("Completed")}>
    Completed
    </DropdownItem>
    
  </DropdownMenu>
</UncontrolledDropdown>

<UncontrolledDropdown group style={{width:"100px",marginLeft:'50px'}}>
  <Button color="primary">
    Assignee
  </Button>
  <DropdownToggle
    caret
    color="primary"
  />
  <DropdownMenu>
  <DropdownItem onClick={()=>setAssginee(false)}>
    All
    </DropdownItem>
    {
      data.map((item)=>{
        return(
        <DropdownItem onClick={()=>{setAssginee(item.Assignee) ; console.log('hii')}}>
    {item.Assignee}
    </DropdownItem>
        )


      })
    }
    
  </DropdownMenu>
</UncontrolledDropdown>

      <div style={{ width: "100%", marginTop: "45px" }}>
        <table className="table table-hover">
          <thead>
            <tr>
            <th>Taskicon</th>
              <th>Name</th>
              <th>Stage</th>
              <th>Phase</th>
              <th>Milestone</th>
              <th>Billing</th>
              <th>StartDate</th>
              <th>EndDate</th>
              <th>Assignee</th>
              
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data
              .filter((item) => {
                if(userInput){
                return item.Taskname.includes(userInput);
                }else{
                  return true;
                }
              })
              .filter((item) => {
                if(status){
                return item.Taskstage.includes(status);
                }else{
                  return true;
                }
              })
              .filter((item) => {
                if(assignee){
                return item.Assignee.includes(assignee);
                }else{
                  return true;
                }
              })
              
              .map((data, index) => {
                return (
                  <tr key={index}>
                  <td>
                      <Taskicon type={data.Taskicon} />
                    </td>
                    <td>{data.Taskname}</td>
                    <td>{data.Taskstage}</td>
                    <td>{data.Taskphase}</td>
                    <td>{data.Taskmilestone}</td>
                    <td>{data.Billing}</td>
                    <td>{data.StartDate}</td>
                    <td>{data.EndDate}</td>
                    <td>{data.Assignee}</td>
                    

                    {/* <td style={{maxWidth:'200px',height:'60px',wordWrap:'break-word'}}>{data.Description}</td>
        <td style={{maxWidth:'200px',height:'60px',wordWrap:'break-word'}}>{data.Optional}</td> */}
                    <td>
                      {" "}
                      <button
                        className="btn btn-outline-success"
                        size="xs"
                        onClick={() => {
                          // setModal(true)
                          // setUpdation(data)
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-outline-danger"
                        size="xs"
                        onClick={() => Delete(data._id)}
                      >
                        Del
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default Add_task;
