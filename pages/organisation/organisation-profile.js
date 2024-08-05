import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import nookies from "nookies";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { parseCookies } from "nookies";
import { SitevalidationSchema } from "@/schemas/createOrgSchema";
import config from "@/config/config";
import { Button } from "@chakra-ui/react";
import BackIcon from "@/components/utils/global/BackIcon";

const OrganisationProfile = (props) => {
  const [isInputField, setIsInputField] = useState(false);
  const [showBtn, setShowBtn] = useState(false);
  const [loding, setLoding] = useState(false);
  const [isImageChanged, setIsImageChanged] = useState(false);
  const [file, setFile] = useState(null);
  const [editedData, setEditedData] = useState({
    name: props.parsedData?.name,
    email: props.parsedData?.email,
    phone: props.parsedData?.phone,
    address: props.parsedData?.address,
    city: props.parsedData?.city,
    state: props.parsedData?.state,
    pin_code: props.parsedData?.pin_code,
    gst_number: props.parsedData?.gst_number,
    pan_number: props.parsedData?.pan_number,
    tan: props.parsedData?.tan,
  });

  const router = useRouter();

  const initialValues = {
    companyLogo: "",
    name: props.parsedData?.name,
    email: props.parsedData?.email,
    phone: props.parsedData?.phone,
    address: props.parsedData?.address,
    city: props.parsedData?.city,
    state: props.parsedData?.state,
    pin_code: props.parsedData?.pin_code,
    gst_number: props.parsedData?.gst_number,
    pan_number: props.parsedData?.pan_number,
    tan: props.parsedData?.tan,
  };

  const handleEditField = () => {
    setIsInputField(true);
  };

  const handleImageClick = () => {
    if (isInputField) {
      document.getElementById("orgprofile").click();
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setIsImageChanged(true); // Set the state to true when the image is changed
  };

  const handleCancelImage = () => {
    setEditedData((prevData) => ({
      ...prevData,
      imageUrl: props && props?.parsedData?.profile?.url,
    }));
  };

  const onSubmit = async (values) => {
    setLoding(true);

    const {
      name,
      address,
      phone,
      city,
      state,
      pin_code,
      email,
      gst_number,
      pan_number,
      tan,
    } = values;

    const formData = new FormData();
    formData.append("attachment", file);
    formData.append("name", name);
    formData.append("address", address);
    formData.append("phone", phone);
    formData.append("city", city);
    formData.append("state", state);
    formData.append("pin_code", pin_code);
    formData.append("email", email);
    formData.append("gst_number", gst_number);
    formData.append("pan_number", pan_number);
    formData.append("tan", tan);

    try {
      const { token, currentOrganizationId } = parseCookies();
      const response = await axios.patch(
        `${config.API_URL}/organization/update?organization=${currentOrganizationId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response?.data) {
        toast.success("Profile Successfully Updated", {
          position: "top-center",
        });
        setIsInputField(false);
        // Update the image URL in editedData after successful upload
        setEditedData((prevData) => ({
          ...prevData,
          profile: {
            ...prevData.profile,
            url: response.data.newImageUrl, // Assuming the response contains the new image URL
          },
        }));

        router.push(router.asPath);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoding(false);
    }
  };

  useEffect(() => {
    if (editedData?.name != props?.parsedData?.name) {
      setShowBtn(true);
    } else if (editedData?.address != props?.parsedData?.address) {
      setShowBtn(true);
    } else if (editedData?.city != props?.parsedData?.city) {
      setShowBtn(true);
    } else if (editedData?.state != props?.parsedData?.state) {
      setShowBtn(true);
    } else if (editedData?.pin_code != props?.parsedData?.pin_code) {
      setShowBtn(true);
    } else if (editedData?.gst_number != props?.parsedData?.gst_number) {
      setShowBtn(true);
    } else if (editedData?.phone != props?.parsedData?.phone) {
      setShowBtn(true);
    } else if (editedData?.email != props?.parsedData?.email) {
      setShowBtn(true);
    } else setShowBtn(false);
  }, [editedData]);

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedData((prevData) => ({
          ...prevData,
          // Assuming you have a field like 'imageUrl' to store the image URL
          imageUrl: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  }, [file]);

  return (
    <>
      <div className="row">
      <div className="site-profile">
        <div className="site-profile-heading">
          <span style={{ color: "#FFFFFF", opacity: "0.6" }}>
          </span>
          <span style={{ color: "white", marginLeft: "0.2rem" }}>Organization Profile</span>
        </div>

        <div style={{marginTop : '2rem' , marginLeft : "1rem" , color : 'rgba(64, 87, 104, 1)'}}>
          Organization Overview
        </div>
      </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="tab-content">
            <div
              role="tabpanel"
              id="react-aria2791842971-:r1a:-tabpane-1"
              aria-labelledby="react-aria2791842971-:r1a:-tab-1"
              className="fade tab-pane active show"
            >
              <div className="row" style={{ position: "relative" }}>
                <Formik
                  enableReinitialize
                  initialValues={initialValues}
                  validationSchema={SitevalidationSchema}
                  onSubmit={onSubmit}
                >
                  {({ values, setFieldValue, resetForm, isSubmitting }) => {
                    return (
                      <Form style={{backgroundColor : "rgba(227, 244, 255, 1)"}}>
                        <div className="row ms-4">
                          <div className="col-2">
                            <div className="col-2">
                              <img
                                src={
                                  editedData?.imageUrl ||
                                  props?.parsedData?.profile?.url ||
                                  `/assets/images/upload_default.svg`
                                }
                                alt="organization_svg"
                                width={180}
                                height={180}
                                // onClick={handleImageClick}
                                className={`hover-items ${
                                  isInputField && " border "
                                } border border-2  rounded-5 p-3`}
                              />
                              {isInputField && (
                                <div
                                  className="text-end position-absolute bottom-75   px-2 fs-3  bg-btn-bg rounded-pill"
                                  style={{ left: 200 }}
                                >
                                  <span
                                    onClick={handleImageClick}
                                    className="text-light-gray cursor-pointer"
                                  >
                                    <i className="bi bi-exposure"></i>
                                  </span>
                                </div>
                              )}
                              <input
                                type="file"
                                id="orgprofile"
                                className="form-control d-none"
                                onChange={handleFileChange}
                              />
                            </div>
                          </div>

                          <div className="col-9">
                            <div className="row">
                              <div className="col-12">
                                <span>
                                  <div className="col d-flex justify-content-end">
                                    <span>
                                      {isInputField && (
                                        <div className="d-flex">
                                          <button
                                            type="button"
                                            className="m-auto p-1 edit_btn me-3 text-black"
                                            onClick={() => {
                                              setIsInputField(false);
                                              resetForm();
                                              handleCancelImage();
                                            }}
                                          >
                                            Cancel
                                          </button>

                                          {!loding ? (
                                            <button
                                              type="submit"
                                              className="d-flex justify-content-center align-items-center m-auto p-1 edit_btn"
                                              disabled={isSubmitting}
                                            >
                                              Save
                                            </button>
                                          ) : (
                                            <button
                                              className="btn-primary rounded text-black border border-black "
                                              type="button"
                                              disabled
                                            >
                                              <span
                                                className="spinner-border spinner-border-sm me-2"
                                                aria-hidden="true"
                                              ></span>
                                              <span role="status">
                                                Loading...
                                              </span>
                                            </button>
                                          )}
                                        </div>
                                      )}

                                      {!isInputField && (
                                        <button
                                          type="button"
                                          className="d-flex justify-content-center align-items-center m-auto p-1 edit_btn text-white bg-btn-bg"
                                          onClick={handleEditField}
                                        >
                                          <i className="bi bi-pencil-square mx-2"></i>
                                          Edit
                                        </button>
                                      )}
                                    </span>
                                  </div>
                                </span>
                                <div className="mb-1">
                                  <div className="col-8">
                                    <label className="form-label text-org-profile-label-text">
                                      Organization Name
                                    </label>
                                    <span className="text-danger">*</span>
                                  </div>
                                  {isInputField ? (
                                    <Field
                                      name="name"
                                      placeholder="Enter your first name"
                                      type="text"
                                      className="form-control"
                                      onChange={(e) => {
                                        setFieldValue("name", e.target.value);
                                        setEditedData({
                                          ...editedData,
                                          name: e.target.value,
                                        });
                                      }}
                                    />
                                  ) : (
                                    <div className="fw-semibold">
                                      <small className="email-display-container">
                                        {props?.parsedData
                                          ? props.parsedData.name
                                          : "N/A"}
                                      </small>
                                    </div>
                                  )}

                                  <ErrorMessage
                                    name="name"
                                    render={(msg) => (
                                      <small style={{ color: "red" }}>
                                        {msg}
                                      </small>
                                    )}
                                  />
                                </div>
                              </div>
                            </div>

                            <div className="row" >
                              <div className="col-2">
                                <div className="mb-1">
                                  <label className="form-label  text-org-profile-label-text">
                                    Address Details
                                  </label>
                                  <span className="text-danger">*</span>

                                  {isInputField ? (
                                    <Field
                                      name="address"
                                      placeholder="Enter your state"
                                      type="text"
                                      className="form-control"
                                      onChange={(e) => {
                                        setFieldValue(
                                          "address",
                                          e.target.value
                                        );
                                        setEditedData({
                                          ...editedData,
                                          address: e.target.value,
                                        });
                                      }}
                                    />
                                  ) : (
                                    <div className="email-display-container">
                                      {props?.parsedData?.address || "N/A"}
                                    </div>
                                  )}

                                  <ErrorMessage
                                    name="address"
                                    render={(msg) => (
                                      <small style={{ color: "red" }}>
                                        {msg}
                                      </small>
                                    )}
                                  />
                                </div>
                              </div>
                            </div>

                            <div className="row">
                              <div className="col-4">
                                <div className="mb-1">
                                  <label className="form-label  text-org-profile-label-text">
                                    City
                                  </label>
                                  <span className="text-danger">*</span>

                                  {isInputField ? (
                                    <Field
                                      name="city"
                                      placeholder="Enter your city name"
                                      type="text"
                                      className="form-control"
                                      onChange={(e) => {
                                        setFieldValue("city", e.target.value);
                                        setEditedData({
                                          ...editedData,
                                          city: e.target.value,
                                        });
                                      }}
                                    />
                                  ) : (
                                    <div className="email-display-container">
                                      {props?.parsedData?.city || "N/A"}
                                    </div>
                                  )}

                                  <ErrorMessage
                                    name="city"
                                    render={(msg) => (
                                      <small style={{ color: "red" }}>
                                        {msg}
                                      </small>
                                    )}
                                  />
                                </div>
                              </div>

                              <div className="col-4">
                                <div className="mb-1">
                                  <label className="form-label  text-org-profile-label-text">
                                    State
                                  </label>
                                  <span className="text-danger">*</span>

                                  {isInputField ? (
                                    <Field
                                      name="state"
                                      placeholder="Enter your state"
                                      type="text"
                                      className="form-control"
                                      onChange={(e) => {
                                        setFieldValue("state", e.target.value);
                                        setEditedData({
                                          ...editedData,
                                          state: e.target.value,
                                        });
                                      }}
                                    />
                                  ) : (
                                    <div className="email-display-container">
                                      {props?.parsedData?.state || "N/A"}
                                    </div>
                                  )}

                                  <ErrorMessage
                                    name="state"
                                    render={(msg) => (
                                      <small style={{ color: "red" }}>
                                        {msg}
                                      </small>
                                    )}
                                  />
                                </div>
                              </div>

                              <div className=" col-4">
                                <div className="mb-1">
                                  <label className="form-label  text-org-profile-label-text">
                                    PIN Code
                                  </label>
                                  <span className="text-danger">*</span>

                                  {isInputField ? (
                                    <Field
                                      name="pin_code"
                                      placeholder="Enter your zip code"
                                      type="text"
                                      className="form-control"
                                      onChange={(e) => {
                                        setFieldValue(
                                          "pin_code",
                                          e.target.value
                                        );
                                        setEditedData({
                                          ...editedData,
                                          pin_code: e.target.value,
                                        });
                                      }}
                                    />
                                  ) : (
                                    <div className="email-display-container">
                                      {props?.parsedData?.pin_code || "N/A"}
                                    </div>
                                  )}

                                  <ErrorMessage
                                    name="pin_code"
                                    render={(msg) => (
                                      <small style={{ color: "red" }}>
                                        {msg}
                                      </small>
                                    )}
                                  />
                                </div>
                              </div>
                            </div>

                            <div className="row">
                              <div className="col-4">
                                <div className="form-group">
                                  <label className="form-label  text-org-profile-label-text">
                                    GST<span className="text-danger">*</span>
                                  </label>
                                  {isInputField ? (
                                    <Field
                                      name="gst_number"
                                      type="text"
                                      placeholder="Enter GST"
                                      className="form-control"
                                      // maxLength={10}

                                      // onChange={(e) => {
                                      //   // Allow only numbers
                                      //   const phoneNumber = e.target.value.replace(/[^0-9]/g, '');

                                      //   // Set the value in Formik and also in your local state if needed
                                      //   setFieldValue("phone", phoneNumber);
                                      //   setEditedData({ ...editedData, phone: phoneNumber });
                                      // }}
                                    />
                                  ) : (
                                    <div className="email-display-container">
                                      {props?.parsedData?.gst_number || 'N/A'}
                                    </div>
                                  )}

                                  <ErrorMessage
                                    name="gst_number"
                                    render={(msg) => (
                                      <small style={{ color: "red" }}>
                                        {msg}
                                      </small>
                                    )}
                                  />
                                </div>
                              </div>
                              <div className="col-4">
                                <div className="form-group">
                                  <label className="form-label  text-org-profile-label-text">
                                    PAN<span className="text-danger">*</span>
                                  </label>
                                  {isInputField ? (
                                    <Field
                                      name="pan_number"
                                      type="text"
                                      placeholder="Enter PAN Number"
                                      className="form-control"
                                    />
                                  ) : (
                                    <div className="email-display-container">
                                      {props?.parsedData?.pan_number || 'N/A'}
                                    </div>
                                  )}

                                  <ErrorMessage
                                    name="pan_number"
                                    render={(msg) => (
                                      <small style={{ color: "red" }}>
                                        {msg}
                                      </small>
                                    )}
                                  />
                                </div>
                              </div>
                              <div className="col-4">
                                <div className="form-group">
                                  <label className="form-label  text-org-profile-label-text">
                                    TAN
                                  </label>
                                  {isInputField ? (
                                    <Field
                                      name="tan"
                                      type="text"
                                      placeholder="Enter TAN  Number"
                                      className="form-control"
                                    />
                                  ) : (
                                    <div className="email-display-container">
                                      {props?.parsedData?.tan || 'N/A'}
                                    </div>
                                  )}

                                  <ErrorMessage
                                    name="tan"
                                    render={(msg) => (
                                      <small style={{ color: "red" }}>
                                        {msg}
                                      </small>
                                    )}
                                  />
                                </div>
                              </div>

                              <div className="row mt-1">
                                <div className="col-4">
                                  <div className="form-group">
                                    <label className="form-label  text-org-profile-label-text">
                                      Contact
                                    </label>
                                    {isInputField ? (
                                      <Field
                                        name="phone"
                                        type="text"
                                        placeholder="(xxx) xxxx-xxxx"
                                        className="form-control"
                                        // maxLength={10}
                                        disabled
                                        readOnly
                                      />
                                    ) : (
                                      <div className="email-display-container">
                                        {props?.parsedData?.phone}
                                      </div>
                                    )}

                                    <ErrorMessage
                                      name="phone"
                                      render={(msg) => (
                                        <small style={{ color: "red" }}>
                                          {msg}
                                        </small>
                                      )}
                                    />
                                  </div>
                                </div>

                                <div className="col-4">
                                  <label className="form-label  text-org-profile-label-text">
                                    Email ID
                                  </label>
                                  <span className="text-danger">*</span>
                                  {isInputField ? (
    <Field
      name="email"
      placeholder="Enter your email"
      type="email"
      className="form-control"
      onChange={(e) => {
        setFieldValue("email", e.target.value);
        setEditedData({
          ...editedData,
          email: e.target.value,
        });
      }}
    />
  ) : (
    <div className="email-display-container">
      {props?.parsedData?.email || "N/A"}
    </div>
  )}
                                  <ErrorMessage
                                    name="email"
                                    render={(msg) => (
                                      <small style={{ color: "red" }}>
                                        {msg}
                                      </small>
                                    )}
                                  />
                                </div>
                              </div>
                             </div>
                          </div>
                        </div>
                      </Form>
                      
                    );
                  }}
                </Formik>
                <div className="col-4">
          <Link
            href="/sites/purchase-order"
            className="text-decoration-none text-black"
          >
            <div className="h-75 border-black d-flex p-4 gap-3 site-border-design mt-4">
              <div className="d-flex flex-direction-column align-items-center">
                <Image
                  src="/assets/images/user-tag.png"
                  alt="members-icon"
                  width={40}
                  height={40}
                />
              </div>

              <div className="d-flex flex-column justify-content-center">
                <span className="fw-bold">Work Categories </span>
                <small className="text-darkgrey ">Add and manage tags for this org</small>
              </div>
            </div>
          </Link>
        </div>
                <div className="col-4">
          <Link
            href="/sites/purchase-order"
            className="text-decoration-none text-black"
          >
            <div className="h-75 border-black d-flex p-4 gap-3 site-border-design mt-4">
              <div className="d-flex flex-direction-column align-items-center">
                <Image
                  src="/assets/images/user-tag.png"
                  alt="members-icon"
                  width={40}
                  height={40}
                />
              </div>

              <div className="d-flex flex-column justify-content-center">
                <span className="fw-bold">Address Details </span>
                <small className="text-darkgrey ">Add and manage address details for this organisation</small>
              </div>
            </div>
          </Link>
        </div>
                <div className="col-4">
          <Link
            href="/sites/purchase-order"
            className="text-decoration-none text-black"
          >
            <div className="h-75 border-black d-flex p-4 gap-3 site-border-design mt-4">
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
                <span className="fw-bold">Auto DPR </span>
                <small className="text-darkgrey ">
Easily control how you receive your daily progress updates.
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
                  src="/assets/images/user-tag.png"
                  alt="members-icon"
                  width={40}
                  height={40}
                />
              </div>

              <div className="d-flex flex-column justify-content-center">
                <span className="fw-bold">Material Categories </span>
                <small className="text-darkgrey ">Add and manage material categories for this org.
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
                  src="/assets/images/user-tag.png"
                  alt="members-icon"
                  width={40}
                  height={40}
                />
              </div>

              <div className="d-flex flex-column justify-content-center">
                <span className="fw-bold">Material Issued </span>
                <small className="text-darkgrey ">Add and manage Material</small>
              </div>
            </div>
          </Link>
        </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrganisationProfile;

export async function getServerSideProps(context) {
  const { token, currentOrganizationId } = nookies.get(context);

  try {
    const response = await axios.get(
      `${config.API_URL}/organization/get?organization=${currentOrganizationId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (response?.data && response?.data.organizationDetails) {
      const parsedData = response.data.organizationDetails;
      return {
        props: {
          parsedData,
        },
      };
    } else {
      console.error("Invalid response data:", response);
    }
  } catch (error) {
    console.error("Error fetching organization data:", error);
  }
  return {
    props: {
      parsedData: null,
    },
  };
}
