import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { destroyCookie, parseCookies, setCookie } from "nookies";
const SitesSidebar = () => {
  const router = useRouter();
  const pathname = router.pathname;
  const menuStylesLists = {
    backgroundColor: "white",
    color: "black",
  };
  const { siteId } = parseCookies();
  const handleLogout = () => {
    const cookies = parseCookies();
    Object.keys(cookies).forEach((cookieName) => {
      destroyCookie(null, cookieName);
    });

    router.push("/");
  };
  return (
    <nav
      className="navbar navbar-dark sidebar sticky-top h-100"
      style={{
        background: "linear-gradient(-180deg, #2A3E4E ,  #479677 )",
      }}
    >
      <div className="container-fluid h-100 p-0">
        <div className="navbar-collapse h-100 d-flex flex-column justify-content-between">
          <Link href="/">
            <img src="/assets/images/logo-company.png" width="50" alt="" />
          </Link>
          <ul className="navbar-nav">
            {/* <div exact href="/organisationProfile" className="nav-item dropdown text-center">
              <img src="/assets/images/frame-1.png" alt="side_homeIcon" />
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" href="/">Home</Link></li>
              </ul>
            </div> */}
            <Link
              className="text-decoration-none text-white"
              href={`/sites/dashboard`}
            >
              <div
                className="nav-item dropdown text-center text-center"
                activeclassname="activeClicked"
              >
                <i class="bi bi-window-sidebar"  style={{color : 'white' , textAlign : 'center' , fontSize :'1.8rem' , marginLeft : '0rem'}}></i>

                {/* <i className={`icons ti ti-layout-dashboard fs-3 ${pathname == '/sites/dashboard' ? 'active-background' : ''}`}></i> */}

                {/* <img src="/assets/images/frame-2.png" alt="side_homeIcon" /> */}

                {/* <ul className="dropdown-menu">
                <li><Link className="dropdown-item" href={`/sites/dashboard`}>Dashboard
                </Link></li>
              </ul> */}
                <div className="text-light-gray  text-center">
                  <small>Dashboard</small>
                </div>
              </div>
            </Link>
            <Link
              className="text-decoration-none text-white"
              href={`/sites/siteplan`}
            >
              <div
                className="nav-item dropdown text-center"
                activeclassname="activeClicked"
              >
                <i class="bi bi-bar-chart-steps" style={{color : 'white' , textAlign : 'center' , fontSize :'1.8rem' , marginLeft : '0rem'}}></i>
                {/* <img src="/assets/images/frame-3.png" alt="side_homeIcon" /> */}
                <div className="text-light-gray  text-center">
                  <small>Plan</small>
                </div>

                {/* <ul className="dropdown-menu">
                <li><Link className="dropdown-item" href={`/sites/siteplan`}>Site plan</Link></li>
              </ul> */}
              </div>
            </Link>
            <Link
              className="text-decoration-none text-white"
              href={`/sites/attendance`}
            >
              <div
                className="nav-item dropdown text-center"
                activeclassname="activeClicked"
              >
                <i
                  className={`icons ti ti-calendar fs-3 ${
                    pathname.startsWith("/sites/attendance")
                      ? "active-background"
                      : ""
                  }`}
                ></i>
                {/* <img src="/assets/images/frame-4.png" alt="side_homeIcon" /> */}
                <div className="text-light-gray text-center">
                  <small>Attendance</small>
                </div>

                {/* {/ <i className="bi bi-cash-stack" color='white' width="100"></i> /} */}
                {/* <ul className="dropdown-menu">
                <li><Link className="dropdown-item" href={`/sites/attendance`}>attendance</Link></li>

              </ul> */}
              </div>
            </Link>
            <Link
              className="text-decoration-none text-white"
              href={`/sites/material/indent`}
            >
              <div className="nav-item dropdown text-center">
                <i
                  className={`icons ti ti-building-warehouse fs-3 ${
                    pathname.startsWith("/sites/material")
                      ? "active-background"
                      : ""
                  }`}
                ></i>
                {/* <img src="/assets/images/frame-5.png" alt="side_homeIcon" /> */}
                <div className="text-light-gray  text-center">
                  <small>Indent</small>
                </div>
              </div>
            </Link>
            {/* <div className="nav-item dropdown text-center" >
              <img src="/assets/images/team.png" alt="side_homeIcon" />
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" href="/sites/team">Team</Link></li>

              </ul>
            </div> */}
            <Link
              className="text-decoration-none text-white"
              href={`/sites/site-setting`}
            >
              <div className="nav-item dropdown text-center">
                <i
                  className={`icons ti ti-settings-cog fs-3 ${
                    pathname.startsWith("/sites/site-setting")
                      ? "active-background"
                      : ""
                  }`}
                ></i>
                {/* <img src="/assets/images/setting-icon.png" alt="side_homeIcon" /> */}
                <div className="text-light-gray  text-center">
                  <small>Setting</small>
                </div>

                {/* <ul className="dropdown-menu">
                <li><Link className="dropdown-item" href={`/sites/site-setting`} >Setting</Link></li>

              </ul> */}
              </div>
            </Link>
            <Link
              className="text-decoration-none text-white"
              href={`/siteissues`}
            >
              <div className="nav-item dropdown text-center">
                <i
                  className={`icons ti ti-alert-triangle fs-3 ${
                    pathname === "/siteissues" ? "active-background" : ""
                  }`}
                ></i>
              </div>
              <div className="text-light-gray text-center">
                <small>Site Issues</small>
              </div>
            </Link>
            {/* <div className="nav-item dropdown text-center">
              <img src="/assets/images/stock.png" alt="side_homeIcon" />
              <div className='text-white text-center'><small >Stock</small></div>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" href={`/sites/stock/bom`} >Stock</Link></li>

              </ul>
            </div> */}
          </ul>

          <Link
            href="/organisationProfile"
            className="nav-item dropdown text-center text-end d-flex b-0"
          >
            <span className="cursor-pointer text-white" onClick={handleLogout}>
              <i className="icons bi bi-power w-100 mb-4 "></i>
            </span>
            {/* <img src="/assets/images/signout.png" alt="side_homeIcon"  className='cursor-pointer mb-4' width={30}/> */}
            {/* <li><Link className="text-decoration-none text-danger mt-5" href="/user/login"><span> <Image src="/assets/images/signout.png" width={30} height={30} className="border border-danger border-2 p-1 rounded-pill " />  Sign Out</span> </Link></li> */}
          </Link>
        </div>
      </div>
    </nav>
  );
};
export default SitesSidebar;
