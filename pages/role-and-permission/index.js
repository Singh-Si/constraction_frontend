import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import CreateRole from "@/components/utils/Modal/CreateRole";
import nookies from "nookies";
import config from "@/config/config";
import moment from "moment";
import CheckPermissions from "@/components/utils/checkPermissions";
import plan from "../plan";
import Image from "next/image";
import BackIcon from "@/components/utils/global/BackIcon";

export default function RoleandPermission({ permissions, planData }) {
  const [roleModal, setRoleModal] = useState(false);

  const handleRole = () => {
    setRoleModal(true);
  };
  const CloseRoleModal = () => {
    setRoleModal(false);
  };
  const verticalAlign = {
    display: "flex",
    alignItems: "center",
  };

  return (
    <>
      {planData && planData.read ? (
        <div>
          <div className="row">
            <div className="text-end d-flex bg-aliceblue m-auto justify-content-between align-items-center w-75">
              <div className="text-black fs-5 fw-semibold">
                <BackIcon/>
                Roles and Permission
              </div>
              {planData && planData.insert && (
                <button
                  className="btn bg-btn-bg text-white new-site-btn shadow"
                  type=""
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasRight"
                  aria-controls="offcanvasRight"
                  onClick={handleRole}
                  // disabled={!planData?.organizationProfileAndPlansObject?.permissions?.insert}
                >
                  + CREATE ROLE
                </button>
              )}
            </div>
            <CreateRole showModal={roleModal} closeModal={CloseRoleModal} />
          </div>
          <div className="row">
            <div className="col">
              <ul className="mt-4 list-group shadow-sm w-75 m-auto small">
                <li
                  className="list-group-item p-3 text-white fw-bolder"
                  style={{ background: "#8cbcd9" }}
                >
                  <div className="row">
                    <div className="col">ROLE</div>
                    <div className="col">CREATED AT</div>
                    <div className="col">UPDATED AT</div>
                  </div>
                </li>
                {permissions ? (
                  <>
                    {permissions?.map((permission, index) => {
                      return (
                        <li key={index} className="list-group-item p-3">
                          {/* planData && planData.insert && */}
                          <Link
                            href={{
                              pathname: `role-and-permission/${permission?._id}`,
                              state: "planData.insert",
                            }}
                            // href={`role-and-permission/${permission?._id}`}
                            className="text-decoration-none text-black"
                          >
                            <div className="row">
                              <div className="col" style={verticalAlign}>
                                {permission?.name}
                              </div>
                              <div className="col small" style={verticalAlign}>
                                <div>
                                  <p className="mb-0">
                                    {permission?.createdBy.name}
                                  </p>
                                  {/* <p className='mb-0'>{permission.createdAt}</p> */}
                                  <p className="mb-0">
                                    {moment(permission?.createdAt).format(
                                      "MMMM Do YYYY"
                                    )}
                                  </p>
                                </div>
                              </div>
                              <div className="col small" style={verticalAlign}>
                                <div>
                                  <p className="mb-0">
                                    {permission?.updatedBy?.name ||
                                      permission?.createdBy?.name}
                                  </p>

                                  <p className="mb-0">
                                    {" "}updatedAt
                                    {moment(permission?.updatedAt).format(
                                      "MMMM DD YYYY"
                                    )}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </Link>
                        </li>
                      );
                    })}
                  </>
                ) : (
                  <div
                    className="d-flex justify-content-center align-items-center"
                    style={{ height: "60vh" }}
                  >
                    There are No Permissions
                  </div>
                )}
              </ul>
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
}

export async function getServerSideProps(context) {
  const { token, currentOrganizationId } = nookies.get(context);

  if (!token) {
    return {
      redirect: {
        destination: "/user/login",
      },
    };
  }

  let response;
  let permissions;
  let planData;

  try {
    response = await axios.get(
      `${config.API_URL}/permissions?organization=${currentOrganizationId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    permissions = response?.data?.permissions || null;

    const permission = await CheckPermissions(
      context,
      "admin_settings",
      "roles-and-permissions"
    );
    planData = permission?.permission;
    if (!permission.success) {
      return {
        redirect: {
          destination: "/AccessDeniedPage",
        },
      };
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }

  return {
    props: {
      permissions: permissions || null,
      planData: planData || null,
    },
  };
}
