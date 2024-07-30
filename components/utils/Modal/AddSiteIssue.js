import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { parseCookies } from 'nookies';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Select from 'react-select';
import config from "@/config/config";

const AddSiteIssue = ({ showModal, handleClose }) => {
  const [loading, setLoading] = useState(false);
  const [invitationAcceptedMembers, setInvitationAcceptedMembers] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [issues, setIssues] = useState([]); // State to store issues
  const [siteMembers, setSiteMembers] = useState([]);
  const [workCategory, setWorkCategory] = useState([]);
  const [floors, setFloors] = useState([]);
  const [data, setData] = useState(null);
  const [editedData, setEditedData] = useState({ sitename: '' });
  const [attachments, setAttachments] = useState([]);
  const cookies = parseCookies();
  const { organizations } = useSelector((state) => state?.getOrganizationAsync?.userData);
  const router = useRouter();
  const [minEndDate, setMinEndDate] = useState();
  const siteId = cookies.siteId;
  const currentOrganizationId = cookies.currentOrganizationId;
  const token = cookies.token;

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
    async function fetchIssues() {
      try {
        const response = await axios.get(`https://construction-backend.onrender.com/issue/get`, {
          params: {
            organization: currentOrganizationId,
            site: siteId,
            status: 'Pending'
          },
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response?.data?.issues) {
          setIssues(response?.data?.issues);
        }
      } catch (error) {
        console.log('Error fetching issues:', error);
      }
    }

    if (token && currentOrganizationId && siteId) {
      fetchIssues();
    }
  }, [token, currentOrganizationId, siteId]);

  useEffect(() => {
    const fetchFloorData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/floors`, {
          headers: { Authorization: `Bearer ${token}` },
          params: { organization: currentOrganizationId, site: siteId },
        });
        setFloors(response?.data?.floors || []);
      } catch (error) {
        console.error('Error fetching floor data:', error.message);
      }
    };

    if (token && currentOrganizationId && siteId) {
      fetchFloorData();
    }
  }, [token, currentOrganizationId, siteId]);

  useEffect(() => {
    const fetchSiteData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/site`, {
          headers: { Authorization: `Bearer ${token}` },
          params: { organization: currentOrganizationId, site: siteId },
        });
        const siteData = response?.data?.site;
        setData(siteData);
        setEditedData({ sitename: siteData?.name });
      } catch (error) {
        console.error('Error fetching site settings:', error.message);
      }
    };

    if (token && currentOrganizationId && siteId) {
      fetchSiteData();
    }
  }, [token, currentOrganizationId, siteId]);

  const handleFileChange = (e) => {
    setAttachments(Array.from(e.target.files));
  };

  useEffect(() => {
    async function fetchWorkCategory() {
      try {
        const response = await axios.get(`https://construction-backend.onrender.com/work-categories?organization=${currentOrganizationId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response?.data?.workCategories) {
          setWorkCategory(response?.data?.workCategories);
        }
      } catch (error) {
        console.log(error, "error");
      }
    }

    fetchWorkCategory();
  }, [currentOrganizationId, token]);

  const initialValues = {
    issueTitle: '',
    workCategory: '',
    floor: '',
    dueDate: '',
    reason: '',
    assignUser: []
  };

  const validationSchema = Yup.object({
    issueTitle: Yup.string().required('Issue Title is required'),
    assignUser: Yup.array().min(1, 'Assign User is required'),
  });

  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append('issueTitle', values?.issueTitle);
      formData.append('workCategory', values?.workCategory);
      formData.append('floor', values?.floor);
      formData.append('dueDate', values?.dueDate);
      formData.append('reason', values?.reason);

      const assignUserIds = values.assignUser.map(user => user.value);
      assignUserIds.forEach(id => {
        formData.append('assignUser', id);
      });

      attachments.forEach((file) => {
        formData.append('attachments', file);
      });

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/issue/add`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
          params: {
            organization: currentOrganizationId,
            site: siteId,
          },
        }
      );

      console.log('Issue successfully added:', response.data);

      handleClose();
    } catch (error) {
      console.error('Error adding issue:', error.response?.data?.error);
    }
  };

  useEffect(() => {
    const fetchInvitationAcceptedMembers = async () => {
      try {
        const response = await axios.get(`${config.API_URL}/site/getInvitationAcceptMembers`, {
          params: {
            organization: currentOrganizationId,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log('Fetched Members:', response.data); // Log fetched data

        if (response?.data?.data) {
          const members = response.data.data.map(member => ({
            value: member.memberDetails._id,
            label: member.memberDetails.name,
          }));
          setInvitationAcceptedMembers(members);
        } else {
          console.error('Unexpected response structure:', response.data);
        }
      } catch (error) {
        console.error('Error fetching members:', error?.response?.data?.error || error.message);
      }
    };

    if (currentOrganizationId && token) {
      fetchInvitationAcceptedMembers();
    }
  }, [currentOrganizationId, token]);

  useEffect(() => {
    const fetchSiteMembers = async () => {
      setLoading(true);
      const { currentOrganizationId, token, siteId } = parseCookies();
      try {
        const response = await axios.get(`${config.API_URL}/site/getMembers`, {
          params: {
            site: siteId,
            organization: currentOrganizationId,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setLoading(false);
        setSiteMembers(response.data.site || []); // Ensure response.data.site is handled correctly
        console.log('API response:', response.data);
      } catch (error) {
        setLoading(false);
        console.error('Error fetching site members:', error);
      }
    };

    if (siteId) {
      fetchSiteMembers();
    }
  }, [siteId]);

  return (
    <div>
      {showModal && (
        <div className="modal-backdrop fade-in-animation" data-bs-backdrop="true">
          <div className="modal-dialog slide-in-from-bottom h-auto">
            <div className="modal-content fade-in-animation p-0 h-none justify-content-start">
              <div className="w-100">
                <div className="d-flex justify-content-between w-100 border-bottom modal-header bg-light-blue rounded-top">
                  <div className="fs-xxl text-blue p-3">Add Site Issue</div>
                  <span onClick={handleClose} className="cursor-pointer text-black p-3">X</span>
                </div>
                <div className="w-100 modal-body text-info">
                  <div className="p-4">
                    <Formik
                      initialValues={initialValues}
                      validationSchema={validationSchema}
                      onSubmit={handleSubmit}
                    >
                      {({ setFieldValue, values }) => (
                        <Form>
                          <div className="row">
                            <div className="col-6">
                              <div className="mb-3">
                                <label className="text-black">Issue Title</label>
                                <span className="text-danger">*</span>
                               
                                <Field
                                  type="text"
                                  name="issueTitle"
                                  className="form-control mt-2"
                                />
                                <ErrorMessage name="issueTitle" component="div" className="text-danger" />
                              </div>
                              <div className="mb-3">
                                <label className="text-black">Work Category</label>
                                <Field
                                  as="select"
                                  name="workCategory"
                                  className="form-select mt-2"
                                >
                                  <option value="">Select work category</option>
                                  {workCategory.map(({ _id, name }) => (
                                    <option key={_id} value={_id}>{name}</option>
                                  ))}
                                </Field>
                                <ErrorMessage name="workCategory" component="div" className="text-danger" />
                              </div>
                              <div className="mb-3">
                                <label className="text-black">Due Date</label>
                                <Field
                                  type="date"
                                  name="dueDate"
                                  className="form-control mt-2"
                                  min={new Date().toISOString().split('T')[0]}
                                />
                                <ErrorMessage name="dueDate" component="div" className="text-danger" />
                              </div>
                            </div>
                            <div className="col-6">
                              <div className="mb-3">
                                <label className="text-black">Site Name</label>
                                <span className="text-danger">*</span>
                                <input
                                  type="text"
                                  className="form-control mt-2"
                                  value={editedData.sitename}
                                  onChange={(e) => setEditedData({ ...editedData, sitename: e.target.value })}
                                />
                              </div>
                              <div className="mb-3">
                                <label className="text-black">Site Floor</label>
                                <Field
                                  as="select"
                                  name="floor"
                                  className="form-select mt-2"
                                >
                                  <option value="">Select floor</option>
                                  {floors.map(({ _id, name }) => (
                                    <option key={_id} value={_id}>{name}</option>
                                  ))}
                                </Field>
                                <ErrorMessage name="floor" component="div" className="text-danger" />
                              </div>
                               <div className="mb-3">
                                <label className="text-black">Assign to</label>
                                <span className="text-danger">*</span>
                                <Select
                                  name="assignUser"
                                  options={invitationAcceptedMembers}
                                  isMulti
                                  onChange={(selectedOptions) => {
                                    setFieldValue('assignUser', selectedOptions);
                                    console.log('Selected Users:', selectedOptions);
                                  }}
                                  value={values.assignUser}
                                  placeholder="Select Members"
                                  classNamePrefix="react-select"
                                />
                                <ErrorMessage name="assignUser" component="div" className="text-danger" />
                              </div>
                            </div>
                          </div>
                          <div className="mb-3">
                            <label className="text-black">Attachments</label>
                            <input
                              type="file"
                              className="form-control"
                              multiple
                              onChange={handleFileChange}
                            />
                          </div>
                          <div className="mb-3">
                            <label className="text-black">Description</label>
                            <Field
                              as="textarea"
                              name="description"
                              className="form-control"
                              style={{ height: '100px', maxWidth: '100%' }}
                            />
                            <ErrorMessage name="description" component="div" className="text-danger" />
                          </div>
                          <div className="mt-5 w-50 m-auto">
                            <button
                              type="submit"
                              className="text-white m-auto w-100 bg-btn-bg auth_btn"
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
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AddSiteIssue;
