import Attachments from "@/components/tasks/Attachments";
import Comments from "@/components/tasks/Comments";
import Issues from "@/components/tasks/Issues";
import Photos from '@/components/tasks/Photos';
import TaskDetails from "@/components/tasks/taskDetails/TaskDetails";
import StatusTimeline from "@/components/tasks/timeline/StatusTimeline";
import { Spinner } from "react-bootstrap";

const ViewComptedTask = ({ taskresponse, loading, status, handleLinkClick, userpermission }) => {

    return (
        <div className="col-10 p-0" style={{ border: "1px solid #B9B9B9" }}>
            {taskresponse ?
                <div className='col p-0'>
                    <TaskDetails taskresponse={taskresponse} loading={loading} status={status} handleLinkClick={handleLinkClick} userpermission={userpermission} />

                    <StatusTimeline taskresponse={taskresponse} userpermission={userpermission} />

                    <Photos taskresponse={taskresponse} userpermission={userpermission} />

                    <Attachments taskresponse={taskresponse} userpermission={userpermission} />

                    <Issues taskresponse={taskresponse} userpermission={userpermission} />

                    <Comments id={taskresponse?._id} userpermission={userpermission} />
                </div>
                : loading ?
                    <div className="d-flex justify-content-center align-items-center h-75">
                        <Spinner />
                    </div>
                    :
                    <div className='col d-flex justify-content-center align-items-center h-100' style={{ border: "1px solid #B9B9B9" }}>
                        <span>Click task to Show details</span>
                    </div>

            }
        </div>
    )
}

export default ViewComptedTask;