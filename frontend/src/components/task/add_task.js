import Popup from "../Popup";
import { useState } from "react";
import axios from "../../axios";
import Task_form from "./Task_form";
import { MDBCol, MDBIcon } from "mdbreact";

function Add_task() {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  function getAds() {
    axios.get("/Team/taskdetails");
  }
  const [selected, setSelected] = useState(['Choose Here']);
  const handleSelect = (event) => {
    setSelected(event.target.value);
  };
  return (
    <div
      className="row form container "
      style={{ display: "flex", minWidth: "100%" }}
    >
      {modal && (
        <Popup toggle={toggle}>
          <Task_form toggle={toggle} getAds={getAds} />
        </Popup>
      )}
    <div style={{width:'100px'}}>
      <button
        class="btn btn-outline-danger "
        type="button"
        onClick={() => setModal(true)}
  
      >
        Add +
      </button>
      </div>

      <div class="dropdown" style={{width:'200px'}}>
        <button
          class="btn btn-outline-primary "
          type="button"
          id="dropdownMenu2"
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
          <button class="dropdown-item" type="button" onClick={handleSelect} value={'Epic'}>
            <i
              className="fa-sharp fa-solid fa-circle"
              aria-hidden="true"
              style={{ color: "#00cc6a", marginRight: "12px" }}
              
            ></i>
            Epic
          </button>
          <button class="dropdown-item" type="button" onClick={handleSelect} value={'Story'}>
            <i
              className="fa-sharp fa-solid fa-square"
              aria-hidden="true"
              style={{ color: "red", marginRight: "12px" }}
            ></i>
            Story
          </button>
          <button class="dropdown-item" type="button" onClick={handleSelect} value={'Task'}>
            <i
              className="fa-solid fa-square-check"
              aria-hidden="true"
              style={{ color: "yellow", marginRight: "12px" }}
            ></i>
            Task
          </button>
          <button class="dropdown-item" type="button" onClick={handleSelect} value={'Phase'}>
            <i
              className="fa-sharp fa-regular fa-money-bill"
              aria-hidden="true"
              style={{ color: "violet", marginRight: "12px" }}
            ></i>
            Phase
          </button>
          <button class="dropdown-item" type="button" onClick={handleSelect} value={'Milestone'}>
            <i
              className="fa-sharp fa-regular fa-credit-card"
              aria-hidden="true"
              style={{ color: "brown", marginRight: "12px" }}
            ></i>
            Milestone
          </button>
        </div>

      </div>
      <MDBCol md="4">
      <div className="input-group md-form form-sm form-1 pl-0">
        <div className="input-group-prepend">
          <span className="input-group-text purple lighten-3" id="basic-text1">
            <MDBIcon className="text-white" icon="search" />
          </span>
        </div>
        <input
          className="form-control my-0 py-1"
          type="text"
          placeholder="Search"
          aria-label="Search"
        />
      </div>
    </MDBCol>
    </div>
  );
}
export default Add_task;
