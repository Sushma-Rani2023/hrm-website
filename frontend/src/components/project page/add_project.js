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
            class="btn btn-outline-primary"
            onClick={() => {
              navigate("/add_project/");
            }}
          >
            Add Project
          </button>
        </div>
      </div>
    </div>
  );
}
export default Add;
