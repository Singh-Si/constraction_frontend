import React, { useEffect, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { FaChevronDown } from 'react-icons/fa';
import { useDispatch, useSelector } from "react-redux";
import { getSiteAsync } from "@/store/createSite/GetSites";
import { getAllmember } from "@/store/member/allmember";
import { fetchMaterialBomAsync } from "@/store/material/Bom";
import axios from "axios";
import * as Yup from 'yup';
import { toast } from "react-toastify";
import config from "@/config/config";
import { parseCookies } from "nookies";

const MaterialNewIssue = () => {
  const dispatch = useDispatch();
  const [siteDetails, setSiteDetails] = useState([]);
  const [members, setMembers] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [formData, setFormData] = useState({
    issued_name: '',
    sub_category: '',
    site: '',
    materialName: '',
    transferQuantity: '',
    issuedTo: '',
    checkedBy: '',
    remarks: '',
    task: '',
    imageUpload: null
  });
  const { token, currentOrganizationId } = parseCookies();

  const siteData = useSelector((state) => state.getSiteAsync);
  const member = useSelector((state) => state.getAllmember);

  const handleAddAnotherMaterial = ()=>{
    con
  }

  const validationSchema = Yup.object({
    issued_name: Yup.string().required('Material Issued To is required'),
    site: Yup.string().required('Site is required'),
    materialName: Yup.string().required('Material Name is required'),
    transferQuantity: Yup.number().required('Transfer Quantity is required').positive('Must be positive'),
    issuedTo: Yup.string().required('Issued To is required'),
    checkedBy: Yup.string().required('Checked By is required'),
    remarks: Yup.string().required('Remarks is required')
  });

  const materialIssuedTo = [
    { name: 'Subcontractor' },
    { name: 'Other Site' }
  ];

  useEffect(() => {
    dispatch(getSiteAsync());
    dispatch(getAllmember());
  }, [dispatch]);

  useEffect(() => {
    if (siteData?.data?.sites) {
      setSiteDetails(siteData.data.sites);
    }
  }, [siteData]);

  useEffect(() => {
    if (member?.allMemberData?.members) {
      setMembers(member.allMemberData.members);
    }
  }, [member]);

  useEffect(() => {
    dispatch(fetchMaterialBomAsync());
  }, [dispatch]);

  useEffect(()=>{
    console.log(formData?.issued_name)
  })

  useEffect(() => {
    async function fetchMaterials() {
      try {
        const response = await axios.get(`${config.API_URL}/materials`, {
          params: {
            organization: currentOrganizationId,
          },
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log(response)
        if (response?.data?.success) {
          setMaterials(response?.data?.data);
        }
      } catch (error) {
        console.log(error?.response?.data?.error);
      }
    }

    fetchMaterials();
  }, [currentOrganizationId, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      imageUpload: file
    }));
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const formData = new FormData();
      Object.keys(values).forEach((key) => {
        if (key === 'imageUpload') {
          formData.append(key, values[key]);
        } else {
          formData.append(key, values[key]);
        }
      });

      const response = await axios.post(`${config.API_URL}/material-issue`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });

      if (response.data.success) {
        toast.success('Material issue created successfully');
      } else {
        toast.error('Failed to create material issue');
      }
    } catch (error) {
      toast.error('Error occurred while creating material issue');
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <div className="offcanvas offcanvas-end bg-white" tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel" data-bs-backdrop="static" style={{ width: '35%' }}>
        <div className="offcanvas-body p-0">
          <Formik
            enableReinitialize
            initialValues={formData}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ setFieldValue, values, isSubmitting }) => (
              <Form className="d-flex flex-column">
                <div className="offcanvas-header bg-light-blue mb-0">
                  <span className="offcanvas-title fw-bold text-blue" id="offcanvasRightLabel">
                    Material Issued
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
                    <div className="form-group col-6 text-start">
                      <label htmlFor="issued_name">
                        Material Issued To<span className="text-danger">*</span>
                      </label>
                      <Field
                        as="select"
                        name="issued_name"
                        id="issued_name"
                        className="form-select border-info position-relative"
                        onChange={handleChange}
                      >
                        {materialIssuedTo.map((issued) => (
                          <option key={issued.name} value={issued.name}>
                            {issued.name}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage
                        name="issued_name"
                        render={(msg) => <small style={{ color: "red" }}>{msg}</small>}
                      />

                    </div>
                    {formData?.issued_name ==="Subcontractor" ?  <div className="form-group col-6 text-start">
                      <label htmlFor="sub_category">
                        SUB-CATEGORY<span className="text-danger">*</span>
                      </label>
                      <Field
                        as="select"
                        name="sub_category"
                        id="sub_category"
                        className="form-select border-info position-relative"
                        onChange={handleChange}
                      >
                      </Field>
                      <ErrorMessage
                        name="sub_category"
                        render={(msg) => <small style={{ color: "red" }}>{msg}</small>}
                      />

                    </div> : null}
                  </div>
                  <div className="row">
                    <div className="form-group col-12 text-start">
                      <label htmlFor="site">
                        Site<span className="text-danger">*</span>
                      </label>
                      <Field
                        as="select"
                        name="site"
                        className="form-select border-info position-relative"
                        onChange={(e) => {
                          setFieldValue('site', e.target.value);
                          handleChange(e);
                        }}
                      >
                        <option value="">Select Site</option>
                        {siteDetails.map((site) => (
                          <option key={site._id} value={site._id}>
                            {site.name}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage
                        name="site"
                        render={(msg) => <small style={{ color: "red" }}>{msg}</small>}
                      />
                    </div>
                  </div>
                  <div className="form-group col-12 text-start" style={{marginLeft : '-0.4rem'}}>
                    <label htmlFor="materialName">
                      Material Name : (Available Quantity)<span className="text-danger">*</span>
                    </label>
                    <Field
                      as="select"
                      name="materialName"
                      className="form-select border-info position-relative"
                      onChange={(e) => {
                        setFieldValue('materialName', e.target.value);
                        handleChange(e);
                      }}
                    >
                      <option value="">Select Material</option>
                      {materials?.map((issued) => (
                          <option key={issued._id} value={issued?.brandName}>
                            {`${issued?.brandName} : ${issued?.inStocks}`}
                          </option>
                        ))}
                    </Field>
                    <ErrorMessage
                      name="materialName"
                      render={(msg) => <small style={{ color: "red" }}>{msg}</small>}
                    />
                  </div>
                  <div className="form-group col-12 text-start" style={{marginLeft : '-0.4rem'}}>
                    <label htmlFor="transferQuantity">
                      Transfer Quantity<span className="text-danger">*</span>
                    </label>
                    <Field
                      name="transferQuantity"
                      type="number"
                      className="form-control border-info position-relative"
                      onChange={(e) => {
                        setFieldValue('transferQuantity', e.target.value);
                        handleChange(e);
                      }}
                    />
                    <ErrorMessage
                      name="transferQuantity"
                      render={(msg) => <small style={{ color: "red" }}>{msg}</small>}
                    />
                  </div>
                  {formData?.issued_name === "Subcontractor" && (
  <div>
    <button 
      style={{ color: 'rgba(64, 87, 104, 1)', background: 'none', fontSize: "0.8rem", textAlign: 'left' }}
    >
      +ADD ANOTHER MATERIAL
    </button>

    <div className="form-group col-12 text-start" style={{marginLeft : "-0.4rem"}}>
      <label htmlFor="checkedBy">
        TASK<span className="text-danger">*</span>
      </label>
      <Field
        as="select"
        name="task"
        className="form-select border-info position-relative"
        onChange={(e) => {
          setFieldValue('task', e.target.value);
          handleChange(e);
        }}
      >
        <option value="">Select Task <FaChevronDown /></option>
        {members.map((mem) => (
          <option key={mem._id} value={mem._id}>
            {mem.user.name}
          </option>
        ))}
      </Field>
      <ErrorMessage
        name="task"
        render={(msg) => <small style={{ color: "red" }}>{msg}</small>}
      />
    </div>
  </div>
)}

                  <div className="row">
                    <div className="form-group col-5 text-start" style={{marginLeft : "0.1rem"}}>
                      <label htmlFor="issuedTo">
                        Issued To<span className="text-danger">*</span>
                      </label>
                      <Field
                        as="select"
                        name="issuedTo"
                        className="form-select border-info"
                        onChange={(e) => {
                          setFieldValue('issuedTo', e.target.value);
                          handleChange(e);
                        }}
                      >
                        <option value="">Select Member <FaChevronDown /></option>
                        {members.map((mem) => (
                          <option key={mem._id} value={mem._id}>
                            {mem.user.name}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage
                        name="issuedTo"
                        render={(msg) => <small style={{ color: "red" }}>{msg}</small>}
                      />
                    </div>
                    <div className="form-group col-6 text-start">
                      <label htmlFor="checkedBy">
                        Checked By<span className="text-danger">*</span>
                      </label>
                      <Field
                        as="select"
                        name="checkedBy"
                        className="form-select border-info position-relative"
                        onChange={(e) => {
                          setFieldValue('checkedBy', e.target.value);
                          handleChange(e);
                        }}
                      >
                        <option value="">Select Member <FaChevronDown /></option>
                        {members.map((mem) => (
                          <option key={mem._id} value={mem._id}>
                            {mem.user.name}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage
                        name="checkedBy"
                        render={(msg) => <small style={{ color: "red" }}>{msg}</small>}
                      />
                    </div>
                  </div>
                  <div className="form-group col-12 text-start"  style={{marginLeft : "-0.4rem"}}>
                    <label htmlFor="remarks">
                      Remarks
                    </label>
                    <Field
                      name="remarks"
                      type="text"
                      className="form-control border-info position-relative"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group text-start">
                    <label htmlFor="imageUpload">
                      Image Upload
                    </label>
                    <input
                      type="file"
                      id="imageUpload"
                      name="imageUpload"
                      className="form-control"
                      onChange={handleFileChange}
                    />
                  </div>
                  <div className="text-start p-3 mt-1">
                    <button
                      type="submit"
                      className="text-white m-auto w-100 auth_btn"
                      style={{ backgroundColor: 'rgba(32, 117, 169, 1)' }}
                      disabled={isSubmitting}
                    >
                      CREATE
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default MaterialNewIssue;
