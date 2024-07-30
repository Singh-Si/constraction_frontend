import { useEffect, useState } from 'react'
import axios from "axios";
import Image from 'next/image'
import { parseCookies } from "nookies";
import ViewComptedTask from './ViewComptedTask';

const statusBtn = "completed";

const CompletedTask = ({ tasks, status, userpermission }) => {
  const [taskresponse, settaskresponse] = useState("");
  const [loading, setLoading] = useState(false); ``
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

  // useEffect(() => {
  //   if (tasks && tasks.length > 0) {
  //     const latestTaskId = tasks[0]._id; // Assuming tasks are sorted in descending order by date
  //     handleLinkClick(latestTaskId);
  //   }
  // }, [tasks]);

  return (
    <>
      {tasks && tasks.length > 0 ? (
        <div className="row p-0 m-0">
          <div className="col-sm-2 p-0 task_sticky">
            <div className="nav flex-column nav-pills mb-3 mtngtabs mting">
              {tasks.map((curVal, index) => (
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
                      </strong>
                    </div>
                    <small className=' m-0'>Start Date :  {curVal?.startDate.slice(0, 10)}</small><br />
                    <small className=' m-0'>End Date :{curVal?.endDate.slice(0, 10)}</small><br />

                    <div className='mt-2'>
                      <Image src={"/assets/icons/complete_task_icon.png"} alt="complete_task_icon" width={20} height={20} />

                      <small className='text-completed-progress ms-1'>Completed : {curVal?.progress}%</small>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <ViewComptedTask taskresponse={taskresponse} loading={loading} status={statusBtn} handleLinkClick={handleLinkClick} userpermission={userpermission} />
        </div>
      ) : status == "loading" ? (
        <>
          {
            [1, 2].map((_, index) => {
              return <div key={index} className="row m-0 d-flex justify-content-center align-items-center">
                <div className="card" aria-hidden="true">
                  <div className="card-body">
                    <h5 className="card-title placeholder-glow">
                      <span className="placeholder col-6"></span>
                    </h5>
                    <p className="card-text placeholder-glow">
                      <span className="placeholder col-7"></span>
                      <span className="placeholder col-4"></span>
                      <span className="placeholder col-4"></span>
                      <span className="placeholder col-6"></span>
                      <span className="placeholder col-8"></span>
                    </p>
                    <a className="btn btn-primary disabled placeholder col-6" aria-disabled="true"></a>
                  </div>
                </div>
              </div>
            })
          }
        </>
      ) : (
        <div className="row d-flex justify-content-center align-items-center fw-bold" style={{ height: "50vh" }}>
          No Completed Tasks Found
        </div>
      )}
    </>
  )
}

export default CompletedTask