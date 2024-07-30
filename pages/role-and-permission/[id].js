import { useState } from 'react';
import nookies, { parseCookies } from "nookies";
import AssignMembers from '../../components/dashboard/roleAndPermission/AssignMembers';
import UserPermissions from '../../components/dashboard/roleAndPermission/UserPermissions';
import BackIcon from "@/components/utils/global/BackIcon";

function Permissions({ permission }) {
  const [updatePermission, setUpdatePermission] = useState(permission);
  const [showInviteMemberModal, setShowInviteMemberModal] = useState(false);

  const openInviteMemberModal = () => {
    setShowInviteMemberModal(true);
  };

  return (
    <>
      <ul className="nav nav-tabs mb-4 d-flex justify-content-between" id="myTab" role="tablist">
        <div className='d-flex'>
          <li className="nav-item" role="presentation">
           
            <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">  <BackIcon/>Permissions</button>
          </li>
          <li className="nav-item" role="presentation">
            <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false"><BackIcon/>Assign Members</button>
          </li>
        </div>
      </ul>

      <div className="tab-content" id="myTabContent">
        <div className="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabIndex="0">
          <UserPermissions updatePermission={updatePermission} permission={permission} setUpdatePermission={setUpdatePermission} />

          {/* <AssignMembers /> */}

        </div>

        <div className="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabIndex="1">
          <AssignMembers />
        </div>
      </div>

    </ >
  );
}

export default Permissions;

export async function getServerSideProps(context) {
  const { token } = nookies.get(context);
  const id = context.query.id;
  const { currentOrganizationId } = nookies.get(context)

  const response = await fetch(`https://construction-backend.onrender.com/permission/${id}?organization=${currentOrganizationId}`,
    { headers: { Authorization: `Bearer ${token}` } });
  const permission = await response.json();

  return {
    props: {
      permission: permission?.permission || null
    }
  }
}