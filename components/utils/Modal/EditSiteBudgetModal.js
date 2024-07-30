import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '@/config/config';
import { parseCookies } from 'nookies';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

const EditSiteBudgetModal = ({ closeModal,budgetId }) => {
  console.log(budgetId);
  const [showModal, setShowModal] = useState(true);
  const [budget, setBudget] = useState('');
  const router = useRouter();

  const handleUpdateBudget = async () => {
    const { currentOrganizationId, token } = parseCookies();

    try {
      const data = {
        budget: budget,
      };

      const response = await axios.patch(
        `${config.API_URL}/sitebudget/update/${budgetId}?organization=${currentOrganizationId}`,
        data,
        {
        
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response?.data?.success) {
        console.log('Budget updated successfully');
        closeModal();
        toast.success('Budget updated successfully');
        router.push(router.asPath);
      } else {
        console.error('Failed to update budget:', response?.data?.error);
        toast.error('Failed to update budget');
      }
    } catch (error) {
      // Axios error handling
      if (error.response) {
        console.error('Server Error:', error.response.data);
        console.error('Status Code:', error.response.status);
        toast.error('Server Error: Please try again later');
      } else if (error.request) {
        console.error('No Response:', error.request);
        toast.error('No Response from server');
      } else {
        console.error('Error:', error.message);
        toast.error('Error: Please check your network connection');
      }
    }
  };


  return (
    <>
      {showModal && (
        <div className="modal-backdrop fade-in-animation" data-bs-backdrop="true">
          <div className="modal-dialog slide-in-from-bottom h-auto">
            <div className="modal-content fade-in-animation p-0 h-none justify-content-start">
              <div className="w-100">
                <div className="d-flex justify-content-between w-100 border-bottom modal-header bg-light-blue rounded-top">
                  <div className="fs-xxl text-blue p-3">Update Site Budget</div>
                  <span onClick={closeModal} className="cursor-pointer text-black p-3">
                    X
                  </span>
                </div>
                <div className="w-100 modal-body text-info">
                  <div className="p-4">
                    <div>
                      <label className="text-black">Edit Site Budget</label>
                      <input
                        type="number"
                        className="form-control mt-2"
                        placeholder="Enter new budget"
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                      />
                    </div>
                    <div className="mt-5 w-50 m-auto">
                      <button
                        type="button"
                        className="text-white m-auto w-100 bg-btn-bg auth_btn"
                        onClick={() => handleUpdateBudget()} // Pass id as budgetId
                      >
                        Update
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditSiteBudgetModal;
