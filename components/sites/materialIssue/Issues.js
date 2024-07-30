import React, { useEffect, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import axios from "axios";
import { parseCookies } from 'nookies';
import { FaChevronDown } from 'react-icons/fa';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import config from '@/config/config';

const Issues = () => {
    const [attachment, setAttachment] = useState("");

  const [isFormVisible, setIsFormVisible] = useState(true);
  const router = useRouter();
  const [getvendorDetails, setVendorDetails] = useState([]);
  const [selectedVendorDetails, setSelectedVendorDetails] = useState(null);
  const [endDateState, setEndDateState] = useState();
  const [materialIssues, setMaterialIssues] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [sites, setSites] = useState([]);
  const [selectedSite, setSelectedSite] = useState('');
  const { token,siteId, currentOrganizationId } = parseCookies();

  console.log('Added successfully:', siteId);
  const [file, setFile] = useState(null);

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
  }, [showModal, token, siteId, currentOrganizationId]);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleClose = () => {
    setIsFormVisible(false);
    router.push(`/sites/material/indent?siteId=${siteId}`);
  };

  const onSelectVendor = (vendorId) => {
    const selectedVendor = getvendorDetails.find(vendor => vendor._id === vendorId);
    setSelectedVendorDetails(selectedVendor);
  };

  const [minEndDate, setMinEndDate] = useState();

  function formatDate(date) {
    return date.toISOString().split('T')[0];
  }

  function CreateDate() {
    const formattedDate = new Date();
    return formatDate(formattedDate);
  }

  function CreateEndDate(startDate) {
    const formattedStartDate = new Date(startDate);
    const nextDay = new Date(formattedStartDate);
    nextDay.setDate(formattedStartDate.getDate() + 1);
    const formattedEndDate = formatDate(nextDay);

    setMinEndDate(startDate);
    setEndDateState(formattedEndDate);

    return formattedEndDate;
  }

  useEffect(() => {
    const startDate = CreateDate();
    setEndDateState(CreateEndDate(startDate));
  }, []);

  const initialValues = {
    issueType: '',
    materialName: '',
    issueTitle: '',
    vendorId: '',
    dueDate: '',
    description: '',
    attachment: null,
  };

  const handleSubmit = async (values) => {
    const { token, currentOrganizationId, siteId } = parseCookies();
    
    const formData = new FormData();
    formData.append('issueType', values.issueType);
    formData.append('materialName', values.materialName);
    formData.append('issueTitle', values.issueTitle);
    formData.append('vendorId', values.vendorId);
    formData.append('dueDate', values.dueDate);
    formData.append('description', values.description);
    formData.append("attachment", file);


    try {
      const response = await axios.post(
        `${config.API_URL}/material/issue/add`,
        formData,
        {
          params: {
            organization: currentOrganizationId,
            site: selectedSite,
          },
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response?.data?.success) {
        console.log('Material issue added successfully:', response.data);
        toast.success("Material issue raised successfully", { position: "top-center" });
      }
    } catch (error) {
      console.error('Error adding material issue:', error.response?.data?.error);
    }
  };

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
      }
    };

    fetchVendor();
  }, [currentOrganizationId, token]);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        setFile(file); // Set the file state
        const reader = new FileReader();
        reader.onloadend = () => {
            setAttachment(reader.result); // Set the attachment state with base64 encoded data
        };
        reader.readAsDataURL(file); // Read the file as data URL
    }
};

  return (
    <div>
      <div className="offcanvas offcanvas-end bg-white" tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel" data-bs-backdrop="static" style={{ width: '35%' }}>
        <div className="offcanvas-body p-0">
          <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={handleSubmit}
          >
            {({ setFieldValue, isSubmitting, handleChange }) => (
              <Form className="d-flex flex-column">
                <div className="offcanvas-header bg-light-blue mb-0">
                  <span className="offcanvas-title fw-bold text-blue" id="offcanvasRightLabel">
                    Add Issues
                  </span>
                  <button
                    type="button"
                    className="btn-close me-0"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="d-flex gap-3 flex-column p-3">
                  <div className="row">
                    <div className="form-group col-6">
                      <div className="text-start w-100 mb-2">
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
                    <div className="form-group  col-6 text-start">
                      <label htmlFor="issueTitle">Issue title<span className="text-danger">*</span></label>
                      <br />
                      <Field
                        type="text"
                        name="issueTitle"
                        className="form-control  border-info"
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
                        onChange={(e) => {
                          onSelectVendor(e.target.value);
                          setFieldValue('vendorId', e.target.value);
                        }}
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
                  <div className="row">
                    <div className="form-group col-6 text-start">
                      <label htmlFor="dueDate">Due Date<span className="text-danger">*</span></label>
                      <br />
                      <Field
                        type="date"
                        name="dueDate"
                        className="form-control border-info"
                        onChange={(e) => {
                          const newDueDate = e.target.value;
                          setMinEndDate(CreateEndDate(newDueDate));
                          handleChange(e);
                        }}
                        min={CreateDate()}
                      />
                      <ErrorMessage
                        name="dueDate"
                        render={(msg) => (
                          <small style={{ color: "red" }}>{msg}</small>
                        )}
                      />
                    </div>
                    <div className="form-group col-6">
                      <div className="text-start w-100 mb-2">
                        <label htmlFor="issueType">Issue type</label>
                        <span className="text-danger">*</span>
                      </div>
                      <Field
                        as="select"
                        name="issueType"
                        className="form-select border-info position-relative"
                        id="issueType"
                        aria-label="Select Type"
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
                  </div>
                  <div className="form-group text-start">
                      <label htmlFor="exampleInputPassword1">
                        Image Uplaod
                      </label>
                      <input
                        type="file"
                        id='fileInput'
                        className="form-control"
                        onChange={handleImageChange}
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
                    onClick={handleSubmit}
                    data-bs-dismiss="offcanvas"
                  >
                    Submit
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Issues;
