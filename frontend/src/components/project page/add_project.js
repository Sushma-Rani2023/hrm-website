import { useNavigate } from "react-router-dom";
import Header from "./Header";
function Add() {
  const navigate = useNavigate();
  return (
    <div>
      <Header />

      <div className="row form_container" style={{display: "flex"}}>
        <div className="col-md-3 lead " style={{ fontSize: "1.5rem" }}>
          Inzint's project
        </div>
        <div className="col-md-3 col-md-offset-6 pull-right-12">
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={() => {
              navigate("/add_project/");
            }}
          >
            Add Project
          </button>
        </div>
      </div>
      <div class="col-md-9" style={{width:'100%',margin:'45px'}}>
  <table class="table table-hover">
    <thead>
      <tr>
        <th>Project Name</th>
        <th>Project Code</th>
        <th>Project Manager</th>
        <th>Project StartDate</th>
        <th>Project Status</th>
        <th>Project Action</th>
      </tr>
    </thead>
    <tbody>

    </tbody>
  </table>
</div>
    </div>
  );
}
export default Add;
