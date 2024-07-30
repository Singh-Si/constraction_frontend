import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import timeGridPlugin from "@fullcalendar/timegrid";
import { Router, useRouter } from "next/router";
import Link from "next/link";
import AddProfile from "@/components/attendence/AddProfile";
import EmployeeAttendence from "@/components/attendence/EmployeeAttendenceDetails";
import EmployeeAttendenceDetails from "@/components/attendence/EmployeeAttendenceDetails";
import axios from "axios";
import config from "@/config/config";
import nookies, { parseCookies } from "nookies";
import CheckPermissions from "@/components/utils/checkPermissions";
import Image from "next/image";

const Attendance = ({ labourData, userPermission }) => {
  const [prevClickedDate, setPrevClickedDate] = useState(null);

  const [events, setEvents] = useState([
    {
      title: "event 1",
      start: "2024-02-02T10:00:00",
      end: "2024-02-02T11:00:00",
    },
  ]);
  const today = new Date();
  console.log(today,"today")

  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, '0');  
  const day = today.getDate();
  const TodayDate = `${year}-${month}-${day}`;
  const [date, setDate] = useState(TodayDate);
  const router = useRouter();
  const handleDateClick = (arg) => {
    setDate(arg.dateStr);
  };

  const [todayattendance, setTodayattendance] = useState([]);

  const markattendance = async () => {
    console.log(todayattendance)
    const { currentOrganizationId, siteId, token } = parseCookies()
    try {
      const mark = await axios.patch(
        `${config.API_URL}/attendance/mark?organization=${currentOrganizationId}&site=${siteId}`,
        todayattendance,
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      {userPermission && userPermission?.read ? (
        <div>
          <div className="row p-3">
            <div className="d-flex  justify-content-end gap-3">
              <Link href="/sites/attendance/profile-list">
                <button className="bg-white p-2 border border-info rounded  text-info fw-bold">
                  Profile List
                </button>
              </Link>
              <button
                className="btn bg-btn-bg text-white "
                style={{ boxShadow: "2px 2px 13px #8CBCD9" }}
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasRight"
                aria-controls="offcanvasRight"
              >
                +Profile
              </button>
              <AddProfile />
            </div>
          </div>
          <div className="row-sm d-flex gap-2">
            <div className="col-8">
              <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
                headerToolbar={{
                  left: "prev",
                  center: "title",
                  right: "next today",
                }}
                customButtons={{
                  addEvent: {
                    text: "add event",
                    eventClick: function (info) {


                      // change the border color just for fun
                      info.el.style.borderColor = 'red';
                      // click: () => {
                      //   const newEvent = { title: 'event new', start: '2024-02-02T11:00:00', end: '2024-02-02T12:00:00' }
                      //   setEvents([...events, newEvent])
                      // }
                    },
                  }
                }}
                initialView="dayGridMonth"
                // dateClick={}ssss
                dateClick={(arg) => {
                  if (prevClickedDate) {
                    prevClickedDate.style.backgroundColor = ''; // Reset previous background color
                  }
                  arg.dayEl.style.backgroundColor = '#cfe4f8'; // Change background color to red
                  setPrevClickedDate(arg.dayEl); // Store reference to the clicked date element
                  handleDateClick(arg);
                }}
              // events={events}

              />
            </div>
            <div className="col-4" style={{ height: "100vh" }}>
              <div
                className=" border overflow-x-hidden "
                style={{ height: "100vh" }}
              >
                <EmployeeAttendenceDetails
                  date={date}
                  labourData={{ labourData }}
                  setTodayattendance={setTodayattendance}
                />
              </div>
              <div className="row-sm px-1 mb-5">
                {/* <button
                  className="btn bg-btn-bg text-white w-100 relative mb-5"
                  style={{ bottom: "2.5rem ", position: "relative" }}
                  onClick={() => markattendance()}
                >
                  
                  Mark
                </button> */}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="row ">
          <Image
            src="/assets/images/access_denied.svg"
            width={400}
            height={500}
            alt=""
          />
        </div>
      )}
    </>
  );
};

export default Attendance;
export async function getServerSideProps(context) {
  const { currentOrganizationId, siteId, token } = nookies.get(context);
  let labourData = "";
  let userPermission;

  const permission = await CheckPermissions(
    context,
    "labour_tracking_and_payable",
    "attendance"
  );
  userPermission = permission?.permission;

  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/labours?organization=${currentOrganizationId}&site=${siteId}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  labourData = response?.data?.labours;

  return {
    props: {
      labourData: labourData || null,
      userPermission: userPermission,
    },
  };
}