import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { destroyCookie, parseCookies } from "nookies";

const Sidebar = () => {
  const router = useRouter();
  const pathname = router.pathname;

  const handleLogout = async () => {
    const Cookies = parseCookies();

    try {
      await axios.get(`https://construction-backend.onrender.com/logout`, {
        headers: {
          Authorization: `Bearer ${Cookies?.token}`,
        },
      });

      // Destroy all cookies
      Object.keys(Cookies).forEach((cookieName) => {
        destroyCookie(null, cookieName, { path: "/" }); // Specify path as "/"
      });

      // Redirect to login page
      router.push("/user/login");
    } catch (error) {
      console.error("Error logging out:", error);
      // Handle error: display a message to the user or redirect to an error page
    }
  };

  return (
<<<<<<< HEAD
    <nav className="navbar navbar-dark sidebar sticky-top h-100">
      <div className="container-fluid h-100 p-0">
=======
    <nav
      className="gradient-background-side-navbar sidebar sticky-top h-100"
      style={{
        background: "linear-gradient(-180deg, #2A3E4E ,  #479677 )",
      }}
    >
      <div
        className="container-fluid h-100 p-0"
        style={{
          background: "linear-gradient(-180deg, #2A3E4E ,  #479677 )",
        }}
      >
>>>>>>> 463abe6 (frontend additonals changes made)
        <div className="navbar-collapse h-100 d-flex flex-column justify-content-between">
          <Link href="/">
            <img src="/assets/images/sidelogo.png" width="50" alt="sidelogo" />
          </Link>
          <ul className="navbar-nav gap-0 align-items-evenly px-2">
            <div href="/organisationProfile" className="nav-item dropdown">
              <div className=" ">
                <Link
                  href="/organisation/organisation-profile"
                  className="text-decoration-none px-2 sidebar-icon"
                >
                  {/* <i className={`icons ti ti-building-community ${pathname=='/organisation/organisation-profile' ? 'active-background' : ''} `}></i> */}
                  <i
                    className={`icons ti ti-building-community ${
                      pathname.startsWith("/organisation")
                        ? "active-background"
                        : ""
                    }`}
                  ></i>

                  {/* <img src="/assets/images/side_homeIcon.png" alt="side_homeIcon" /> */}
                  <div className="text-light-gray text-center">
                    <small>ORG</small>
                  </div>
                </Link>
              </div>
              {/* <ul className="dropdown-menu">
                <li>
                  <Link
                    className="dropdown-item text-decoration-none "
                    href="/organisation/organisation-profile"
                  >
                    Organisation Profile
                  </Link>
                </li>
              </ul> */}
            </div>

            <div className="nav-item dropdown" activeclassname="activeClicked">
              <div className="">
                <Link
                  href="/member"
                  className="text-decoration-none px-2 sidebar-icon"
                >
                  <i
                    className={`icons ti ti-users-group ${
                      pathname.startsWith("/member") ? "active-background" : ""
                    }`}
                  ></i>
                  {/* <img src="/assets/images/side_analyticsIcon.png" pathname alt="side_homeIcon" /> */}
                  <div className="text-light-gray text-center">
                    <small>Member</small>
                  </div>
                </Link>
              </div>
              {/* <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" href="/member">
                    All Member
                  </Link>
                </li>]
              </ul> */}
            </div>

            <div
              className="nav-item dropdown"
              href="/role-and-permission"
              activeclassname="activeClicked"
            >
              <div className="">
                <Link
                  href="/role-and-permission"
                  className="text-decoration-none px-2 sidebar-icon"
                >
                  <i
                    className={`icons ti ti-user-cog ${
                      pathname.startsWith("/role-and-permission")
                        ? "active-background"
                        : ""
                    }`}
                  ></i>
                  {/* <img src="/assets/images/side_icon3.png" alt="side_homeIcon" /> */}
                  <div className="text-light-gray text-center">
                    <small>Roles</small>
                  </div>
                </Link>
              </div>
              {/* <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" href="/role-and-permission">
                    User Role & Permission
                  </Link>
                </li>
              </ul> */}
            </div>
            <div
              className="nav-item dropdown"
              href="/allbills"
              activeclassname="activeClicked"
            >
              <div className="">
                <Link
                  href="/all-bills"
                  className="text-decoration-none px-2 sidebar-icon"
                >
                  <i
                    className={`icons ti ti-receipt-2 ${
                      pathname.startsWith("/all-bills")
                        ? "active-background"
                        : ""
                    }`}
                  ></i>
                  {/* <Image
                    src="/assets/images/bill_icon.svg"
                    alt="side_homeIcon"
                    width={40}
                    height={40}
                  /> */}
                  <div className="text-light-gray text-center">
                    <small>Budget</small>
                  </div>
                </Link>
              </div>
              {/* <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" href="/all-bills">
                    All Bills
                  </Link>
                </li>
              </ul> */}
            </div>
            <div className="nav-item dropdown" href="/Vendor">
              <div className="">
                <Link
                  href="/Vendor"
                  className="text-decoration-none px-2 sidebar-icon"
                >
                  <i
                    className={`icons ti ti-building-store ${
                      pathname.startsWith("/Vendor") ? "active-background" : ""
                    }`}
                  ></i>
                  {/* <img
                    src="/assets/images/vender_icon.svg"
                    alt="side_homeIcon"
                  /> */}
                  <div className="text-light-gray text-center">
                    <small>Vendor</small>
                  </div>
                </Link>
              </div>
              {/* <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" href="/Vendor">
                    Vendor
                  </Link>
                </li>
              </ul> */}
            </div>
            {/* <div className="nav-item dropdown" href="/materials">
              <div className="">
                <Link
                  href="/materials"
                  className="text-decoration-none px-2 sidebar-icon"
                >
                  <i
                    className={`icons ti ti-box-seam ${
                      pathname.startsWith("/materials")
                        ? "active-background"
                        : ""
                    }`}
                  ></i>
                  
                  <div className="text-light-gray text-center">
                    <small>Material</small>
                  </div>
                </Link>
              </div>
              
            </div> */}
<<<<<<< HEAD
            
=======

>>>>>>> 463abe6 (frontend additonals changes made)
            <div className="nav-item dropdown" href="/stock/indents">
              <div className="">
                <Link
                  href="/stock/indents"
                  className="text-decoration-none px-2 sidebar-icon"
                >
                  <i
                    className={`icons ti ti-keyframe-filled ${
                      pathname.startsWith("/stock") ? "active-background" : ""
                    }`}
                  ></i>

                  <div className="text-light-gray text-center">
                    <small>Commercial</small>
                  </div>
                </Link>
              </div>
            </div>
          </ul>
          {/* <div className="nav-item dropdown" href="/issues">
              <div className="">
                <Link
                  href="/issues"
                  className="text-decoration-none px-2 sidebar-icon"
                >
                  <i
                    className={`icons ti ti-alert-triangle ${
                      pathname.startsWith("/issues") ? "active-background" : ""
                    }`}
                  ></i>
                  <div className="text-light-gray text-center">
                    <small>Issues</small>
                  </div>
                </Link>
              </div>
            </div> */}
          <div
            href="/organisationProfile"
            className="nav-item dropdown text-end d-flex b-0"
          >
            <span className="cursor-pointer" onClick={handleLogout}>
              <i className="icons bi bi-power w-100 mb-4 "></i>
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Sidebar;
