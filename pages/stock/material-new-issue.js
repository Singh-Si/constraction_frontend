import nookies from "nookies"
import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Button } from "@chakra-ui/react";
import AddMaterial from "@/components/utils/Modal/AddMaterial";
import StocksLayout from "@/layouts/StocksLayout";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import Issues from "@/components/tasks/Issues";
import { useRouter } from "next/router";
import MaterialNewIssue from "@/components/sites/materialIssue/MaterialNewIssue";

const MaterialIssue = ({ materialIssued }) => {
    const [material, setMaterial] = useState(materialIssued); 
    const [materialIssue, setMaterialIssue] = useState([]);
    const [modal  , setModal] = useState(false)
    const [subContract , setSubContract] = useState(true)


const router = useRouter()
// fetching the details of site , members and material name 

const handleModal = ()=>{
    console.log(`The modal have been generated`)
    setModal(true)
// handling the functionality of  adding the new material 
}

const handleSubContractorButton = ()=>{
setSubContract(true)
// router.push('/stock/material-new-issue?q=sub-contractor')
}

const handleOtherSiteButton = ()=>{
    setSubContract(false)
    // router.push('/stock/material-new-issue?q=other-site')

}
const headerStyle = {
    backgroundColor: "#405768",
    color: "white",
    borderRight: "1px solid #ddd",
    borderBottom: "2px solid #ddd",
  };
  const bodyStyle = {
    borderRight: "1px solid #ddd",
    borderBottom: "1px solid #ddd",
  };
  const buttonStyle = {
    borderRight: "1px solid #ddd",
    borderBottom: "1px solid #ddd",
    color: "#2075A9",
    overflow: "visible",
    background: "none",
  };

const AddMaterialComponent  = ()=>{
    return (
        <>
        <div style={{display: 'flex',
            justifyContent: 'center',  
            alignItems: 'center', 
            height : '50vh'     
            }}>
                <div>
                    <p style={{color : 'rgba(144, 152, 177, 0.7)'}}>No issued Material yet </p>
                <Button onClick={handleModal} style={{backgroundColor : 'rgba(32, 117, 169, 1)' , color : 'white' , padding : "0.8rem  1rem" , borderRadius : "0.3rem" , fontWeight : "bold"}}>+ ISSUED MATERIAL</Button>
                </div>
                {modal && <ModalComponent /> }
                
            </div>
        </>
    )
}

    useEffect(() => {
        setMaterial(materialIssued);
        console.log(materialIssued)
        const mappedMaterialIssue = material?.data?.map((info , index)=>{
            return {
                srNo : index+1,
                MaterialName : info.materialName , 
                Task : 'View ' , 
                IssuedTo : 'No detail' , 
                checkedBy :  'No Detail' , 
                IssuedBy :  'No Detail' , 
                File : 'No Detail',
                Date : 'No Detail',
                Site : 'No Detail',
                Qty : 'No Detail'

            }
        })
        setMaterialIssue(mappedMaterialIssue)
    }, [materialIssued]);

    return (
        <div>
        {material && material.data && material.data.length > 0 ? (
          
            <div>

                <div className="site-profile">
             <div className="site-profile-heading">
          <span style={{ color: "#FFFFFF", opacity: "0.6" }}>
            Commercial /{" "}
          </span>
          <span style={{ color: "white", marginLeft: "0.2rem" }}>Material Issued</span>
         
          </div>

          <StocksLayout current="material-new">
  {subContract ? (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-around'  }}>
        <Button
          style={{
            background: 'rgba(141, 188, 217, 0.39)',
            padding: '0.8rem 0.8rem',
            borderRadius: '5px',
          }}
          onClick={handleSubContractorButton}
        >
          SUB CONTRACTOR
        </Button>
        <Button
          style={{
            background: 'none',
            padding: '0.8rem 0.8rem',
            border: '1px solid rgba(0, 0, 0, 0.17)',
            borderRadius: '10px',
            marginRight : '59rem',

          }}
          onClick={handleOtherSiteButton}
        >
          OTHER SITE
        </Button>
        <Button
          style={{
            background: 'none',
            fontWeight : 'bold' , 
            color : 'rgba(32, 141, 182, 0.5)' , 
            padding: '0.8rem 0.8rem',
            border: '1px solid rgba(0, 0, 0, 0.17)',
            borderRadius: '5px',
            marginLeft : '-10rem',

          }}
          // onClick={handleOtherSiteButton}
        >
         +  Add Issued Material
        </Button>
      </div>
      <div className="card" style={{ marginTop: '5rem' }}>
        <DataTable
          value={materialIssue}
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
            field="MaterialName"
            header="Material Name"
            headerStyle={headerStyle}
            bodyStyle={bodyStyle}
          />
          <Column
            field="Task"
            header="Task"
            headerStyle={headerStyle}
            bodyStyle={bodyStyle}
          />
          <Column
            field="IssuedTo"
            header="Issued To"
            headerStyle={headerStyle}
            bodyStyle={bodyStyle}
          />
          <Column
            field="checkedBy"
            header="Checked By"
            headerStyle={headerStyle}
            bodyStyle={bodyStyle}
          />
          <Column
            field="IssuedBy"
            header="Issued By"
            headerStyle={headerStyle}
            bodyStyle={bodyStyle}
          />
          <Column
            field="File"
            header="File"
            headerStyle={headerStyle}
            bodyStyle={bodyStyle}
          />
          <Column
            field="Date"
            header="Date"
            headerStyle={headerStyle}
            bodyStyle={bodyStyle}
          />
        </DataTable>
      </div>
    </>
  ) : (
    <div>
      <Button
          style={{
            background: 'none',
            padding: '0.8rem 0.8rem',
            border: '1px solid rgba(0, 0, 0, 0.17)',
            borderRadius: '5px',
            marginRight: '6rem',
          }}
          onClick={handleSubContractorButton}
        >
          SUB CONTRACTOR
        </Button>
        <Button
          style={{
            background: 'rgba(141, 188, 217, 0.39)',
            padding: '0.8rem 0.8rem',
            borderRadius: '5px',
            marginLeft : '-3rem'
  

          }}
          onClick={handleOtherSiteButton}
        >
          OTHER SITE
        </Button>
        <Button
         type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight"
          style={{
            background: 'none',
            fontWeight : 'bold' , 
            color : 'rgba(32, 141, 182, 0.5)' , 
            padding: '0.8rem 0.8rem',
            border: '1px solid rgba(0, 0, 0, 0.17)',
            borderRadius: '5px',
            marginLeft : '48rem',

          }}
         
          
        >
         +  Add Issued Material
        </Button>
        <MaterialNewIssue />
        {/* <div className="col-5 text-end">
                    <button className='btn bg-btn-bg text-white new-site-btn' style={{ boxShadow: "2px 2px 13px #8CBCD9" , background: 'none',
            fontWeight : 'bold' , 
            color : 'rgba(32, 141, 182, 0.5)' ,
            background : "none" , 
            padding: '0.8rem 0.8rem',
            border: '1px solid rgba(0, 0, 0, 0.17)',
            borderRadius: '5px',
            marginLeft : '48rem', }} type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight">+ ADD ISSUED MATERIAL</button>
                    <MaterialNewIssue />
                </div> */}
      <div className="card" style={{ marginTop: '5rem', overflowX : 'scroll' }}>
        <DataTable
          value={materialIssue}
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
            field="MaterialName"
            header="Material Name"
            headerStyle={headerStyle}
            bodyStyle={bodyStyle}
          />
          <Column
            field="Qty"
            header="Transferred Qty"
            headerStyle={headerStyle}
            bodyStyle={bodyStyle}
          />
          <Column
            field="Site"
            header="Site"
            headerStyle={headerStyle}
            bodyStyle={bodyStyle}
          />
          <Column
            field="IssuedTo"
            header="Issued To"
            headerStyle={headerStyle}
            bodyStyle={bodyStyle}
          />
          <Column
            field="File"
            header="File"
            headerStyle={headerStyle}
            bodyStyle={bodyStyle}
          />
          <Column
            field="Date"
            header="Date"
            headerStyle={headerStyle}
            bodyStyle={bodyStyle}
          />
         
        
       
        </DataTable>
      </div>
    </div>
  )}


          </StocksLayout>
        
        </div>
            </div>
        ) : (
            <AddMaterialComponent />
        )}
    </div>
    );
};

export default MaterialIssue;




export async function getServerSideProps(context) {
    try {
        const cookies = nookies.get(context);
        const { currentOrganizationId, token } = cookies;
        if (currentOrganizationId && token) {
            const response = await axios.get(`https://construction-backend.onrender.com/material/issue/gets?organization=${currentOrganizationId}`, {

                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const materialIssued = response.data || [];

            return {
                props: {
                    materialIssued 
                }
            };
        } else {
            return {
                props: {
                    materialIssued: 'Authentication data missing'
                }
            };
        }
    } catch (error) {
        console.error('Error fetching data:', error.message);
        return {
            props: {
                materialIssued: `Error fetching data: ${error}`
            }
        };
    }
}
