import { useEffect, useState } from "react";
import { Nav, Navbar } from "reactstrap";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import OrganisationSetting from "@/components/utils/Modal/OrganisationSetting";
import { parseCookies, setCookie, destroyCookie } from "nookies";
import { getOrganizationAsync } from "@/store/organisation/fetchOrganisation";
import AcceptOrg from "@/components/utils/Modal/AcceptOrg";
import axios from "axios";
import config from "@/config/config";

const Header = () => {
  const [showorgsettingModal, setshoworgsettingModal] = useState(false);
  const [profileData, setProfileData] = useState({});
  const [organisationData, setOrganizationData] = useState([]);

  const dispatch = useDispatch();
  const { currentOrganizationId, token } = parseCookies();

  const [orgName, setorgName] = useState("");
  const [orgId, setorgId] = useState("");
  const [acceptModal, setAcceptModal] = useState(false);

  const openSettingMemberModal = () => {
    setshoworgsettingModal(true);
  };
  const closeSettingMemberModal = () => {
    setshoworgsettingModal(false);
  };

  const router = useRouter();

  const handleLogout = async () => {
    const cookies = parseCookies();
    Object.keys(cookies).forEach((cookieName) => {
      destroyCookie(null, cookieName, { path: "/" }); // Specify path as "/"
    });

    router.replace("/user/login");
  };

  useEffect(() => {
    async function fetchdata() {
      const fetch = await dispatch(getOrganizationAsync());

      setOrganizationData(fetch?.payload?.organizations);
    }

    fetchdata();
  }, [dispatch]);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(
          `${config.API_URL}/profile/me`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setProfileData(response?.data?.user);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, []);

  const closeModal = () => {
    setAcceptModal(false);
  };

  const handleChangeOrg = (event) => {
    const selectedOption = event.target.options[event.target.selectedIndex];
    const inviteAccepted = selectedOption.getAttribute("data-inviteaccepted");
    const name = selectedOption.getAttribute("data-name");
    const id = selectedOption.getAttribute("data-id");
    setorgName(name);
    setorgId(id);
    if (inviteAccepted == "false") {
      setAcceptModal(true);
    } else {
      destroyCookie(null, "currentOrganizationName");
      destroyCookie(null, "currentOrganizationId");
      destroyCookie(null, "organizationId");
      destroyCookie(null, "organizationName");
      setCookie(null, "currentOrganizationId", event.target.value, {
        maxAge: 24 * 60 * 60,
        path: "/",
      });
      router.push(router.asPath);
    }
  };
  const isNotSiteRoute = !router.pathname.startsWith("/site");

  useEffect(() => {
    const rejectedOrgs = organisationData && organisationData?.filter(item => !item?.inviteAccepted);
    setorgId(rejectedOrgs && rejectedOrgs[0]?._id);
    setorgName(rejectedOrgs && rejectedOrgs[0]?.name)
    if (!organisationData?.some(item => item?.inviteAccepted) && rejectedOrgs?.length > 0) {
      setAcceptModal(true);
    }
  }, [organisationData]);

  return (
    <>
      <Navbar dark expand="md" className="bg-white border_bottom sticky-top">
        <Nav className="me-auto text-white">
          <img src="/assets/images/solis-reality.png" alt="solis-reality.png" />
        </Nav>
        <div className="dropstart">
          <button
            className="btn-group dropdown-toggle outside_profile"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <Image
              className="ms-2"
              src={"/assets/icons/chatbox.svg"}
              width={30}
              height={30}
              alt="chatbox.svg"
            />

            <div className="dropdown-menu bg-white p-3">
              <>ChatBox</>
            </div>
          </button>

          <button className="btn-group dropstart ml-2 outside_profile">
            <div
              className="dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <span style={{ width: 40, height: 40, borderRadius: "40px" }}>
                <Image
                  className="ms-2"
                  src={"/assets/icons/notification.svg"}
                  width={30}
                  height={30}
                  alt="notification.svg"
                />
              </span>
            </div>

            <div className="col">
              <div className="dropdown-menu bg-white p-3">
                <>Notifications</>
              </div>
            </div>
          </button>

          <button className="dropstart mx-2 outside_profile">
            <div
              className="dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <span
                className="d-flex justify-content-center align-items-center bg-btn-bg m-auto"
                style={{ width: 40, height: 40, borderRadius: "40px" }}
              >
                <p className="text-white fs-5 mt-3">
                  {profileData && profileData?.name?.length > 0 ? (
                    <> {profileData?.name?.charAt(0).toUpperCase()}</>
                  ) : (
                    "N"
                  )}
                </p>
              </span>
            </div>

            <div className="col">
              <div className="dropdown-menu bg-white">
                <div className="p-3">
                  <div className="profile-logo d-flex justify-content-center align-items-center bg-btn-bg m-auto shadow">
                    <h1 className="text-white mt-3">
                      {profileData.name?.length > 0 ? (
                        <> {profileData?.name?.charAt(0).toUpperCase()}</>
                      ) : (
                        "N"
                      )}
                    </h1>
                  </div>
                  <div className="d-flex flex-column w-100 justify-content-center text-center gap-2 mt-3 ">
                    <span>{profileData?.name}</span>

                    <div>
                      <small>
                        <i className="bi bi-telephone me-1"></i>
                        {profileData?.phone?.number}
                      </small>

                      {profileData?.phone?.isValid ? (
                        <span className="ms-1" title="Verified">
                          <i className="bi bi-patch-check-fill text-info"></i>
                        </span>
                      ) : (
                        <i className="bi bi-x-circle-fill ms-1"></i>
                      )}
                    </div>

                     <div className="d-flex align-items-center justify-content-center ">
                      <small className="text-small">
                        <i className="bi bi-envelope me-1"></i>
                        {profileData?.email?.address}
                      </small>

                      {profileData?.email?.isValid ? (
                        <span
                          className="ms-1"
                          title="Verified"
                          data-bs-toggle="tooltip"
                        >
                          ✅
                        </span>
                      ) : (
                        <span className="ms-1" title="Not Verify">
                          <i className="bi bi-x-circle-fill text-danger"></i>
                        </span>
                      )}
                    </div>

                    <Link href="/profile" className="text-decoration-none">
                      <small
                        className="text-info cursor-pointer"
                      // onClick={openProfileModal}
                      >
                        <Image
                          src="/assets/images/editprofile.png"
                          alt="edit_image"
                          className="me-1 mb-1"
                          width={15}
                          height={15}
                        />{" "}
                        View Profile
                      </small>
                    </Link>
                  </div>
                </div>

                <hr />


                <div className="p-3 d-flex flex-column gap-3">

                  <li>
                    <Link
                      className="text-decoration-none text-black mt-5"
                      href="#"
                    >
                      <span>
                        <Image
                          src="/assets/images/help.png"
                          alt="help_icon"
                          width={30}
                          height={30}
                          className="border border-dark border-2 p-1 rounded-pill me-2"
                        />
                        Help and Support
                      </span>
                    </Link>
                  </li>

                  <li>
                    <span
                      className="text-decoration-none text-black mt-5 cursor-pointer"
                      href="#"
                      onClick={openSettingMemberModal}
                    >
                      <span>
                        <Image
                          src="/assets/images/org-setting.svg"
                          alt="or_gsetting_icon"
                          width={30}
                          height={30}
                          className="border border-dark border-2 p-1 rounded-pill me-2"
                        />
                         Create Organization 
                      </span>
                    </span>
                  </li>

                  <li>
                    <Link
                      className="text-decoration-none text-black mt-5"
                      href="/plan"
                    >
                      <span>
                        <Image
                          src="/assets/images/plan.png"
                          alt="plan_icon"
                          width={30}
                          height={30}
                          className="border border-dark border-2 p-1 rounded-pill me-2"
                        />
                        Plan
                      </span>
                    </Link>
                  </li>

                  <li>
                    <Link
                      className="text-decoration-none text-black mt-5"
                      href="#"
                    >
                      <span>
                        <Image
                          src="/assets/images/language.png"
                          alt="language_icon"
                          width={30}
                          height={30}
                          className="border border-dark border-2 p-1 rounded-pill me-2"
                        />
                        Change langauge
                      </span>{" "}
                    </Link>
                  </li>

                  <li>
                    <span
                      className="text-decoration-none text-danger mt-5 cursor-pointer"
                      onClick={handleLogout}
                    >
                      <span>
                        <Image
                          src="/assets/images/signout.png"
                          alt="signout_icon"
                          width={30}
                          height={30}
                          className="border border-danger border-2 p-1 rounded-pill me-2"
                        />
                        Sign Out
                      </span>
                    </span>
                  </li>
                </div>
              </div>
            </div>
          </button>
        </div>

        <OrganisationSetting
          showModal={showorgsettingModal}
          closeModal={closeSettingMemberModal}
        />
      </Navbar>
      {isNotSiteRoute &&
        (organisationData ? (
          <div className="p-3 ms-2 w-25 rounded">
            <div className="d-flex">
              <select
                className=" form-select border-gray"
                aria-label="Default select example"
                onChange={handleChangeOrg}
                value={currentOrganizationId}
              >
                {organisationData?.map((item) =>
                  item?.inviteAccepted ? (
                    <option
                      key={item?._id}
                      value={`${item?._id}`}
                      data-id={item?._id}
                      data-name={`${item?.name}`}
                      data-inviteaccepted={`${item?.inviteAccepted}`}
                    >
                      {item?.name}
                    </option>
                  ) : // Render nothing or handle the case where invite is not accepted
                    null
                )}
              </select>
              {/* {acceptModal && (
                <AcceptOrg
                  showModal={acceptModal}
                  closeModal={closeModal}
                  orgName={orgName}
                  orgId={orgId}
                />
              )} */}
            </div>
          </div>
        ) : (
          <div className="p-4 w-25 rounded">
            <input
              className="form-control"
              placeholder="There is No organization"
              disabled
            />
          </div>
        ))}
    </>
  );
};

export default Header;
