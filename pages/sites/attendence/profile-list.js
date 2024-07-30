import Employeedetails from "@/components/attendence/Employeedetails";
import Labourdetails from "@/components/attendence/Labourdetails";
import config from "@/config/config";
import axios from "axios";
import React from "react";
import nookies from "nookies";


const Profilelist = (props) => {

    
  return (
    <div>
      <div className="row bg-light-blue p-3">
        <span className="text-blue fw-bold ">Labour List</span>
      </div>

      <ul
        className="nav nav-tabs mb-4 d-flex justify-content-center border-0 mt-4 gap-5"
        id="myTab"
        role="tablist"
      >
        <div className="d-flex justify-content-center gap-5">
          {/* <li className="nav-item" role="presentation">
                        <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">Employee</button>
                    </li> */}
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="profile-tab"
              data-bs-toggle="tab"
              data-bs-target="#profile-tab-pane"
              type="button"
              role="tab"
              aria-controls="profile-tab-pane"
              aria-selected="true"
            >
              Labour
            </button>
          </li>
        </div>
      </ul>
      <div className="tab-content" id="myTabContent">
        <div
          className="tab-pane fade show active"
          id="home-tab-pane"
          role="tabpanel"
          aria-labelledby="home-tab"
          tabIndex="0"
        >
          {/* <Employeedetails /> */}
          {/* <AllMember roles={props.permission} userPermission={props.userPermission} /></div> */}
        </div>
        <div
          className="tab-pane fade show active "
          id="profile-tab-pane"
          role="tabpanel"
          aria-labelledby="profile-tab"
          tabIndex="0"
        >
          {/* <MemberBySite /> */}
          <Labourdetails props={props?.labourData} />
        </div>
      </div>
    </div>
  );
};

export default Profilelist;

export async function getServerSideProps(context) {
  const { currentOrganizationId, siteId, token } = nookies.get(context);
  let labourData = "";
  const response = await axios.get(
    `${config.API_URL}/labours?organization=${currentOrganizationId}&site=${siteId}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  labourData = response?.data?.labours;
  return {
    props: {
      labourData: labourData || null,
    },
  };
}
