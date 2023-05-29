import React from "react";
import axios from "../../axios";
import { useState } from "react";
import { option } from "./data";
import Select from "react-select";
import { state_arr } from "./data";
import { city_arr } from "./data";

const Update = (props) => {
  const [update, setUpdate] = useState(props.updateuser);
  const [select, setSelected] = useState();
  // const [city,setCity]=useState(props?.updateuser?.Address?.city)
  const [stateindex, setStateindex] = useState([]);
  const city_a = city_arr();

  const [Address, setAddress] = useState(props?.updateuser?.Address);
  const handleSubmit = async (e) => {
    const token = localStorage.getItem("token");
    update["Address"]=Address
    alert("Update Successfully");
    console.log("ipdateing object is", update);
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

  const handleState = (e) => {
    console.log("event is", e, e.target.value,);
    setAddress({ ...Address, [e.target.name]: e.target.value });

    var city_arr = city_a[ e.target.selectedIndex].split("|")
    setStateindex(city_arr || []);
  };
  const handleaddress = (e) => {
    console.log(e.target.name,e.target.value)
    setAddress({ ...Address, [e.target.name]: e.target.value });
    console.log(Address)
    
  };
  const handleselect = (selectedOptions) => {

    update["skills"] = selectedOptions;
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
                <label for="validationTooltip04">State</label>
                <select
                  onChange={handleState}
                  name="state"
                  defaultValue={props?.updateuser?.Address?.state}
                  required
                  className="form-control"
                >
                  <option> {props.updateuser?.Address?.state || "Select State"}</option>
                  {state_arr.map((stat, index) => {
                    return (
                      <option value={stat} key={index}>
                        {" "}
                        {stat}
                      </option>
                    );
                  })}
                </select>
                <div className="invalid-tooltip">
                  Please provide a valid state.
                </div>
              </div>

              <div className="col-md-3 mb-3">
                <label for="validationTooltip03">City</label>
                <select
                  onChange={handleaddress}
                  name="city"
                  defaultValue={props?.updateuser?.Address?.city}
                  className="form-control"
                  required
                >
                  <option>{props.updateuser?.Address?.city || "Select City"}</option>

                 
                  {stateindex.map((city, index) => {
                    return (
                      <option value={city} key={index}>
                        {" "}
                        {city}
                      </option>
                    );
                  })}
                </select>
                <div className="invalid-tooltip">
                  Please provide a valid city.
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
                  value={Address?.zip}
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
