import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { parseCookies } from 'nookies';
import { toast } from 'react-toastify';
import config from '@/config/config';

const Photos = ({ taskresponse, userpermission }) => {
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(null); // Track selected image index
    const [selectedImageId, setSelectedImageId] = useState(null); // Track selected image ID
    const [lastClickedIndex, setLastClickedIndex] = useState(null); // Track the index of the last clicked image
    const [showModal, setShowModal] = useState(false); // State to control modal visibility

    const fileInputRef = useRef(null);
    const { token, currentOrganizationId, siteId, floorId } = parseCookies();

    const handleAddButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleImageClick = (index, id) => {
        setSelectedImageIndex(index); // Set the selected image index
        setSelectedImageId(id); // Set the selected image ID
        setLastClickedIndex(index); // Store the index of the last clicked image
        setShowModal(true); // Show the modal
    };

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`https://construction-backend.onrender.com/task/photos`, {
                headers: { Authorization: `Bearer ${token}` },
                params: { organization: currentOrganizationId, site: siteId, floor: floorId, task: taskresponse?._id }
            });
            setPhotos(res?.data?.taskPhotos);
        } catch (error) {
            console.error('Error fetching photos:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleFileInputChange = async (event) => {
        const selectedFile = event.target.files[0];
        try {
            setLoading(true);

            const formData = new FormData();
            formData.append('attachment', selectedFile);
            const res = await axios.post(`https://construction-backend.onrender.com/task/photo/add`, formData, {
                headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
                params: { organization: currentOrganizationId, site: siteId, floor: floorId, task: taskresponse?._id }
            });
            if (res.data.success) {
                toast.success("Task Photo Succesfully Added", { position: "top-center" });
                fetchData();
            } else {
                toast.error("Only Supported Files are allowed!", { position: "top-center" });
            }
        } catch (error) {
            console.error('Error uploading photo:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [taskresponse?._id]);

    const handleDelete = async () => {
        try {
            const response = await axios.delete(`${config.API_URL}/task/photo/remove/${selectedImageId}`, {
                headers: { Authorization: `Bearer ${token}` },
                params: {
                    organization: currentOrganizationId,
                    site: siteId,
                    floor: floorId,
                    task: taskresponse?._id
                },
            });
            if (response.data.success) {
                toast.success("Image deleted successfully", { position: "top-center" });
                fetchData();
            } else {
                toast.error("Error deleting image", { position: "top-center" });
            }
        } catch (error) {
            console.error('Error deleting photo:', error);
        }
    };

    const confirmDelete = () => {
        const isConfirmed = window.confirm("Are you sure you want to delete this image?");
        if (isConfirmed) {
            handleDelete();
        }
    };

    const handleModalClose = () => {
        setSelectedImageIndex(lastClickedIndex); // Set the selected image index to the last clicked index when modal is closed
    };

    return (
        <ul className="list-group m-auto mt-5">
            <li className="list-group-item p-3 fw-bold bg-task-title mb-3">
                <div className="row d-flex justify-content-between">
                    <div className="col-4 text-black">Photos </div>
                    <div className='col-4 text-center text-black'>
                        Supported File Types are

                        <span className='text-danger ms-2'>(jpg, jpeg, png)</span>
                    </div>
                    <div className="col-4 text-end">
                        {userpermission && userpermission?.insert && <button type="button" onClick={handleAddButtonClick} className="text-blue fw-bold text-end cursor-pointer">
                            + Add
                            <input ref={fileInputRef} type="file" className="form-control d-none" onChange={handleFileInputChange} />
                        </button>}
                    </div>
                </div>
            </li>

            <li className="list-group-item shadow-none border-none p-3 overflow-y-auto"
                style={{ maxHeight: "260px" }}
            >
                <div className="text-decoration-none text-black">
                    <div className="row d-flex">
                        {loading ? (
                            <div className="card p-2 m-1" style={{ width: 140 }} aria-hidden="true">
                                <div>
                                    <p className="card-text placeholder-glow">
                                        {/* <span className="placeholder col-7"></span> */}
                                        <span className="placeholder col-4"></span>
                                        <span className="placeholder col-4"></span>
                                        <span className="placeholder col-4"></span>
                                        <span className="placeholder col-4"></span>
                                        <span className="placeholder col-12"></span>
                                        <span className="placeholder col-12"></span>
                                    </p>

                                    {/* <h5 className="card-title placeholder-glow">
                                        <span className="placeholder col-12"></span>
                                    </h5> */}
                                </div>
                            </div>
                        ) : photos.length > 0 ? (
                            <div className='d-flex flex-wrap row mx-auto'>
                                {photos.map((photo, index) => (
                                    <div key={index} className="col-1 m-3 d-flex" data-bs-toggle="modal" data-bs-target="#carouselModal" onClick={() => handleImageClick(index, photo._id)}>
                                        <div className="col-6">
                                            {photo && photo.photo && photo.photo.url && (
                                                <img
                                                    src={photo?.photo?.url}
                                                    alt="image" height={100} width={100}
                                                    className='cursor-pointer'
                                                />
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center fw-bold">There are no Images</div>
                        )}
                    </div>
                </div>
            </li>

            {/* Bootstrap Modal */}
            <div className="modal fade" id="carouselModal" tabIndex="-1" aria-labelledby="carouselModalLabel" aria-hidden="true" onHide={handleModalClose}>
                <div className="modal-dialog modal-lg w-75" style={{ height: "90vh" }}>
                    <div className="modal-content w-100 h-100">
                        <div className="modal-header w-100">
                            <h5 className="modal-title" id="carouselModalLabel">Image Preview</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body p-0">
                            <div id="carouselExample" className="carousel slide" data-bs-ride="carousel">
                                <div className="carousel-inner w-100">
                                    {photos.map((photo, index) => (
                                        <div className={`carousel-item ${index === selectedImageIndex ? 'active' : ''} rounded`} key={index}>
                                            <img className='rounded' src={photo.photo.url} width={"100%"} height={"440px"} alt={`Slide ${index}`} />
                                        </div>
                                    ))}
                                </div>
                                <button className="carousel-control-prev bg-black" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                                    <span className="carousel-control-prev-icon text-danger" aria-hidden="true"></span>
                                    <span className="visually-hidden">Previous</span>
                                </button>
                                <button className="carousel-control-next bg-black" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Next</span>
                                </button>
                            </div>

                            <br />
                            
                            <div className='text-end'>
                                <i className='bi bi-trash text-danger cursor-pointer fs-5'
                                    type="button" data-bs-toggle="modal" data-bs-target="#photosdeletemodal"
                                    onClick={() => confirmDelete()}
                                ></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ul>
    );
};

export default Photos;
