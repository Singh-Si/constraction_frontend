import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { parseCookies } from 'nookies';
import config from '@/config/config';
import EditIssueModal from '@/components/utils/Modal/EditIssueModal';

const ResolvedSiteIssueTable = () => {
  const [issueData, setIssueData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token, siteId, currentOrganizationId } = parseCookies();
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [currentIssueId, setCurrentIssueId] = useState(null);
  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await axios.get(`${config.API_URL}/issue/get`, {
          params: {
            organization: currentOrganizationId,
            site: siteId,
            status: 'Resolved'
          },
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response?.data?.issueData) {
          setIssueData(response.data.issueData);
        }
      } catch (error) {
        console.error('Error fetching issues:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    if (token && currentOrganizationId && siteId) {
      fetchIssues();
    }
  }, [token, currentOrganizationId, siteId]);

  const handleDeleteClick = async (issueId) => {
    try {
      const response = await axios.delete(
        `${config.API_URL}/issue/delete`,
        {
          params: {
            organization: currentOrganizationId,
            site: siteId,
            sitIssueId: issueId,
          },
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log('Issue successfully deleted:', response.data);
      setIssueData(issueData.filter(issue => issue._id !== issueId));
    } catch (error) {
      console.error('Error deleting issue:', error.response?.data?.error);
    }
  };

  const handleEditClick = (issueId) => {
    setCurrentIssueId(issueId);
    setEditModalVisible(true);
  };

  const handleCloseModal = () => {
    setEditModalVisible(false);
  };
  const confirmDelete = async (issueId) => {
    if (window.confirm("Are you sure you want to delete this site issue?")) {
      await handleDeleteClick(issueId);
    }
  };
  
  return (
    <div className="row-sm">
      <ul className="mt-4 p-0 text-decoration-none list-style-none w-100 shadow-sm m-auto small">
        <li className="list-group-item fw-bold bg-gray text-black">
          <div className="text-decoration-none text-black">
            <div className="row bg-light-gray">
              {/* Header columns */}
              <div className="border bg-blue p-1 col-1 d-flex align-items-center px-2 m-0 gap-3 text-white">
                <small className="w-100 text-center">S.No</small>
              </div>
              <div className="border bg-blue p-3 col-1 d-flex align-items-center px-2 m-0 gap-3 text-white">
                <small className="w-100 text-center">Issue Name</small>
              </div>
              <div className="border bg-blue p-3 col-2 d-flex align-items-center px-2 m-0 gap-3 text-white">
                <small className="w-100 text-center">Description</small>
              </div>
              <div className="border bg-blue p-3 col-2 d-flex align-items-center px-2 m-0 gap-3 text-white">
                <small className="w-100 text-center">Work Category</small>
              </div>
              <div className="border bg-blue p-3 col-1 d-flex align-items-center px-2 m-0 gap-3 text-white">
                <small className="w-100 text-center">Floor Name</small>
              </div>
              <div className="border bg-blue p-3 col-1 d-flex align-items-center px-2 m-0 gap-3 text-white">
                <small className="w-100 text-center">Status</small>
              </div>
              <div className="border bg-blue p-3 col-1 d-flex align-items-center px-2 m-0 gap-3 text-white">
                <small className="w-100 text-center">Assign members</small>
              </div>
              <div className="border bg-blue p-3 col-1 d-flex align-items-center px-2 m-0 gap-3 text-white">
                <small className="w-100 text-center">Due Date</small>
              </div>
              <div className="border bg-blue p-3 col-1 d-flex align-items-center px-2 m-0 gap-3 text-white">
                <small className="w-100 text-center">Edit</small>
              </div>
              <div className="border bg-blue p-3 col-1 d-flex align-items-center px-2 m-0 gap-3 text-white">
                <small className="w-100 text-center">Delete</small>
              </div>
            </div>
          </div>
        </li>

        {/* Data rows */}
        {issueData.map((issue, index) => (
          <li key={issue._id} className="list-group-item">
            <div className="text-decoration-none text-black">
              <div className="row">
                <div className="border p-3 col-1 d-flex align-items-center px-2 m-0 gap-3">
                  <small className="w-100 text-center">{index + 1}</small>
                </div>
                <div className="border p-3 col-1 d-flex align-items-center px-2 m-0 gap-3">
                  <small className="w-100 text-center">{issue?.issueTitle}</small>
                </div>
                <div className="border p-3 col-2 d-flex align-items-center px-2 m-0 gap-3">
                  <small className="w-100 text-center">{issue.reason || 'N/A'}</small>
                </div>
                <div className="border p-3 col-2 d-flex align-items-center px-2 m-0 gap-3">
                  <small className="w-100 text-center">{issue.workCategory?.name}</small>
                </div>
                <div className="border p-3 col-1 d-flex align-items-center px-2 m-0 gap-3">
                  <small className="w-100 text-center">{issue.floor?.name}</small>
                </div>
                <div className="border p-3 col-1 d-flex align-items-center px-2 m-0 gap-3">
                  <small className="w-100 text-center">{issue.status}</small>
                </div>
                <div className="border p-3 col-1 d-flex align-items-center px-2 m-0 gap-3">
                  {issue.assignUser && issue.assignUser.length > 0 && (
                    <small className="w-100 text-center">{issue.assignUser.map(user => user.name).join(', ')}</small>
                  )}
                </div>
                <div className="border p-3 col-1 d-flex align-items-center px-2 m-0 gap-3">
                  <small className="w-100 text-center">{issue.dueDate || 'N/A'}</small>
                </div>
                <div className="border p-3 col-1 d-flex align-items-center px-2 m-0 gap-3">
                  <button className="btn btn-link" onClick={() => handleEditClick(issue._id)}>
                    <i className="bi bi-pencil-square"></i>
                  </button>
                </div>
                <div className="border p-3 col-1 d-flex align-items-center px-2 m-0 gap-3">
                  <button className="btn btn-link" onClick={() => confirmDelete(issue._id,handleDeleteClick)}>
                    <i className="bi bi-trash text-danger cursor-pointer fs-5"></i>
                  </button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      {editModalVisible && (
        <EditIssueModal
          showModal={editModalVisible}
          handleCloseModal={handleCloseModal}
          issueId={currentIssueId}
          fetchIssues={() => {
            setLoading(true);
            setError(null);
            setEditModalVisible(false);
          }}
        />
      )}
    </div>
  );
};

export default ResolvedSiteIssueTable;
