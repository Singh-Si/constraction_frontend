<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { parseCookies } from 'nookies';
import config from '@/config/config';
import { Field, Form, Formik, ErrorMessage } from 'formik';
import Select from 'react-select';

const EditIssueModal = ({ issueId, showModal, handleCloseModal, fetchIssues }) => {
=======
import React, { useEffect, useState } from "react";
import axios from "axios";
import { parseCookies } from "nookies";
import config from "@/config/config";
import { Field, Form, Formik, ErrorMessage } from "formik";
import Select from "react-select";

const EditIssueModal = ({
  issueId,
  showModal,
  handleCloseModal,
  fetchIssues,
  issueData,
  editedData,
}) => {
>>>>>>> 463abe6 (frontend additonals changes made)
  const [loading, setLoading] = useState(false);
  const [floors, setFloors] = useState([]);
  const [data, setData] = useState(null);
  const [attachments, setAttachments] = useState([]);
  const [editFormValues, setEditFormValues] = useState({
<<<<<<< HEAD
    issueTitle: '',
    reason: '',
    workCategory: '',
    floor: '',
    dueDate: '',
    assignUser: [],
    status:''

  });
  const { token, siteId, currentOrganizationId } = parseCookies();
  const [invitationAcceptedMembers, setInvitationAcceptedMembers] = useState([]);
=======
    issueTitle: "",
    reason: "",
    workCategory: "",
    floor: "",
    dueDate: "",
    assignUser: [],
    status: "",
  });

  const { token, siteId, currentOrganizationId } = parseCookies();
  const [invitationAcceptedMembers, setInvitationAcceptedMembers] = useState(
    []
  );
>>>>>>> 463abe6 (frontend additonals changes made)
  const [siteMembers, setSiteMembers] = useState([]);

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormValues({
      ...editFormValues,
      [name]: value,
    });
  };
