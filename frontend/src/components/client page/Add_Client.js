import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../project page/Header";
import axios from "../../axios";
function Add_Client() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const getAds = async () => {
    const res = await axios.get("/client/Clientdetails",{
      headers: {
      "Content-Type": "application/json",
      
      
      
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      
      
      
      },
      
    },);
    setData(res.data.ClientData);

    console.log(data);
  };

  useEffect(() => {
    getAds();
  }, []);

  function Delete(editId) {
    axios
      .delete(`/client/deleted/${editId}`,{
        headers: {
        "Content-Type": "application/json",
        
        
        
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        
        
        
        },
        
      },)
      .then((response) => console.log("Delete successful"))
      .catch((error) => {
        console.error("There was an error!", error);
      });
    const updated_data = data.filter((item) => item._id !== editId);
    setData(updated_data);
  }

  return (
    <div>
      <Header />

      <div className="row form_container">
        <div className="col-md-3 lead " style={{ fontSize: "1.5rem" }}>
          Inzint's Client
        </div>
        <div className="col-md-12 " style={{ display: "right" }}>
          <button
            type="button"
            className="btn btn-info float-right"
            onClick={() => {
              navigate("/client/add");
            }}
          >
            Add Client
          </button>
        </div>
      </div>
      <div className="col-md-13" style={{ marginTop: "45px" }}>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Client Name</th>
              <th>Client Code</th>
              <th>Client Manager</th>
              <th>Currency Selector</th>
              <th>Billing</th>
              <th>Optional</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((data, index) => {
              return (
                <tr key={index}>
                  <td>{data.Clientname}</td>
                  <td>{data.Clientcode}</td>
                  <td>{data.Clientmanager}</td>
                  <td>{data.Currencyselector}</td>
                  <td>{data.Billing}</td>
                  <td
                    style={{
                      maxWidth: "200px",
                      height: "60px",
                      wordWrap: "break-word",
                    }}
                  >
                    {data.Optional}
                  </td>
                  <td>
                    {" "}
                    <i
                      className="fa-solid fa-pencil"
                      size="xs"
                      onClick={() => {
                        navigate("/Client/update", { state: { data: data } });
                      }}
                    >
                      &nbsp;&nbsp;&nbsp;
                    </i>
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
export default Add_Client;
