import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../project page/Header";
import axios from "../../axios";
import Add_Role from "../role/Add_role";
import Add_team from "../teams/Add_team";
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';

function View() {
  const location = useLocation();
  //const [data, setData]=useState(location.state.data);
  const data = location.state.data;
  console.log(data);
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
          <Link to={"/"} style={{textDecoration:"none"}}><h2 style={{color:"#1464d4"}}>{data.Projectname}</h2></Link>{" "}
        </h6>
      </div>
      <div  style={{marginTop:'20px',backgroundColor: "#f8f9fa" ,maxHeight:"200px"}}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          
        }}
      >
        <div  style={{ marginTop: "15px" }}>
          <p><h8  style={{ color: "black" }}> Code </h8>
          </p>
          <p>{data.Projectcode}</p>
        </div>
        <div style={{ marginTop: "15px" }}>
          <p>
            {" "}
            <h8 style={{ color: "black" }}> Status </h8>
          </p>
          <p>{data.Projectstatus}</p>
        </div>
        <div style={{ marginTop: "15px" }}>
          <p>
            {" "}
            <h8 style={{ color: "black" }}>Manager</h8>
          </p>
          <p>{data.Projectmanager}</p>
        </div>
        <div style={{ marginTop: "15px" }}>
          <p>
            <h8 style={{ color: "black" }}>Start Date</h8>
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
            <h8 style={{ color: "black" }}> Description </h8>
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
    <h5>Team Members</h5>
    </NavLink>
  </NavItem>
</Nav>
<TabContent style={{marginTop:'30px'}} activeTab={activeTab}>
  <TabPane tabId="1">
    <Add_Role project_id={data._id }  />
  </TabPane>
  <TabPane tabId="2">
  
    <Add_team ></Add_team>
  </TabPane>
</TabContent>
    </div>
    
    </>
  );
}

export default View;
