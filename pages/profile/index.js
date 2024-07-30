import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import config from "@/config/config";
import { fetchProfileDataAsync } from "@/store/userProfile/UserProfileSlice";
import axios from "axios";
import { parseCookies } from "nookies";
import Image from "next/image";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useBreadcrumb } from "@/contexts/BreadcrumbContext";

function EditProfile() {
  const [status, setStatus] = useState(false);
  const [profileData, setProfileData] = useState({});
  const [isInputField, setIsInputField] = useState(false);
  const [formChanged, setFormChanged] = useState(false);
  const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);
  const [showBtn, setShowBtn] = useState(false);
  const [editedData, setEditedData] = useState({
    name: "",
    number: "",
    address: "",
    role: "",
  });
  const [roles, setRoles] = useState([]);

  const router = useRouter();
  const { token } = parseCookies();
  const dispatch = useDispatch();
  const { setBreadcrumb } = useBreadcrumb();

  const handleEditBtn = () => {
    setIsInputField(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "number") {
      // Allow only numeric input
      const numericValue = value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
      setEditedData((prevData) => ({ ...prevData, [name]: numericValue }));
    } else {
      setEditedData((prevData) => ({ ...prevData, [name]: value }));
    }

    setFormChanged(true);
  };

  const handleReset = () => {
    // Reset the form data to its initial state
    setEditedData({
      name: profileData?.name || "",
      number: profileData?.phone?.number || "",
      address: profileData?.email?.address || "",
      role: profileData?._id || "",
    });

    setFormChanged(false); // Reset formChanged to false
    setOtpValues(["", "", "", "", "", ""]); // Reset OTP values if needed
  };
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("Text");
    const pastedValues = pastedData.split("").slice(0, 6);

    const newOtpValues = Array.from({ length: 6 }, (_, index) => {
      // Use the pasted value if available, otherwise, set it to an empty string
      return pastedValues[index] || "";
    });

    setOtpValues(newOtpValues);
  };

  const handleGetUserOtp = async () => {
    const data = {
      param: 6395192426
    }

    try {
      const res = await axios.post(`https://construction-backend.onrender.com/profile/verify/send-otp`, data, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
    } catch {
      console.log("error")
    }
  }

  // const handleVerify = async () => {
  //   // e.preventDefaullt
  //   try {
  //     const formData = {
  //       param: editedData?.number,
  //       otp: otpValues,
  //     };
  //     const response = await axios.patch(
  //       `${config.API_URL}/profile/verify`,
  //       formData,
  //       { headers: { Authorization: `Bearer ${token}` } }
  //     );
  //     if (response?.data?.success) {
  //       toast.success("Profile Updated Succesfully", {
  //         position: "top-center",
  //       });
  //     } else {
  //       toast.error("Something Went Wrong", { position: "top-center" });
  //     }
  //     setIsInputField(false);
  //     router.replace(router.asPath);
  //   } catch (error) {
  //     // Handle errors
  //     console.error("An error occurred:", error);
  //     toast.error("Failed to save changes", { position: "top-center" });
  //   } finally {
  //     // Set isSubmitting back to false regardless of success or failure
  //     setStatus(false);
  //   }
  // }

  const onSubmit = async () => {
    if (!editedData.name || !editedData.number || !editedData.address) {
      toast.error("Please fill in all required fields", {
        position: "top-center",
      });
      return; // Prevent form submission
    }

    try {
      setStatus(true);
      const data = {
        number:profileData?.phone?.number,
        address: editedData.address,
        name: editedData.name,
        role: profileData?.role?.name
      };
      const response = await axios.patch(
        `${config.API_URL}/profile/update/default`,
        data,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response?.data?.success) {
        toast.success("Profile Updated Succesfully", {
          position: "top-center",
        });
        console.log(response,"responsssseeeeeeeeeeeeeeeee");
      } else {
        toast.error("Something Went Wrong", { position: "top-center" });
      }
      setIsInputField(false);
      router.push(router.asPath);
    } catch (error) {
      // Handle errors
      console.error("An error occurred:", error);
      toast.error("Failed to save changes", { position: "top-center" });
    } finally {
      // Set isSubmitting back to false regardless of success or failure
      setStatus(false);
    }
  };

  useEffect(() => {
    // Set initial values when the component mounts or when profileData changes
    if (profileData) {
      setEditedData({
        name: profileData?.name || "",
        number: profileData?.phone?.number || "",
        address: profileData?.email?.address || "",
        role: profileData?.role?._id || "",
      });
    }

    setFormChanged(true);
  }, [profileData]);

  useEffect(() => {
    (async () => {
      try {
        const data = await dispatch(fetchProfileDataAsync());
        setProfileData(data.payload);
      } catch (error) {
        console.error("An error occurred:", error);
      }
    })();

    setFormChanged(false);
  }, [router]);

  useEffect(() => {
    setBreadcrumb("User Profile");
  }, []);

  useEffect(() => {
    if (editedData?.name != profileData?.name) {
      setShowBtn(true);
    } else if (editedData?.number != profileData?.phone?.number) {
      setShowBtn(true);
    } else if (editedData?.address != profileData?.email.address) {
      setShowBtn(true);
    } else if (editedData?.role != profileData?._id) {
      setShowBtn(true);
    } else setShowBtn(false);
  }, [editedData]);

  useEffect(() => {
    async function fetchWorkCategory() {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/roles`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (response?.data?.roles) {
          setRoles(response?.data?.roles);
        }
      } catch (error) {
        console.log(error, "errorerrorerrorerrorerror");
      }
    }

    fetchWorkCategory()
  }, [])

  return (
    <>
      <div className="d-flex gap-6"
        style={{ height: "auto" }}
      >
        <div className="col-4">
          <Image src="/assets/images/profile-img.jpg" width={500} height={500} alt="" />
        </div>
        <div className="col-8  p-4">

          <div className="text-end mb-5">
            {!isInputField ? (
              <button
                type="button"
                className="text-white rounded px-3  p-1 bg-btn-bg "
                onClick={handleEditBtn}
              >
                {/* <Image src="/assets/icons/edit_icon.svg" alt="" className="text-dark me-3 mb-1" width={15} height={15} /> */}
                <i className="bi bi-pencil-square me-2"></i>
                Edit
              </button>
            ) : (
              <>
                <button
                  type="button"
                  className="p-1 edit_btn me-3"
                  onClick={() => {
                    setIsInputField(false), handleReset();
                  }}
                >
                  <span>Cancel</span>
                </button>
                <button
                  type="submit"
                  className="p-1 edit_btn"
                  onClick={onSubmit}
                  disabled={
                    !showBtn && profileData?.name && profileData?.email?.address
                  }
                  
                >
                  {status ? (
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      aria-hidden="true"
                    ></span>
                  ) : null}
                  <span role="status">
                    {status ? (
                      "Saving..."
                    ) : (
                      <span>
                        <i className="bi bi-floppy me-2"></i>
                        Save
                      </span>
                    )
                    }
                  </span>
                </button>              
              </>
            )}
          </div>

          <div className="  modal-body text-info d-flex">
            {/* <div className="me-5">
              <div
                className="d-flex justify-content-center align-items-center bg-light-blue m-auto rounded-pill "
                style={{ width: "120px", height: "120px" }}
              >
                {profileData?.name ? (
                  <h1 className="text-black m-0">
                    {profileData?.name?.charAt(0).toUpperCase()}
                  </h1>
                ) : (
                  <span>
                    <i
                      className="bi bi-person text-black fs-1"
                      style={{ fontSize: "12rem" }}
                    ></i>
                  </span>
                )}
              </div>

              <h6 className="text-black text-center d-flex justify-content-center mt-2">
                {profileData?.name}
              </h6>
            </div> */}

            <form className="w-100">
              <div className="row">
                <div className="col-6">
                  <label className="form-label text-black">Name</label>

                  {isInputField ? (
                    <input
                      type="text"
                      name="name"
                      className="form-control border-bluec background-white"
                      placeholder="Enter Name"
                      onChange={handleInputChange}
                      value={editedData?.name}
                    />
                  ) : (
                    <div className="form_light form-control">{profileData?.name}</div>
                  )}
                  {/* <input type="text" className="form-control border-bluec background-white" placeholder="Enter Name" value={profileData?.name} /> */}
                </div>

                <div className="col-6">
                  <label className="form-label text-black">Number</label>

                  {isInputField ? (
                    <input
                      type="text"
                      name="number"
                      className="form-control background-white border-bluec"
                      placeholder="Enter Mobile Number"
                      onChange={handleInputChange}
                      value={profileData?.phone?.number}
                      maxLength={10}
                      disabled
                    />
                  ) : (
                    <div className="form_light form-control">{profileData?.phone?.number}</div>
                  )}

                  {/* <div className="col-12 text-start mt-3 mb-5">
                    {isInputField && profileData?.phone?.isValid && (
                      <>
                        {otpValues.map((value, index) => {
                          return (
                            <input
                              key={index}
                              id={`otp-input-${index}`}
                              className="rounded"
                              type="text"
                              inputMode="numeric"
                              autoComplete="one-time-code"
                              maxLength={1}
                              onChange={(e) =>
                                handleInputChange(index, e.target.value)
                              }
                              onPaste={handlePaste}
                              value={value}
                              style={{
                                width: "51px",
                                height: "46px",
                                marginRight: "8px",
                                border: "1px solid black",
                                textAlign: "center",
                              }}
                            />
                          );
                        })}

                        <div className="col-12 text-end">
                          <button type="submit" className="btn" onClick={handleVerify}>
                            Verify
                          </button>
                        </div>
                      </>
                    )}
                  </div> */}
                </div>

                {/* <div className="col-2 d-flex justify-content-end align-items-start">
                  {profileData?.phone?.isValid && isInputField && (
                    <button
                      type="button"
                      style={{
                        border: "1px solid black",
                        background: "aliceblue",
                        borderRadius: 5,
                        marginTop: "2rem",
                      }}
                      className="btn"
                      onClick={handleGetUserOtp}
                    // disabled={!showBtn && profileData?.phone?.isValid}
                    >
                      Get OTP
                    </button>
                  )}
                </div> */}
              </div>

              <div className="row mt-5">
                <div className="col-6 ">
                  <label className="form-label text-black">Role</label>
                  {isInputField ? (
                    <select className="form-select" >
                      {roles?.map((curVal) => {
                        const { _id, name } = curVal;
                        return (
                          <option className=" form-select" key={_id} value={_id}>
                            {name}
                          </option>
                        );
                      })}
                    </select>
                  ) : (
                    <div className="form_light form-control">{profileData?.role?.name}</div>
                  )}
                </div>

                <div className="col-6 mb-5">
                  <label className="form-label text-black">Email Address</label>

                  {isInputField ? (
                    <input
                      type="text"
                      name="address"
                      className="form-control background-white border-bluec"
                      placeholder="Enter Email"
                      onChange={handleInputChange}
                      value={editedData?.address}
                    />
                  ) : (
                    <div className="form_light form-control">{profileData?.email?.address}</div>
                  )}

                  {/* <div className="col-12 text-start mt-3 mb-5">
                    {isInputField && profileData?.phone?.isValid &&
                      <>
                        {
                          otpValues.map((value, index) => {
                            return (
                              <input
                                key={index}
                                id={`otp-input-${index}`}
                                className="rounded"
                                type="text"
                                inputMode="numeric"
                                autoComplete="one-time-code"
                                maxLength={1}
                                onChange={(e) => handleInputChange(index, e.target.value)}
                                onPaste={handlePaste}
                                value={value}
                                style={{
                                  width: '46px',
                                  height: '46px',
                                  marginRight: '8px',
                                  border: "1px solid black",
                                  textAlign: "center"
                                }}
                              />
                            )
                          })
                        }
                      </>
                    }
                  </div> */}
                </div>
              </div>
            </form>
          </div>

        </div>
      </div>
    </>
  );
}

export default EditProfile;
