import MaterialLayout from '@/layouts/MaterialLayout';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { parseCookies } from 'nookies';
import { useRouter } from 'next/router';
import config from '@/config/config';
import { fetchAllIndentAsync } from "@/store/stock/indents";
import { useDispatch, useSelector } from "react-redux";

const PurchaseOrder = (props) => {
  const { userData } = useSelector((state) => state?.IndentSlice);
  const [materialData, setMaterialData] = useState([]);
  const { token, currentOrganizationId } = parseCookies();
  const router = useRouter();
  const dispatch = useDispatch();
  const indentsData = useSelector(
    (state) => state?.allIndentSlice?.userData?.data
  );

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    dispatch(fetchAllIndentAsync());
  }, [dispatch]);

<<<<<<< HEAD
=======
  const bodyStyle = {
    borderRight: "1px solid #ddd",
    borderBottom: "1px solid #ddd",
  };

>>>>>>> 463abe6 (frontend additonals changes made)
  const fetchPurchaseOrders = async () => {
    try {
      const response = await axios.get(
        `${config.API_URL}/allpurchaseOrder/get?organization=${currentOrganizationId}`, // replace with your endpoint
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(response);

      if (response.data && response.data.success) {
        setMaterialData(response.data.data);
        console.log(materialData, "materialdatahhhhhhhhhhhhhhhhhhhhh");
        console.log(response, "responseresponseresponseresponseresponse");
      }
    } catch (error) {
      console.error('Error fetching purchase orders:', error);
    }
  };

  useEffect(() => {
    fetchPurchaseOrders();
  }, []);

  const handleCreatePOClick = () => {
    router.push('/sites/material/indent'); // Change this to the route you want to navigate to
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(materialData.length / itemsPerPage);
  const paginatedData = materialData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
<<<<<<< HEAD
    <MaterialLayout current="purchase">
      <div className='row-sm d-flex justify-content-end gap-2'>
        <div className='col-2 text-end'>
=======
    <div>
         <div className="site-profile" style={{marginBottom :"1rem" }}>
        <div className="site-profile-heading">
          <span style={{ color: "#FFFFFF", opacity: "0.6" }}>
            Sites /{" "}
          </span>
          <span style={{ color: "white", marginLeft: "0.2rem" }}>Purchase Order</span>
        </div>
        </div>
    <MaterialLayout current="purchase">
      <div className='row-sm d-flex justify-content-end gap-2'>
        <div clasName='col-2 text-end'>
>>>>>>> 463abe6 (frontend additonals changes made)
          {/* <button type="button" className="border-info border-2 text-info m-auto w-75 bg-white rounded px-0 py-1 btn btn-primary" data-bs-toggle="modal" data-bs-target=".bd-example-modal-xl">
            <i className="bi bi-file-earmark-excel"></i> Export Excel
          </button>
        </div>
        <div className='col-2'>
          <button type="button" className="border-info border-2 text-white m-auto w-75 bg-rgb(64 87 104) rounded py-1 btn btn-primary" onClick={handleCreatePOClick}>
            <i className="bi bi-file-earmark-excel"></i> Create PO
            
          </button> */}
        </div>
      </div>
      <div className='row-sm'>
        <ul className="mt-4 p-0 text-decoration-none list-style-none w-100 shadow-sm m-auto small">
          <li className="list-group-item list-group-item fw-bold bg-gray text-black">
            <div href="/member" className='text-decoration-none text-black'>
              <div className='row bg-light-gray'>
<<<<<<< HEAD
                <div className='border text-white bg-blue py-2 col-2 d-flex align-items-center px-2 m-0 gap-3'>
                  <small className='w-100 text-center'>PO-ID</small>
                </div>
                <div className='border col-1 d-flex align-items-center px-2 m-0 gap-3'>
                  <small className='w-100 text-center'>Indent ID</small>
                </div>
                <div className='border col-2 d-flex align-items-center px-2 m-0 gap-3'>
                  <small className='w-100 text-center'>Created On</small>
                </div>
                <div className='border col-2 d-flex align-items-center px-2 m-0 gap-3'>
                  <small className='w-100 text-center'>Created By</small>
                </div>
                <div className='border col-1 d-flex align-items-center px-2 m-0 gap-3'>
                  <small className='w-100 text-center'>Vendor</small>
                </div>
                <div className='border col-1 d-flex align-items-center px-2 m-0 gap-3'>
                  <small className='w-100 text-center'>Total value</small>
                </div>
                <div className='border col-1 text-center d-flex align-items-center px-2 m-0 gap-3'>
                  <small className='w-100 text-center'>Expected Delivery Date</small>
                </div>
                <div className='border col-2 text-center d-flex align-items-center px-2 m-0 gap-3'>
=======
                <div className='border text-white bg-blue py-2 col-2 d-flex align-items-center px-2 m-0 gap-3' style={{background : "rgba(42, 62, 78, 1)" , color : 'white'}}>
                  <small className='w-100 text-center'>PO-ID</small>
                </div>
                <div className='border col-1 d-flex align-items-center px-2 m-0 gap-3'  style={{background : "rgba(42, 62, 78, 1)" , color : "white"}}>
                  <small className='w-100 text-center'>Indent ID</small>
                </div>
                <div className='border col-2 d-flex align-items-center px-2 m-0 gap-3'  style={{background : "rgba(42, 62, 78, 1)" , color : "white"}}>
                  <small className='w-100 text-center'>Created On</small>
                </div>
                <div className='border col-2 d-flex align-items-center px-2 m-0 gap-3'  style={{background : "rgba(42, 62, 78, 1)", color : "white"}}>
                  <small className='w-100 text-center'>Created By</small>
                </div>
                <div className='border col-1 d-flex align-items-center px-2 m-0 gap-3'  style={{background : "rgba(42, 62, 78, 1)" , color : "white"}}>
                  <small className='w-100 text-center'>Vendor</small>
                </div>
                <div className='border col-1 d-flex align-items-center px-2 m-0 gap-3'  style={{background : "rgba(42, 62, 78, 1)" , color : "white"}}>
                  <small className='w-100 text-center'>Total value</small>
                </div>
                <div className='border col-1 text-center d-flex align-items-center px-2 m-0 gap-3'  style={{background : "rgba(42, 62, 78, 1)" , color : "white"}}>
                  <small className='w-100 text-center'>Expected Delivery Date</small>
                </div>
                <div className='border col-2 text-center d-flex align-items-center px-2 m-0 gap-3'  style={{background : "rgba(42, 62, 78, 1)" , color : "white"}}>
>>>>>>> 463abe6 (frontend additonals changes made)
                  <small className='w-100 text-center'>Delivery On</small>
                </div>
              </div>
            </div>
          </li>
          {paginatedData.map((material, index) => (
            <li key={index} className="list-group-item">
              <div href="/member" className='text-decoration-none text-black'>
                <div className='row'>
                  <div className='border p-3 col-2 d-flex align-items-center px-2 m-0 gap-3'>
                    <small className='w-100 text-center'>PO-2023-24-{material.poId}</small>
                  </div>
                  <div className="border p-3 col-1 d-flex align-items-center px-1 m-0 ">
                <small className="w-100 text-center">
                  {material?.indentId?.map(indent => (
<<<<<<< HEAD
                    <div key={indent.id._id}>{indent.id.indentId}</div>
=======
                    <div key={indent?.id?._id}>{indent?.id?.indentId}</div>
>>>>>>> 463abe6 (frontend additonals changes made)
                  ))}
                </small>
              </div>
                  <div className='border p-3 col-2 d-flex align-items-center px-2 m-0 gap-3'>
                    <small className='w-100 text-center'>{material.createdAt?.slice(0,10)}</small>
                  </div>
                  <div className='border p-3 col-2 d-flex align-items-center px-2 m-0 gap-3'>
                    <small className='w-100 text-center'>{material?.createdBy?.name}</small>
                  </div>
                  <div className='border p-3 col-1 d-flex align-items-center px-2 m-0 gap-3'>
                    <small className='w-100 text-center'>{material?.vendorId?.vendor?.vendorName}</small>
                  </div>
                  <div className='border p-3 col-1 d-flex align-items-center px-2 m-0 gap-3'>
                    <small className='w-100 text-center'>{material.roundOfTotal}</small>
                  </div>
                  <div className='border p-3 col-1 text-center d-flex align-items-center px-2 m-0 gap-3'>
                    <small className='w-100 text-center'>{new Date(material.expectedDelivery).toLocaleString()}</small>
                  </div>
                  <div className='border p-3 col-2 text-center d-flex align-items-center px-2 m-0 gap-3'>
                    <small className='w-100 text-center'></small>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="d-flex justify-content-center mt-4">
        <nav aria-label="Page navigation">
          <ul className="pagination">
            {[...Array(totalPages).keys()].map((page) => (
              <li key={page} className={`page-item ${currentPage === page + 1 ? 'active' : ''}`}>
                <button className="page-link" onClick={() => handlePageChange(page + 1)}>
                  {page + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </MaterialLayout>
<<<<<<< HEAD
=======
    </div>
>>>>>>> 463abe6 (frontend additonals changes made)
  );
};

export default PurchaseOrder;
