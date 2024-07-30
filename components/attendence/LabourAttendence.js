import axios from "axios";
import React, { useState, useEffect } from "react";
import nookies, { parseCookies} from "nookies";
import config from "@/config/config";
import LabourAttendence from "./LabourAttendence"; // Assuming the path is correct
import { Link } from "react-router-dom";
import AddProfile from "@/components/attendence/AddProfile";
import Labourupdate from "./Labourupdate";
// const LabourAttendence = ({ reversedDatesString, attendance, labourData, setTodayattendance }) => {
  
const getInitialLabourPayload = (attendance) => {
  return attendance?.labours || [];
};
function LabourAttendanceWrapper({ reversedDatesString, attendance, labourData, setTodayattendance }) {
  const [userData, setUserData] = useState([]);
  console.log(attendance, 'hiiyughgfhfgfgfg')
  const [labourPayload, setlabourPayload] = useState(() => {
    return getInitialLabourPayload(attendance);
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Update local storage when labourPayload changes
      localStorage.setItem("labourPayload", JSON.stringify(labourPayload));
    }
  }, [labourPayload]);

  useEffect(() => {
    const savedPayload = localStorage.getItem("labourPayload");
    if (savedPayload) {
      // Retrieve and set the saved payload from local storage
      setlabourPayload(JSON.parse(savedPayload));
    }
  }, []);
  const handleDelete = async (profileId) => {
    const { currentOrganizationId, siteId, token } = parseCookies();
    try {
      const response = await axios.delete(
        `${config.API_URL}/components/attendence/LabourAttendence/${profileId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          params: {
            organization: currentOrganizationId,
            site: siteId,
          },
        }
      );
      if (response.data.success) {
        toast.success("Profile deleted successfully", { position: "top-center" });
        fetchData(); // Update or refresh data after deletion
      } else {
        toast.error("Error deleting profile", { position: "top-center" });
      }
    } catch (error) {
      console.error('Error deleting profile:', error);
    }
  };
  const confirmDelete = (profileId) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this profile?");
    if (isConfirmed) {
      handleDelete(profileId);
    }
  };
 
  const [overtime, setOvertime] = useState([]);
  const [labourOverTimeHours, setLabourOverTimeHours] = useState('');
  const [labourOverTimeWage, setLabourOverTimeWage] = useState('');
  const [status, setStatus] = useState({});
  const [itemStatus, setItemStatus] = useState(null); // Initialize item status to null
console.log(attendance,'hiiiiiiiiiiiiiiiiiiii');
  const handleButtonClick = (id, newStatus, dailyHours, labourOverTimeHours, labourOverTimeWage) => {
    marklabourPayload(id, newStatus, dailyHours, labourOverTimeHours, labourOverTimeWage);
    handleStatusChange(id, newStatus);
    setItemStatus(itemStatus === newStatus ? null : newStatus);
    const check = attendance && attendance.filter((e) => e.labour && e.labour._id === id);
    // Check if 'check' has elements before accessing properties
    if (check && check.length > 0) {
      check[0].availability = newStatus;
      console.log(check, "checkchectshhhhhhhhhhhhhhhhhhdfk");
    } else {
      console.log("No matching check item found for labourId:", id);
      // Handle the case where 'check' is empty or undefined
    }
  };
  const handleStatusChange = (id, newStatus) => {
    setStatus((prevStatus) => ({ ...prevStatus, [id]: newStatus }));
  };
  
  const marklabourPayload = (
    labourId,
    labourAvailability,
    dailyHours,
    labourOverTimeHours,
    labourOverTimeWage
  ) => {
    // Find the index of the labourId in the existing labourPayload
    const existingIndex = labourPayload.findIndex((item) => item._id === labourId);
  
    if (existingIndex !== -1) {
      // If the labourId already exists in labourPayload, update its properties based on availability
      let updatedPayload = [...labourPayload]; // Create a copy of the existing payload
  
      switch (labourAvailability) {
        case 1: // P
          updatedPayload[existingIndex] = {
            ...updatedPayload[existingIndex], // Preserve other properties
            _id: labourId,
            availability: labourAvailability,
            dailyHours: dailyHours,
            overtime: labourOverTimeHours,
            overtimePayment: labourOverTimeWage
          };
          break;
        case 2: // HD
          updatedPayload[existingIndex] = {
            ...updatedPayload[existingIndex], // Preserve other properties
            _id: labourId,
            availability: labourAvailability,
            dailyHours: dailyHours,
            overtime: labourOverTimeHours,
            overtimePayment: labourOverTimeWage
          };
          break;
        case 3:   updatedPayload[existingIndex] = {
          ...updatedPayload[existingIndex], // Preserve other properties
          _id: labourId,
          availability: labourAvailability,
          dailyHours: dailyHours,
          overtime: labourOverTimeHours,
          overtimePayment: labourOverTimeWage
        };
          break;
        default:
          break;
      }
  console.log(existingIndex,"exist")
      setlabourPayload(updatedPayload); // Update the labourPayload
    } else {
      // If the labourId does not exist in labourPayload, add a new object
      setlabourPayload((prevPayload) => [
        ...prevPayload,
        {
          _id: labourId,
          availability: labourAvailability,
          dailyHours: dailyHours,
          overtime: labourOverTimeHours,
          overtimePayment: labourOverTimeWage
        }
      ]);
    }
  };
  
  const handleAddOvertime = (labourId, labourOverTimeHours, labourOverTimeWage) => {
    setOvertime([]); // Close the add overtime section after adding overtime
    const updatedLabourPayload = labourPayload.map((item) => {
      if (item._id === labourId) {
        return {
          ...item,
          overtime: labourOverTimeHours,
          overtimePayment: labourOverTimeWage,
        };
      } else {
        return item;
      }
    });
    console.log('Event Object:', labourId, labourOverTimeHours, labourOverTimeWage, updatedLabourPayload);
    setlabourPayload(updatedLabourPayload);
  };
  console.log(labourPayload, "labourPayloadlabourPayloadlabourPayload")
  const handlemarkattendance = async () => {
    console.log({ labours: labourPayload, date: reversedDatesString }, "todayattendancetodayattendance")
    const { currentOrganizationId, siteId, token } = parseCookies()
    try {
      const mark = await axios.patch(
        `${config.API_URL}/attendance/mark?organization=${currentOrganizationId}&site=${siteId}`,
        { labours: labourPayload, date: reversedDatesString },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      console.log(mark, "markkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk")
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className=" p-2 ">
        {labourData &&
          labourData.map((item, index) => {
            console.log(item, "itemersdtfgvyh")
            console.log(attendance, "attendanceattendance")
            const check = attendance && attendance.filter((e) => e.labour && e.labour._id === item._id);
            let itemStatus = (check?.[0]?.availability) || status[item._id];
            // let itemStatus = check && check.length > 0 ? check[0].availability : 0;
            // let itemStatus = status[item._id] || item.availability;
            console.log(check, "checkcheck", itemStatus)
            return (
              <div
                className="row-sm border-bottom mt-2  shadow-lg  rounded p-2 "
                key={index}
              >
                <>
                  <div className="row">
                    <div className="col-8">
                      <small className="fw-bold fs-5 text-btn-bg">
                        {item.name}
                      </small>
                      <br />
                      <small className="fw-bold text-blue">{item.role}</small>
                    </div>
                    <div className="col-4 text-end">
                      {/* <small className="fw-bold fs-5">
                        <i className="bi bi-three-dots-vertical"></i>{" "}
                      </small> */}
                      {/* <button className='btn bg-info text-white ' style={{ boxShadow: "2px 2px 13px #8CBCD9" }} type="button" data-bs-toggle="offcanvas" data-bs-target="#editoffcanvasRight" aria-controls="offcanvasRight">+
                      <i className="bi bi-pencil"></i></button>
                      <button className="fw-bold fs-5">Delete</button> */}
                      <div className="d-flex gap-3">
                        <button
                          className="btn bg-info text-white"
                          style={{ height: "30px", padding: "3px", boxShadow: "2px 2px 13px #8CBCD9" }}
                          type="button"
                          data-bs-toggle="offcanvas"
                          data-bs-target="#ediroffcanvasRight"
                          aria-controls="offcanvasRight"
                          // className="offcanvas-title" id="editoffcanvasRightLabel"
                          onClick={() => setUserData(item)}
                        >
                          <i className="bi bi-pencil"></i>
                        </button>
                        <Labourupdate data={userData}  />
                        <button
                          className="btn bg-danger text-white"
                          style={{ height: "30px", padding: "3px", boxShadow: "2px 2px 13px #FF0000" }}
                          type="button"
                          data-bs-toggle="modal"
                          data-bs-target="#profiledeletemodal"
                          onClick={() => confirmDelete(item._id)}
                                          >
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-7 d-flex justify-content-evenly  ">
                      <div className="row d-flex w-100">
                        <div className="d-flex justify-content-between flex-wrap">
                          <div className="col-2 ">
                            {/* <button
                            className="bg-gray   text-blue rounded-circle px-3  py-2"
                            onClick={() => marklabourPayload(item._id, 1, item.dailyHours, labourOverTimeHours, labourOverTimeWage)}
                           
                          >
                            P
                          </button> */}
                            <button
                              className={`bg-${itemStatus === 1 ? "success" : 'gray'} rounded-circle px-3 py-2`}
                              onClick={() => handleButtonClick(item._id, 1, item.dailyHours, labourOverTimeHours, labourOverTimeWage)}
                            >
                              P
                            </button>
                          </div>
                          <div className="col-2">
                            {/* <button
                            className="bg-gray text-black rounded-circle px-3  py-2"
                            onClick={() => marklabourPayload(item._id, 0, item.dailyHours, labourOverTimeHours, labourOverTimeWage)}
                          >
                            A
                          </button> */}
                            <button
                              className={`bg-${itemStatus === 3 ? "danger" : 'gray'} rounded-circle px-3 py-2`}
                              onClick={() => handleButtonClick(item._id, 3, item.dailyHours, labourOverTimeHours, labourOverTimeWage)}
                            >
                              A
                            </button>
                            {/* <button className="bg-danger text-white rounded-circle px-3  py-2">
                          A
                        </button> */}
                          </div>
                          <div className="col-2">
                            {/* <button
                            className="bg-gray rounded px-2  py-2 rounded-pill"
                            onClick={() => marklabourPayload(item._id, 2, item.dailyHours, labourOverTimeHours, labourOverTimeWage)}
                          >
                            HD
                          </button> */}
                            {/* <button className="bg-warning rounded px-2  py-2 rounded-pill">
                          HD
                        </button> */}
                            <button
                              className={`bg-${itemStatus === 2 ? "yellow" : 'gray'} rounded-circle px-2 py-2`}
                              onClick={() => handleButtonClick(item._id, 2, item.dailyHours, labourOverTimeHours, labourOverTimeWage)}
                            >
                              HD
                            </button>
                          </div>
                        </div>
                        <div className="col-7 mt-3">
                          <small className="fw-bold">Working Hour: </small>
                          <h5 className="  fw-bold text-primary">
                            {item.dailyHours}
                          </h5>
                        </div>
                        {/* <div className="col-5 mt-3">
                        <small className="fw-bold">Working Hour: </small>
                      <h5 className="  fw-bold text-primary">{item.workingHour}</h5>
                      </div> */}
                        <div></div>
                      </div>
                    </div>
                    <div className="col-5 d-flex justify-content-start gap-3 flex-column">
                      <div className="text-center fw-bold">
                        <small>To Pay</small>
                        <br />
                        <h6 className=" text-center fw-bold text-primary">{item.payment}</h6>
                      </div>
                      <div>
                        <span
                          className="fw-bold text-primary cursor-pointer"
                          onClick={() =>
                            setOvertime((prevOvertime) =>
                              prevOvertime.includes(item._id)
                                ? prevOvertime.filter((id) => id !== item._id)
                                : [...prevOvertime, item._id]
                            )
                          }
                        >
                          {overtime.includes(item._id) ? <span>- Hide Overtime</span> : <span>+ Add Overtime</span>}
                        </span>
                      </div>
                    </div>
                  </div>
                  {overtime.includes(item._id) && (
                    <div className="row-sm border-top shadow pb-3 rounded">
                      <div className="row-sm mt-4 px-3">
                        <h6>Add OverTime</h6>
                      </div>
                      <div className="row-sm d-flex justify-content-between px-3 mt-3">
                        <div className="col-4">
                          <small className="text">Over Time Hours</small>
                          <input
                            type="number"
                            className="form-control"
                            placeholder="0"
                            value={labourOverTimeHours}
                            onChange={(e) => {
                              const value = e.target.value;
                              setLabourOverTimeHours(value);
                              console.log('Updated Overtime:', value); // Log the updated 'overtime' value
                            }}
                          />
                        </div>
                        <div className="col-5">
                          <small>Over Time wage/hr</small>
                          <input
                            type="number"
                            className="form-control"
                            placeholder="0"
                            value={labourOverTimeWage}
                            onChange={(e) => setLabourOverTimeWage(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="row-sm justify-content-between p-3 gap-3 d-flex">
                        <div>
                          {/* <small className="fw-bold">Overtime Payment: </small>
                        <h5 className="  fw-bold text-primary">
                          dfj
                        </h5> */}
                        </div>
                        <div className="mt-3">
                          {/* <button
                          type="button"
                          className="btn border btn-outline-danger"
                        >
                          Clear
                        </button> */}
                          <button
                            type="submit"
                            className="btn border btn-outline-primary"                            
                            onClick={() => handleAddOvertime(item._id, labourOverTimeHours, labourOverTimeWage)}
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              </div>
            )
          })}
      </div>
      <div>
        <button className="btn bg-btn-bg w-100 text-white" onClick={handlemarkattendance}>Mark attendance</button>
      </div>
      {/* <LabourAttendence key={key} reversedDatesString={reversedDatesString} attendance={attendance} labourData={labourData} setTodayattendance={setTodayattendance} />; */}
    </>
  );
};

// export default LabourAttendence;
export default LabourAttendanceWrapper;