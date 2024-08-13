import { useEffect, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { toast } from "react-toastify";
import { parseCookies } from "nookies";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "@/store/siteSlice";
import { AddTeam } from "./AddTeam";
import { Text } from "@chakra-ui/react";
import { getAllmember } from "@/store/member/allmember";
import { validationSchema } from "@/schemas/create-project"; // Assuming you have a validation schema defined
import Select from "react-select";

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: state.isDisabled ? "#f0f0f0" : "#fff", // Set a consistent background color
    opacity: state.isDisabled ? 1 : 1, // Keep opacity same
    cursor: state.isDisabled ? "not-allowed" : "pointer",
    boxShadow: state.isFocused ? "0 0 0 1px #2684FF" : "none",
    borderColor: state.isFocused ? "#2684FF" : provided.borderColor,
  }),
  singleValue: (provided, state) => ({
    ...provided,
    color: state.isDisabled ? "#333" : provided.color, // Adjust color for disabled state
  }),
  placeholder: (provided, state) => ({
    ...provided,
    color: state.isDisabled ? "#666" : provided.color, // Adjust placeholder color
  }),
};

const CreateProject = () => {
  const [attachment, setAttachment] = useState(null); // State for file attachment
  const [imageFile, setImageFile] = useState(null); // State for image file
  const [imageUrl, setImageUrl] = useState(""); // State for image preview URL
  const [address, setAddress] = useState(""); // State for address
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [addmemberState, setAddmemberState] = useState(false); // State for adding members
  const [siteId, setSiteId] = useState(""); // State for site ID
  const [minEndDate, setMinEndDate] = useState(""); // State for minimum end date
  const [endDateState, setEndDateState] = useState(""); // State for end date
  const [organizationName, setOrganizationName] = useState(""); // State for organization name
  const [existingSiteNames, setExistingSiteNames] = useState([]); // State for existing site names
  const [siteNameError, setSiteNameError] = useState(""); // State for site name error
  const [selectedSitePoc, setSelectedSitePoc] = useState([]);
  const [selectedProjectPoc, setSelectedProjectPoc] = useState([]);
  const [isSamePoc, setIsSamePoc] = useState(false);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  const { currentOrganizationId, token } = parseCookies(); // Fetch cookies for organization ID and token

  const dispatch = useDispatch(); // Redux dispatch hook
  const { userData } = useSelector((state) => state?.getOrganizationAsync); // Select user data from Redux store
  const allMemberData = useSelector(
    (state) => state?.getAllmember?.allMemberData
  );
  const members = allMemberData ? allMemberData.members : undefined;

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };
  const memberOptions = members?.map((member) => ({
    value: member.user.name,
    label: member.user.name,
    id: member.user._id,
  }));

  const handleSitePocChange = (selectedOptions) => {
    const selectedValues = selectedOptions
      ? selectedOptions?.map((option) => option.value)
      : [];
    setSelectedSitePoc(selectedValues);

    if (isSamePoc) {
      setSelectedProjectPoc(selectedValues);
    }
  };
  const handleProjectPocChange = (selectedOptions) => {
    const selectedValues = selectedOptions
      ? selectedOptions.map((option) => ({
          id: option.id,
          name: option.value,
        }))
      : [];
    setSelectedProjectPoc(selectedValues);
  };
  const customStyles = {
    control: (provided) => ({
      ...provided,
      border: "none",
      height: "1rem",
      boxShadow: "none",
      "&:hover": {
        border: "none",
      },
    }),
  };

  useEffect(() => {
    console.log("MEMBERS", members);
    console.log("SELECTED_POC", selectedSitePoc);
    console.log("PROJECT_POC", selectedProjectPoc);
    console.log("START_DATE", startDate);
    console.log("END_DATE", endDate);
    console.log("NAME", name);
  });

  const handleCheckboxChange = () => {
    setIsSamePoc(!isSamePoc);
    if (!isSamePoc) {
      setSelectedProjectPoc(selectedSitePoc);
    }
  };

  const initialValues = {
    name: "",
    startDate: "",
    endDate: "",
    attachment: null,
    address: "",
    selectedSitePoc: "",
    selectedProjectPoc: "",
    pinCode: "",
    Country: "",
    State: "",
    City: "",
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

  // Fetch countries data on component mount
  useEffect(() => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
    };

    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/location/countries`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        const countryOptions = result.data.map((country) => ({
          value: country._id,
          label: country.name,
        }));
        setCountries(countryOptions);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleCountryChange = (selectedOption) => {
    setSelectedCountry(selectedOption);
    fetchStates(selectedOption.value);
  };

  const fetchStates = (countryId) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
    };

    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/location/states?countryId=${countryId}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        const stateOptions = result.data.map((state) => ({
          value: state._id,
          label: state.name,
        }));
        setStates(stateOptions);
        setCities([]); // Clear cities when country changes
        setSelectedState(null); // Clear selected state when country changes
      })
      .catch((error) => console.error(error));
  };

  const handleStateChange = (selectedOption) => {
    setSelectedState(selectedOption);
    fetchCities(selectedOption.value);
  };

  const fetchCities = (stateId) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
    };

    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/location/cities?stateId=${stateId}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        const cityOptions = result.data.map((city) => ({
          value: city._id,
          label: city.name,
        }));
        setCities(cityOptions);
        setSelectedCity(null); // Clear selected city when state changes
      })
      .catch((error) => console.error(error));
  };

  const handleCityChange = (selectedOption) => {
    setSelectedCity(selectedOption);
  };

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

  const onSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append("attachment", attachment);
      formData.append("name", name);
      formData.append("startDate", startDate);
      formData.append("endDate", endDate);
      formData.append("sitePocId", selectedSitePoc);
      formData.append("siteOfficeId", selectedProjectPoc);
      formData.append("pinCode", selectedProjectPoc);
      formData.append("Country", selectedProjectPoc);
      formData.append("State", selectedProjectPoc);
      formData.append("city", selectedProjectPoc);
      // formData.append("address", address);

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
                    Create New Sites
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
                      value={name}
                      onBlur={handleBlur}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                    {siteNameError && (
                      <div className="text-danger">{siteNameError}</div>
                    )}
                    {/* <ErrorMessage
                      name="name"
                      render={(msg) => (
                        <small style={{ color: "red" }}>{msg}</small>
                      )}
                    /> */}
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
                    <label htmlFor="exampleInputPassword1">
                      Site profile Image
                    </label>
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
                        value={startDate}
                        className="form-control border-info"
                        placeholder="dd/mm/yyyy"
                        onChange={(e) => {
                          setStartDate(e.target.value);
                        }}
                        min={CreateDate()}
                      />
                      {/* <ErrorMessage
                        name="startDate"
                        render={(msg) => (
                          <small style={{ color: "red" }}>{msg}</small>
                        )}
                      /> */}
                    </div>
                    <div className="form-group col-6">
                      <label htmlFor="exampleInputPassword1">End Date</label>
                      <br />
                      <Field
                        type="date"
                        name="endDate"
                        value={endDate}
                        className="form-control border-info"
                        onChange={(e) => {
                          setEndDate(e.target.value);
                        }}
                        placeholder="yyyy-MM-dd"
                        min={endDateState}
                      />
                      {/* <ErrorMessage
                        name="endDate"
                        render={(msg) => (
                          <small style={{ color: "red" }}>{msg}</small>
                        )}
                      /> */}
                    </div>
                  </div>
                  <Text style={{ color: "#405768" }}>
                    Address & Contact Details
                  </Text>
                  <div className="">
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
                    <div className="row">
                      <div className="form-group col-6">
                        <label>PinCode</label>
                        <Field
                          type="text"
                          name="startDate"
                          className="form-control border-info"
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                          min={CreateDate()}
                        />
                      </div>
                      <div className="form-group col-6">
                        <label>Country</label>
                        <Select
                          name="selectedCountry"
                          options={countries}
                          className="basic-multi-select"
                          classNamePrefix="select"
                          onChange={handleCountryChange}
                          value={selectedCountry}
                        />
                      </div>
                      {/* <div className="form-group col-6">
                        <label>Country</label>
                        <Select
                          name="selectedCountry"
                          options={countryOptions} // Set the country options here
                          className="basic-multi-select"
                          classNamePrefix="select"
                          onChange={handleCountryChange} // Handle selection change
                        />
                      </div> */}
                    </div>

                    <div className="row">
                      <div className="form-group col-6">
                        <label>State</label>
                        <Select
                          name="selectedState"
                          options={states}
                          className="basic-multi-select"
                          classNamePrefix="select"
                          onChange={handleStateChange}
                          value={selectedState}
                          // isDisabled={!selectedCountry}
                        />
                      </div>
                      <div className="form-group col-6">
                        <label>City</label>
                        <Select
                          name="selectedCity"
                          options={cities}
                          className="basic-multi-select"
                          classNamePrefix="select"
                          onChange={handleCityChange}
                          value={selectedCity}
                          // isDisabled={!selectedState}
                        />
                      </div>
                    </div>
                    {/* <div className="form-group">
                      <div className="text-start w-100 mt-4">
                        <label htmlFor="selectOption">Site POC</label>
                        <span className="text-danger">*</span>
                      </div>
                      <Select
                        id="selectOption"
                        name="selectOption"
                        value={memberOptions?.filter((option) =>
                          selectedSitePoc?.includes(option.value)
                        )}
                        onChange={handleSitePocChange}
                        options={memberOptions}
                        isMulti
                        className="mt-1"
                        placeholder="Select multiple members"
                        styles={customStyles}
                      />
                    </div> */}
                    <div className="form-group">
                      <div className="text-start w-100 mt-4">
                        <label htmlFor="selectOption">Site POC</label>
                        <span className="text-danger">*</span>
                      </div>
                      <Select
                        isMulti
                        name="selectedSitePoc"
                        options={memberOptions}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        onChange={handleSitePocChange}
                      />
                    </div>

                    {/* <div className="form-group mt-3">
                      <input
                        type="checkbox"
                        id="samePocCheckbox"
                        checked={isSamePoc}
                        onChange={handleCheckboxChange}
                      />
                      <label htmlFor="samePocCheckbox" className="ms-3">
                        Site POC is the same as Office POC
                      </label>
                    </div> */}

                    <div className="form-check" style={{ marginTop: "1rem" }}>
                      <Field
                        type="checkbox"
                        name="isSamePoc"
                        className="form-check-input"
                        checked={isSamePoc}
                        onChange={handleCheckboxChange}
                      />
                      <label className="form-check-label">
                        Site Poc is same as Office Poc
                      </label>
                    </div>

                    <div className="form-group">
                      <div className="text-start w-100 mt-4">
                        <label htmlFor="selectOption1">Office POC</label>
                        <span className="text-danger">*</span>
                      </div>
                      <Select
                        id="selectOption1"
                        name="selectOption1"
                        value={memberOptions?.filter((option) =>
                          selectedProjectPoc?.includes(option.value)
                        )}
                        onChange={handleProjectPocChange}
                        options={memberOptions}
                        className="mt-1"
                        isMulti
                        placeholder="Select multiple members"
                        // styles={customStyles} // Ensure custom styles are applied here
                      />
                    </div>
                  </div>
                  <div className="text-start p-3 mt-1">
                    <button
                      onClick={onSubmit}
                      className="text-white bg-btn-bg m-auto w-100 auth_btn"
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
