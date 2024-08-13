import { useEffect, useState } from "react";
import nookies, { parseCookies } from "nookies";
import { useDispatch, useSelector } from "react-redux";
import CreateProject from "@/components/dashboard/sites/create-project/create-project";
import Image from "next/image";
import { fetchUserData } from "@/store/siteSlice";
import DashboardCard from "@/components/utils/dashboardCards";
import { checkPermissions } from "@/store/UserPermisionSlice";
import Loader from "@/layouts/loader/Loader";
import { toast } from "react-toastify";

const Starter = () => {
  const [filterText, setFilterText] = useState("");
  const [loading, setLoading] = useState(false);
  const [existingSiteNames, setExistingSiteNames] = useState([]);
  const [deletion, setDeletion] = useState(false);
  const dispatch = useDispatch();
  const { permissions, status } = useSelector(
    (state) => state?.UserPermisionSlice
  );
  const { userData } = useSelector((state) => state?.siteSlice);

  useEffect(() => {
    const context = parseCookies();
    let data = {
      context: context,
      plan: "project_management",
      feature: "sites",
    };

    dispatch(checkPermissions(data));
  }, [dispatch, deletion]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const result = await dispatch(fetchUserData());
      setLoading(false);

      if (result.payload && result.payload.sites) {
        setExistingSiteNames(result.payload.sites.map((site) => site.name));
      }
    };

    fetchData();
  }, [dispatch]);

  const handleSetId = (id) => {
    nookies.set(null, "siteId", id, {
      maxAge: 30 * 24 * 60 * 60, // Expires in 30 days
      path: "/",
    });
  };

  const handleCreateSite = async (newSiteName) => {
    // Assuming you have a function to create a site
    // await createSite(newSiteName);

    // Update the list of existing site names
    setExistingSiteNames((prevNames) => [...prevNames, newSiteName]);

    // Fetch the updated user data
    await dispatch(fetchUserData());

    // Notify the user
    toast.success("Site successfully created", { position: "top-center" });
  };

  const filteredItems = userData?.sites?.filter(
    (item) =>
      item &&
      item?.name &&
      item?.name.toLowerCase().indexOf(filterText.toLowerCase()) !== -1
  );

  return (
    <>
      {status === "failed" && (
        <div className="row ">
          <Image
            priority
            src="/assets/images/access_denied.svg"
            width={200}
            height={300}
            alt="access_denied"
            style={{
              width: "auto",
              height: "auto",
              textAlign: "center",
              margin: "auto",
            }}
          />
          <div className="row d-flex justify-content-center">
            <div className="col-2 mt-4">
              <span className="form-control">Contact your Admin.</span>
            </div>
          </div>
        </div>
      )}

      {permissions?.permission?.permission?.read && (
        <>
          <div className="row">
            <div className="col-3 mb-3">
              <div className="input-group d-flex align-items-center">
                <input
                  type="search"
                  className="outline-none form-control"
                  style={{ border: "1px solid #B8BAC2" }}
                  placeholder="Search Sites"
                  onChange={(e) => {
                    setFilterText(e.target.value);
                  }}
                  value={filterText}
                />
                {!filterText?.length > 0 && (
                  <span
                    className="input-group-append d-flex align-items-center position-absolute"
                    style={{ right: 18, display: "flex" }}
                  >
                    <i
                      className="bi bi-search"
                      style={{ color: "#8CBCD9" }}
                    ></i>
                  </span>
                )}
              </div>
            </div>
            <div className="col-9">
              {permissions?.permission?.permission?.insert && (
                <button
                  className="btn bg-btn-bg btn-sm text-white float-end"
                  type="button"
                  style={{width : '15%'}}
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasRight"
                  aria-controls="offcanvasRight"
                >
                  + New Site
                </button>
              )}
            </div>
          </div>

          <div className="row">
            {filteredItems && filteredItems?.length > 0 ? (
              <>
                {filteredItems &&
                  filteredItems?.map((curVal, index) => {
                    const {
                      name,
                      profile,
                      subtitle,
                      client,
                      _id,
                      startDate,
                      endDate,
                      inviteAccepted,
                    } = curVal;
                    return (
                      <div
                        className="col-sm-6  col-xl-3"
                        key={index}
                        onClick={() => handleSetId(_id)}
                      >
                        <DashboardCard
                          profile={profile}
                          title={name}
                          subtitle={subtitle}
                          client={client}
                          startdate={startDate}
                          enddate={endDate}
                          id={_id}
                          inviteAccepted={inviteAccepted}
                          update={permissions?.permission?.permission?.update}
                        />
                      </div>
                    );
                  })}
              </>
            ) : loading ? (
              <Loader />
            ) : (
              <div className="row m-auto justify-content-center">
                <div className="col-3 text-center">
                  <Image
                    priority
                    src="/assets/images/nosites.jpg"
                    alt="nosites"
                    width={350}
                    height={250}
                  />
                  <span className="fs-3 fw-bold">No Sites Found</span>
                  <br />
                  <small>Start by creating your first Site. </small>
                </div>
              </div>
            )}
          </div>
        </>
      )}
      <CreateProject
        onCreateSite={handleCreateSite}
        existingSiteNames={existingSiteNames}
      />
    </>
  );
};

export default Starter;
