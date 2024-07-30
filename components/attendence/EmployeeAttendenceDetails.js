import React, { useEffect, useState } from "react";
import LabourAttendanceWrapper from "./LabourAttendence";
import axios from "axios";
import config from "@/config/config";
import { parseCookies } from "nookies";
import { useDispatch, useSelector } from 'react-redux'; // Importing useDispatch and useSelector from react-redux
// import { getTodayAttendence } from "@/store/attendence/getTodayAttendence";

export default function EmployeeAttendenceDetails({ date, setTodayattendance }) {
  const { currentOrganizationId, siteId, token } = parseCookies();
  const reversedDatesString = date && date?.split("-").reverse().join("-");
  // const[todayAttendance, settodayAttendance]=useState("");
  const [labourData, setlabourData] = useState("");
  const [attendance, setAttendance] = useState("");
  const [todayPresent, setTodayPresent] = useState('');
  const [todayAbsent, setTodayAbsent] = useState('');
  const [totalPayment, setTotalPayment] = useState('');
  // const dispatch = useDispatch();

  // setAttendance(attendance);
  // setTodayPresent(attendance?.totalPresent || 0);
  // setTodayAbsent(attendance?.totalAbsent || 0);
  // setTotalPayment(attendance?.totalAmountToPay || 0);

  // useEffect(() => {
  // async function FetchAttendance() {
  //   try {
  //     const response = await axios.get(
  //       `${config.API_URL}/attendance/${reversedDatesString}?organization=${currentOrganizationId}&site=${siteId}`,
  //       { headers: { Authorization: `Bearer ${token}` } }
  //     );
  //     console.log(response)
  //     if (response && response.data) {
  //       const { attendance } = response.data;
  //       setAttendance(attendance);
  //       setTodayPresent(attendance?.totalPresent || 0);
  //       setTodayAbsent(attendance?.totalAbsent || 0);
  //       setTotalPayment(attendance?.totalAmountToPay || 0);
  //     } else {
  //       console.error("No data received from the server.");
  //     }
  //   } catch (error) {
  //     console.error("Error fetching attendance:", error.message);
  //   }
  // }

  //   FetchAttendance();
  // }, [date]);
  useEffect(() => {
    async function FetchAttendance() {
      try {
        const response = await axios.get(
          `${config.API_URL}/attendance/${reversedDatesString}?organization=${currentOrganizationId}&site=${siteId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (response && response.data) {
          const { attendance } = response.data;
          setAttendance(attendance);
          setTodayPresent(attendance?.totalPresent || 0);
          setTodayAbsent(attendance?.totalAbsent || 0);
          setTotalPayment(attendance?.totalAmountToPay || 0);
        } else {
          console.error("No data received from the server.");
        }
      } catch (error) {
        console.error("Error fetching attendance:", error.message);
      }
    }
    if (reversedDatesString) {
      FetchAttendance();
    }
  }, [date, currentOrganizationId, siteId, token, reversedDatesString]);

  const fetchLabour = async () => {
    try {
      const response = await axios.get(
        `${config.API_URL}/labours?organization=${currentOrganizationId}&site=${siteId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response && response.data && response.data.labours) {
        setlabourData(response.data.labours);
      } else {
        console.error("No labor data received from the server.");
      }
    } catch (error) {
      console.error("Error fetching labor data:", error.message);
    }
  };

  useEffect(() => {
    fetchLabour();
  }, []);
  console.log(todayPresent, "todayPresent")
  return (
    <>
      <div className="row">
        <div className="col bg-light-blue p-2 text-center position-static d-flex justify-content-between">
          <span className=" p-3 fw-bold text-center">
            {reversedDatesString}
          </span>
          <span className=" p-3 fw-bold text-center">Attendance</span>
        </div>
      </div>
      {true ? (
        <div className="row">
          <ul
            className="nav nav-tabs mb-4 d-flex justify-content-center border-0 mt-4 gap-5"
            id="myTab"
            role="tablist"
          >
            <div className="d-flex justify-content-center gap-5">
              <li className="" role="presentation">
                <span className="fw-bold">Total Present</span>
                <br />
                <span className="fw-bold text-success">{todayPresent} </span>
                {/* <small className="bg-blue p-2 rounded fw-bold text-white underline" ></small> */}
              </li>
              <li className="nav-item " role="presentation">
                <span className="fw-bold">Total Absent</span>
                <br />
                <span className="fw-bold text-danger ">{todayAbsent}</span>
                {/* <button className="nav-link active" data-bs-toggle="tab" data-bs-target="#employee-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true"> Labour</button> */}
              </li>
              <li className="nav-item" role="presentation">
                <span className="fw-bold">₹ Total Payment</span>
                <br />
                <span className="fw-bold text-warning   ">
                  ₹ {totalPayment}/-
                </span>
                {/* <button className="nav-link" data-bs-toggle="tab" data-bs-target="#labour-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="true">Employee</button> */}
              </li>
            </div>
          </ul>

          <div className="tab-content" id="myTabContent">
            <div
              className="tab-pane fade show active "
              id="employee-tab-pane"
              role="tabpanel"
              aria-labelledby="home-tab-pane"
              tabIndex="0"
            >
              {(
                <LabourAttendanceWrapper
                  reversedDatesString={reversedDatesString}
                  attendance={attendance?.attendance}
                  labourData={attendance?.length > 0 ? attendance : labourData}
                  setTodayattendance={setTodayattendance}

                />


              )

              }

            </div>
          </div>
        </div>
      ) : (
        <div className="row  p-5">
          <span>Click on Calendar to show attendance.</span>
        </div>
      )}
    </>
  );

}
