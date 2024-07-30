import React, { useState } from 'react';
import axios from 'axios';
import { parseCookies } from 'nookies';
import config from "@/config/config";
import UpdateIssues from '@/components/sites/materialIssue/UpdateIssues';

const MaterialIssueComponent = ({ issue }) => {
    const cookies = parseCookies();
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [currentIssueId, setCurrentIssueId] = useState(null);

    const siteId = cookies.siteId;
    const currentOrganizationId = cookies.currentOrganizationId;
    const token = cookies.token;

    const handleDeleteClick = async (issueId) => {
        try {
            const response = await axios.delete(
                `${config.API_URL}/material/issue/delete`,
                {
                    params: {
                        organization: currentOrganizationId,
                        issueId: issueId
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

    const confirmDelete = async (issueId) => {
        if (window.confirm("Are you sure you want to delete this site issue?")) {
            await handleDeleteClick(issueId);
        }
    };

    const handleEditClick = (issueId) => {
        setCurrentIssueId(issueId);
        setEditModalVisible(true);
    };

    const handleCloseModal = () => {
        setEditModalVisible(false);
        setCurrentIssueId(null);
    };

    return (
        <div className='col p-0 overflow-scroll'>
            <ul className="list-group shadow-sm m-auto">
                <li className="list-group-item p-3 bg-light blue">
                    <div className='d-flex justify-content-between align-items-center'>
                        <div>
                            <span className='ml-2 fw-bold text-blue'>Issue raised for {issue.materialName}</span>
                        </div>
                        <div>
                            <button className="btn btn-bg-white btn-link" onClick={() => handleEditClick(issue._id)}>
                                <i className="bi bi-pencil-square"></i>
                            </button>
                            <button className="btn btn-bg-white btn-link" onClick={() => confirmDelete(issue._id)}>
                                <i className="bi bi-trash text-danger cursor-pointer fs-5"></i>
                            </button>
                        </div>
                    </div>
                </li>

                <div className="row py-4 px-7 d-flex justify-content-between align-items-center">
                    <div className="col-6 py-3 d-flex align-items-center">
                        <button
                            className="btn btn-yellow text-white new-site-btn"
                            style={{ boxShadow: "2px 2px 13px #8CBCD9" }}
                            type="button"
                        >
                            Issue Status
                        </button>
                    </div>
                    <div className="col-6 py-3 d-flex align-items-center justify-content-end">
                        <button
                            className={`btn text-white new-site-btn ${issue.status === 'Pending' ? 'btn-danger' : 'btn-success'}`}
                            style={{ boxShadow: "2px 2px 13px #8CBCD9" }}
                            type="button"
                        >
                            {issue.status}
                        </button>
                    </div>
                </div>

                <div className='row mt-5'>
                    <div className='col-11 m-auto border rounded'>
                        <div className='bg-blue w-100 rounded-top p-2'>
                            <small className='text-white'>Issue Details</small>
                        </div>
                        <div className='p-3 d-flex justify-content-between'>
                        <div>
                                <span className='text-blue fw-bold'>Site Name</span><br />
                                <small className='text-black'>{issue.siteDetails[0]?.name}</small>
                            </div>
                            <div>
                                <span className='text-blue fw-bold'>Issue Type</span><br />
                                <small className='text-black'>{issue.issueType}</small>
                            </div>
                            <div>
                                <span className='text-blue fw-bold'>Material Item Name</span><br />
                                <small className='text-black'>{issue.materialName}</small>
                            </div>
                            <div>
                                <span className='text-blue fw-bold'>Issue Title</span><br />
                                <small className='text-black'>{issue.issueTitle}</small>
                            </div>
                            <div>
                                <small className='text-blue fw-bold'>Created By</small><br />
                                <small className='text-black'>{issue?.users[0]?.name}</small>
                            </div>
                            <div>
                                <span className='text-blue fw-bold'>Date</span><br />
                                <small className='text-black'>{issue.dueDate?.slice(0, 10)}</small>
                            </div>
                            <div>
                                <span className='text-blue fw-bold'>Vendor Name</span><br />
                                <small className='text-black'>{issue.vendorDetailas[0]?.vendorName}</small>
                            </div>
                           
                        </div>
                    </div>
                </div>

                <div className='row mt-5'>
                    <div className='col-11 m-auto border rounded'>
                        <div className='bg-blue w-100 rounded-top p-2'>
                            <small className='text-white'>Item Description</small>
                        </div>
                        <div className='p-3'>
                            <small className='fw-bold'>Issues: </small>
                            {issue.description}
                        </div>
                    </div>
                </div>

                <div className='row mt-5'>
                    <div className='col-11 m-auto border rounded'>
                        <div className='bg-blue w-100 rounded-top p-2'>
                            <small className='text-white'>Uploaded Item related Image & Document</small>
                        </div>
                        <div className='p-5'>
                        <img
            className="d-block m-auto rounded"
            alt="Card image cap"
            src={issue?.url || "https://th.bing.com/th/id/OIP.DMbQ2iorpKMPwSjRnEiMiAHaEK?rs=1&pid=ImgDetMain"} // Use the provided image URL or a default image
            width="50%"
            height="50%"
          />                        </div>
                    </div>
                </div>
            </ul>
            {editModalVisible && (
    <UpdateIssues
        showModal={editModalVisible}
        handleCloseModal={() => setEditModalVisible(false)} // Updated to directly close the modal
        issueId={currentIssueId}
        onUpdate={(updatedIssue) => {
            // Update the specific issue in the issueData state
            setIssueData((prevIssueData) => 
                prevIssueData.map((issue) => 
                    issue._id === updatedIssue._id ? updatedIssue : issue
                )
            );
            setEditModalVisible(false); // Close the modal after updating
        }}
    />
)}

        </div>
    );
};

export default MaterialIssueComponent;