<<<<<<< HEAD

  const [workCategory, setWorkCategory] = useState([]);
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
=======
  const defaultValue = {
    defaultTitle: "",
    defaultworkCategory: "",
    floor: "",
    dueDate: "",
    status: "",
    reason: "",
  };

  const [workCategory, setWorkCategory] = useState([]);
  useEffect(() => {
    console.log(defaultValue.reason);

    const issueTitles = editedData?.map((issue) => issue.issueTitle);
    console.log(`ISSUEerwf : ${issueTitles[0]}`);
    // const workCategory = editedData?.map((issue) => issue.workCategory);
    // const floor = editedData?.map((issue) => issue.floor.name);
    // const dueDate = editedData?.map((issue) => issue.dueDate);
    // const status = editedData?.map((issue) => issue.status);
    const description = editedData?.map((issue) => issue.reason);
    defaultValue.defaultTitle = issueTitles[0];
    defaultValue.reason = description[0];
    // console.log(`Done : ${issuess} , Description : ${descriptions}`);

    const fetchInvitationAcceptedMembers = async () => {
      try {
        const response = await axios.get(
          `${config.API_URL}/site/getInvitationAcceptMembers`,
          {
            params: {
              organization: currentOrganizationId,
            },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Fetched Members:", response.data); // Log fetched data

        if (response?.data?.data) {
          const members = response.data.data.map((member) => ({
>>>>>>> 463abe6 (frontend additonals changes made)
            value: member.memberDetails._id,
            label: member.memberDetails.name,
          }));
          setInvitationAcceptedMembers(members);
        } else {
<<<<<<< HEAD
          console.error('Unexpected response structure:', response.data);
        }
      } catch (error) {
        console.error('Error fetching members:', error?.response?.data?.error || error.message);
=======
          console.error("Unexpected response structure:", response.data);
        }
      } catch (error) {
        console.error(
          "Error fetching members:",
          error?.response?.data?.error || error.message
        );
>>>>>>> 463abe6 (frontend additonals changes made)
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
<<<<<<< HEAD
        console.log('API response:', response.data);
      } catch (error) {
        setLoading(false);
        console.error('Error fetching site members:', error);
=======
        console.log("API response:", response.data);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching site members:", error);
>>>>>>> 463abe6 (frontend additonals changes made)
      }
    };

    if (siteId) {
      fetchSiteMembers();
    }
  }, [siteId]);
  useEffect(() => {
    async function fetchWorkCategory() {
      try {
<<<<<<< HEAD
        const response = await axios.get(`https://construction-backend.onrender.com/work-categories?organization=${currentOrganizationId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
=======
        const response = await axios.get(
          `https://construction-backend.onrender.com/work-categories?organization=${currentOrganizationId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
>>>>>>> 463abe6 (frontend additonals changes made)

        if (response?.data?.workCategories) {
          setWorkCategory(response?.data?.workCategories);
        }
      } catch (error) {
        console.log(error, "error");
      }
    }

    fetchWorkCategory();
  }, [currentOrganizationId, token]);

  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();
<<<<<<< HEAD
      formData.append('issueTitle', values?.issueTitle);
      formData.append('workCategory', values?.workCategory);
      formData.append('floor', values?.floor);
      formData.append('dueDate', values?.dueDate);
      formData.append('reason', values?.reason);
      formData.append('status', values?.status);

      const assignUserIds = values.assignUser.map(user => user.value);
      assignUserIds.forEach(id => {
        formData.append('assignUser', id);
      });

      attachments.forEach((file) => {
        formData.append('attachments', file);
      });


=======
      formData.append("issueTitle", values?.issueTitle);
      formData.append("workCategory", values?.workCategory);
      formData.append("floor", values?.floor);
      formData.append("dueDate", values?.dueDate);
      formData.append("reason", values?.reason);
      formData.append("status", values?.status);

      const assignUserIds = values.assignUser.map((user) => user.value);
      assignUserIds.forEach((id) => {
        formData.append("assignUser", id);
      });

      attachments.forEach((file) => {
        formData.append("attachments", file);
      });

>>>>>>> 463abe6 (frontend additonals changes made)
      const response = await axios.put(
        `${config.API_URL}/issue/update`,
        formData,
        {
          params: {
            organization: currentOrganizationId,
            site: siteId,
            siteIssueId: issueId,
          },
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response?.data) {
<<<<<<< HEAD

        setEditFormValues(response.data);
        console.log(response.data, "Updated issue successfully");
        handleCloseModal();

      } else {
        console.error('No issue data found:', response?.data);
      }
    } catch (error) {
      console.error('Error updating issue:', error.response?.data?.error);
=======
        setEditFormValues(response.data);
        console.log(response.data, "Updated issue successfully");
        handleCloseModal();
      } else {
        console.error("No issue data found:", response?.data);
      }
    } catch (error) {
      console.error("Error updating issue:", error.response?.data?.error);
>>>>>>> 463abe6 (frontend additonals changes made)
    }
  };

  useEffect(() => {
    const fetchFloorData = async () => {
      try {
<<<<<<< HEAD
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/floors`, {
          headers: { Authorization: `Bearer ${token}` },
          params: { organization: currentOrganizationId, site: siteId },
        });
        setFloors(response?.data?.floors || []);
      } catch (error) {
        console.error('Error fetching floor data:', error.message);
=======
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/floors`,
          {
            headers: { Authorization: `Bearer ${token}` },
            params: { organization: currentOrganizationId, site: siteId },
          }
        );
        setFloors(response?.data?.floors || []);
      } catch (error) {
        console.error("Error fetching floor data:", error.message);
>>>>>>> 463abe6 (frontend additonals changes made)
      }
    };

    if (token && currentOrganizationId && siteId) {
      fetchFloorData();
    }
  }, [token, currentOrganizationId, siteId]);

  useEffect(() => {
    const fetchSiteData = async () => {
      try {
<<<<<<< HEAD
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/site`, {
          headers: { Authorization: `Bearer ${token}` },
          params: { organization: currentOrganizationId, site: siteId },
        });
=======
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/site`,
          {
            headers: { Authorization: `Bearer ${token}` },
            params: { organization: currentOrganizationId, site: siteId },
          }
        );
>>>>>>> 463abe6 (frontend additonals changes made)
        const siteData = response?.data?.site;
        setData(siteData);
        setEditFormValues({ sitename: siteData?.name });
      } catch (error) {
<<<<<<< HEAD
        console.error('Error fetching site settings:', error.message);
=======
        console.error("Error fetching site settings:", error.message);
>>>>>>> 463abe6 (frontend additonals changes made)
      }
    };

    if (token && currentOrganizationId && siteId) {
      fetchSiteData();
    }
  }, [token, currentOrganizationId, siteId]);

  const handleFileChange = (e) => {
    setAttachments(Array.from(e.target.files));
  };

  return (
    <div>
      {showModal && (
<<<<<<< HEAD
        <div className="modal-backdrop fade-in-animation overflow-scroll " data-bs-backdrop="true" >
          <div className="modal-dialog slide-in-from-bottom h-auto  overflow-scroll">
            <div className="modal-content fade-in-animation p-0 h-none justify-content-start ">
              <div className="w-100"style={{ height: '80vh' }} >
                <div className="d-flex justify-content-between w-100 border-bottom modal-header bg-light-blue rounded-top">
                  <div className="fs-xxl text-blue p-3">Edit Site Issue</div>
                  <span onClick={handleCloseModal} className="cursor-pointer text-black p-3">X</span>
=======
        <div
          className="modal-backdrop fade-in-animation overflow-scroll "
          data-bs-backdrop="true"
        >
          <div className="modal-dialog slide-in-from-bottom h-auto  overflow-scroll">
            <div className="modal-content fade-in-animation p-0 h-none justify-content-start ">
              <div className="w-100" style={{ height: "80vh" }}>
                <div className="d-flex justify-content-between w-100 border-bottom modal-header bg-light-blue rounded-top">
                  <div className="fs-xxl text-blue p-3">Edit Site Issue</div>
                  <span
                    onClick={handleCloseModal}
                    className="cursor-pointer text-black p-3"
                  >
                    X
                  </span>
>>>>>>> 463abe6 (frontend additonals changes made)
                </div>
                <div className="w-100 modal-body text-info">
                  <div className="p-4">
                    <Formik
                      initialValues={{
<<<<<<< HEAD
                        issueTitle: '',
                        reason: '',
                        workCategory: '',
                        floor: '',
                        dueDate: '',
                        assignUser: [],
                        reason: '',
                        status: '' 

                      }}
                      onSubmit={handleSubmit}
                    >
                      {({setFieldValue, values, handleChange }) => (
                        <Form>
                          <div className="modal-body">
                            <div className="mb-3">
                              <label className="form-label text-black">Issue Title</label>
=======
                        issueTitle: "",
                        reason: "",
                        workCategory: "",
                        floor: "",
                        dueDate: "",
                        assignUser: [],
                        reason: "",
                        status: "",
                      }}
                      onSubmit={handleSubmit}
                    >
                      {({ setFieldValue, values, handleChange }) => (
                        <Form>
                          <div className="modal-body">
                            <div className="mb-3">
                              <label className="form-label text-black">
                                Issue Title
                              </label>
>>>>>>> 463abe6 (frontend additonals changes made)
                              <Field
                                type="text"
                                name="issueTitle"
                                value={values.issueTitle}
<<<<<<< HEAD
=======
                                // value={defaultValue.defaultTitle}
>>>>>>> 463abe6 (frontend additonals changes made)
                                onChange={handleChange}
                                className="form-control"
                                required
                              />
                            </div>
                            <div className="mb-3">
<<<<<<< HEAD
                              <label className="form-label text-black">Description</label>
=======
                              <label className="form-label text-black">
                                Description
                              </label>
>>>>>>> 463abe6 (frontend additonals changes made)
                              <Field
                                type="text"
                                name="reason"
                                value={values.reason}
<<<<<<< HEAD
=======
                                // value={defaultValue.reason}
>>>>>>> 463abe6 (frontend additonals changes made)
                                onChange={handleChange}
                                className="form-control"
                                required
                              />
                            </div>
                            <div className="mb-3">
<<<<<<< HEAD
                              <label className="form-label  text-black">Work Category</label>
=======
                              <label className="form-label  text-black">
                                Work Category
                              </label>
>>>>>>> 463abe6 (frontend additonals changes made)
                              <Field
                                as="select"
                                name="workCategory"
                                className="form-select"
                                onChange={handleChange}
                              >
                                <option value="">Select work category</option>
                                {workCategory.map(({ _id, name }) => (
<<<<<<< HEAD
                                  <option key={_id} value={_id}>{name}</option>
                                ))}
                              </Field>
                              <ErrorMessage name="workCategory" component="div" className="text-danger" />
                            </div>
                            <div className="mb-3">
                              <label className="form-label  text-black">Site Floor</label>
=======
                                  <option key={_id} value={_id}>
                                    {name}
                                  </option>
                                ))}
                              </Field>
                              <ErrorMessage
                                name="workCategory"
                                component="div"
                                className="text-danger"
                              />
                            </div>
                            <div className="mb-3">
                              <label className="form-label  text-black">
                                Site Floor
                              </label>
>>>>>>> 463abe6 (frontend additonals changes made)
                              <Field
                                as="select"
                                name="floor"
                                className="form-select"
                                required
                                onChange={handleChange}
                              >
                                <option value="">Select floor</option>
                                {floors.map(({ _id, name }) => (
<<<<<<< HEAD
                                  <option key={_id} value={_id}>{name}</option>
                                ))}
                              </Field>
                              <ErrorMessage name="floor" component="div" className="text-danger" />
                            </div>
                            <div className="mb-3">
                                <label className="text-black">Assign to</label>
                                {/* <span className="text-danger">*</span> */}
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
                              <label className="form-label  text-black">Due Date</label>
=======
                                  <option key={_id} value={_id}>
                                    {name}
                                  </option>
                                ))}
                              </Field>
                              <ErrorMessage
                                name="floor"
                                component="div"
                                className="text-danger"
                              />
                            </div>
                            <div className="mb-3">
                              <label className="text-black">Assign to</label>
                              {/* <span className="text-danger">*</span> */}
                              <Select
                                name="assignUser"
                                options={invitationAcceptedMembers}
                                isMulti
                                onChange={(selectedOptions) => {
                                  setFieldValue("assignUser", selectedOptions);
                                  console.log(
                                    "Selected Users:",
                                    selectedOptions
                                  );
                                }}
                                value={values.assignUser}
                                placeholder="Select Members"
                                classNamePrefix="react-select"
                              />
                              <ErrorMessage
                                name="assignUser"
                                component="div"
                                className="text-danger"
                              />
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
                              <label className="form-label  text-black">
                                Due Date
                              </label>
