import Popup from "../Popup";
import { useState, useEffect } from "react";
import axios from "../../axios";
import Task_Form from "./Task_form";
import { MDBCol, MDBIcon } from "mdbreact";
import Taskicon from "./Taskicon";
import Update_Task from "./Update_Task"
import { getCookie } from "../../axios";
import { UncontrolledDropdown,Button,DropdownToggle,DropdownItem,DropdownMenu } from "reactstrap";
function Add_task(props) {
  const [modal, setModal] = useState(false);
  const [updation,setUpdation]=useState(false)
  const toggle = () => setModal(!modal);
  const toggle2 =()=> setUpdation(!updation)
  const [data, setData] = useState([]);
  const [userInput, setUserInput] = useState(false);
  const [status,setStatus]=useState(false)
  const [assignee,setAssginee]=useState(false)
  
  async function getAds() {
    const res = await axios.get(`/task/taskdetails/${props.project_id}`, 
    {
      headers: {
      "Content-Type": "application/json",
      
      
      
      Authorization: `Bearer ${getCookie("token")}`,
      
      
      
      },
      
          });

    setData(res.data);
  }
  useEffect(() => {
    getAds();
  }, []);

  function Delete(id) {
    const res = axios.delete(`/task/deletetask/${id}`, 
    {
      headers: {
      "Content-Type": "application/json",
      
      
      
      Authorization: `Bearer ${getCookie("token")}`,
      
      
      
      },
      
          });
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
      style={{ display: "flex",justifyContent:'space-between'}}
    >
      {modal && (
        <Popup toggle={toggle}>
          <Task_Form toggle={toggle} getAds={getAds}
            project_id={props.project_id}
          />
        </Popup>
      )}
      { updation &&
        <Popup toggle={toggle2}> <Update_Task toggle2={toggle2} getAds={getAds} updation={updation}/></Popup>
      }
      <div style={{display:'flex',width:'100%'}}>
      <div style={{width:'70%',display:'flex'}}>
      < >
        <button
          class="btn btn-info "
          type="button"
          style={{width:'100px',marginRight:'60px'}}
          onClick={() => setModal(true)}
        >
          Create
        </button>
      </>
      <MDBCol md="22">
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
            style={{width:'330px'}}
            
            onChange={Find_task}
          />
        </div>
      </MDBCol>
      </div>
      <div  style={{display:'flex',justifyContent:'flex-end', width:'30%'}}>

      <UncontrolledDropdown group style={{marginRight:'100px'}} >
  <Button className="btn btn-info " >
    Status
  </Button>
  <DropdownToggle
    caret
    className="btn btn-info"
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

<UncontrolledDropdown group >
  <Button className="btn btn-info">
    Assignee
  </Button>
  <DropdownToggle
    caret
    className="btn btn-info"
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
</div>

</div>

      <div style={{ width: "100%", marginTop: "45px" }}>
        <table className="table table-hover">
          <thead>
            <tr>
            <th>Task Icon</th>
              <th>Name</th>
              <th>Stage</th>
              <th>Phase</th>
              <th>Milestone</th>
              <th>Billing</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Assignee</th>
              <th>Actions</th>
              
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
                      <i
                        className="fa-solid fa-pencil"
                        size="xs"
                        onClick={() => {
                      
                           setUpdation(data)
                        }}
                      >
                        
                      </i>
                      &nbsp;&nbsp;&nbsp;
                      <i
                        className="fa-solid fa-trash"
                        size="xs"
                        onClick={() => Delete(data._id)}
                      >
                       
                      </i>
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
