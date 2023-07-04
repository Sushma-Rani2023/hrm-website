import React, { useEffect, useState } from "react";
import Popup from "../Popup";
import Lead_form from "./Lead_form";
import Update_lead from "./Update_lead";
import axios from "../../axios";
import "font-awesome/css/font-awesome.min.css";
import { Loader } from "../Loader";
import handleLogout from "../logout";
import Header from "../project page/Header";
import Mail from "./Mail"
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import {
  UncontrolledDropdown,
  Button,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  Dropdown,
} from "reactstrap";

const Lead = () => {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(true);
  const [mail,setMail]= useState(false)
  const[compose,setCompose]=useState([])

  // const [visibleItems, setVisibleItems] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Calculate the indices for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Get the people to display for the current page
  const currentPeople = data.slice(startIndex, endIndex);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };
  const [selectedItems, setSelectedItems] = useState([]);

  // const visibleItemList = data.slice(0, visibleItems);

  const getAds = async () => {
    const axiosInstance = axios.create();

    axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response.request.status === 401) {
          console.log("handling response ");
          handleLogout();
        }
        return Promise.reject(error);
      }
    );

    try {
      await axiosInstance
        .get("/lead/getleadinfo", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          setSelectedItems([])
          console.log(res);
          setLoader(false);
          setData(res.data);
        });
    } catch (err) {
      console.log(err);
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

    try {
      axiosInstance
        .delete(`/lead/deletelead/${editId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          const updated_data = data.filter((item) => item._id !== editId);
          setData(updated_data);
        });
    } catch (error) {
      console.error("There was an error!", error);
    }
  }

  const [updation, setUpdation] = useState(false);

  const [open1, setOpen1] = useState(false);
  const [modal, setModal] = useState(false);
  const toggle1 = () => setModal(!modal);
  const toggle2 = () => setUpdation(!updation);
  const toggle3 = () => {
    setMail(!mail);
  };
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleCheckboxChange = (Email) => {
    if (selectedItems.includes(Email)) {
      
      
      setSelectedItems(selectedItems.filter((id) => id !== Email));
    } else {
      // Item is not selected, so add it to the selectedItems array
      setSelectedItems([...selectedItems, Email]);
    }
  };

  const handleDownload = async () => {
    const dataWithoutIdAndV = data.map(({ _id, __v, ...rest }) => rest);

    const worksheet = XLSX.utils.json_to_sheet(dataWithoutIdAndV);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    const excelData = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const blob = new Blob([excelData], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, "data.xlsx");
  };

  const handleFileUpload = async (event) => {
    const uploadedFile = event.target.files[0];
    try {
      upload(uploadedFile); // Call the upload function with the uploaded file
      getAds(); // Fetch updated data after successful upload
    } catch (error) {
      console.error("There was an error!", error);
    }
  };

  const handleSelectAll = async() => {
    const arr = currentPeople.map((item) => item.Email);

    if (selectedItems.length === currentPeople.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(arr);
    }
  };

  const upload = async (file) => {

    const axiosInstance = axios.create();

    axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response.status === 401) {
          handleLogout()
          
        }
        
        return Promise.reject(error);
      }
    );


    try {
      const obj={file:file.name,fileType:file.type}
      const response = await axiosInstance.post("/lead/upload", obj, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            
          },
        })
     
        const signedUrl  = response.data.url;
        const parsedUrl = new URL(signedUrl);

        // Extract the key
        const key = decodeURIComponent(parsedUrl.pathname.substring(1))
      
         await fetch(signedUrl, {
          method: 'PUT',
          headers: {
            'Content-Type': file.type,
          },
          body: file,
        }).then( async (res)=>{console.log('File uploaded successfully!');
    
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
        
        await axiosInstance.post("lead/render",{key}, {
          headers: {
            "Content-Type":"application/json" ,
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            
          },
        }).then(()=> getAds())


        }
        catch(err){
          console.log(err)
        }
        
        

        
        
       
        ;})
  
        
        
    } catch (error) {
      console.error("There was an error!", error);
    }

    return true;
  };

  const handleCompletedClick = async () => {
    const fileInput = document.getElementById("fileInput");
    fileInput.click();
    setLoader(true);
    setDropdownOpen(false);
  };

  const handleSend=async(message)=>{
     setLoader(true)
    console.log(selectedItems)
    message['arr']=selectedItems
    console.log("message is",message)
    const axiosInstance = axios.create();

    axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response.status === 401) {
          handleLogout()
         
        }
        
        return Promise.reject(error);
      }
    );

  
    try {
     
      axiosInstance
        .post("/lead/send", message, {
          headers: {
      
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            
          },
        })
        .then((response) => {
          setLoader(false)
          alert('Mail is Sent succesfully')
         
        })
        .catch((error) => {
          alert('There is an error')
          console.error("There was an error!", error);
        });
    } catch (error) {
      alert('There is an Error')

      console.error("There was an error!", error);
    }

   }

  return (
    <div>
      <Header />
      {modal && (
        <Popup toggle={toggle1}>
          <Lead_form toggle={toggle1} getAds={getAds} />
        </Popup>
      )}
      {updation && (
        <Popup toggle={toggle2}>
          <Update_lead updation={updation} toggle={toggle2} getAds={getAds} />
        </Popup>
      )}
      {
        mail &&(
          <Popup toggle={toggle3}>
          <Mail toggle={toggle3} handleSend={handleSend}/>
          

          </Popup>
        )
      }

      <div className="row form_container">
        <div className="col-md-3 lead " style={{ fontSize: "1.5rem" }}>
          Inzint's Lead
        </div>
        <div className="col-md-12 d-flex justify-content-end">
          <button
            className="btn btn-info mr-3"
            onClick={() => handleDownload()}
          >
            <i className="fa-solid fa-download" />
            &nbsp;&nbsp;&nbsp;.xlsx
          </button>
          <button
            className="btn btn-info mr-3"
            onClick={()=>setMail(true)}
          >
            <i className="fa-solid fa-envelope" />
            &nbsp;&nbsp;&nbsp;Compose
          </button>

        
          <UncontrolledDropdown group className="mr-3">
            <Button className="btn btn-info ">Select</Button>
            <Dropdown isOpen={open1} toggle={() => setOpen1(!open1)}>
              <DropdownToggle caret className="btn btn-info" />
              <DropdownMenu>
                <DropdownItem onClick={handleSelectAll}>All</DropdownItem>
                <DropdownItem onClick={() => setSelectedItems([])}>
                  None
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </UncontrolledDropdown>
          <UncontrolledDropdown group>
            <Button className="btn btn-info pull right">
              <i className="fa-solid fa-user" />
              &nbsp;&nbsp;&nbsp;Add
            </Button>
            <Dropdown
              isOpen={dropdownOpen}
              toggle={() => setDropdownOpen(!dropdownOpen)}
            >
              <DropdownToggle caret className="btn btn-info" />
              <DropdownMenu>
                <DropdownItem onClick={() => setModal(true)}>
                  <i className="fa-solid fa-user-pen" />
                  &nbsp;&nbsp;&nbsp; Form
                </DropdownItem>
                <DropdownItem onClick={handleCompletedClick}>
                  <i className="fa-solid fa-file-import" />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Import
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </UncontrolledDropdown>
          <input
            type="file"
            id="fileInput"
            onChange={handleFileUpload}
            style={{ display: "none" }}
          />
        </div>
      </div>
      <div className="col-md-13" style={{ marginTop: "45px" }}>
        {loader && <Loader />}
        {!loader && (
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Select</th>
                <th>Name</th>
                <th>Company Name</th>
                <th>Actions</th>
                {/* Add a new column for the checkbox */}
              </tr>
            </thead>
            <tbody>
              {currentPeople.map((data, index) => {
              

                return (
                  <tr key={index}>
                    <td>
                      <input
                        type="checkbox"
                        checked={
                          selectedItems.length === currentPeople.length ||
                          selectedItems.includes(data.Email)
                        }
                        onChange={() => handleCheckboxChange(data.Email)}
                      />
                    </td>
                    <td>{data.Name}</td>
                    <td>{data.Company}</td>
                    <td>
                      <i
                        className="fa-solid fa-pencil"
                        size="xs"
                        onClick={() => {
                          setUpdation(data);
                        }}
                      ></i>
                      &nbsp;&nbsp;&nbsp;
                      <i
                        className="fa-solid fa-trash"
                        size="xs"
                        onClick={() => {
                          if (
                            window.confirm(
                              "Are you sure you want to delete?"
                            ) === true
                          ) {
                            console.log("Deleting");
                            Delete(data._id);
                          }
                        }}
                      ></i>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
        
        <div className="d-flex justify-content-end">
          <button
            className="btn btn-outline-danger"
            disabled={currentPage === 1}
            onClick={handlePrevPage}
          >
            <i className="fa-solid fa-arrow-left" />
          </button>
          <button
            className="btn btn-outline-danger"
            disabled={currentPage === totalPages}
            onClick={handleNextPage}
          >
            <i className="fa-solid fa-arrow-right" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Lead;
