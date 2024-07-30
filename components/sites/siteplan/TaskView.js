import { useMemo, useState } from 'react'
import CompletedTask from '@/components/dashboard/sites/completed-Task/CompletedTask'
import CurrentTask from '@/components/dashboard/sites/currenttask/CurrentTask'
import UpcomingTask from '@/components/dashboard/sites/upcoming/Upcoming'
import TaskLayout from '@/layouts/TaskLayout'

const TaskView = ({ userpermission, userData, status }) => {
    const [activeTab, setActiveTab] = useState("upcoming");

    const filteredTasks = {
        completedTasks: userData && userData.filter(task => task.progress === 100),
        currentTasks: userData && userData.filter(task => task.progress > 0 && task.progress < 100),
        upcomingTasks: userData && userData.filter(task => task.progress === 0)
    };


    return (
        <TaskLayout setActiveTab={setActiveTab} current={activeTab}>
            <div className="row">
                {activeTab === "upcoming" && <UpcomingTask tasks={filteredTasks?.upcomingTasks} status={status} userpermission={userpermission} />}
                {activeTab === "current" && <CurrentTask tasks={filteredTasks?.currentTasks} status={status} userpermission={userpermission} />}
                {activeTab === "completed" && <CompletedTask tasks={filteredTasks?.completedTasks} status={status} userpermission={userpermission} />}
            </div>
        </TaskLayout>
    )
}

export default TaskView;