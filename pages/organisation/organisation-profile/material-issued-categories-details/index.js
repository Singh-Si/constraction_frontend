import React from 'react'
import { useState } from 'react'
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
// import { Button } from "primereact/button";
import { parseCookies } from 'nookies';
import nookies from 'nookies'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useEffect } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { Button } from '@chakra-ui/react';



const MaterialCategories = () => {
    const [categoriesDetails , setCategoies] = useState([])
    const [showModal, setShowModal] = useState(false);
    const [subModal , setSubModal] = useState(false)
    const [categoryName , setCategoryName] = useState("")
    const { token, currentOrganizationId } = parseCookies();
    const [materialIssueData , setMaterialIssueData] = useState([])
    const [value, setValue] = React.useState(null);
    const [inputValue, setInputValue] = React.useState('');
    const [subCategoryValue , setSubCategoryValue] = useState('')
    const [categoryId , setCategoryId]  = useState(null)
    const [viewModal , setViewModal] = useState(false)
    const [categoryseleteced , setCategorySelected] = useState(null)
    const route = useRouter()
    

    // getting the list of the 
    
    const headerStyle = {
        backgroundColor: "#405768",
        color: "white",
        borderRight: "1px solid #ddd",
        borderBottom: "2px solid #ddd",
        minWidth : '150px',
      };
      const bodyStyle = {
        borderRight: "1px solid #ddd",
        borderBottom: "1px solid #ddd",
        minWidth : '150px',
      };
      const renderButton1 = (rowData) => {
        return (
          <Button
            class="button"
            onClick={handleView}
            label="View"
            style={{
              background: "none",
              color: "#2075A9",
            }}
          />
        );
      };
      const buttonStyle = {
        borderRight: "1px solid #ddd",
        borderBottom: "1px solid #ddd",
        color: "#2075A9",
        overflow: "scrollable",
        background: "none",
      };
    
    const handleView = (rowData)=>{
        setViewModal(true)
        console.log('hey u have clicked on view page')
        setCategorySelected(rowData)
    }
    const handleAddNewCategory = ()=>{
      setShowModal(true)
    }
    

    const handleAddSubCategory = ()=>{
        setSubModal(true)
    }


// FETCHING THE LIST OF THE SUB-CATEGORY 

useEffect(()=>{

},[currentOrganizationId , token ])


 const handleCreateSubCategory = async()=>{
    let data = JSON.stringify({
        "name": subCategoryValue,
        "categoryId": value.value
      });
      
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `https://construction-backend.onrender.com/materialIssuedSubCategory/add?organization=${currentOrganizationId}`,
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': `Bearer ${token}`
        },
        data : data
      };
      
      axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        if(response?.data?.success){
            toast.success(response?.data?.message , {
                position : 'top-center'
            })
            route.push('/organisation/organisation-profile/material-issued-categories-details')
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error('Something went wrong' , {
            position : 'top-center'
        })

      });
      
 }




