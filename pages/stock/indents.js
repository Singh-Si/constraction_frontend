import StocksLayout from "@/layouts/StocksLayout";
import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { fetchAllIndentAsync } from "@/store/stock/indents";
import { getSiteAsync } from "@/store/createSite/GetSites";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const Indents = () => {
  const dispatch = useDispatch();
  const route = useRouter()
  const indentsData = useSelector((state) => state?.allIndentSlice?.userData?.data);
  const siteData = useSelector((state) => state?.getSiteAsync);
  const [selectedsite , setSelectedSite] = useState(null)
  const [products, setProducts] = useState([]);
  const [modal, setShowModal] = useState(false);
  let siteInfo = null;

  const handleClose = () => {
    setShowModal(false);
  };
  const handleIndent = (e) => {
    console.log('clicked on the handle button');
    setShowModal(true);
  };

  const setCookie = (name, value, days) => {
    const d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = `${name}=${value};${expires};path=/`;
  };

  const handleIndentClick = ()=>{
  console.log(selectedsite )
  if(!selectedsite){
    toast.error('SELECT THE SITE TO PROCEED TO CREATE THE INDENT' , {
      position : "top-center"
    })
  }

  setCookie('siteId', selectedsite, 7)
  route.push(`/sites/material/indent?site=${selectedsite}`)
  
  }

  useEffect(() => {
    dispatch(fetchAllIndentAsync());
    dispatch(getSiteAsync());
  }, [dispatch]);

  useEffect(() => {
    if(siteData?.data){
      siteInfo = siteData?.data?.sites
    }
    if (indentsData) {
      const allIndents = indentsData.map((indent, index) => ({
        indentId: `MT-00${index + 1}`,
        site: indent?.site?.name || "",
        createdOn: indent?.IssueDate?.split("T")[0] || "",
        deliveryDate: indent?.deliveryDate || "",
        createdBy: indent?.createdBy?.name || "",
        assinguser: indent?.assignUser?.[0]?.name || "",
        item: indent?.materialId?.[0]?.material?.materialName || "",
      }));
      setProducts(allIndents);
    }
  }, [indentsData, siteData]);

  const headerStyle = {
    backgroundColor: "#405768",
    color: "white",
    borderRight: "1px solid #ddd",
    borderBottom: "2px solid #ddd",
  };

  const bodyStyle = {
    borderRight: "1px solid #ddd",
    borderBottom: "1px solid #ddd",
    minWidth: '150px',
  };

  return (
    <>
      <div className="site-profile">
        <div className="site-profile-heading">
          <span style={{ color: "#FFFFFF", opacity: "0.6" }}>Commercial / </span>
          <span style={{ color: "white", marginLeft: "0.2rem" }}>Indents</span>
        </div>
      </div>
      <div>
        <StocksLayout current="indents">
          <div className='row-sm d-flex justify-content-end gap-2 mt-4 ' style={{ marginRight: '-1rem' }}>
            <div className='col-3'>
              <button
                type="button"
                onClick={handleIndent}
                style={{
                  background: "none",
                  border: '1px solid rgba(32, 141, 182, 0.5)',
                  borderRadius: '2px',
                  color: 'rgba(32, 141, 182, 0.5)',
                  fontWeight: 'bold',
                  marginLeft: "8rem",
                  marginBottom: '3rem'
                }}
              >
                + CREATE INDENT
              </button>
            </div>
          </div>
          {products && products.length > 0 && (
            <div className="card">
              <DataTable
                value={products}
                paginator
                rows={5}
                rowsPerPageOptions={[5, 10, 25, 50]}
                tableStyle={{ minWidth: "50rem" }}
                showGridlines
                stripedRows
              >
                <Column field="indentId" header="S.No" headerStyle={headerStyle} bodyStyle={bodyStyle}></Column>
                <Column field="site" header="Site" headerStyle={headerStyle} bodyStyle={bodyStyle}></Column>
                <Column field="assinguser" header="Assign" headerStyle={headerStyle} bodyStyle={bodyStyle}></Column>
                <Column field="createdOn" header="Created on" headerStyle={headerStyle} bodyStyle={bodyStyle}></Column>
                <Column field="createdBy" header="Created By" headerStyle={headerStyle} bodyStyle={bodyStyle}></Column>
                <Column field="deliveryDate" header="Expected Delivery" headerStyle={headerStyle} bodyStyle={bodyStyle}></Column>
                <Column field="item" header="Material" headerStyle={headerStyle} bodyStyle={bodyStyle}></Column>
              </DataTable>
            </div>
          )}
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
              <Button variant="outlined" style={{ marginTop: '2rem' }} onClick = {handleIndentClick}>
                Continue Creating Indent
                
              </Button>
            </Modal.Body>
          </Modal>
        </StocksLayout>
      </div>
    </>
  );
};

export default Indents;
