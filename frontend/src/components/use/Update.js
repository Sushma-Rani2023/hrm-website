import React from "react";
import axios from "../../axios";
import { useState } from "react";
import { option } from "./data";
import Select from "react-select";
const Update = (props) => {
  const [update, setUpdate] = useState(props.updateuser);
  const [select, setSelected] = useState();
  const handleSubmit = async (e) => {
    const token = localStorage.getItem("token");
    // if (select.length) {
    //   for (var i = 0; i < select.length; i++) {
    //     array.push(select[i]["value"]);
    //   }
    //   update["skills"] = array;
    // }
    update['skills']=select

    e.preventDefault()
    await axios.put(`/user/updateuser/${update._id}`, update, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then(res=>{
      console.log("updated user Successfully")
    })
    .catch(err=>{
      console.log("Error while updating is ",err)
    });
    props.getUser()
    props.toggle();
  };

  const handleselect = (selectedOptions) => {
    setSelected(selectedOptions);
    console.log(selectedOptions, select);
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
      <div className="row main-row_header" style={{ fontsize: "1.5rem" }}>
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
                  onChange={handleChange}
                  defaultValue={props.updateuser.address}
                />
              </div>
            </div>

            <div className="form-group row ">
              <label htmlFor="phoneno" className="col-md-3 control-label">
                Phone No.
              </label>
              <div className="col-md-8">
                <input
                  className="form-control"
                  id="phoneno"
                  name="phoneNo"
                  onChange={handleChange}
                  defaultValue={props.updateuser.phoneNo}
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
                  onChange={handleChange}
                  defaultValue={props.updateuser.emergencyNo}
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
                  onChange={handleselect}
                  defaultValue={props.updateuser.skills}
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
                  Update Role{" "}
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
