import { useEffect, useRef, useState } from "react";
import { Spinner } from "reactstrap";
import { toast } from "react-toastify";
import axios from "axios";
import { parseCookies } from "nookies";
import EditIssue from "../utils/Modal/issues/EditIssue";
import AddIssues from "../utils/Modal/AddIssues";

const Issues = ({ taskresponse, userpermission }) => {
    const [loading, setLoading] = useState(false);
    const [editIssuesId, setEditIssuesId] = useState("");
    const [issues, setIssues] = useState([]);
    const [deleteIssueId, setDeleteIssueId] = useState(null);

    const closeModalonSave = useRef(null)

    const { token, currentOrganizationId, siteId, floorId } = parseCookies();

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`https://construction-backend.onrender.com/task/issues`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                params: {
                    organization: currentOrganizationId,
                    site: siteId,
                    floor: floorId,
                    task: taskresponse?._id
                },
            });
            setIssues(res?.data?.taskIssues);
        } catch (error) {
            console.error('Error fetching photos:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        try {
            const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/task/issue/remove/${deleteIssueId}`, {
                headers: { Authorization: `Bearer ${token}` },
                params: {
                    organization: currentOrganizationId,
                    site: siteId,
                    floor: floorId,
                    task: taskresponse?._id
                }
            });
            if (response?.data?.success) {
                toast.success("Issue Removed Successfully", { position: "top-center" });
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
    }, [taskresponse?._id]);

    return (
        <div className='mt-2'>
            <AddIssues id={taskresponse._id} fetchData={fetchData} />

            <div className="modal fade" id="exampleModal" data-bs-backdrop="static" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
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

            <ul className="list-group m-auto mt-5 mb-3">
                <li className="list-group-item p-3 fw-bold bg-task-title">
                    <div className='row d-flex justify-content-between'>
                        <div className='col-6 text-black'>Issues</div>
                        <div className='col-6 text-end'>
                            {userpermission && userpermission?.insert &&
                                <button
                                    type='button'
                                    className='text-black text-end cursor-pointer fw-bold'
                                    data-bs-toggle="modal"
                                    data-bs-target="#addIssuesModal" // Open the Add Issues Modal
                                >
                                    + Add Issues
                                </button>
                            }
                        </div>
                    </div>
                </li>
            </ul>

            <div className='row m-0 border-bottom'>
                {loading ? (
                    <div className='text-center fw-bold'><Spinner /></div>
                ) : issues && issues.length > 0 ? (
                    <div className='row m-0 pt-3 fw-bold overflow-y-scroll' style={{ maxHeight: "140px" }}>
                        {issues.map(val => (
                            <div key={val?._id} className="rounded border d-flex justify-content-between  p-2 mb-2">
                                <div className="col-10">
                                    <li className="rounded fw-bold p-2 list-unstyled">{val?.issue}</li>
                                </div>

                                <div className="col-1 d-flex justify-content-center align-items-center">
                                    <button
                                        type="button"
                                        className="btn btn-link fs-5"
                                        data-bs-toggle="modal"
                                        data-bs-target="#editIssueModal"
                                        onClick={() => setEditIssuesId(val)}
                                    >
                                        <i className="bi bi-pencil-square"></i>
                                    </button>

                                    <i className='bi bi-trash text-danger cursor-pointer fs-5'
                                        type="button" data-bs-toggle="modal" data-bs-target="#exampleModal"
                                        onClick={() => setDeleteIssueId(val?._id)}
                                    ></i>
                                </div>
                            </div>
                        ))}

                        <EditIssue editIssuesId={editIssuesId} taskresponseid={taskresponse?._id} fetchData={fetchData} />
                    </div>
                )
                    :
                    <div className="text-center fw-bold p-3">No issues to display</div>
                }
            </div>

        </div>
    )
}

export default Issues;
