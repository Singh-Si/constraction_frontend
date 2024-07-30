<<<<<<< HEAD
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import config from '@/config/config';
import nookies, { parseCookies } from 'nookies';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import * as Yup from "yup";

const SiteSetting = ({ siteSettingData, siteId }) => {
    const [data, setData] = useState(siteSettingData);
    const [file, setFile] = useState(null);
    const [isInputField, setIsInputField] = useState(false);
    const [showBtn, setShowBtn] = useState(false);
    const [endDateState, setEndDateState] = useState([]);
    const [isImageChanged, setIsImageChanged] = useState(false);
    const [editedData, setEditedData] = useState({
        sitename: data?.name,
        startdate: data?.startDate,
        enddate: data?.endDate,
    });

    const { currentOrganizationId, token } = parseCookies();
    const { organizations } = useSelector((state) => state?.getOrganizationAsync?.userData);
    const router = useRouter();

    const matchOrganization = organizations && organizations?.find(
        (org) => org._id === currentOrganizationId
    );

    const initialValues = {
        sitename: data?.name || "",
        organizationname: matchOrganization?.name || "",
        startdate: data?.startDate || "",
        enddate: data?.endDate || "",
    }

    const validationSchema = Yup.object({
        sitename: Yup.string().required("Name is required"),
        // startdate: Yup.string().required("Start Date is required"),
        // startdate: Yup,
        // enddate: Yup.string().required("Name is required"),
    })

    function formatDate(date) {
        return date.toISOString().split('T')[0];
    }

    function CreateDate() {
        const formattedDate = new Date();
        return formatDate(formattedDate);
    }

    const handleEditField = () => {
        setIsInputField(true);
    }

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        setIsImageChanged(true);
    };

    const handleImageClick = () => {
        if (isInputField) {
            document.getElementById('fileInput').click();
        }
    };

    const handleCancelImage = () => {
        setEditedData((prevData) => ({
            ...prevData,
            imageUrl: data && data?.profile?.url
        }))
    }

    const onSubmit = async (values) => {
        const formData = new FormData();
        formData.append("attachment", file);
        formData.append("name", values?.sitename);
        formData.append("organizationname", null);
        formData.append("startDate", values?.startdate);
        formData.append("endDate", values?.enddate);

        const response = await axios.patch(`${config.API_URL}/site/update`, formData, {
            headers: {
                "Authorization": `Bearer ${token}`,
            },
            params: {
                organization: currentOrganizationId,
                site: siteId
            },
        });

        const updatedData = response?.data;

        if (updatedData.success) {
            toast.success(updatedData.message, { position: "top-center" })
            router.push(router.asPath)
        }
    }


    useEffect(() => {
        // Check if any of the edited fields are different from their original values
        const isEdited =
            editedData?.sitename !== data?.name ||
            editedData?.startdate !== data?.startDate ||
            editedData?.enddate !== data?.endDate;

        const hasFile = !!file;
        setShowBtn(isEdited || hasFile);
    }, [editedData, file]);

    useEffect(() => {
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setEditedData((prevData) => ({
                    ...prevData,
                    imageUrl: reader.result,
                }));
            };
            reader.readAsDataURL(file);
        }
    }, [file]);

    return (
        <>
            <div className='row'>
                <div className='col-2'>
                    <img
                        src={editedData?.imageUrl || data?.profile?.url || 'https://i.pinimg.com/736x/f7/cf/28/f7cf289d18863f4c8e5b783338d12846.jpg'}
                        alt='upload_icon'
                        width={180}
                        height={180}
                        onClick={handleImageClick}
                        className={`hover-items ${isInputField && "cursor-pointer"} rounded-circle`}
                    />

                    <input
                        type='file'
                        id='fileInput'
                        className='form-control d-none'
                        onChange={handleFileChange}
                    />
                </div>

                <div className="col-9">
                    <div className="tab-content">
                        <div
                            role="tabpanel"
                            id="react-aria2791842971-:r1a:-tabpane-1"
                            aria-labelledby="react-aria2791842971-:r1a:-tab-1"
                            className="fade tab-pane active show"
                        >
                            <div className="row" style={{ position: "relative" }}>
                                <div className="col">
                                    <Formik
                                        enableReinitialize
                                        initialValues={initialValues}
                                        validationSchema={validationSchema}
                                        onSubmit={onSubmit}
                                    >
                                        {({ values, setFieldValue, resetForm, isSubmitting }) => {
                                            return <Form>
                                                <span className='position-absolute' style={{ right: 10 }}>
                                                    {isInputField &&
                                                        <div className='d-flex'>
                                                            <button type='button' className="m-auto p-1 edit_btn me-3"
                                                                onClick={() => {
                                                                    setIsInputField(false);
                                                                    resetForm();
                                                                    handleCancelImage()
                                                                }}
                                                            >
                                                                Cancel
                                                            </button>

                                                            <button type='submit' className="d-flex justify-content-center align-items-center m-auto p-1 edit_btn"
                                                                disabled={!values?.sitename || !showBtn || isSubmitting}
                                                            >
                                                                {isSubmitting ?
                                                                    <>
                                                                        <span className="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>
                                                                        <span role="status">Loading...</span>
                                                                    </>
                                                                    : <div className='text-center'> <i className="bi bi-floppy me-2"></i>Save</div>
                                                                }
                                                            </button>
                                                        </div>
                                                    }

                                                    {
                                                        !isInputField &&
                                                        <button type='button' className="d-flex justify-content-center align-items-center m-auto p-1 text-white edit_btn bg-btn-bg" onClick={handleEditField}>
                                                            <i className="mx-2 bi bi-pencil-square"></i>
                                                            Edit
                                                        </button>
                                                    }
                                                </span>

                                                <div className="row">
                                                    <div className="col-6">
                                                        <div className="mb-4">
                                                            <div className='col-6'>
                                                                <label className="form-label">Site Name</label>
                                                            </div>
                                                            {isInputField ? <Field
                                                                name="sitename"
                                                                placeholder="Enter Site name"
                                                                type="text"
                                                                className="form-control border-none"
                                                                onChange={(e) => {
                                                                    setFieldValue("sitename", e.target.value);
                                                                    setEditedData({ ...editedData, sitename: e.target.value });
                                                                }}
                                                            />
                                                                :
                                                                <div className='font_light'>{data?.name || "N/A"}</div>}

                                                            <ErrorMessage
                                                                name="sitename"
                                                                render={(msg) => (
                                                                    <small style={{ color: "red" }}>{msg}</small>
                                                                )}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className='row'>
                                                    <div className="col-6">
                                                        <div className="mb-4">
                                                            <div className='col-6'>
                                                                <label className="form-label">Organization Name</label>
                                                            </div>
                                                            {isInputField ? <Field
                                                                type="text"
                                                                name="organizationname"
                                                                placeholder="Enter your first name"
                                                                className="form-control "
                                                                disabled
                                                            >
                                                            </Field>
                                                                :
                                                                <div className='font_light'>
                                                                    {matchOrganization ? matchOrganization?.name : "N/A"}
                                                                </div>
                                                            }
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className='row'>
                                                    <div className="col-3">
                                                        <div className="mb-4">
                                                            <div className='col-6'>
                                                                <label className="form-label"><i className="bi bi-calendar-event"></i> Start Date</label>
                                                            </div>
                                                            {isInputField ? <Field
                                                                name="startdate"
                                                                placeholder="Enter your first name"
                                                                type="date"
                                                                className="form-control"
                                                                onChange={(e) => {
                                                                    setFieldValue("startdate", e.target.value);
                                                                    setEditedData({ ...editedData, startdate: e.target.value });
                                                                    const newStartDate = e.target.value;
                                                                    const nextDay = new Date(newStartDate);
                                                                    nextDay.setDate(nextDay.getDate() + 1);
                                                                    const formattedNextDay = nextDay.toISOString().split('T')[0];
                                                                    setEndDateState(formattedNextDay);
                                                                }}
                                                                min={CreateDate()}
                                                            /> :
                                                                <div className='font_light'>{data?.startDate || "N/A"}</div>}
                                                        </div>
                                                    </div>

                                                    <div className="col-3">
                                                        <div className="mb-4">
                                                            <div className='col-6'>
                                                                <label className="form-label"><i className="bi bi-calendar-event"></i> End Date</label>
                                                            </div>
                                                            {isInputField ? <Field
                                                                name="enddate"
                                                                placeholder="Enter your first name"
                                                                type="date"
                                                                className="form-control"
                                                                onChange={(e) => {
                                                                    setFieldValue("enddate", e.target.value);
                                                                    setEditedData({ ...editedData, enddate: e.target.value });
                                                                }}
                                                                min={endDateState}
                                                            /> :
                                                                <div className='font_light'>{data?.endDate || "N/A"}</div>}
                                                        </div>
                                                    </div>
                                                </div>
                                            </Form>
                                        }}
                                    </Formik>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >

            <hr />
            <div className='row' style={{ height: "120px" }}>
                <div className='col-4'>
                    <Link href={`/sites/sitemember`} className='text-decoration-none text-black'>
                        <div className='border rounded-4 h-75 border-black d-flex p-2 gap-3'>
                            <div className='d-flex align-items-center mx-3  '>
                                <Image src="/assets/images/members-icon.png" alt="members-icon" width={40} height={40} />
                            </div>

                            <div className='d-flex flex-column justify-content-center'>
                                <span className='fw-bold'>Site Members</span>
                                <small className='text-darkgrey '> Manage members of this site also  add new members</small>
                            </div>
                        </div>
                    </Link>

                </div>
                <div className='col-4'>
                    <Link href="/sites/purchase-order" className='text-decoration-none text-black'>
                        <div className='border rounded-4 h-75 border-black d-flex p-4 gap-3'>
                            <div className='d-flex flex-direction-column align-items-center'>
                                <Image src="/assets/images/members-icon.png" alt="members-icon" width={40} height={40} />
                            </div>

                            <div className='d-flex flex-column justify-content-center'>
                                <span className='fw-bold'>Purchase Orders Settings</span>
                                <small className='text-darkgrey '>sdfds</small>
                            </div>
                        </div>
                    </Link>
                </div>

                {/* <div className='col-4' >
                    <Link href="/sites/approval-setting" className='text-decoration-none text-black'>
                        <div className='border rounded-4 h-75 border-black d-flex p-3 gap-3 '>
                            <div className='d-flex align-items-center '>
                                <Image src="/assets/images/approvalImg.png" alt="approvalImg" width={40} height={40} />
                            </div>
                            <div className='d-flex flex-column justify-content-center'>
                                <span className='fw-bold'>Approval Settings</span>
                                <small className='text-darkgrey '>Material Modules</small>
                            </div>
                        </div>
                    </Link>
                </div> */}
            </div >
            <div className=' row mt-4 bg-gray p-3 border-top'>
                <span className='fw-bold'>Upload Site Related Documments</span>
            </div>
            <div className='row'>
                <div>

                    <button type='button' className='bg-light-blue fw-bold rounded m-4 p-2'><i className="bi bi-box-arrow-in-down"></i> Upload</button>
                </div>
            </div>
        </>
    )
}
=======
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import config from "@/config/config";
import nookies, { parseCookies } from "nookies";
import { ErrorMessage, Field, Form, Formik } from "formik";

