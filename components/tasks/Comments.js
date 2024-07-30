import { useEffect, useRef, useState } from "react"
import axios from "axios";
import { parseCookies } from "nookies";
import { Spinner } from "react-bootstrap";
import AddComments from "../utils/Modal/comments/AddComments";
import EditComments from "../utils/Modal/comments/EditComments";
import config from "@/config/config";
import { toast } from "react-toastify";

const Comments = ({ id, userpermission }) => {
    const [loading, setLoading] = useState(false)
    const [editCommentsId, setEditCommentsId] = useState("");
    const [comments, setComments] = useState([])
    const [deleteCommentsId, setDeleteCommentsId] = useState(null);
    const closeModalonSave = useRef(null)

    const { token, currentOrganizationId, siteId, floorId } = parseCookies();

    const fetchData = async () => {
        setLoading(true);

        try {
            const res = await axios.get(`https://construction-backend.onrender.com/task/comments`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                params: {
                    organization: currentOrganizationId,
                    site: siteId,
                    floor: floorId,
                    task: id
                },
            })

            setComments(res?.data?.taskComment)
        } catch (error) {
            console.error('Error fetching photos:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        try {
            const response = await axios.delete(`${config.API_URL}/task/comment/remove/${deleteCommentsId}`, {
                headers: { Authorization: `Bearer ${token}` },
                params: {
                    organization: currentOrganizationId,
                    site: siteId,
                    floor: floorId,
                    task: id
                }
            });

            if (response?.data?.success) {
                toast.success("Comment Removed Successfully", { position: "top-center" });
                closeModalonSave.current.click();
                fetchData();
            }
        } catch (error) {
            console.error('Error fetching tasks:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [id])

    return (
        <ul className=" list-group m-auto mt-5">


            <AddComments id={id} fetchData={fetchData} />

            <div className="modal fade" id="deletecomments" data-bs-backdrop="static" tabIndex="-1" aria-labelledby="deletecomments" aria-hidden="true" >
                <div className="modal-dialog">
                    <div className="modal-content w-100">
                        <div className="modal-header w-100">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Delete Confirmation</h1>
                            <button type="button" ref={closeModalonSave} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        <div className="modal-body d-flex justify-content-center align-items-center">
                            Are you sure you want to delete this issue?
                        </div>

                        <div className="modal-footer  w-100">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-danger" onClick={handleDelete}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>

            <li className="list-group-item p-3 fw-bold bg-task-title mb-3">
                <div className='row d-flex justify-content-between'>
                    <div className='col-6 text-black'>Comments</div>
                    <div className='col-6 text-end'>
                        {userpermission && userpermission?.insert && <button type='button' className='text-black text-end cursor-pointer fw-bold' data-bs-toggle="modal" data-bs-target="#commentBackdrop">+ Add Comments</button>}
                    </div>
                </div>
            </li>

            <div className='row m-0 border-bottom'>
                {loading ? (
                    <div className='text-center fw-bold'><Spinner /></div>
                ) : (
                    <div className='row m-0 pt-3 overflow-y-scroll' style={{ maxHeight: 140 }}>
                        {comments && comments.length > 0 ? (
                            comments.map(val => (
                                <div key={val?._id} className="col-12 p-2 border rounded mb-2 p-2 d-flex justify-content-between ">
                                    <div className="col-10">
                                        <li className=" rounded fw-bold p-2 list-unstyled">{val?.comment}</li>
                                    </div>

                                    <div className="col-1 d-flex justify-content-center align-items-center">
                                        <button
                                            type="button"
                                            className="btn btn-link fs-5"
                                            data-bs-toggle="modal"
                                            data-bs-target="#editcommentBackdrop"
                                            onClick={() => setEditCommentsId(val)}
                                        >
                                            <i className="bi bi-pencil-square"></i>
                                        </button>

                                        <i className='bi bi-trash text-danger cursor-pointer fs-5'
                                            type="button" data-bs-toggle="modal" data-bs-target="#deletecomments"
                                            onClick={() => setDeleteCommentsId(val?._id)}
                                        ></i>
                                    </div>
                                    <EditComments
                                        editCommentsId={editCommentsId}
                                        taskresponseid={id}
                                        fetchData={fetchData}
                                    />
                                </div>
                            ))

                        ) : (
                            <div className="text-center fw-bold p-3">No Comments to display</div>
                        )}
                    </div>
                )}
            </div>
        </ul >
    )
}

export default Comments;