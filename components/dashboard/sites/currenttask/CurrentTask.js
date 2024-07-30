import { useState } from "react";
import { Circle } from "rc-progress";
import ViewComptedTask from "../completed-Task/ViewComptedTask";
import axios from "axios";
import { parseCookies } from "nookies";

const statusBtn = "current";

const CurrentTask = ({ tasks, status, userpermission }) => {
  const [taskresponse, settaskresponse] = useState("");
  const [loading, setLoading] = useState(false);
  const { token, currentOrganizationId, siteId } = parseCookies();

  const handleLinkClick = async (id) => {
    setLoading(true);
    try {
      const response = await axios.get(`https://construction-backend.onrender.com/task?organization=${currentOrganizationId}&site=${siteId}&task=${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setLoading(false);

      if (response?.data?.tasks) {
        settaskresponse(response?.data?.tasks[0]);
      }

    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  return (
    <>
      {tasks && tasks?.length > 0 ? (
        <div className="row p-0 m-0">
          <div className="col-sm-2 p-0 task_sticky">
            <small className=' fw-bold d-flex justify-content-center'>All Current Task</small>
            <div className="nav flex-column nav-pills mb-3 mtngtabs mting">
              {tasks && tasks?.map((curVal, index) => (
                <div key={index} onClick={() => handleLinkClick(curVal?._id)} className="row m-0 text-decoration-none text-black border-bottom cursor-pointer tasks_hover">
                  <div className="col-2 border d-flex justify-content-center">{index > 10 ? index : <>0{index + 1}</>}</div>
                  <div className="col-10 p-2 border">
                    <div className="m-0">
                      <strong className="col">Task:
                        <span className="mx-1">
                          {curVal?.taskName}
                        </span>
                        <br />
                        ({curVal?.workCategory?.name})
                      </strong><br />
                    </div>
                    <small className=' m-0'>Start Date :  {curVal?.startDate.slice(0, 10)}</small><br />
                    <small className=' m-0'>End Date :{curVal?.endDate.slice(0, 10)}</small><br />
                    <div className='mt-2'>
                      <Circle className="text-yellow-progress me-3" percent={curVal?.progress} strokeWidth={4} strokeColor="#F5AE00" style={{ width: 30 }} />
                      <small className='text-yellow-progress'>Progress : {curVal?.progress}%</small>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <ViewComptedTask taskresponse={taskresponse} loading={loading} status={statusBtn} handleLinkClick={handleLinkClick} userpermission={userpermission} />
        </div>

      ) : (
        <div className="row d-flex justify-content-center align-items-center fw-bold" style={{ height: "50vh" }}>
          No Current Tasks Found
        </div>
      )}
    </>
  )
}

export default CurrentTask