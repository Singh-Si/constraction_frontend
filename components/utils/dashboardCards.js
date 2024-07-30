import config from "@/config/config";
import axios from "axios";
import Link from "next/link";
import { parseCookies } from "nookies";
import { toast } from "react-toastify";
import { useState } from "react";
<<<<<<< HEAD
const DashboardCard = (props) => {
  console.log(props, "propssssssssssssssssssssssssssss")
=======
import { Modal, Button } from "react-bootstrap";
import { useRouter } from "next/router";

const DashboardCard = (props) => {
  const [showModal, setShowModal] = useState(false);
  const { currentOrganizationId, token, siteId } = parseCookies();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDeleteSite = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const confirmDelete = () => {
    let config = {
      method: "delete",
      maxBodyLength: Infinity,
      url: `https://construction-backend.onrender.com/site/delete?organization=${currentOrganizationId}&site=${siteId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        if (response.data.success == true) {
          toast.success("SITE DELETED SUCCESSFULLY", {
            position: "top-center",
          });
          location.reload();
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleClose = () => setShowModal(false);

>>>>>>> 463abe6 (frontend additonals changes made)
  const menuStyles = {
    width: "180px !important",
    border: "1px solid black",
  };

  const menuStylesLists = {
    backgroundColor: "white",
    color: "black",
  };
<<<<<<< HEAD
  const [imageUrl, setImageUrl] = useState('');

  const { currentOrganizationId, token } = parseCookies();
=======

  const [imageUrl, setImageUrl] = useState("");
>>>>>>> 463abe6 (frontend additonals changes made)

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
<<<<<<< HEAD
        toast.success("Invitation Accepted Successfully", { position: "top-center" });
=======
        toast.success("Invitation Accepted Successfully", {
          position: "top-center",
        });
>>>>>>> 463abe6 (frontend additonals changes made)
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
<<<<<<< HEAD
            pathname: props.inviteAccepted ? '/sites/siteplan' : '/',
=======
            pathname: props.inviteAccepted ? "/sites/siteplan" : "/",
>>>>>>> 463abe6 (frontend additonals changes made)
          }}
          className="text-decoration-none"
        >
          <img
            className="d-block m-auto rounded"
            alt="Card image cap"
<<<<<<< HEAD
            src={props?.profile || "https://th.bing.com/th/id/OIP.DMbQ2iorpKMPwSjRnEiMiAHaEK?rs=1&pid=ImgDetMain"} // Use the provided image URL or a default image
=======
            src={
              props?.profile ||
              "https://th.bing.com/th/id/OIP.DMbQ2iorpKMPwSjRnEiMiAHaEK?rs=1&pid=ImgDetMain"
            } // Use the provided image URL or a default image
>>>>>>> 463abe6 (frontend additonals changes made)
            width="100%"
            height="100%"
          />
        </Link>
      </div>

      <div className="card-body">
        <div className="row">
          <div className="col-8">
<<<<<<< HEAD
            <div className="fs-6 fw-semibold my-2 text-nowrap overflow-hidden" style={{ maxWidth: "100%", textOverflow: "ellipsis" }}>
=======
            <div
              className="fs-6 fw-semibold my-2 text-nowrap overflow-hidden"
              style={{ maxWidth: "100%", textOverflow: "ellipsis" }}
            >
>>>>>>> 463abe6 (frontend additonals changes made)
              {props?.title}
            </div>

            <div className="card-text my-2">{props?.client}</div>

            <div className="card-text my-2">
<<<<<<< HEAD
              Start Date: <span className="_gray_light">{props?.startdate}</span>
=======
              Start Date:{" "}
              <span className="_gray_light">{props?.startdate}</span>
>>>>>>> 463abe6 (frontend additonals changes made)
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
<<<<<<< HEAD
                <i className="bi bi-three-dots-vertical" style={{ fontSize: 27, color: "#B8BDC1" }}></i>
=======
                <i
                  className="bi bi-three-dots-vertical"
                  style={{ fontSize: 27, color: "#B8BDC1" }}
                ></i>
>>>>>>> 463abe6 (frontend additonals changes made)
              </button>

              <ul className="dropdown-menu" style={menuStyles}>
                <li>
<<<<<<< HEAD
                  <Link href="/sites/site-setting" className="dropdown-item link_hover" style={menuStylesLists}>
=======
                  <Link
                    href="/sites/site-setting"
                    className="dropdown-item link_hover"
                    style={menuStylesLists}
                  >
>>>>>>> 463abe6 (frontend additonals changes made)
                    <i className="bi bi-pencil me-2"></i>Site Profile
                  </Link>
                </li>
                <li>
<<<<<<< HEAD
                  <Link className="dropdown-item link_hover" style={menuStylesLists} href="#">
                    <i className="bi bi-copy me-2"></i>Duplicate Project
                  </Link>
                </li>
=======
                  <a
                    href="/"
                    className="dropdown-item link_hover"
                    style={menuStylesLists}
                    onClick={handleDeleteSite} // Handle click event
                  >
                    <i className="bi bi-trash me-2"></i>Delete Site
                  </a>
                </li>
                {/* <li>
                  <Link className="dropdown-item link_hover" style={menuStylesLists} href="#">
                    <i className="bi bi-copy me-2"></i>Duplicate Project
                  </Link>
                </li> */}
>>>>>>> 463abe6 (frontend additonals changes made)
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
<<<<<<< HEAD
              <button className="bg-success text-white rounded p-1" onClick={AcceptSite}>
=======
              <button
                className="bg-success text-white rounded p-1"
                onClick={AcceptSite}
              >
>>>>>>> 463abe6 (frontend additonals changes made)
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
<<<<<<< HEAD
=======

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this site?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
>>>>>>> 463abe6 (frontend additonals changes made)
    </div>
  );
};

export default DashboardCard;
