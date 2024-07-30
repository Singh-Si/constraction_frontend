import { useEffect, useState } from 'react';
import { Col, Row } from "reactstrap";
// import createProject from '../../assets/images/createproject.png';
// import logo from '../../assets/images/logo.png';
// import addteam from '../../assets/icons/addteam.png';
// import sync from '../../assets/icons/sync.png';
// import { Link } from "react-router-dom";
import InviteMember from "@/components/utils/Modal/InviteMember";
import Link from 'next/link';
import nookies from 'nookies';
import { toast } from 'react-toastify';
import axios from 'axios';


const CreateSites = (props) => {
  const [showInviteMemberModal, setShowInviteMemberModal] = useState(false);

  const openInviteMemberModal = () => {
    setShowInviteMemberModal(true);
  };

  const closeInviteMemberModal = () => {
    setShowInviteMemberModal(false);
  };

  return (
    <div className=" d-flex flex-column justify-content-center gap-2 ">
      <Row className="text-end">
        <Col lg="11" className="m-auto" >
          <div className='logo text-start'>
            <img src="/assets/images/logo.png" />
          </div>
        </Col>
      </Row>

      <Row className="justify-content-center align-items-center">
        <Col lg="5">
          <div className=' mt-3 ml-5'>
            <div>
              <h1 className='text-blue text-start'>Create Sites</h1>


              <form className="form" >
                <div className="form-group mt-4">
                  <div className='text-start w-100'><label for="exampleInputPassword1 ">Site Name</label></div>
                  <input type="text" className="form-control form-control-bg-color" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Site Name" />
                </div>
                <div className="form-group mt-4">
                  <div className='text-start w-100'><label for="exampleInputPassword1 ">Organisation Name</label></div>
                  <input type="text" className="form-control form-control-bg-color" id="exampleInputPassword1" placeholder="Your Organisation" />
                </div>
                <div className="form-group mt-4">
                  <div className="d-flex gap-2 justify-content-between">
                    <div className='text-start text-bold'><label for="exampleInputPassword1 ">Start Date</label><br />
                      <input type="date" className="date-input" placeholder="" />
                    </div>
                    <div className='text-start '><label for="exampleInputPassword1 ">End Date</label><br />
                      <input type="date" className="date-input" />
                    </div>
                  </div>
                </div>

                <div className="form-group mt-2 text-end">
                  <button type="button" className="btn add-team text-end " onClick={openInviteMemberModal}>
                    <img src="/assets/icons/addteam.png" />  Add Team
                  </button>
                  {/* <button onClick={openInviteMemberModal} type="button" className="add_team_btn"><img src="/assets/icons/addteam.png" /> ADD TEAM</button> */}
                  {/* <span className="add-team text-end cursor-pointer"  onClick={openInviteMemberModal}><img src={addteam} /> ADD TEAM</span>
                     */}
                  <InviteMember showModal={showInviteMemberModal} closeModal={closeInviteMemberModal} roles={props?.roles} />
                </div>

                <div className="form-group mt-2">
                  <div className="d-flex gap-2 flex-wrap bg-gray p-2 border rounded">
                    <small className='bg-dark-gray p-1   border rounded'>Ravi Khan </small>
                    <small className='bg-dark-gray p-1   border rounded'>Ravi Khan </small>
                    <small className='bg-dark-gray p-1   border rounded'>Ravi Khan </small>
                    <small className='bg-dark-gray p-1   border rounded'>Ravi Khan </small>


                  </div>
                  <div className='text-end w-100 mt-2  h-100'><small ><img src="/assets/icons/sync.png" alt="sync" /> Sync</small></div>
                </div>
                <div className="text-start w-100 mt-5">

                  <Link href="/"><button className="text-white m-auto w-100 bg-btn-bg auth_btn">CREATE</button><br /></Link>

                </div>


              </form>
            </div>
          </div>
        </Col>
        <Col lg="6" className="d-flex gap-5 flex-column">
          <img src="/assets/images/createproject.png" className="w-75" />
          <div className="text-end ">
            {/* <Link href="/dashboard" className="bg-secondary bg-gradient rounded p-2 text-white text-decoration-none">Do it Later</Link> */}

          </div>
        </Col>
      </Row>

      <Row>
        <Col lg="11" className="text-end">
          {/* <Link href="/dashboard" className=" p-2  text-decoration-none doitLater">Do It Later</Link> */}
        </Col>
      </Row>
    </div>
  );
};

export default CreateSites;

export async function getServerSideProps(context) {
  const cookies = nookies.get(context);

  const token = cookies.token || '';

  let roles = [];

  try {
    const fetchRolesData = await axios.get(`https://construction-backend.onrender.com/roles`, { headers: { Authorization: `Bearer ${token}` } });
    roles = fetchRolesData.data?.roles;
  } catch (error) {
    toast.error("Error fetching roles data:", error);
  }

  try {
    const fetchRolesData = await axios.get(`https://construction-backend.onrender.com/roles`, { headers: { Authorization: `Bearer ${token}` } });
  } catch {

  }

  return {
    props: {
      roles: roles || null
    }
  }
}