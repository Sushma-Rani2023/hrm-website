import { Link, useLocation} from "react-router-dom";
import {  useState } from "react";
import Header from "../project page/Header";

import Add_Role from "../role/Add_role";
import Add_team from "../teams/Add_team";
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';
import Add_task from "../task/Add_task"
function View() {
  const location = useLocation();
  
  const data = location.state.data;
  const [activeTab, setActiveTab] = useState('1');

const toggle = tab => {
  if(activeTab !== tab) setActiveTab(tab);
}
  return (
    <>
    <div>
      <Header />

      <div>

        <h6>
          <Link to={"/"} style={{textDecoration:"none" , color:'#61686B'}}><h1 >{data.Projectname}</h1></Link>{" "}
        </h6>
      </div>
      <div  style={{marginTop:'20px',backgroundColor: "#f8f9fa" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          
        }}
      >
        <div  style={{ marginTop: "15px" }}>
          <p><h4 > Code </h4>
          </p>
          <p>{data.Projectcode}</p>
        </div>
        <div style={{ marginTop: "15px" }}>
          <p>
            {" "}
            <h4 > Status </h4>
          </p>
          <p>{data.Projectstatus}</p>
        </div>
        <div style={{ marginTop: "15px" }}>
          <p>
            {" "}
            <h4 >Manager</h4>
          </p>
          <p>{data.Projectmanager}</p>
        </div>
        <div style={{ marginTop: "15px" }}>
          <p>
            <h4 >Start Date</h4>
          </p>
          <p>{data.ProjectStartDate}</p>
        </div>
        <div
          style={{
            marginTop: "15px",
            maxWidth: "300px",
            wordWrap: "break-word",
          }}
        >
          <p>
            <h4 > Description </h4>
          </p>
          <p>{data.description}</p>
        </div>
      </div>

      <div style={{
        marginLeft:"50px",

         }}>
      </div>
    </div>
    <Nav style={{marginTop:'40px'}} tabs>
  <NavItem>
    <NavLink
      className={classnames({ active: activeTab === '1' })}
      onClick={() => { toggle('1'); }}
    >
      <h5>Role</h5>
    </NavLink>
  </NavItem>
  <NavItem >
    <NavLink
      className={classnames({ active: activeTab === '2' })}
      onClick={() => { toggle('2'); }}
    >
    <h5>Task</h5>
    </NavLink>
  </NavItem>
  <NavItem >
    <NavLink
      className={classnames({ active: activeTab === '3' })}
      onClick={() => { toggle('3'); }}
    >
    <h5>Team Members</h5>
    </NavLink>
  </NavItem>
  
</Nav>
<TabContent style={{marginTop:'30px'}} activeTab={activeTab}>
  <TabPane tabId="1">
    <Add_Role project_id={data._id }  />
  </TabPane>
  <TabPane tabId="2">
    <Add_task project_id={data._id} />
  </TabPane>
  <TabPane tabId="3">
  
    <Add_team project_id={data._id}></Add_team>
  </TabPane>
  
</TabContent>
    </div>
    
    </>
  );
}

export default View;
