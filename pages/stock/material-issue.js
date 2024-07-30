import React, { useEffect, useState } from "react";
import { parseCookies } from 'nookies';
import axios from "axios";
import Issues from '@/components/sites/materialIssue/Issues';
import MaterialIssueComponent from '@/components/sites/materialIssue/MaterialIssueComponent';
import StocksLayout from '@/layouts/StocksLayout';
import Link from 'next/link';
import BackIcon from "@/components/utils/global/BackIcon";
import config from '@/config/config';

const MaterialIssue = () => {
    const [materialIssues, setMaterialIssues] = useState([]);
    const [selectedIssueId, setSelectedIssueId] = useState(null);

    const handleLinkClick = (issueId) => {
        setSelectedIssueId(issueId);
    };

    const handleDeleteClick = async (issueId) => {
        try {
            const { token, currentOrganizationId } = parseCookies();
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
            setMaterialIssues(materialIssues.filter(issue => issue._id !== issueId));
        } catch (error) {
            console.error('Error deleting issue:', error.response?.data?.error);
        }
    };

    const confirmDelete = async (issueId) => {
        if (window.confirm("Are you sure you want to delete this site issue?")) {
            await handleDeleteClick(issueId);
        }
    };

    useEffect(() => {
        const fetchMaterialIssues = async () => {
            try {
                const { token, currentOrganizationId } = parseCookies();
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_URL}/material/issue/gets`,
                    {
                        params: {
                            organization: currentOrganizationId,
                        },
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );

                if (response?.data?.success) {
                    const issues = response?.data?.data;
                    setMaterialIssues(issues);
                    // Set the first issue as the default selected issue
                    if (issues.length > 0) {
                        setSelectedIssueId(issues[0]._id);
                    }
                }
            } catch (error) {
                console.error('Error fetching material issues:', error);
            }
        };

        fetchMaterialIssues();
    }, []);

    return (
        <StocksLayout current="material">
            <div className='row bg-light-blue d-flex justify-content-end'>
                <span className='text-blue fw-bold p-2'><BackIcon />Quality Issues</span>
            </div>

            <div className="row mt-4">
                <div className="col-3 mb-3">
                    <div className="input-group d-flex align-items-center">
                        <span className="input-group-append d-flex align-items-center position-absolute" style={{ right: 18, display: "flex" }}>
                            <i className="bi bi-search" style={{ color: "#8CBCD9" }}></i>
                        </span>
                        <input
                            type="search"
                            className="outline-none form-control rounded"
                            style={{ border: "1px solid #B8BAC2" }}
                            placeholder="Search Material "
                        />
                    </div>
                </div>
                <div className='col-3 gap-2 d-flex justify-content-between p-0'>
                    <button className=' bg-white text-info new-site-btn border border-info'>Export Material List</button>
                    <button className=' bg-white text-info new-site-btn border border-info' type="button" data-bs-toggle="offcanvas">Upload Material List</button>
                </div>

                <div className="col-5 text-end">
                    <button className='btn bg-btn-bg text-white new-site-btn' style={{ boxShadow: "2px 2px 13px #8CBCD9" }} type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight">+ Add Issue</button>
                    <Issues materialIssues={materialIssues} />
                </div>
            </div>

            <small className='fw-bold mt-4'>All Created Issues ID</small>
            <div className="row border-top border-bottom-0">
                <div className="col-lg-3 dz-scroll height500 border border-right border-2 border-solid border-grey p-3">
                    <div className="nav flex-column nav-pills mb-3 mtngtabs mting">
                        {materialIssues.map((issue, index) => (
                            <Link 
                                key={issue._id} 
                                href={`#${issue._id}-tab`} 
                                data-bs-toggle="pill" 
                                className={`text-decoration-none text-black py-2 border-bottom ${selectedIssueId === issue._id ? 'bg-gray' : ''}`} 
                                onClick={() => handleLinkClick(issue._id)}
                            >
                                <div className='d-flex justify-content-between'>
                                    <div>
                                        <small className='fw-bold text-blue py-1'>Issue Title: {issue.issueTitle}</small><br />
                                        <small className='py-1'>Material Name: {issue.materialName}</small>
                                    </div>
                                    <small className='py-1 text-grey'><i className='bi bi-arrow-right'></i></small>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
                {selectedIssueId && (
                    <MaterialIssueComponent
                        key={selectedIssueId}
                        issue={materialIssues.find(issue => issue._id === selectedIssueId)}
                        handleEditClick={handleLinkClick}
                        confirmDelete={confirmDelete}
                    />
                )}
            </div>
        </StocksLayout>
    );
};

export default MaterialIssue;
