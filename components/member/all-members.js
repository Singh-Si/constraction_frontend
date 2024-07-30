import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Spinner } from "reactstrap";
import axios from "axios";
import Image from "next/image";
import { parseCookies } from "nookies";
import { getAllmember } from "@/store/member/allmember";
import config from "@/config/config";
import Loader from "@/layouts/loader/Loader";

const AllMember = ({ roles, userPermission }) => {
  const [currentRole, setCurrentRole] = useState(false);
  const dispatch = useDispatch();
  const { members } = useSelector(
    (state) => state?.getAllmember?.allMemberData
  );

  const handleUpdatePermission = useCallback(async (value, id, name) => {
    const { currentOrganizationId, token } = parseCookies();
    const data = {
      permission: value,
    };
    try {
      const response = await axios.patch(
        `${config.API_URL}/member/update/${id}?organization=${currentOrganizationId}`,
        data,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response?.data?.success) {
        toast.success("Member  Role Updated", { position: "bottom-center" });
        setCurrentRole((prev) => !prev);
      } else {
        toast.warning(response?.data?.error);
      }
    } catch {
      console.log("error");
    }
  }, []);

  useEffect(() => {
    dispatch(getAllmember());
  }, [dispatch, currentRole]);

  return (
    <div className="row">
      <div className="col">
        <ul className="list-group shadow-sm w-75 m-auto small">
          <li className="list-group-item p-3 text-white fw-bolder bg-blue">
            <div className="row d-flex justify-content-between">
              <div className="col-4">Members</div>
              <div className="col-3">Assigned Members</div>
              <div className="col-3">Role</div>
            </div>
          </li>
          {members && members?.length > 0 ? (
            <>
              {members?.map((member, index) => {
                const nameParts = member?.user?.name.split(" ");
                const firstNameInitial = nameParts[0]
                  ? nameParts[0].charAt(0)
                  : "";
                const lastNameInitial =
                  nameParts.length > 1
                    ? nameParts[nameParts.length - 1].charAt(0)
                    : "";
                return (
                  <li key={index} className="list-group-item ">
                    <div
                      href="/member"
                      className="text-decoration-none text-black"
                    >
                      <div className="row gap-5">
                        <div className="col-4 d-flex align-items-center px-2 m-0 gap-3 ">
                          <div className=" profile-logo d-flex justify-content-center align-items-center bg-danger shadow border border-3">
                            <h2 className="text-white mb-0">
                              {firstNameInitial}
                              {lastNameInitial}
                            </h2>
                          </div>
                          <div>
                            <div className=" ">
                              <span className="bold">{member?.user?.name}</span>
                            </div>
                            <div>
                              <span>{member?.user?.email?.address}</span>
                            </div>
                            <div className="col-3">
                              <span>{member?.user?.phone?.number}</span>
                            </div>
                          </div>
                        </div>
                        <div className="col-3 d-flex justify-content-start align-items-center ">
                          <small className="w-100">
                            {member?.inviteAccepted ? (
                              <span className="fw-bold text-success fs-6">
                                <i className="bi bi-shield-check fs-5"></i>{" "}
                                Assigned
                              </span>
                            ) : (
                              <>
                                <span className="fw-bold text-success fs-6">
                                  <i className="bi bi-shield-check fs-5"></i>{" "}
                                  Assigned
                                </span>{" "}
                                :
                              </>
                            )}
                          </small>
                        </div>
                        <div className="col-3 d-flex justify-content-start align-items-center">
                          {userPermission &&
                          userPermission?.permission?.update ? (
                            <select
                              className="form-select"
                              aria-label="Default select example"
                              value={member?.permission?.name}
                              onChange={(e) =>
                                handleUpdatePermission(
                                  e.target.value,
                                  member._id,
                                  member?.permission?.name
                                )
                              }
                              disabled={member?.isCreator}
                            >
                              <option>{member?.permission?.name}</option>

                              {roles &&
                                roles
                                  .filter(
                                    (item) =>
                                      item.name !== member?.permission?.name
                                  )
                                  .map((item) => (
                                    <option key={item._id} value={item._id}>
                                      {item.name}
                                    </option>
                                  ))}
                            </select>
                          ) : (
                            <span className="form-control ">
                              {member?.permission?.name}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </>
          ) : (
            <Loader />
          )}
        </ul>
      </div>
    </div>
  );
};

export default AllMember;
