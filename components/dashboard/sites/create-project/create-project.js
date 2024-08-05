import { useEffect, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { toast } from "react-toastify";
import { parseCookies } from "nookies";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "@/store/siteSlice";
import { AddTeam } from "./AddTeam";
import { Text } from "@chakra-ui/react";
import { Select } from "@chakra-ui/react";
import { getAllmember } from "@/store/member/allmember";
import { validationSchema } from "@/schemas/create-project"; // Assuming you have a validation schema defined

const CreateProject = () => {
  const [attachment, setAttachment] = useState(null); // State for file attachment
  const [imageFile, setImageFile] = useState(null); // State for image file
  const [imageUrl, setImageUrl] = useState(""); // State for image preview URL
  const [selectedSitePoc, setSelectedSitePoc] = useState(""); // State for selected site POC
  const [selectedProjectPoc, setSelectedProjectPoc] = useState(""); // State for selected project POC
  const [address, setAddress] = useState(""); // State for address

  const [addmemberState, setAddmemberState] = useState(false); // State for adding members
  const [siteId, setSiteId] = useState(""); // State for site ID
  const [minEndDate, setMinEndDate] = useState(""); // State for minimum end date
  const [endDateState, setEndDateState] = useState(""); // State for end date
  const [organizationName, setOrganizationName] = useState(""); // State for organization name
  const [existingSiteNames, setExistingSiteNames] = useState([]); // State for existing site names
  const [siteNameError, setSiteNameError] = useState(""); // State for site name error

  const { currentOrganizationId, token } = parseCookies(); // Fetch cookies for organization ID and token

  const dispatch = useDispatch(); // Redux dispatch hook
  const { userData } = useSelector((state) => state?.getOrganizationAsync); // Select user data from Redux store
  const allMemberData = useSelector(state => state?.getAllmember?.allMemberData);
  const members = allMemberData ? allMemberData.members : undefined;

  const handleSitePocChange = (event) => {
    setSelectedSitePoc(event.target.value);
  };

  const handleProjectPocChange = (event) => {
    setSelectedProjectPoc(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const initialValues = {
    name: "",
    startDate: "",
    endDate: "",
    attachment: null,
    address: "",
    selectedSitePoc: "",
    selectedProjectPoc: "",
  };

  useEffect(() => {
    dispatch(getAllmember());
  }, [dispatch]);

  useEffect(() => {
    if (siteId) {
      const fetchMembers = async () => {
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/site/members?site=${siteId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        } catch (error) {
          toast.error(error.message, { position: "top-center" });
        }
      };
      fetchMembers();
    }
  }, [siteId, token]);

  const formatDate = (date) => date.toISOString().split("T")[0];

  const CreateDate = () => formatDate(new Date());

  const CreateEndDate = (startDate) => {
    const formattedStartDate = new Date(startDate);
    const nextDay = new Date(formattedStartDate);
    nextDay.setDate(formattedStartDate.getDate() + 1);
    const formattedEndDate = formatDate(nextDay);

    setMinEndDate(startDate);
    setEndDateState(formattedEndDate);

    return formattedEndDate;
  };

  const normalizeSiteName = (name) =>
    name.trim().replace(/\s+/g, "").toLowerCase();

  const handleSiteNameChange = (e, handleChange) => {
    const newSiteName = e.target.value;
    handleChange(e);

    const normalizedNewSiteName = normalizeSiteName(newSiteName);

    if (existingSiteNames.includes(normalizedNewSiteName)) {
      setSiteNameError(
        "Site name already exists. Please choose a different name."
      );
    } else {
      setSiteNameError("");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file); // Set file state
      setAttachment(file); // Set attachment state
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result); // Set image preview URL
      };
      reader.readAsDataURL(file); // Read file as data URL
    }
  };

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      const formData = new FormData();
      formData.append("attachment", attachment);
      formData.append("name", values.name);
      formData.append("startDate", values.startDate);
      formData.append("endDate", values.endDate);
      formData.append("selected_site_poc", selectedSitePoc);
      formData.append("selected_project_poc", selectedProjectPoc);
      formData.append("address", address);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/site/add`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
          params: {
            organization: currentOrganizationId,
          },
        }
      );

      const responseData = response.data;
      console.log(`Hello ${selectedProjectPoc}`);
      if (responseData.success) {
        toast.success(responseData.message, { position: "top-center" });
        // Handle success, reset form, etc.
      } else {
        toast.error(responseData.error || "Failed to create site", {
          position: "top-center",
        });
      }
    } catch (error) {
      toast.error("An error occurred. Please try again later.", {
        position: "top-center",
      });
      console.error("Error creating site:", error);
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    const organization = userData?.organizations?.find(
      (item) => item?._id === currentOrganizationId
    );

    if (organization) {
      setOrganizationName(organization.name);
    }
  }, [userData?.organizations, currentOrganizationId]);

  useEffect(() => {
    const fetchSites = async () => {
      try {
        const response = await dispatch(fetchUserData());
        const sites = response.payload?.sites || [];
        // Normalize existing site names
        const normalizedExistingSiteNames = sites.map((site) =>
          normalizeSiteName(site.name)
        );
        setExistingSiteNames(normalizedExistingSiteNames);
      } catch (error) {
        toast.error("Failed to fetch site data", { position: "top-center" });
      }
    };
    fetchSites();
  }, [dispatch]);

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
            }) => (
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
                  ></button>
                </div>

                <div className="d-flex gap-3 flex-column p-3">
                  <div className="form-group">
                    <div className="text-start w-100 mb-2">
                      <label htmlFor="exampleInputPassword1">Site Name</label>
                      <span className="text-danger">*</span>
                    </div>
                    <Field
                      type="text"
                      name="name"
                      className="form-control border-info"
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
                      className="form-control border-info"
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
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Image Upload</label>
                    <input
                      type="file"
                      id="fileInput"
                      className="form-control"
                      onChange={handleImageChange}
                    />
                  </div>
                  <div className="row">
                    <div className="form-group col-6">
                      <label htmlFor="exampleInputPassword1">Start Date</label>
                      <br />
                      <Field
                        type="date"
                        name="startDate"
                        className="form-control border-info"
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
                      <label htmlFor="exampleInputPassword1">End Date</label>
                      <br />
                      <Field
                        type="date"
                        name="endDate"
                        className="form-control border-info"
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
                  <Text style={{ color: "#405768" }}>
                    Address & Contact Details
                  </Text>
                  <div
                    className="bg-light-blue mb-0"
                    style={{ padding: "30px 20px" }}
                  >
                    <div className="form-group">
                      <div className="text-start w-100 mb-2">
                        <label htmlFor="addressLine">Address Line</label>
                        <span className="text-danger">*</span>
                      </div>
                      <Field
                        type="text"
                        name="address"
                        value={address}
                        className="form-control border-info"
                        placeholder="Enter Address Line"
                        onBlur={handleBlur}
                        onChange={handleAddressChange}
                      />
                    </div>
                    <div className="form-group">
                      <div className="text-start w-100 mt-4">
                        <label htmlFor="addressLine">Site POC</label>
                        <span className="text-danger">*</span>
                      </div>
                      <select
                        id="selectOption"
                        name="selectOption"
                        value={selectedSitePoc}
                        onChange={handleSitePocChange}
                        className="mt-1"
                      >
                        <option value="">Select a member</option>
                        {members &&
                          members.length > 0 &&
                          members.map((member) => (
                            <option
                              key={member.user._id}
                              value={member.user.name}
                            >
                              {member.user.name}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <div className="text-start w-100 mt-4">
                        <label htmlFor="addressLine">Project POC</label>
                        <span className="text-danger">*</span>
                      </div>
                      <select
                        id="selectOption"
                        name="selectOption1"
                        value={selectedProjectPoc}
                        onChange={handleProjectPocChange}
                        className="mt-1"
                      >
                        <option value="">Select a member</option>
                        {members &&
                          members.length > 0 &&
                          members.map((member) => (
                            <option
                              name="selected_project_poc"
                              key={member.user._id}
                              value={member.user.name}
                            >
                              {member.user.name}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>

                  <div className="text-start p-3 mt-1">
                    <button
                      type="submit"
                      className="text-white bg-btn-bg m-auto w-100 auth_btn"
                      disabled={
                        !values.name ||
                        !values.startDate ||
                        !values.endDate ||
                        siteNameError
                      }
                    >
                      {isSubmitting ? (
                        <>
                          <span className="ms-2" role="status">
                            Loading...
                          </span>
                        </>
                      ) : (
                        "NEXT"
                      )}
                    </button>
                    <br />
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>

      <AddTeam siteId={siteId} setAddmemberState={setAddmemberState} />
    </>
  );
};

export default CreateProject;
