import config from "@/config/config";
import axios from "axios";
import Link from "next/link";
import { parseCookies } from "nookies";
import { toast } from "react-toastify";
import { useState } from "react";
const DashboardCard = (props) => {
  console.log(props, "propssssssssssssssssssssssssssss")
  const menuStyles = {
    width: "180px !important",
    border: "1px solid black",
  };

  const menuStylesLists = {
    backgroundColor: "white",
    color: "black",
  };
  const [imageUrl, setImageUrl] = useState('');

  const { currentOrganizationId, token } = parseCookies();

  const AcceptSite = async () => {
    try {
      const response = await axios.post(
        `${config.API_URL}/site/member/invite/accept?organization=${currentOrganizationId}&site=${props.id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        toast.success("Invitation Accepted Successfully", { position: "top-center" });
      }
    } catch (error) {
      console.error("Error Site Accepting:", error);
      toast.error("Failed to Accept Site", { position: "top-center" });
    }
  };

  return (
    <div className="card border rounded-12 overflow-hidden">
      <div className="w-full ">
        <Link
          href={{
            pathname: props.inviteAccepted ? '/sites/siteplan' : '/',
          }}
          className="text-decoration-none"
        >
          <img
            className="d-block m-auto rounded"
            alt="Card image cap"
            src={props?.profile || "https://th.bing.com/th/id/OIP.DMbQ2iorpKMPwSjRnEiMiAHaEK?rs=1&pid=ImgDetMain"} // Use the provided image URL or a default image
            width="100%"
            height="100%"
          />
        </Link>
      </div>

      <div className="card-body">
        <div className="row">
          <div className="col-8">
            <div className="fs-6 fw-semibold my-2 text-nowrap overflow-hidden" style={{ maxWidth: "100%", textOverflow: "ellipsis" }}>
              {props?.title}
            </div>

            <div className="card-text my-2">{props?.client}</div>

            <div className="card-text my-2">
              Start Date: <span className="_gray_light">{props?.startdate}</span>
            </div>

            <div className="card-text">
              End Date: <span className="_gray_light">{props?.enddate}</span>
            </div>
          </div>

          {props.update && (
            <div className="col-4 cursor-pointer d-flex flex-column justify-content-center align-items-end">
              <button
                type="button"
                className="text-end mx-2 bg-white"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="bi bi-three-dots-vertical" style={{ fontSize: 27, color: "#B8BDC1" }}></i>
              </button>

              <ul className="dropdown-menu" style={menuStyles}>
                <li>
                  <Link href="/sites/site-setting" className="dropdown-item link_hover" style={menuStylesLists}>
                    <i className="bi bi-pencil me-2"></i>Site Profile
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item link_hover" style={menuStylesLists} href="#">
                    <i className="bi bi-copy me-2"></i>Duplicate Project
                  </Link>
                </li>
              </ul>

              <div
                style={{
                  border: "2px solid lightgreen",
                  fontSize: "12px",
                  borderRadius: 60,
                  width: 50,
                  height: 50,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                100%
              </div>
            </div>
          )}
        </div>

        {props.inviteAccepted === false && (
          <div className="row d-flex justify-content-between">
            <div className="col-5 mt-3">
              <button className="bg-success text-white rounded p-1" onClick={AcceptSite}>
                <small>Accept Site</small>
              </button>
            </div>
            <div className="col-5 mt-3">
              <button className="bg-danger text-white rounded p-1">
                <small>Reject Site</small>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardCard;
