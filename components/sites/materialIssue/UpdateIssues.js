import React, { useState, useEffect } from 'react';
import { Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import { parseCookies } from 'nookies';
import { Formik, Field, ErrorMessage } from 'formik';
import Select from 'react-select';
import { FaChevronDown } from 'react-icons/fa';
import config from '@/config/config';

const UpdateIssues = ({ showModal, handleCloseModal, issueId }) => {
    const cookies = parseCookies();
    const [sites, setSites] = useState([]);
    const currentOrganizationId = cookies.currentOrganizationId;
    const token = cookies.token;
    const [currentIssueId, setCurrentIssueId] = useState(null);

    const [selectedSite, setSelectedSite] = useState('');
    const [getvendorDetails, setVendorDetails] = useState([]);
    const [selectedVendorDetails, setSelectedVendorDetails] = useState(null);
    const [endDateState, setEndDateState] = useState('');
console.log(issueId,"jjjjjd")
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

  useEffect(() => {
    fetchSites();
  }, [showModal, token, currentOrganizationId]);
    // Fetch vendors on component mount
    useEffect(() => {
        const fetchVendor = async () => {
            try {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_URL}/getAllvendors`,
                    {
                        params: {
                            organization: currentOrganizationId,
                        },
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );

                if (response?.data?.success) {
                    setVendorDetails(response?.data?.data);
                }
            } catch (error) {
                console.log(error);
                // Handle error fetching vendors
            }
        };

        fetchVendor();
    }, [currentOrganizationId, token]);

    // Function to format date as ISO string
    function formatDate(date) {
        return date.toISOString().split('T')[0];
    }

    // Function to create current date
    function CreateDate() {
        const formattedDate = new Date();
        return formatDate(formattedDate);
    }

    // Function to create end date based on start date
    function CreateEndDate(startDate) {
        const formattedStartDate = new Date(startDate);
        const nextDay = new Date(formattedStartDate);
        nextDay.setDate(formattedStartDate.getDate() + 1);
        const formattedEndDate = formatDate(nextDay);

        setEndDateState(formattedEndDate);

        return formattedEndDate;
    }

    useEffect(() => {
        const startDate = CreateDate();
        setEndDateState(CreateEndDate(startDate));
    }, []);

    // Function to handle file change
    const handleFileChange = (e, setFieldValue) => {
        const file = e.currentTarget.files[0];
        setFieldValue('attachment', file);
    };
    const handleEditClick = (issueId) => {
        setCurrentIssueId(issueId);
      };

    // Function to handle vendor selection
    const onSelectVendor = (vendorId, setFieldValue) => {
        const selectedVendor = getvendorDetails.find(vendor => vendor._id === vendorId);
        setSelectedVendorDetails(selectedVendor);
        setFieldValue('vendorId', vendorId); // Update Formik field
    };

    // Submit handler for the form
    console.log(issueId,"jnejdj")
    const handleSubmit = async (values) => {
        // Prevent default form submission
        const { token, currentOrganizationId,siteId } = parseCookies();

            const formData = new FormData();
            formData.append('issueType', values.issueType);
            formData.append('materialName', values.materialName);
            formData.append('issueTitle', values.issueTitle);
            formData.append('vendorId', values.vendorId);
            formData.append('dueDate', values.dueDate);
            formData.append('description', values.description);
            formData.append('status', values.status);
            if (values.attachment) {
                formData.append('attachment', values.attachment);
            }
            try {

            const response = await axios.put(
                `${config.API_URL}/material/issue/update`,
                formData,
                {
                    params: {
                        organization: currentOrganizationId,
                        issueId: issueId,
                        site:siteId
                    },
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
    
            if (response?.data?.success) {
                console.log('Material issue updated successfully:', response.data);
                handleCloseModal(); // Close modal after successful update
            } else {
                console.error('Failed to update material issue:', response?.data?.error);
                // Handle failure case if needed
            }
        } catch (error) {
            console.error('Error updating material issue:', error);
            // Handle other errors such as network issues or malformed responses
        } 
    };
    
    return (
        showModal && (
            <div className="modal-backdrop fade-in-animation overflow-scroll" data-bs-backdrop="true">
                <div className="modal-dialog slide-in-from-bottom h-auto overflow-scroll">
                    <div className="modal-content p-0 fade-in-animation h-none justify-content-start">
                        <div className="w-100" style={{ height: '80vh' }}>
                            <div className="w-100 modal-body text-info">
                                <div className="p-0">
                                    <Formik
                                        initialValues={{
                                            issueType: '',
                                            materialName: '',
                                            issueTitle: '',
                                            vendorId: '',
                                            dueDate: '',
                                            description: '',
                                            attachment: null,
                                            status: ''
                                        }}
                                        onSubmit={handleSubmit}
                                    >
                                        {({ setFieldValue, values, handleSubmit }) => (
                                            <Form className="d-flex flex-column" onSubmit={handleSubmit}>
                                                <div className="offcanvas-header bg-light blue p-3">
                                                    <span className="offcanvas-title fw-bold text-blue" id="offcanvasRightLabel">
                                                        Edit issue
                                                    </span>
                                                    <button
                                                        type="button"
                                                        className="btn-close me-0"
                                                        data-bs-dismiss="offcanvas"
                                                        onClick={handleCloseModal}
                                                        aria-label="Close"
                                                    ></button>
                                                </div>
                                                <div className="d-flex gap-3 flex-column p-3">
                                                    <div className="row">
                                                        <div className="form-group col-6">
                                                            <div className="text-start w-100 mb-2">
                                                                <label htmlFor="issueType">Issue type</label>
                                                                <span className="text-danger">*</span>
                                                            </div>
                                                            <Field
                                                                as="select"
                                                                name="issueType"
                                                                className="form-select border-info position-relative"
                                                            >
                                                                <option value="">Select type <FaChevronDown /></option>
                                                                <option value="Material">Material</option>
                                                                <option value="Equipment">Equipment</option>
                                                            </Field>
                                                            <ErrorMessage
                                                                name="issueType"
                                                                render={(msg) => (
                                                                    <small style={{ color: "red" }}>{msg}</small>
                                                                )}
                                                            />
                                                        </div>
                                                        <div className="form-group col-6">
                                                            <div className="text-start w-100 mb-2">
                                                                <label htmlFor="materialName">Material name</label>
                                                                <span className="text-danger">*</span>
                                                            </div>
                                                            <Field
                                                                type="text"
                                                                name="materialName"
                                                                className="form-control border-info"
                                                                placeholder="Enter material name"
                                                            />
                                                            <ErrorMessage
                                                                name="materialName"
                                                                render={(msg) => (
                                                                    <small style={{ color: "red" }}>{msg}</small>
                                                                )}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="form-group col-6 text-start">
                                                            <label htmlFor="issueTitle">Issue title<span className="text-danger">*</span></label>
                                                            <br />
                                                            <Field
                                                                type="text"
                                                                name="issueTitle"
                                                                className="form-control"
                                                                placeholder="Enter the title"
                                                            />
                                                            <ErrorMessage
                                                                name="issueTitle"
                                                                render={(msg) => (
                                                                    <small style={{ color: "red" }}>{msg}</small>
                                                                )}
                                                            />
                                               
                                                        </div>
                                                        <div className="form-group col-6 text-start">
                                                            <label htmlFor="vendorId">Vendor name<span className="text-danger">*</span></label>
                                                            <br />
                                                            <Field
                                                                as="select"
                                                                name="vendorId"
                                                                className="form-select border-info position-relative"
                                                                onChange={(e) => onSelectVendor(e.target.value, setFieldValue)}
                                                            >
                                                                <option value="">Select vendor <FaChevronDown /></option>
                                                                {getvendorDetails && getvendorDetails.map((item) => (
                                                                    <option
                                                                        key={item._id}
                                                                        value={item._id}
                                                                    >
                                                                        {item.vendor.vendorName}
                                                                    </option>
                                                                ))}
                                                            </Field>
                                                            <ErrorMessage
                                                                name="vendorId"
                                                                render={(msg) => (
                                                                    <small style={{ color: "red" }}>{msg}</small>
                                                                )}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="form-group text-start">
                                                             <div className="text-start w-100 mb-2">

                      <label htmlFor="status">Issue Status<span className="text-danger">*</span></label>
                      <br />
                      <Field
                        as="select"
                        name="status"
                        className="form-select border-info position-relative"
                        onChange={(e) => setFieldValue('status', e.target.value)}
                      >
                        <option value="">Select issue status <FaChevronDown /></option>
                        <option value="Approved">Pending</option>
                        <option value="Resolved">Resolved</option>
                      </Field>
                      <ErrorMessage
                        name="status"
                        render={(msg) => (
                          <small style={{ color: "red" }}>{msg}</small>
                        )}
                      />
                      </div>
                <div className="form-group col-6 text-start">
                    
                        <label htmlFor="siteDetails">Site Name</label>
                        <span className="text-danger">*</span>
                      </div>
                      <select className="form-select mt-2" value={selectedSite} onChange={(e) => setSelectedSite(e.target.value)}>
                        <option value="">Select a site</option>
                        {sites.map((site) => (
                          <option key={site._id} value={site._id}>
                            {site.name}
                          </option>
                        ))}
                      </select>
                      <ErrorMessage
                        name="siteDetails"
                        render={(msg) => (
                          <small style={{ color: "red" }}>{msg}</small>
                        )}
                      />
                    </div>
                                                    <div className="form-group text-start">
                                                        <label htmlFor="attachment">Image & Document<span className="text-danger">*</span></label>
                                                        <input
                                                            type="file"
                                                            id="attachment"
                                                            className="form-control border-info"
                                                            onChange={(event) => handleFileChange(event, setFieldValue)}
                                                        />
                                                    </div>
                                                    <div className="form-group text-start">
                                                        <label htmlFor="description">Material Description<span className="text-danger">*</span></label>
                                                        <Field
                                                            as="textarea"
                                                            name="description"
                                                            className="form-control border-info"
                                                            placeholder="Enter description"
                                                            style={{ height: '100px' }}
                                                        />
                                                        <ErrorMessage
                                                            name="description"
                                                            render={(msg) => (
                                                                <small style={{ color: "red" }}>{msg}</small>
                                                            )}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="text-start p-3 mt-5">
                                                    <button
                                                        type="submit"
                                                        className="text-white m-auto w-100 bg-info auth_btn"
                                                        onClick={handleEditClick(issueId)}
                                                    >
                                                        Update
                                                    </button>
                                                </div>
                                            </Form>
                                        )}
                                    </Formik>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
};

export default UpdateIssues;
