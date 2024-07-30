// FullLayout.js
import Sidebar from "@/layouts/Sidebar";
import Header from "@/layouts/Header";
import SitesSidebar from "@/layouts/SitesSideBar";
import { useRouter } from "next/router";
import BreadCrumb from "@/components/utils/BreadCrumb";
import { useBreadcrumb } from "@/contexts/BreadcrumbContext";

const FullLayout = ({ children }) => {
  const { breadcrumbs } = useBreadcrumb();
  const router = useRouter();

  const isNotSiteRoute = !router.pathname.startsWith('/site');
  return (
    <main>
      <div className="pageWrapper d-lg-flex">
        {/********Sidebar**********/}
        <aside className="sidebarArea shadow" id="sidebarArea">
          {isNotSiteRoute ? <Sidebar /> : <SitesSidebar />}
        </aside>
        {/********Content Area**********/}

        <div className="contentArea">
          {/********header**********/}
          <Header />
          {/********Middle Content**********/}
       
          {/* Use the breadcrumbs from the BreadcrumbProvider in _app.js */}
          {/* <BreadCrumb breadcrumbs={breadcrumbs} /> */}

          <main className="p-4">
            {children}
          </main>
        </div>
      </div>
    </main>
  );
};

export default FullLayout;