>>>>>>> 463abe6 (frontend additonals changes made)
                              <Field
                                type="date"
                                name="dueDate"
                                value={values.dueDate}
                                onChange={handleChange}
                                className="form-control"
                                required
                              />
                            </div>
                            <div className="mb-3">
<<<<<<< HEAD
                              <label className="form-label text-black">Status</label>
                              <Field
              as="select"
              name="status"
              value={values.status}
              onChange={handleChange}
              className="form-select"
            >
              <option value="Pending">Pending</option>
              <option value="Resolved">Resolved</option>
            </Field>
            <ErrorMessage name="status" component="div" className="text-danger" />
          </div>
                          </div>
                          <div className="mt-5 w-50 m-auto">
                            <button type="submit" className="text-white m-auto w-100 bg-btn-bg auth_btn"
                            >Update Issue</button>
=======
                              <label className="form-label text-black">
                                Status
                              </label>
                              <Field
                                as="select"
                                name="status"
                                value={values.status}
                                onChange={handleChange}
                                className="form-select"
                              >
                                <option value="Pending">Pending</option>
                                <option value="Resolved">Resolved</option>
                              </Field>
                              <ErrorMessage
                                name="status"
                                component="div"
                                className="text-danger"
                              />
                            </div>
                          </div>
                          <div className="mt-5 w-50 m-auto">
                            <button
                              type="submit"
                              className="text-white m-auto w-100 bg-btn-bg auth_btn"
                            >
                              Update Issue
                            </button>
>>>>>>> 463abe6 (frontend additonals changes made)
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
<<<<<<< HEAD
}
=======
};
>>>>>>> 463abe6 (frontend additonals changes made)

export default EditIssueModal;
