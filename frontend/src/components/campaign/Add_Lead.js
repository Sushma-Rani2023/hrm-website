import React from 'react'
import { useEffect, useState } from "react";
import Popup from "../Popup";
import Lead_form from './Lead_form'
import Update_lead from './Update_lead';
import axios from "../../axios";
import "font-awesome/css/font-awesome.min.css";
import {} from "@fortawesome/fontawesome-svg-core";
import { Loader } from "../Loader";
import handleLogout from "../logout";
import Header from '../project page/Header';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { UncontrolledDropdown,Button,DropdownToggle,DropdownItem,DropdownMenu, Dropdown } from "reactstrap";
const Lead = () => {
  const [data , setData] = useState([]);
  const [loader,setLoader]=useState(true)
  const [selectedItems, setSelectedItems] = useState([]);

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
    await axiosInstance.get(`/lead/getleadinfo`, 
    {
      headers: {
      "Content-Type": "application/json",
      
      
      
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      
      
      
      },
      
    }).then((res)=>{setLoader(false);setData(res.data)})}
      catch(err){
        console.log(err)
      }
   
   
  }

  useEffect(() => {
    getAds()
  }, [])

  function Delete (editId){
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
    
    try {axiosInstance.delete(`/lead/deletelead/${editId}`, 
    {
      headers: {
      "Content-Type": "application/json",
      
      
      
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      
      
      
      },
      
          })
        .then(response => {const updated_data=data.filter((item)=>item._id!==editId)
          setData(updated_data)})}
        catch(error)  {
            console.error('There was an error!', error);
        };
    

    
};
const [updation,setUpdation]=useState(false)


const [modal, setModal] = useState(false);
const toggle1 = () => setModal(!modal);
const toggle2 =()=>setUpdation(!updation)
const [dropdownOpen, setDropdownOpen] = useState(false);

const handleCheckboxChange = (itemId) => {
  if (selectedItems.includes(itemId)) {
    // Item is already selected, so remove it from the selectedItems array
    setSelectedItems(selectedItems.filter((id) => id !== itemId));
  } else {
    // Item is not selected, so add it to the selectedItems array
    setSelectedItems([...selectedItems, itemId]);
  }
};

const handleDownload = async ()=>{
  const dataWithoutIdAndV = data.map(({ _id, __v, ...rest }) => rest);

  const worksheet = XLSX.utils.json_to_sheet(dataWithoutIdAndV);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

  const excelData = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

  const blob = new Blob([excelData], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  saveAs(blob, 'data.xlsx');


}

  const handleFileUpload = async (event) => {
    const uploadedFile = event.target.files[0];
    try {
      await upload(uploadedFile); // Call the upload function with the uploaded file
      getAds(); // Fetch updated data after successful upload
    } catch (error) {
      console.error('There was an error!', error);
    }
    }


  const upload = (file) => {
    const axiosInstance = axios.create();
  
    axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response.status === 401) {
          // Handle unauthorized error
        }
        return Promise.reject(error);
      }
    );
  
    const formData = new FormData();
    formData.append('file', file);
  
    try {
      axiosInstance.post('/lead/upload', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          'Content-Type': 'multipart/form-data'
        }
      }).then(response => {
        console.log('Upload successful', response.data,getAds());
      }).catch(error => {
        console.error('There was an error!', error);
      });
    } catch (error) {
      console.error('There was an error!', error);
    }
  
    return true
  };

  const handleCompletedClick = () => {
    
    const fileInput = document.getElementById('fileInput');
    fileInput.click();
    setLoader(true)
    setDropdownOpen(false);
  };

  return (
    <div>
    <Header/>
    {modal && <Popup toggle={toggle1}><Lead_form  toggle={toggle1} getAds={getAds}/></Popup>}
    {updation && <Popup toggle={toggle2}><Update_lead updation={updation} toggle={toggle2} getAds={getAds}/></Popup>}
    
      <div className="row form_container">
      <div className="col-md-3 lead " style={{ fontSize: "1.5rem" }}>
          Inzint's Lead
        </div>
        <div className="col-md-12 d-flex justify-content-end" >
        
        <button className='btn btn-info mr-3' onClick={()=>handleDownload()}><i className='fa-solid fa-download'/>&nbsp;&nbsp;&nbsp;.xlsx</button>
          <UncontrolledDropdown group>
        <Button className="btn btn-info pull right" > <i className='fa-solid fa-user'/>&nbsp;&nbsp;&nbsp;Add </Button>
        <Dropdown isOpen={dropdownOpen} toggle={() => setDropdownOpen(!dropdownOpen)}>
        <DropdownToggle caret className="btn btn-info" />
        <DropdownMenu>
          
          <DropdownItem onClick={()=>setModal(true)
          }> <i className='fa-solid fa-user-pen'/>&nbsp;&nbsp;&nbsp; Form</DropdownItem>
          <DropdownItem onClick={handleCompletedClick}><i className='fa-solid fa-file-import'/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Import</DropdownItem>
        </DropdownMenu>
        </Dropdown>
      </UncontrolledDropdown>
      <input type="file" id="fileInput" onChange={handleFileUpload} style={{ display: 'none' }} />
        </div>
      </div>
      <div className="col-md-13" style={{ marginTop: "45px" }}>
      {
        loader&&
        <Loader/>
      }
      {
        !loader&&
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
    {data.map((data, index) => {
      const isChecked = selectedItems.includes(data._id); // Check if the item is selected

      return (
        <tr key={index}>
        <td>
            <input
              type="checkbox"
              checked={isChecked}
              onChange={() => handleCheckboxChange(data._id)}
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
                  window.confirm('Are you sure you want to delete?') === true
                ) {
                  console.log('Deleting');
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
      }
</div>
    </div>
  );
}

export default Lead