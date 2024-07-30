import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import AllMember from '@/components/member/all-members'
import InviteMember from '@/components/utils/Modal/InviteMember';
import { parseCookies } from 'nookies';
import { BreadcrumbProvider, useBreadcrumb } from '@/contexts/BreadcrumbContext'
import { fetchMembersAsync } from '@/store/member/MemberSlice';
import { checkPermissions } from '@/store/UserPermisionSlice';
import BackIcon from "@/components/utils/global/BackIcon";

const Member = () => {
  const [showInviteMemberModal, setShowInviteMemberModal] = useState(false);
  const dispatch = useDispatch();
  const { permissions, status } = useSelector((state) => state?.UserPermisionSlice);
  const memberData = useSelector((state) => state?.MemberSlice?.memberData?.permissions)

  const openInviteMemberModal = () => {
    setShowInviteMemberModal(true);
  };
  const closeInviteMemberModal = () => {
    setShowInviteMemberModal(false);
  };

  useEffect(() => {
    const context = parseCookies();
    let data = {
      context: context,
      plan: "project_management",
      feature: "members"
    }

    dispatch(checkPermissions(data));
  }, []);

  useEffect(() => {
    dispatch(fetchMembersAsync());
  }, [dispatch])

  return (
    <>
      {permissions?.permission?.permission?.read === "false" && (
        <div className="row ">
          <Image src="/assets/images/access_denied.svg" width={400} height={500} alt="access_denied" />
        </div>
      )}

      {permissions && permissions?.permission?.permission?.read
        &&
        <div>
          <ul
            className="nav nav-tabs mb-4 d-flex justify-content-between py-1"
            id="myTab"
            role="tablist"
          >
            <div className="d-flex">
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link active"
                  id="home-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#home-tab-pane"
                  type="button"
                  role="tab"
                  aria-controls="home-tab-pane"
                  aria-selected="true"
                >
                  <BackIcon />
                  All Member
                </button>
              </li>
            </div>
            <div>
              <li className="nav-item" role="presentation">
                {permissions && permissions?.permission?.permission?.insert && (
                  <button
                    type="button"
                    className="border-info text-white m-auto w-100  rounded px-2 py-1 btn bg-btn-bg"
                    data-bs-toggle="modal"
                    onClick={openInviteMemberModal}
                    data-bs-target=".bd-example-modal-xl"
                  >
                    +Add Member
                  </button>
                )}
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
              {memberData && memberData?.length > 0 && <AllMember
                roles={memberData}
                userPermission={permissions?.permission}
              />
              }
            </div>

          </div>
          <InviteMember
            showModal={showInviteMemberModal}
            closeModal={closeInviteMemberModal}
            roles={memberData}
            showInviteMemberModal={showInviteMemberModal}
          />
        </div>
      }
    </>
  );
};

export default Member;
