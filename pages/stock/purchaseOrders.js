// pages/purchaseorders.js

import config from "@/config/config";
import StocksLayout from "@/layouts/StocksLayout";
import React, { useEffect, useState } from "react";
import axios from "axios";
import nookies from "nookies";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
<<<<<<< HEAD

const PurchaseOrders = ({ poData }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (poData) {
      const mappedProducts = poData.map((po, index) => ({
        poId: `PO-2023-24-${po.poId}`,
        indentId: `ID:MT-00${index + 1}`,
        site: po.site?.name || "",
=======
import { getSiteAsync } from "@/store/createSite/GetSites";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const PurchaseOrders = ({ poData }) => {
  const [products, setProducts] = useState([]);
  const siteData = useSelector((state) => state?.getSiteAsync);
  const [selectedsite , setSelectedSite] = useState(null)
  const [modal, setShowModal] = useState(false);
  const dispatch = useDispatch()
  const route = useRouter()
  let siteInfo = null;
  
  const handleClose = () => {
    setShowModal(false);
  };
  const handlePurchaseOrder = (e) => {
    console.log('clicked on the handle button');
    setShowModal(true);
  };

  const setCookie = (name, value, days) => {
    const d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = `${name}=${value};${expires};path=/`;
  };

  const handlePurchaseOrderClick = ()=>{
  console.log(selectedsite )
  if(!selectedsite){
    toast.error('SELECT THE SITE TO PROCEED TO CREATE THE INDENT' , {
      position : "top-center"
    })
    return
  }
  setCookie('siteId', selectedsite, 7)
  route.push(`/sites/material/indent?site=${selectedsite}`)
  toast.info('NOW SELECT THE SITE TO CREATE THE PURCHASE ORDER OR CREATE THE INDENT FIRST TO CREATE THE PURCAHSE ORDER' , {
    position : 'top-center' , 
    autoClose: 10000, 
  })
  
  }

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
  };
const handleExportPDF = async()=>{
  try{
    const response = await fetch('/api/generate-pdf', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ products }),
    });
    const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'table.pdf';
      link.click();
      window.URL.revokeObjectURL(url);

  }catch(err){
    console.log(`There was an error generating the PDF ${err}`)
  }
}
  useEffect(() => {
    dispatch(getSiteAsync());
    if (poData) {
      if(siteData?.data){
        siteInfo = siteData?.data?.sites
      }
      const mappedProducts = poData.map((po, index) => ({
        poId: `PO-2023-24-${po.poId}`,
        indentId: `ID:MT-00${index + 1}`,
        site: po.site?.name || "NO DETAILS",
>>>>>>> 463abe6 (frontend additonals changes made)
        vendor: po.vendorId?.vendor?.vendorName || "",
        createdOn: po.createdAt?.split("T")[0] || "",
        createdBy: po.createdBy?.name || "",
        deliveryDate: po.expectedDelivery || "",
      }));
      setProducts(mappedProducts);
    }
<<<<<<< HEAD
  }, [poData]);

  return (
    <StocksLayout current="purchaseorders">
      <div className="card">
=======
  }, [poData , dispatch]);

  return (
    <div>
      <div className="site-profile">
        <div className="site-profile-heading">
          <span style={{ color: "#FFFFFF", opacity: "0.6" }}>
            Commercial /{" "}
          </span>
          <span style={{ color: "white", marginLeft: "0.2rem" }}>Purchase Orders</span>
        </div>

      </div>

      <StocksLayout current="purchaseorders">
      <div className='row-sm d-flex justify-content-end gap-2 mt-4 ' style={{marginRight : '-1rem'}}>
                <div className='col-2  '>
                    <button type="button" onClick={handleExportPDF} style={{background : "none" , border : '1px solid rgba(42 , 62 , 78 , 0.6) ' , borderRadius : '2px' ,  marginLeft : "4rem"}} data-bs-toggle="modal" data-bs-target=".bd-example-modal-xl"><i class="bi bi-file-earmark-pdf-fill"></i> Export PDF</button>
                </div>
                <div className='col-2  '>
                    <button type="button" style={{background : "none" , border : '1px solid rgba(42 , 62 , 78 , 0.6) ' , borderRadius : '2px'}} data-bs-toggle="modal" data-bs-target=".bd-example-modal-xl"><i class="bi bi-file-earmark-spreadsheet"></i>  Export Excel</button>
                </div>
                <div className='col-3  '>
                    <button type="button" onClick={handlePurchaseOrder} style={{background : "none" , border : '1px solid rgba(32, 141, 182, 0.5)' , borderRadius : '2px' , color : 'rgba(32, 141, 182, 0.5)' , fontWeight : 'bold' , marginLeft : "-4rem"}} data-bs-toggle="modal" data-bs-target=".bd-example-modal-xl">+ CREATE PURCHASE ORDER</button>
                </div>

            </div>
      <div className="card" style={{marginTop : "3rem"}}>
>>>>>>> 463abe6 (frontend additonals changes made)
        <DataTable
          value={products}
          paginator
          rows={5}
          rowsPerPageOptions={[5, 10, 25, 50]}
          className="p-datatable-striped"
        >
<<<<<<< HEAD
          <Column field="poId" header="PO ID"  />
          <Column field="indentId" header="Indent ID"  />
          <Column field="site" header="Site"  />
          <Column field="vendor" header="Vendor" />
          <Column field="createdOn" header="Created On"  />
          <Column field="createdBy" header="Created By"  />
          <Column field="deliveryDate" header="Expected Delivery Date"  />
        </DataTable>
      </div>
    </StocksLayout>
=======
          <Column field="poId" header="PO ID" headerStyle={headerStyle} bodyStyle={bodyStyle} />
          <Column field="indentId" header="Indent ID" headerStyle={headerStyle} bodyStyle={bodyStyle}  />
          <Column field="site" header="Site"  headerStyle={headerStyle} bodyStyle={bodyStyle}  />
          <Column field="vendor" header="Vendor" headerStyle={headerStyle} bodyStyle={bodyStyle}   />
          <Column field="createdOn" header="Created On" headerStyle={headerStyle}  bodyStyle={bodyStyle}  />
          <Column field="createdBy" header="Created By"  headerStyle={headerStyle} bodyStyle={bodyStyle}  />
          <Column field="deliveryDate" header="Expected Delivery Date" headerStyle={headerStyle}  bodyStyle={bodyStyle}  />
        </DataTable>
      </div>
      </StocksLayout>
      <Modal show={modal} onHide={handleClose} style={{marginTop : "10rem"}}>
            <Modal.Header >
              <Modal.Title>Choose Site</Modal.Title>
              <Modal.Title style={{fontSize : "1.2rem" , marginLeft : "16rem"}}>
         <button style={{background : 'none'}} onClick={handleClose}> X</button>      
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p style={{color : 'rgba(33, 35, 37, 0.37)'}}>Please choose the site against which you want to create</p>
              <TextField
                select
                fullWidth
                label="Select"
                onChange={(e) => setSelectedSite(e.target.value)}
              >
                {siteData?.data?.sites.map((option) => (
            <MenuItem key={option._id} value={option?._id}>
              {option.name}
            </MenuItem>
          ))}
              </TextField>
              <Button variant="outlined" style={{ marginTop: '2rem' }} onClick = {handlePurchaseOrderClick}>
                Continue Creating Purchase Order
              </Button>
            </Modal.Body>
          </Modal>
    </div>
>>>>>>> 463abe6 (frontend additonals changes made)
  );
};

export default PurchaseOrders;

export async function getServerSideProps(context) {
<<<<<<< HEAD
  const { currentOrganizationId, siteId, token } = nookies.get(context);
=======
  const { currentOrganizationId, token } = nookies.get(context);
>>>>>>> 463abe6 (frontend additonals changes made)
  let poData = null;
  try {
    const response = await axios.get(
      `${config.API_URL}/allpurchaseOrder/get?organization=${currentOrganizationId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    poData = response.data?.data || [];
    console.log(response.data?.data, "Response Data");
  } catch (err) {
    console.error("Error fetching purchase orders:", err);
  }

  return {
    props: {
      poData,
    },
  };
}
