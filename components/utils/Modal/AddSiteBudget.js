import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import nookies, { parseCookies } from 'nookies';
import config from '@/config/config';

const AddSiteBudget = ({ showModal, closeModal }) => {
  const [sites, setSites] = useState([]);
  const [selectedSite, setSelectedSite] = useState('');
  const [siteBudget, setSiteBudget] = useState(null);
  const [budgetSiteIds, setBudgetSiteIds] = useState([]);
  const { currentOrganizationId, token } = parseCookies();

  useEffect(() => {
    fetchSites();
    fetchData();
  }, []);

  const fetchSites = async () => {
    try {
      
      const response = await axios.get(`${config.API_URL}/sites?organization=${currentOrganizationId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSites(response?.data?.sites || []);
    } catch (error) {
      console.error('Error fetching sites:', error);
      toast.error('Error fetching sites');
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`${config.API_URL}/sitebudget/get?organization=${currentOrganizationId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('API response:', response?.data?.data);
      const budgets = response?.data?.data || [];
      const budgetIds = budgets.map((budget) => budget.site?._id).filter(Boolean);
      setBudgetSiteIds(budgetIds);
    } catch (error) {
      console.error('Error fetching site data:', error);
    }
  };

  const handleAddBudget = async () => {
    try {
      const response = await axios.post(
        `${config.API_URL}/sitebudget/add?organization=${currentOrganizationId}`,
        {
          site: selectedSite,
          budget: siteBudget,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response?.data?.success) {
        closeModal();
        toast.success('Site budget added successfully', { position: 'top-center' });
      } else {
        toast.error('Error adding site budget', { position: 'top-center' });
      }
    } catch (error) {
      console.error('Error adding site budget:', error);
      toast.error('Error adding site budget', { position: 'top-center' });
    }
  };

  const filteredSites = sites.filter((site) => !budgetSiteIds.includes(site._id));

  return (
    <div>
      {showModal && (
        <div className="modal-backdrop fade-in-animation" data-bs-backdrop="true">
          <div className="modal-dialog slide-in-from-bottom h-auto">
            <div className="modal-content fade-in-animation p-0 h-none justify-content-start">
              <div className="w-100">
                <div className="d-flex justify-content-between w-100 border-bottom modal-header bg-light-blue rounded-top">
                  <div className="fs-xxl text-blue p-3">Add Site Budget</div>
                  <span onClick={closeModal} className="cursor-pointer text-black p-3">
                    X
                  </span>
                </div>
                <div className="w-100 modal-body text-info">
                  <div className="p-4">
                    <div>
                      <label className="text-black">Select Site</label>
                      <select className="form-select mt-2" value={selectedSite} onChange={(e) => setSelectedSite(e.target.value)}>
                        <option value="">Select a site</option>
                        {filteredSites.map((site) => (
                          <option key={site._id} value={site._id}>
                            {site.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mt-3">
                      <label className="text-black">Site Budget</label>
                      <input
                        type="number"
                        className="form-control mt-2"
                        value={siteBudget}
                        onChange={(e) => setSiteBudget(e.target.value)}
                      />
                    </div>
                    <div className="mt-5 w-50 m-auto">
                      <button type="button" className="text-white m-auto w-100 bg-btn-bg auth_btn" onClick={handleAddBudget}>
                        Add Budget
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddSiteBudget;
