import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../project page/Header";
import axios from "../../axios";
import { Loader } from "../Loader";
import handleLogout from "../logout";
function Add_Client() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loader,setLoader]=useState(true)
  const getAds = async () => {
    const axiosInstance = axios.create();

    await axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        console.log('errrorrrrr',error)
        if (error.response.status === 401) {
          console.log("handling response ");
          handleLogout();
        }
        return Promise.reject(error);
      }
    );
    try{
    await axiosInstance.get("/client/Clientdetails",{
      headers: {
      "Content-Type": "application/json",
      
      
      
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      
      
      
      },
      
    }).then((res)=>{setLoader(false);setData(res.data.ClientData)});
    ;}
    catch(err){
      console.log(err)
    }

   
  };

  useEffect(() => {
    getAds();
  }, []);

  function Delete(editId) {
    const axiosInstance = axios.create();

    axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response.status === 401) {
          console.log("handling response ");
          handleLogout();
        }
        return Promise.reject(error);
      }
    );
    try{
      axiosInstance
      .delete(`/client/deleted/${editId}`,{
        headers: {
        "Content-Type": "application/json",
        
        
        
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        
        
        
        },
        
      },)
      .then((response) => console.log("Delete successful"))
    }
    catch(error)  {
        console.error("There was an error!", error);
      };
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
      {
        loader&&
        <Loader/>
      }
      {!loader&&
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Client Name</th>
              <th>Client Code</th>
              <th>Client Manager</th>
              <th>Currency Selector</th>
              <></>
              <th>Billing</th>
              <th>Description</th>
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
                      onClick={() => {if (window.confirm("Are you sure you want to delete ")===true){
        console.log('Deleting')
        Delete(data._id)
      }}}
                    >
                     
                    </i>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      }
      </div>
    </div>
  );
}
export default Add_Client;
