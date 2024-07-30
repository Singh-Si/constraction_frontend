import CompletedTask from '@/components/dashboard/sites/completed-Task/CompletedTask'
import CurrentTask from '@/components/dashboard/sites/currenttask/CurrentTask'
import Upcoming from '@/components/dashboard/sites/upcoming/Upcoming'
import React from 'react'

const GanttView = () => {
    return (
        <div>
            {/* <div className='row mt-3' >
                <ul className="nav nav-tabs mb-4" id="myTab" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#my-home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">Upcoming Task</button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#my-profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">Current Task</button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#my-contact-tab-pane" type="button" role="tab" aria-controls="contact-tab-pane" aria-selected="false">Completed Task</button>
                    </li>
                </ul>
                <div className="tab-content" id="myTabContent">
                    <div className="tab-pane fade show active" id="my-home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabIndex="0"><Upcoming /></div>
                    <div className="tab-pane fade" id="my-profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabIndex="0"><CurrentTask /></div>
                    <div className="tab-pane fade" id="my-contact-tab-pane" role="tabpanel" aria-labelledby="contact-tab" tabIndex="0"><CompletedTask /></div>
                </div>
            </div> */}
        </div>
    )
}

export default GanttView