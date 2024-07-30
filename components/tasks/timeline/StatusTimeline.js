import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { parseCookies } from 'nookies';
import { Circle } from "rc-progress";
import EditStatusTimeLine from "./EditStatusTimeLine";

const StatusTimeline = ({ taskresponse, userpermission }) => {
    const [totalProgress, setTotalProgress] = useState(0); // State for total progress

    const { token, currentOrganizationId, floorId, siteId } = parseCookies();

    const fetchData = useCallback(async () => {
        if (!taskresponse?._id) return;

        try {
            const res = await axios.get(`https://construction-backend.onrender.com/task/timelines`, {
                params: { organization: currentOrganizationId, site: siteId, floor: floorId, task: taskresponse._id },
                headers: { Authorization: `Bearer ${token}` }
            });

            if (res.status === 200) {
                const timelines = res?.data?.taskTimelines;

                // Calculate total progress
                const totalProgress = timelines.reduce((acc, timeline) => acc + timeline.progress, 0);
                setTotalProgress(totalProgress);
            } else {
                console.log("Error: Unexpected response status"); // Log unexpected response status
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }, [taskresponse, currentOrganizationId, siteId, floorId, token]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    // Get current date and time in IST
    const now = new Date();
    const istTime = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));

    // const formattedDate = istTime.toISOString().slice(0, 10); // Get date part
    // const formattedTime = istTime.toLocaleString('en-IN', {
    //     houyr: '2-digit',
    //     minute: '2-digit',
    //     hour12: true
    // }).replace(/(AM|PM)/, ' $1'); // Format time part

    return (
        <>
            <li className="list-group-item p-3 text-blue fw-bold bg-task-title">
                <div className='row d-flex justify-content-between'>
                    <div className='col'>Update Task Status TimeLine</div>
                    <div className='col text-end'>
                        {userpermission && userpermission?.update && (
                            <button
                                type='button'
                                className='text-black text-end cursor-pointer bg-gray'
                                data-bs-toggle="offcanvas"
                                data-bs-target="#editStatusBackdrop"
                                aria-controls="staticBackdrop"
                            >
                                <i className='bi bi-pencil mx-2'></i>
                            </button>
                        )}
                    </div>
                </div>
            </li>

            <table className="table table-bordered fw-bold text-center">
                <thead className="bg-blue">
                    <tr className="bg-blue">
                        <th scope="col" className="bg-blue text-white">Task No</th>
                        <th scope="col" className="bg-blue text-white">Work Done</th>
                        <th scope="col" className="bg-blue text-white">Last Updated On</th>
                        {/* <th scope="col" className="bg-blue text-white">Time</th> */}
                        <th scope="col" className="bg-blue text-white">Updated by</th>
                    </tr>
                </thead>

                <tbody className="p-5">
                    <tr>
                        <td>{taskresponse.taskName}</td>
                        <td className="text-yellow">
                            <Circle
                                className="me-3"
                                percent={totalProgress}
                                strokeWidth={10}
                                strokeColor={totalProgress < 30 ? "red" : totalProgress > 70 ? "green" : "#F5AE00"}
                                style={{ width: 30 }}
                            />
                            <span style={{ color: totalProgress < 30 ? "red" : totalProgress > 70 ? "green" : "#F5AE00" }}>
                                Total Progress {totalProgress}%
                            </span>
                        </td>
                        <td>{new Date().toISOString().slice(0, 10)}     {new Date().toISOString().slice(11, 16)}PM</td>
                        <td>
                            <div className="d-flex justify-content-center text-black">
                                Name of the member
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>

            {totalProgress === 0 && (
                <div className="d-flex justify-content-center align-items-center fw-bold border-bottom p-3">
                    No Updated Timeline
                </div>
            )}
            <EditStatusTimeLine taskresponse={taskresponse} fetchData={fetchData} progress={totalProgress} />
        </>
    );
}

export default StatusTimeline;