import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { Button, ButtonGroup, Input } from "@chakra-ui/react";

const SiteSetting = ({ siteSettingData, siteId, imageData }) => {
  const [data, setData] = useState(siteSettingData);
  const [file, setFile] = useState(null);
  const [isInputField, setIsInputField] = useState(false);
  const [isImageChanged, setIsImageChanged] = useState(false);
  const [uploadImage, setUploadImage] = useState(null);
  const [editedPage, setEditedPage] = useState(false);
  const [formData, setFormData] = useState({
    name: data.name,
    address: "",
    state: "",
    sitePoc: "",
    projectPoc: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDeleteImage = (e) => {
    console.log(`image deleted`);
  };

  const [editedData, setEditedData] = useState({
    sitename: data?.name,
    startdate: data?.startDate,
    enddate: data?.endDate,
  });

  const { currentOrganizationId, token } = parseCookies();
  const { organizations } = useSelector(
    (state) => state?.getOrganizationAsync?.userData
  );
  const router = useRouter();

  const matchOrganization =
    organizations &&
    organizations?.find((org) => org._id === currentOrganizationId);

  const initialValues = {
    sitename: data?.name || "",
    organizationname: matchOrganization?.name || "",
    startdate: data?.startDate || "",
    enddate: data?.endDate || "",
  };

  const validationSchema = Yup.object({
    sitename: Yup.string().required("Name is required"),
    // startdate: Yup.string().required("Start Date is required"),
    // startdate: Yup,
    // enddate: Yup.string().required("Name is required"),
  });

  function formatDate(date) {
    return date.toISOString().split("T")[0];
  }

  function CreateDate() {
    const formattedDate = new Date();
    return formatDate(formattedDate);
  }

  const handleEditField = () => {
    setIsInputField(true);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setIsImageChanged(true);
  };

  const handleImageClick = () => {
    if (isInputField) {
      document.getElementById("fileInput").click();
    }
  };

  const handleUploadedImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadImage(file);
    }
  };
  const handleCancelImage = () => {
    setEditedData((prevData) => ({
      ...prevData,
      imageUrl: data && data?.profile?.url,
    }));
  };
  const handleEdit = () => {
    setEditedPage(true);
  };

  const onSubmit = async (values) => {
    const formData = new FormData();
    formData.append("attachment", file);
    formData.append("name", values?.sitename);
    formData.append("organizationname", null);
    formData.append("startDate", values?.startdate);
    formData.append("endDate", values?.enddate);

    const response = await axios.patch(
      `${config.API_URL}/site/update`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          organization: currentOrganizationId,
          site: siteId,
        },
      }
    );

    const updatedData = response?.data;

    if (updatedData.success) {
      toast.success(updatedData.message, { position: "top-center" });
      router.push(router.asPath);
    }
  };

  useEffect(() => {
    console.log(data);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedData((prevData) => ({
          ...prevData,
          imageUrl: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  }, [file]);

  //   handling submit
  const handleSubmit = () => {
    console.log("handlingSubmit");
    // location.href = "/sites/site-setting";
    router.push("/sites/site-setting");
  };

  // uploading a file . Making a post request
  const handleImageRequest = async () => {
    try {
      const formData = new FormData();
      formData.append("attachment", uploadImage);
      const response = await fetch(
        `https://construction-backend.onrender.com/site/updateSideDoccumnet?organization=${currentOrganizationId}&site=${siteId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      if (data.success === true) {
        toast.success("Image Uploaded Successfully", {
          position: "top-center",
        });
        router.push("/sites/site-setting");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (uploadImage) {
      handleImageRequest();
    }
  }, [uploadImage, currentOrganizationId, siteId, token]);

  return (
    <>
      {!editedPage ? (
        <div>
          <span
            style={{
              backgroundColor: "#e3f4ff",
              padding: "0.4rem 2rem",
              borderRadius: "10px",
            }}
          >
            {data?.name}
          </span>
          <div className="site-profile">
            <div className="site-profile-heading">SITE DETAILS</div>
            <div className="site-profile-main-content">
              <div className="site-profile-sub-content">
                <img
                  src="/assets/images/document.png"
                  style={{
                    width: "200px",
                    height: "200px",
                    marginLeft: "1rem",
                  }}
                  alt=""
                />
                <div>
                  <div className="site-design">Site Name</div>
                  <p>{data?.name}</p>
                  <div className="site-design" style={{ marginTop: "3.5rem" }}>
                    Address
                  </div>
                  <p>DLF PHASE 1</p>
                  <div className="site-design" style={{ marginTop: "3.5rem" }}>
                    Site POC (Point of Contact)
                  </div>
                  <p>NULL</p>
                </div>
                <div style={{ marginRight: "18rem", marginTop: "6.5rem" }}>
                  <div className="site-design">State</div>
                  <p>Haryana</p>
                  <div className="site-design" style={{ marginTop: "3.5rem" }}>
                    Office POC (Point of Contact)
                  </div>
                  <p>NULL</p>
                </div>

                <div>
                  <Button
                    variant="outline"
                    colorScheme="teal"
                    style={{
                      background: "none",
                      border: "1px solid #2A3E4E",
                      padding: "0.1rem 0.6rem",
                      borderRadius: "5px",
                    }}
                    onClick={handleEdit}
                  >
                    <span style={{ marginRight: "0.3rem" }}>
                      <Image
                        src="/assets/images/edit-2.png"
                        alt="members-icon"
                        width={20}
                        height={20}
                      />
                    </span>
                    Edit
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <span
            style={{
              backgroundColor: "#e3f4ff",
              padding: "0.4rem 2rem",
              borderRadius: "10px",
            }}
          >
            {data?.name}
          </span>
          <div className="site-profile">
            <div className="site-profile-heading">SITE DETAILS</div>
            <div className="site-profile-main-content">
              <div className="site-profile-sub-content">
                <img
                  src="/assets/images/document.png"
                  style={{
                    width: "200px",
                    height: "200px",
                    marginLeft: "1rem",
                  }}
                  alt=""
                />
                <form onSubmit={handleSubmit}>
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <div style={{ marginRight: "100px" }}>
                      <label>
                        Name:
                        <br />
                        <input
                          type="text"
                          name="name"
                          className="site-input-design-detail"
                          value={formData.name}
                          onChange={handleInputChange}
                        />
                      </label>
                      <br />
                      <label>
                        Address:
                        <br />
                        <input
                          type="text"
                          className="site-input-design-detail"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                        />
                      </label>
                      <br />
                      <label>
                        State:
                        <br />
                        <input
                          type="text"
                          className="site-input-design-detail"
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                        />
                      </label>
                    </div>
                    <div>
                      <label>
                        Site Point of Contact:
                        <br />
                        <input
                          type="text"
                          className="site-input-design-detail"
                          name="sitePoc"
                          value={formData.sitePoc}
                          onChange={handleInputChange}
                        />
                      </label>
                      <br />
                      <label>
                        Project Point of Contact:
                        <br />
                        <input
                          type="text"
                          className="site-input-design-detail"
                          name="projectPoc"
                          value={formData.projectPoc}
                          onChange={handleInputChange}
                        />
                      </label>
                    </div>
                  </div>
                  <br />
                </form>

                <div>
                  <Button
                    onClick={handleSubmit}
                    variant="outline"
                    colorScheme="teal"
                    style={{
                      background: "none",
                      border: "1px solid #2A3E4E",
                      padding: "0.1rem 0.6rem",
                      borderRadius: "5px",
                    }}
                  >
                    <span style={{ marginRight: "0.3rem" }}>
                      <Image
                        src="/assets/images/document.png"
                        alt="members-icon"
                        width={20}
                        height={20}
                      />
                    </span>
                    SAVE
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div
        className="row"
        style={{
          height: "120px",
          marginTop: "1rem",
          width: "1000px",
          marginLeft: "9rem",
        }}
      >
        <div className="col-4">
          <Link
            href={`/sites/sitemember`}
            className="text-decoration-none text-black"
          >
            <div className="h-75  d-flex p-2 gap-3 site-border-design">
              <div className="d-flex align-items-center mx-3  ">
                <Image
                  src="/assets/images/user-tag.png"
                  alt="members-icon"
                  width={40}
                  height={40}
                />
              </div>

              <div className="d-flex flex-column justify-content-center">
                <span className="fw-bold">Site Members</span>
                <small className="text-darkgrey" style={{ color: "#000000" }}>
                  {" "}
                  Add and Manage Members
                </small>
              </div>
            </div>
          </Link>
        </div>
        <div className="col-4">
          <Link
            href="/sites/purchase-order"
            className="text-decoration-none text-black"
          >
            <div className="h-75 border-black d-flex p-4 gap-3 site-border-design">
              <div className="d-flex flex-direction-column align-items-center">
                <Image
                  src="/assets/images/wallet-3.png"
                  alt="members-icon"
                  width={40}
                  height={40}
                />
              </div>

              <div className="d-flex flex-column justify-content-center">
                <span className="fw-bold">
                  Purchase Order <br /> Settings
                </span>
                {/* <small className="text-darkgrey ">sdfds</small> */}
              </div>
            </div>
          </Link>
        </div>
        <div className="col-4">
          <Link
            href="/sites/purchase-order"
            className="text-decoration-none text-black"
          >
            <div className="h-75 border-black d-flex p-4 gap-3 site-border-design">
              <div className="d-flex flex-direction-column align-items-center">
                <Image
                  src="/assets/images/user-tag.png"
                  alt="members-icon"
                  width={40}
                  height={40}
                />
              </div>

              <div className="d-flex flex-column justify-content-center">
                <span className="fw-bold">Approval Setting </span>
                <small className="text-darkgrey ">All Modules</small>
              </div>
            </div>
          </Link>
        </div>
      </div>
      <div className=" row mt-4 bg-gray p-3 border-top">
        <span className="fw-bold">Upload Site Related Documments</span>
      </div>
      <div className="row">
        <div>
          <form onSubmit={(e) => e.preventDefault()}>
            <input
              type="file"
              accept="image/*"
              id="file-input"
              onChange={handleUploadedImage}
              style={{ display: "none" }}
            />
            <label
              htmlFor="file-input"
              className="bg-light-blue fw-bold rounded m-4 p-2"
              style={{
                display: "inline-block",
                cursor: "pointer",
              }}
            >
              <i className="bi bi-box-arrow-in-down"></i> Upload
            </label>
          </form>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {imageData?.site
            .slice(0)
            .reverse()
            .map((sites, index) => {
              let siteImage = sites.file;
              return (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    margin: "1rem",
                  }}
                >
                  <img
                    src={siteImage}
                    alt="site-image"
                    style={{
                      width: "300px",
                      height: "150px",
                      marginRight: "1rem",
                    }}
                  />
                  <button
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      handleDeleteImage(index);
                    }}
                  >
                    <img
                      src="/assets/images/dustbin-delete.png"
                      alt="dustbin"
                      style={{ height: "40px" }}
                    />
                  </button>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};
>>>>>>> 463abe6 (frontend additonals changes made)

export default SiteSetting;

export async function getServerSideProps(context) {
<<<<<<< HEAD
    const { token, currentOrganizationId, siteId } = parseCookies(context);
    let siteSettingData = null;

    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/site`, {
            headers: { Authorization: `Bearer ${token}` },
            params: {
                organization: currentOrganizationId,
                site: siteId,
            },
        });

        siteSettingData = response.data.site;
    } catch (error) {
        console.error('Error fetching site settings:', error.message);
    }

    return {
        props: {
            siteSettingData,
            siteId,
        },
    };
=======
  const { token, currentOrganizationId, siteId } = parseCookies(context);
  let siteSettingData = null;
  let imageData = null;

  try {
    const siteResponse = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/site`,
      {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          organization: currentOrganizationId,
          site: siteId,
        },
      }
    );

    siteSettingData = siteResponse.data.site;
  } catch (error) {
    console.error("Error fetching site settings:", error.message);
  }

  try {
    const imageResponse = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/site/getSideDoccumnet`,
      {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          organization: currentOrganizationId,
          site: siteId,
        },
      }
    );

    imageData = imageResponse.data;
  } catch (error) {
    console.error("Error fetching image data:", error.message);
  }

  return {
    props: {
      siteSettingData,
      siteId,
      imageData,
    },
  };
>>>>>>> 463abe6 (frontend additonals changes made)
}
