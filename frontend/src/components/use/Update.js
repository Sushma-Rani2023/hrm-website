import React from "react";
import axios from "../../axios";
import { useState } from "react";
import { option } from "./data";
import Select from "react-select";
const Update = (props) => {
  const [update, setUpdate] = useState(props.updateuser);
  const [select, setSelected] = useState();
  const [Address,setAddress]=useState(props?.updateuser?.Address)
  const handleSubmit = async (e) => {

    const token = localStorage.getItem("token");
    
   
    alert("Update Successfully");
    console.log("ipdateing object is",update)
    e.preventDefault();
    await axios
      .put(`/user/updateuser/${update._id}`, update, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("updated user Successfully");
      })
      .catch((err) => {
        console.log("Error while updating is ", err);
      });
    props.getUser();
    props.toggle();
  };

  const handleaddress=(e)=>{

    setAddress({...Address,[e.target.name]:e.target.value})
    update['Address']=Address

  }
  const handleselect = (selectedOptions) => {
    setSelected(selectedOptions);
    console.log(selectedOptions, select);
    update["skills"] = select;
  };
  const handleChange = (e) => {
    setUpdate({
      ...update,
      [e.target.name]: e.target.value,
    });
    console.log(update);
    // Handle change logic here
  };

  return (
    <div>
      <div className="align-right">
        <i className="fa-solid fa-xmark" onClick={props.toggle}></i>
      </div>
      <div
        className="row main-row_header"
        style={{ fontsize: "1.5rem", display: "flex-row" }}
      >
        <p className="col-md-12">Add Details of Employee</p>
      </div>
      <br />
      <div className="col-md-12">
        <form className="form-horizontal" onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group row ">
              <label htmlFor="address" className="col-md-3 control-label">
                Address
              </label>
              <div className="col-md-8">
                <input
                  className="form-control"
                  id="address"
                  name="address"
                  onChange={handleaddress}
                 
                  defaultValue={props?.updateuser?.Address?.address}
                  type="text"
                  placeholder="Address"
                  maxLength={150}
                  required
                  
                />
              </div>
            </div>
            <div className="form-row">
              <div className="col-md-5 mb-3">
                <label for="validationTooltip03">City</label>
                <input
                  type="text"
                  className="form-control"
                  id="validationTooltip03"
                  placeholder="City"
                  onChange={handleaddress}
                  required
                  name="city"
               
                  defaultValue={props?.updateuser?.Address?.city}
                />
                <div className="invalid-tooltip">
                  Please provide a valid city.
                </div>
              </div>
              <div className="col-md-3 mb-3">
                <label for="validationTooltip04">State</label>
                <input
                  type="text"
                  onChange={handleaddress}
                  className="form-control"
                  id="validationTooltip04"
                  placeholder="State"
                  name="state"
                  required
                  defaultValue={props?.updateuser?.Address?.state}
                 
                />
                <div className="invalid-tooltip">
                  Please provide a valid state.
                </div>
              </div>
              <div className="col-md-3 mb-3">
                <label>Zip</label>
                <input
                  type="number"
                  onChange={handleaddress}
                  className="form-control"
                  placeholder="Zip"
                  name="zip"
                  required
                 defaultValue={props?.updateuser?.Address?.zip}
                  
                />
                <div className="invalid-tooltip">
                  Please provide a valid zip.
                </div>
              </div>
            </div>

            <div className="form-group row ">
              <label htmlFor="phoneno" className="col-md-3 control-label">
                Phone No.
              </label>
              <div className="col-md-8">
                <input
                  className="form-control"
                  type="tel"
                  name="phoneNo"
                  placeholder="Phone No."
                  defaultValue={props.updateuser?.phoneNo}
                  
                  id="phoneNo"
                  maxlength="10"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="form-group row ">
              <label htmlFor="emergencyno" className="col-md-3 control-label">
                Emergency No.
              </label>
              <div className="col-md-8">
                <input
                  className="form-control"
                  id="emergencno"
                  name="emergencyNo"
                  placeholder="Emergency No."
                  onChange={handleChange}
                  defaultValue={props.updateuser?.emergencyNo}
                  
                  type="tel"
                  maxLength="10"
                />
              </div>
            </div>

            <div className="form-group row">
              <label htmlFor="skills" className="col-md-3 control-label">
                Skills
              </label>
              <div className="col-md-8">
                <Select
                  options={option}
                  isMulti
                  placeholder="Skills"
                  onChange={handleselect}
                  defaultValue={props.updateuser?.skills}
                  
                  name="skills"
                />
              </div>
            </div>

            <div className="form-group row">
              <div>
                <button
                  type="submit"
                  id="add_new_user_btn"
                  className="btn btn-success single-click"
                >
                  Update Details{" "}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Update;
