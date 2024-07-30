import { useEffect, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { toast } from "react-toastify";
import { parseCookies } from "nookies";
import { createSiteAsync } from "@/store/createSite/CreateSiteSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "@/store/siteSlice";
import { validationSchema } from "@/schemas/create-project";
import { AddTeam } from "./AddTeam";
import axios from "axios";

const CreateProject = () => {
  const [attachment, setAttachment] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  // Function to handle image file change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);

    

    // Optional: You can also preview the image if needed
    const reader = new FileReader();
    reader.onload = () => {
      setImageUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // Function to handle image click
  const handleImageClick = () => {
    // Trigger input file click when image is clicked
    document.getElementById('fileInput').click();
  };

  const [addmemberState, setAddmemberState] = useState(false);
  const [siteId, setSiteId] = useState("");
  const [minEndDate, setMinEndDate] = useState();
  const [endDateState, setEndDateState] = useState();
  const [organizationName, setOrganizationName] = useState("");
  const [existingSiteNames, setExistingSiteNames] = useState([]);
  const [siteNameError, setSiteNameError] = useState("");

  const { currentOrganizationId,token } = parseCookies();
  const [file, setFile] = useState(null);

  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state?.getOrganizationAsync);
  const [isInputField, setIsInputField] = useState(false);

  const initialValues = {
    name: '',
    startDate: '',
    endDate: '',
    attachment:""
  };

  useEffect(() => {
    if (siteId != null) {
      const addMember = async () => {
        const { token } = parseCookies();
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/site/members?site=${siteId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const userData = response?.data;
        } catch (error) {
          toast.error(error, { position: "top-center" });
        }
      };
      addMember();
    }
  }, [siteId]);

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

  const normalizeSiteName = (name) => {
    // Trim, collapse multiple spaces, and convert to lowercase
    const normalized = name.trim().replace(/\s+/g, ' ').toLowerCase();
    // Remove spaces to ensure "site2" and "site 2" are considered the same
    return normalized.replace(/\s+/g, '');
  };

  var startDate = CreateDate();
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

  const onSubmit = async (values) => {
    try {
        const formData = new FormData();
        formData.append("attachment", file);
        formData.append("name", values.name);
        formData.append("startDate", values.startDate);
        formData.append("endDate", values.endDate);

        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/site/add`, formData, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "multipart/form-data"
            },
            params: {
                organization: currentOrganizationId
            }
        });

        const responseData = response.data;
        if (responseData.success) {
            toast.success(responseData.message, { position: "top-center" });
            // Handle success
        } else {
            toast.error(responseData.error || "Failed to create site", { position: "top-center" });
        }
    } catch (error) {
        toast.error("An error occurred. Please try again later.", { position: "top-center" });
        console.error("Error creating site:", error);
    }
};

  useEffect(() => {
    setEndDateState(CreateEndDate(startDate));
  }, [startDate]);

  useEffect(() => {
    const organization = userData?.organizations?.find(item => item?._id === currentOrganizationId);

    if (organization) {
      setOrganizationName(organization?.name);
    }
  }, [userData?.organizations, currentOrganizationId]);

  useEffect(() => {
    // Fetch the existing site names
    const fetchSites = async () => {
      try {
        const response = await dispatch(fetchUserData());
        const sites = response.payload?.sites || [];
        // Normalize existing site names
        const normalizedExistingSiteNames = sites.map(site => normalizeSiteName(site.name));
        setExistingSiteNames(normalizedExistingSiteNames);
      } catch (error) {
        toast.error("Failed to fetch site data", { position: "top-center" });
      }
    };
    fetchSites();
  }, [dispatch]); // Removed currentOrganizationId dependency to fetch all sites

  const handleSiteNameChange = (e, handleChange) => {
    const newSiteName = e.target.value;
    handleChange(e); // Update Formik value

    // Normalize the new site name
    const normalizedNewSiteName = normalizeSiteName(newSiteName);

    // Check if site name already exists
    if (existingSiteNames.includes(normalizedNewSiteName)) {
      setSiteNameError("Site name already exists. Please choose a different name.");
    } else {
      setSiteNameError("");
    }
  };

  return (
    <>
      <div
        className="offcanvas offcanvas-end w-25 bg-white"
        tabIndex="-1"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
        data-bs-backdrop="static"
      >
        <div className="offcanvas-body p-0">
          <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({
              values,
              resetForm,
              handleBlur,
              handleChange,
              isSubmitting,
            }) => {
              return (
                <Form className="d-flex flex-column">
                  <div className="offcanvas-header bg-light-blue mb-0">
                    <h5 className="offcanvas-title" id="offcanvasRightLabel">
                      Create New Site
                    </h5>

                    <button
                      type="button"
                      className="btn-close me-0"
                      data-bs-dismiss="offcanvas"
                      aria-label="Close"
                      onClick={resetForm}
                    >
                    </button>
                  </div>

                  <div className="d-flex gap-3 flex-column p-3">
                    <div className="form-group ">
                      <div className="text-start w-100 mb-2">
                        <label htmlFor="exampleInputPassword1 ">
                          Site Name
                        </label>
                        <span className="text-danger">*</span>
                      </div>
                      <Field
                        type="text"
                        name="name"
                        className="form-control  border-info"
                        placeholder="Enter Site Name"
                        onBlur={handleBlur}
                        onChange={(e) => handleSiteNameChange(e, handleChange)}
                      />
                      {siteNameError && (
                        <div className="text-danger">{siteNameError}</div>
                      )}
                      <ErrorMessage
                        name="name"
                        render={(msg) => (
                          <small style={{ color: "red" }}>{msg}</small>
                        )}
                      />
                    </div>

                    <div className="form-group">
                      <div className="text-start w-100 mb-2">
                        <label htmlFor="exampleInputPassword1">
                          Organization Name
                        </label>
                        <span className="text-danger">*</span>
                      </div>
                      <Field
                        type="text"
                        name="organizationName"
                        className="form-control   border-info"
                        placeholder="Organization Name"
                        value={organizationName}
                        disabled
                      />

                      <ErrorMessage
                        name="organizationName"
                        render={(msg) => (
                          <small style={{ color: "red" }}>{msg}</small>
                        )}
                      />
                      <div className="form-group">
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

                    </div>
                    <div className="row">
                      <div className="form-group col-6">
                        <label htmlFor="exampleInputPassword1 ">
                          Start Date<span className="text-danger">*</span>
                        </label>
                        <br />
                        <Field
                          type="date"
                          name="startDate"
                          id="inputdate"
                          className="form-control  border-info"
                          placeholder="dd/mm/yyyy"
                          onChange={(e) => {
                            const newStartDate = e.target.value;
                            setMinEndDate(CreateEndDate(newStartDate));
                            handleChange(e);
                          }}
                          min={CreateDate()}
                        />

                        <ErrorMessage
                          name="startDate"
                          render={(msg) => (
                            <small style={{ color: "red" }}>{msg}</small>
                          )}
                        />
                      </div>
                      <div className="form-group col-6">
                        <label htmlFor="exampleInputPassword1 ">
                          End Date<span className="text-danger">*</span>
                        </label>
                        <br />
                        <Field
                          type="date"
                          name="endDate"
                          id="inputdate"
                          className="form-control  border-info"
                          placeholder="yyyy-MM-dd"
                          min={endDateState}
                        />

                        <ErrorMessage
                          name="endDate"
                          render={(msg) => (
                            <small style={{ color: "red" }}>{msg}</small>
                          )}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="text-start p-3 mt-5">
                    <button
                      type="submit"
                      className="text-white bg-btn-bg m-auto w-100  auth_btn"
                      data-bs-toggle="offcanvas"
                      data-bs-target="#addoffcanvasRight"
                      aria-controls="offcanvasRight"
                      disabled={
                        !values.name || !values.startDate || !values.endDate || siteNameError
                      }
                    >
                      {isSubmitting ? (
                        <>
                          <span className="ms-2" role="status">
                            Loading...
                          </span>
                        </>
                      ) : (
                        "Create"
                      )}
                    </button>
                    <br />
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>

      <AddTeam siteId={siteId} setAddmemberState={setAddmemberState} />
    </>
  );
};

export default CreateProject;

