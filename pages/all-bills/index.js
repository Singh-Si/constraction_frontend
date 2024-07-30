import AddSiteBudget from '@/components/utils/Modal/AddSiteBudget';
import BackIcon from '@/components/utils/global/BackIcon';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '@/config/config'; // Make sure to import config
import nookies, { parseCookies } from 'nookies'; // Import nookies correctly
import EditSiteBudgetModal from '@/components/utils/Modal/EditSiteBudgetModal';

const AllBills = () => {
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [siteData, setSiteData] = useState(null);
  const { currentOrganizationId, token } = parseCookies(); // Assuming parseCookies is defined
  const [calculatedBills, setCalculatedBills] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
const [budgetId, setBudgetId]=useState(null);
  const openModal = (id) => {
    setBudgetId(id);
    setIsModalOpen(true);
    // Optionally, you can set the selected budgetId in the modal state here
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleToggleOffcanvas = () => {
    setShowOffcanvas(true);
  };

  const closeOrgnisationModal = () => {
    setShowOffcanvas(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${config.API_URL}/sitebudget/get?organization=${currentOrganizationId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log('API response:', response?.data?.data);
        setSiteData(response?.data?.data);
      } catch (error) {
        console.error('Error fetching site data:', error);
      }
    };

    fetchData();
  }, [currentOrganizationId, token]); // Include dependencies in useEffect

  console.log('siteData:', siteData); // Debugging log
  console.log('budgetIdbudgetIdbudgetIdbudgetId:', budgetId); // Debugging log

  return (
    <div>
      <div className="row pb-5">
        <div className="text-end d-flex bg-aliceblue m-auto justify-content-between align-items-center">
          <div className="text-black fs-5 fw-semibold">
            <BackIcon />
            Site Budget
          </div>
          <button
            className='btn bg-btn-bg text-white new-site-btn shadow-lg shadow-info'
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#editoffcanvas"
            aria-controls="offcanvasTop"
            onClick={handleToggleOffcanvas}
          >
            + Site Budget
          </button>
        </div>
      </div>
      <div className="row">
        {siteData &&
          siteData.map((item) => (
            <div className="col-md-3 mb-3" key={item._id}>
              <div className="bill-crd">
                <button
                  type="button"
                  className="p-1 text-white bg-btn-bg edit-bdgt"
                  onClick={() => openModal(item._id)} // Pass budgetId to openModal function
                >
                  <i className="bi bi-pencil-square mx-2" />
                </button>

                <Link href={`/all-bills/${item?.site?._id}`} className='text-decoration-none text-black'>
                  <div className='bdgt-title border-bottom'>
                    {item.site.name}
                  </div>
                  <div className='bdgt'>
                    Site Budget: <span>&#8377; {item.budget}</span>
                  </div>
                </Link>

              </div>
            </div>
          ))}
      </div>
      {isModalOpen && <EditSiteBudgetModal closeModal={closeModal} budgetId={budgetId} />}
      <AddSiteBudget showModal={showOffcanvas} closeModal={closeOrgnisationModal} />
    </div>
  );
};

export default AllBills;

