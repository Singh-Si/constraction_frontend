import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import config from "@/config/config";
import nookies, { parseCookies } from "nookies";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Modal, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import * as Yup from "yup";


const SiteSetting = ({ siteSettingData, siteId, imageData }) => {
  const [data, setData] = useState(siteSettingData);
  const [file, setFile] = useState(null);
  const [isInputField, setIsInputField] = useState(false);
  const [isImageChanged, setIsImageChanged] = useState(false);
  const [uploadImage, setUploadImage] = useState(null);
  const [editedPage, setEditedPage] = useState(false);
  const [id , setId] = useState("" )
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: data?.name,
    address: "",
    state: "",
    sitePoc: "",
    projectPoc: "",
  });

  const router = useRouter();
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };



  const handleDeleteImage = (e) => {
    let configDelete = {
      method: 'delete',
      maxBodyLength: Infinity,
      url: `https://construction-backend.onrender.com/site/deleteSideDoccumnet?organization=${currentOrganizationId}&site=${siteId}&id=${e}`,
      headers: { 
        'Authorization': `Bearer ${token}`
      }
    };
    axios.request(configDelete)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      router.push("/sites/site-setting")
      toast.success('IMAGE DELETED SUCCESSFULLY' , {
        position : "bottom-right"
      })

    })
    .catch((error) => {
      console.log(error);
      toast.error('Something went wrong . Please try again later.' , {
        position : "bottom-right"
      })
    });
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
          router.push('/')
        }
      })
      .catch((error) => {
        console.log(error);
      })
  };


  const [editedData, setEditedData] = useState({
    sitename: data?.name,
    startdate: data?.startDate,
    enddate: data?.endDate,
  });

  const handleDeleteSite = (e) => {
    e.preventDefault();
    setShowModal(true);
  };
  const handleClose = () => setShowModal(false);
  const { currentOrganizationId, token } = parseCookies();
  const { organizations } = useSelector(
    (state) => state?.getOrganizationAsync?.userData
  );

  const matchOrganization =
    organizations &&
    organizations?.find((org) => org._id === currentOrganizationId);

  const initialValues = {
    sitename: data?.name || "",
    organizationname: matchOrganization?.name || "",
    startdate: data?.startDate || "",
    enddate: data?.endDate || "",
  };

  const validationSchema = Yup.object({
    sitename: Yup.string().required("Name is required"),
    // startdate: Yup.string().required("Start Date is required"),
    // startdate: Yup,
    // enddate: Yup.string().required("Name is required"),
  });

  function formatDate(date) {
    return date.toISOString().split("T")[0];
  }

  function CreateDate() {
    const formattedDate = new Date();
    return formatDate(formattedDate);
  }

  const handleEditField = () => {
    setIsInputField(true);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setIsImageChanged(true);
  };

  const handleImageClick = () => {
    if (isInputField) {
      document.getElementById("fileInput").click();
    }
  };

  const handleUploadedImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadImage(file);
    }
  };
  const handleCancelImage = () => {
    setEditedData((prevData) => ({
      ...prevData,
      imageUrl: data && data?.profile?.url,
    }));
  };
  const handleEdit = () => {
    setEditedPage(true);
  };

  const onSubmit = async (values) => {
    const formData = new FormData();
    formData.append("attachment", file);
    formData.append("name", values?.sitename);
    formData.append("organizationname", null);
    formData.append("startDate", values?.startdate);
    formData.append("endDate", values?.enddate);

    const response = await axios.patch(
      `${config.API_URL}/site/update`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          organization: currentOrganizationId,
          site: siteId,
        },
      }
    );

    const updatedData = response?.data;

    if (updatedData.success) {
      
      router.push(router.asPath);
      toast.success(updatedData.message, { position: "bottom-right" });
    }
  };

  useEffect(() => {
    console.log(data);
    console.log("IMAGE DATA : " , imageData )

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedData((prevData) => ({
          ...prevData,
          imageUrl: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  }, [file]);

  //   handling submit
  const handleSubmit = () => {
    console.log("handlingSubmit");
    // location.href = "/sites/site-setting";
    router.push("/sites/site-setting");
  };

  // uploading a file . Making a post request
  const handleImageRequest = async () => {
    try {
      const formData = new FormData();
      formData.append("attachment", uploadImage);
      const response = await fetch(
        `https://construction-backend.onrender.com/site/updateSideDoccumnet?organization=${currentOrganizationId}&site=${siteId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      if (data.success === true) {
        router.push("/sites/site-setting");
        toast.success("Image Uploaded Successfully", {
          position: "top-center",
        });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (uploadImage) {
      handleImageRequest();
    }
  }, [uploadImage, currentOrganizationId, siteId, token]);

  return (
    <>
      {!editedPage ? (
        <div>
          <span
            style={{
              backgroundColor: "#e3f4ff",
              padding: "0.4rem 2rem",
              borderRadius: "10px",
            }}
          >
            {data?.name}
          </span>
          <div className="site-profile">
            <div className="site-profile-heading">SITE DETAILS</div>
            <div className="site-profile-main-content">
              <div className="site-profile-sub-content">
                <img
                  src="/assets/images/document.png"
                  style={{
                    width: "200px",
                    height: "200px",
                    marginLeft: "1rem",
                  }}
                  alt=""
                />
                <div>
                  <div className="site-design">Site Name</div>
                  <p>{data?.name}</p>
                  <div className="site-design" style={{ marginTop: "3.5rem" }}>
                    Address
                  </div>
                  <p>DLF PHASE 1</p>
                  <div className="site-design" style={{ marginTop: "3.5rem" }}>
                    Site POC (Point of Contact)
                  </div>
                  <p>NULL</p>
                </div>
                <div style={{ marginRight: "18rem", marginTop: "6.5rem" }}>
                  <div className="site-design">State</div>
                  <p>Haryana</p>
                  <div className="site-design" style={{ marginTop: "3.5rem" }}>
                    Office POC (Point of Contact)
                  </div>
                  <p>NULL</p>
                </div>

                <div>
                  <Button
                    variant="outline"
                    colorScheme="teal"
                    style={{
                      background: "none",
                      border: "1px solid #2A3E4E",
                      padding: "0.1rem 0.6rem",
                      borderRadius: "5px",
                    }}
                    onClick={handleEdit}
                  >
                    <span style={{ marginRight: "0.3rem" }}>
                      <Image
                        src="/assets/images/edit-2.png"
                        alt="members-icon"
                        width={20}
                        height={20}
                      />
                    </span>
                    Edit
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <span
            style={{
              backgroundColor: "#e3f4ff",
              padding: "0.4rem 2rem",
              borderRadius: "10px",
            }}
          >
            {data?.name}
          </span>
          <div className="site-profile">
            <div className="site-profile-heading">SITE DETAILS</div>
            <div className="site-profile-main-content">
              <div className="site-profile-sub-content">
                <img
                  src="/assets/images/document.png"
                  style={{
                    width: "200px",
                    height: "200px",
                    marginLeft: "1rem",
                  }}
                  alt=""
                />
                <form onSubmit={handleSubmit}>
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <div style={{ marginRight: "100px" }}>
                      <label>
                        Name:
                        <br />
                        <input
                          type="text"
                          name="name"
                          className="site-input-design-detail"
                          value={formData.name}
                          onChange={handleInputChange}
                        />
                      </label>
                      <br />
                      <label>
                        Address:
                        <br />
                        <input
                          type="text"
                          className="site-input-design-detail"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                        />
                      </label>
                      <br />
                      <label>
                        State:
                        <br />
                        <input
                          type="text"
                          className="site-input-design-detail"
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                        />
                      </label>
                    </div>
                    <div>
                      <label>
                        Site Point of Contact:
                        <br />
                        <input
                          type="text"
                          className="site-input-design-detail"
                          name="sitePoc"
                          value={formData.sitePoc}
                          onChange={handleInputChange}
                        />
                      </label>
                      <br />
                      <label>
                        Project Point of Contact:
                        <br />
                        <input
                          type="text"
                          className="site-input-design-detail"
                          name="projectPoc"
                          value={formData.projectPoc}
                          onChange={handleInputChange}
                        />
                      </label>
                    </div>
                  </div>
                  <br />
                </form>

                <div>
                  <Button
                    onClick={handleSubmit}
                    variant="outline"
                    colorScheme="teal"
                    style={{
                      background: "none",
                      border: "1px solid #2A3E4E",
                      padding: "0.1rem 0.6rem",
                      borderRadius: "5px",
                    }}
                  >
                    <span style={{ marginRight: "0.3rem" }}>
                      <Image
                        src="/assets/images/document.png"
                        alt="members-icon"
                        width={20}
                        height={20}
                      />
                    </span>
                    SAVE
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div
        className="row"
        style={{
          height: "120px",
          marginTop: "2rem",
          width: "1000px",
          marginLeft: "9rem",
        }}
      >
        <div className="col-4">
          <Link
            href={`/sites/sitemember`}
            className="text-decoration-none text-black"
          >
            <div className="h-75  d-flex p-2 gap-3 site-border-design">
              <div className="d-flex align-items-center mx-3  ">
                <Image
                  src="/assets/images/user-tag.png"
                  alt="members-icon"
                  width={40}
                  height={40}
                />
              </div>

              <div className="d-flex flex-column justify-content-center">
                <span className="fw-bold">Site Members</span>
                <small className="text-darkgrey" style={{ color: "#000000" }}>
                  {" "}
                  Add and Manage Members
                </small>
              </div>
            </div>
          </Link>
        </div>
        <div className="col-4">
          <Link
            href="/sites/purchase-order"
            className="text-decoration-none text-black"
          >
            <div className="h-75 border-black d-flex p-4 gap-3 site-border-design">
              <div className="d-flex flex-direction-column align-items-center">
                <Image
                  src="/assets/images/wallet-3.png"
                  alt="members-icon"
                  width={40}
                  height={40}
                />
              </div>

              <div className="d-flex flex-column justify-content-center">
                <span className="fw-bold">
                  Purchase Order <br /> Settings
                </span>
                {/* <small className="text-darkgrey ">sdfds</small> */}
              </div>
            </div>
          </Link>
        </div>
        <div className="col-4">
          <Link
            href="/sites/purchase-order"
            className="text-decoration-none text-black"
          >
            <div className="h-75 border-black d-flex p-4 gap-3 site-border-design">
              <div className="d-flex flex-direction-column align-items-center">
                <Image
                  src="/assets/images/user-tag.png"
                  alt="members-icon"
                  width={40}
                  height={40}
                />
              </div>

              <div className="d-flex flex-column justify-content-center">
                <span className="fw-bold">Approval Setting </span>
                <small className="text-darkgrey ">All Modules</small>
              </div>
            </div>
          </Link>
        </div>
      </div>
      <div className=" row mt-4 bg-gray p-3 border-top">
        <span className="fw-bold">Upload Site Related Documments</span>
      </div>
      <div className="row">
        <div>
          <form onSubmit={(e) => e.preventDefault()}>
            <input
              type="file"
              accept="image/*"
              id="file-input"
              onChange={handleUploadedImage}
              style={{ display: "none" }}
            />
            <label
              htmlFor="file-input"
              className="bg-light-blue fw-bold rounded m-4 p-2"
              style={{
                display: "inline-block",
                cursor: "pointer",
              }}
            >
              <i className="bi bi-box-arrow-in-down"></i> Upload
            </label>
          </form>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {imageData?.site
            .slice(0)
            .reverse()
            .map((sites, index) => {
              let siteImage = sites.file;
              let imageId = sites.id
              return (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    margin: "1rem",
                  }}
                >
                  <img
                    src={siteImage}
                    value={imageId}
                    alt="site-image"
                    style={{
                      width: "300px",
                      height: "150px",
                      marginRight: "1rem",
                    }}
                  />
                  <button
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      
                     
                      handleDeleteImage(imageId);
                      
                    }}
                  >
                    <img
                      src="/assets/images/dustbin-delete.png"
                      alt="dustbin"
                      style={{ height: "40px" }}
                    />
                  </button>
                </div>
              );
            })}
               <div style={{width :'100%' , backgroundColor : 'rgba(227, 244, 255, 1)' , padding : '0.1rem 1rem' , marginTop : '2rem' , display : 'flex', justifyContent : 'space-between' , borderRadius : '10px'}}>
  
      <p style={{marginTop : '1rem'}}>    DELETE THIS SITE<br/>
       <p style={{color :'rgba(0, 0, 0, 0.5)'}}>  Deleting this project means permanently deleting all its data and cannot be undone .</p>
        </p>
      <br /> 
 
      <div>
   
      </div>
      <div >
      <Button colorScheme="red" size="lg" className="button-site" style={{backgroundColor : 'red' , height : "3rem" , marginTop :"1.1rem"}}>
      <span className="icon"><i className="bi bi-exclamation-triangle" style={{marginRight : '1rem' , marginTop : '0.1rem'}}></i></span>
      <p className="text-site" onClick={handleDeleteSite}>Delete Site</p>
    </Button>
      </div>
    </div>
        </div>
      </div>
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
    </>
  );
};

export default SiteSetting;

export async function getServerSideProps(context) {
  const { token, currentOrganizationId, siteId } = parseCookies(context);
  let siteSettingData = null;
  let imageData = null;

  try {
    const siteResponse = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/site`,
      {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          organization: currentOrganizationId,
          site: siteId,
        },
      }
    );
    if(siteResponse){
      siteSettingData = siteResponse?.data?.site;
    }
   
  } catch (error) {
    console.error("Error fetching site settings:", error.message);
  }

  try {
    const imageResponse = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/site/getSideDoccumnet`,
      {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          organization: currentOrganizationId,
          site: siteId,
        },
      }
    );

    imageData = imageResponse.data;
  } catch (error) {
    console.error("Error fetching image data:", error.message);
  }

  return {
    props: {
      siteSettingData,
      siteId,
      imageData,

    },
  };
}