useEffect(()=>{
    console.log(value?.value , subCategoryValue)
})
 useEffect(()=>{
    const getMaterialOptions = async()=>{
      const response = await axios.get(`https://construction-backend.onrender.com/materialIssuedCategory/get?organization=${currentOrganizationId}` , {
            headers : {
                'Authorization' : `Bearer ${token}`
            }
        })
       const data = response.data.data
       const materialOptions = data.map((item , index) => {
        return {
            value: item._id,
            label: item.name.trim(),
            materialCategory : item.name.trim() , 
            srNo : index + 1 , 
            materialSubCategoryList : <Button style={{color : 'rgba(32, 117, 169, 1)' , textDecoration : "underline" , backgroundColor : 'none'}} onClick={()=>{handleView(item.name)}}>VIEW</Button> , 
            edit: (
                <div style={{ display: 'flex', gap: '10px' }}>
                    <FaEdit style={{ cursor: 'pointer' }} />
                    <FaTrashAlt style={{ cursor: 'pointer' }} />
                </div>
            )
        }
       
    });
    setMaterialIssueData(materialOptions)
    }
    console.log(materialIssueData)
    getMaterialOptions()
    setCategoryId(value?.value)
   
 },[token , currentOrganizationId])

  const handleCreateCategory = ()=>{
    let data = JSON.stringify({
        "name": categoryName
      });

      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `https://construction-backend.onrender.com/materialIssuedCategory/add?organization=${currentOrganizationId }`,
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': `Bearer ${token}`
        },
        data : data
      };
      
      axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        if(response.data.success){
            toast.success(response.data.message ,{
                position : 'top-center'
            })
            route.push('/organisation/organisation-profile/material-issued-categories-details')
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error('Something went wrong' , {
            position : "top-center"
        })
      });

  }
  return (
    <div>
    <div className="site-profile-heading">
          <span style={{ color: "#FFFFFF", opacity: "0.6" }}>Organization Profile / </span>
          <span style={{ color: "white", marginLeft: "0.2rem" }}>Material Issued Category</span>
        </div>
        <div className="material-issued-categories-buttons" style={{display : 'flex' , justifyContent : 'end' , marginTop : "1rem"}}>
            {/* <div>TESTING</div>
            <div>TESTING</div> */}
        <div className='col-2'>
              <button
                type="button"
             
                style={{
                  background: "none",
                  border: '1px solid rgba(32, 141, 182, 0.5)',
                  borderRadius: '2px',
                  color: 'rgba(32, 141, 182, 0.5)',
                  fontWeight: 'bold',
                }}
                onClick={handleAddNewCategory}
              >
                + Add New Category
              </button>
            </div>
        <div className='col-2'>
              <button
                type="button"
                style={{
                  background: "none",
                  border: '1px solid rgba(32, 141, 182, 0.5)',
                  borderRadius: '2px',
                  color: 'rgba(32, 141, 182, 0.5)',
                  fontWeight: 'bold',
                }}
                onClick={handleAddSubCategory}
              >
                + Add Subcategory
              </button>
            </div>
        </div>
        <div className="card" style={{maxWidth :"100%" , marginTop : '1rem' }}>
        <div className="data-table-container" style={{maxWidth :"1300px" , overflowX :'auto'}}>
          <DataTable
            value={materialIssueData}
            paginator
            rows={5}
            rowsPerPageOptions={[5, 10, 25, 50]}
            className="p-datatable-striped"
          >
            <Column
              field="srNo"
              header="Sr No."
              headerStyle={headerStyle}
              bodyStyle={bodyStyle}
          
            />
            <Column
              field="materialCategory"
              header="Material Category"
              headerStyle={headerStyle}
              bodyStyle={bodyStyle}

            />
            <Column
              field="materialSubCategoryList"
              header="Material Sub-Category List"
              headerStyle={headerStyle}
              bodyStyle = {buttonStyle}
            //   body = {renderButton1}

            />
        
            <Column
              field="edit"
              header="EDIT/DELETE"
              headerStyle={headerStyle}
              bodyStyle={bodyStyle}

            />
        
          </DataTable>
          </div>
          
        </div>
    {showModal &&  <div className="modal-upcoming-delivery">
          <div className="modal-content-upcoming-delivery" style={{width : '40%' , height : '40%'}}>
            <h6 style={{ textAlign: "left", color: "#405768" , marginRight : '8rem' ,  }}>
                ADD NEW MATERIAL ISSUED CATEGORY <br/>
                <p style={{marginTop : '4rem'}}><span style={{color : 'rgba(33, 35, 37, 0.37)'}}>Write</span> New Category Name</p>

                <input  className="creation-input" value={categoryName} onChange={(e)=>{setCategoryName(e.target.value)}}/>
                <div className='col-2' style={{width : "80%" , textAlign : "center" , marginTop : '4rem' , marginLeft : "5rem"}}>
              <button
                type="button"
                style={{
                  background: "none",
                  border: '1px solid rgba(32, 141, 182, 0.5)',
                  borderRadius: '2px',
                  color: 'rgba(32, 141, 182, 0.5)',
                  fontWeight: 'bold',
                }}
                onClick={handleCreateCategory}
              >
                CREATE
              </button>
            </div>
            </h6>

            <button
              className="close-button"
              onClick={() => setShowModal(false)}
            >
              X
            </button>
      
        </div>
        </div>
        }
    {viewModal &&  <div className="modal-upcoming-delivery">
          <div className="modal-content-upcoming-delivery" style={{width : '40%' , height : '50%'}}>
            <h6 style={{ textAlign: "left", color: "#405768" , marginRight : '8rem' ,  }}>
                <h6>Work Category</h6>
                <input  className="creation-input" value={categoryseleteced} /> <br/>
                <p style={{marginTop : '4rem'}}><span style={{color : 'rgba(33, 35, 37, 0.37)'}}>Write</span> New Category Name</p>

                <input  className="creation-input" value={categoryName} onChange={(e)=>{setCategoryName(e.target.value)}}/>
                <div className='col-2' style={{width : "80%" , textAlign : "center" , marginTop : '4rem' , marginLeft : "5rem"}}>
              <button
                type="button"
                style={{
                  background: "none",
                  border: '1px solid rgba(32, 141, 182, 0.5)',
                  borderRadius: '2px',
                  color: 'rgba(32, 141, 182, 0.5)',
                  fontWeight: 'bold',
                }}
                onClick={handleCreateCategory}
              >
                CREATE
              </button>
            </div>
            </h6>

            <button
              className="close-button"
              onClick={() => setShowModal(false)}
            >
              X
            </button>
      
        </div>
        </div>
        }
    {subModal &&  <div className="modal-upcoming-delivery">
          <div className="modal-content-upcoming-delivery" style={{width : '40%' , height : '60%'}}>
            <h6 style={{ textAlign: "left", color: "#405768" , marginRight : '8rem' ,  }}>
                ADD NEW MATERIAL ISSUED CATEGORY <br/>
                <p style={{marginTop : '4rem' ,color : 'rgba(33, 35, 37, 0.37)'}}>Material Issued Category</p>
                <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        id="controllable-states-demo"
        options={materialIssueData}

        sx={{ width: 520 }}
        renderInput={(params) => <TextField {...params} label="" placeholder='Select the material Issued Category'/>}
      />
                <p  style={{marginTop : '4rem'}}><span style={{color : 'rgba(33, 35, 37, 0.37)'}}>Write</span> Sub Category Name</p>

                <input  className="creation-input" value={subCategoryValue} onChange={(e)=>{setSubCategoryValue(e.target.value)}}/>
                <div className='col-2' style={{width : "80%" , textAlign : "center" , marginTop : '4rem' , marginLeft : "5rem"}}>
              <button
                type="button"
                style={{
                  background: "none",
                  border: '1px solid rgba(32, 141, 182, 0.5)',
                  borderRadius: '2px',
                  color: 'rgba(32, 141, 182, 0.5)',
                  fontWeight: 'bold',
                }}
                onClick={handleCreateSubCategory}
              >
                CREATE
              </button>
            </div>
            </h6>

            <button
              className="close-button"
              onClick={() => setSubModal(false)}
            >
              X
            </button>
      
        </div>
        </div>
        }
        </div>
  )
}

export default MaterialCategories

