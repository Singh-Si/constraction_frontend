import EditTaskDetails from "./EditTaskDetails";

const TaskDetails = ({ taskresponse, loading, status, handleLinkClick, userpermission }) => {
    return (
        <ul className="list-group mb-5">
            <li className="list-group-item p-3 fw-bold bg-task-title">
                <div className='row d-flex justify-content-between'>
                    <div className='col-6 text-blue'>Task Details</div>
                    <div className='col-6 text-end'>
                        {userpermission && userpermission?.update && <button type='button' className='text-black text-end cursor-pointer bg-gray' data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                            <i className='bi bi-pencil mx-2'></i>
                        </button>}
                    </div>
                </div>
            </li>

            <EditTaskDetails taskresponse={taskresponse} handleLinkClick={handleLinkClick} />

            <table className="table table-bordered text-center">
                <thead className="bg-blue">
                    <tr className="bg-blue">
                        <th scope="col" className="bg-blue text-white">Task Name</th>
                        <th scope="col" className="bg-blue text-white">Work Category</th>
                        <th scope="col" className="bg-blue text-white">Start Date</th>
                        <th scope="col" className="bg-blue text-white">End Date</th>
                        <th scope="col" className="bg-blue text-white">Estimated Cost</th>
                        <th scope="col" className="bg-blue text-white">Total Cost</th>
                        <th scope="col" className="bg-blue text-white">Status</th>
                    </tr>
                </thead>

                <tbody>
                    <tr key={taskresponse?._id} className="fw-bold placeholder-glow">
                        <td style={{ width: "160px" }}>
                            <span className={`${loading && "placeholder placeholder-glow bg-light-gray"} rounded`}>
                                {taskresponse && taskresponse?.taskName}
                            </span>
                        </td>

                        <td style={{ width: "200px" }}>
                            <span className={`${loading && "placeholder placeholder-glow bg-light-gray"} rounded`}>
                                {taskresponse?.workCategory?.name}
                            </span>
                        </td>

                        <td style={{ width: "200px" }}>
                            <span className={`${loading && "placeholder placeholder-glow bg-light-gray"} rounded`}>
                                {taskresponse?.startDate?.slice(0, 10)}
                            </span>
                        </td>

                        <td style={{ width: "200px" }}>
                            <span className={`${loading && "placeholder bg-light-gray"} rounded`}>
                                {taskresponse?.endDate?.slice(0, 10)}
                            </span>
                        </td>

                        <td style={{ width: "160px" }}>
                            <span className={`${loading && "placeholder bg-light-gray"} rounded`}>
                                <i className="bi bi-currency-rupee"></i>{taskresponse?.expectedCost}
                            </span>
                        </td>

                        <td style={{ width: "100px" }}>
                            <span className={`${loading && "placeholder bg-light-gray"} rounded`}>
                                {taskresponse?.totalCost ? <><i className="bi bi-currency-rupee mx-0"></i>{taskresponse?.totalCost}</> : "N/A"}
                            </span>
                        </td>
                        {/* yellow-progress */}
                        <td style={{ width: "200px" }}>
                            <div className={`d-flex justify-content-center text-white rounded ${status == "upcoming" && "bg-upcoming-progress" || status == "current" && "bg-yellow-progress" || status == "completed" && "bg-completed-bg-progress"}`}>
                                {status == "upcoming" && "Not Started" || status == "current" && "Ongoing" || status === "completed" && "Completed"}
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>

            {taskresponse?.description.length > 0 &&
                <>
                    <span className="p-3 fw-bold">
                        <div className='col-6 text-blue'>Task Description</div>
                    </span>

                    <div className="form-floating mx-3 p-4 border-bottom">
                        {taskresponse?.description}
                    </div>
                </>
            }
        </ul >
    )
}

export default TaskDetails;