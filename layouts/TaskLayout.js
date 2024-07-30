import Link from 'next/link';
import { parseCookies } from 'nookies';
import React from 'react';

const TaskLayout = ({ children, setActiveTab, current }) => {
    return (
            <>
                <div>
                    <ul className="nav nav-tabs mb-4 d-flex justify-content-between" id="myTab" role="tablist">
                        <div className='d-flex'>
                            <button className={`nav-link ${current === "upcoming" ? "active" : ""}`} onClick={() => setActiveTab("upcoming")} type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">Upcoming Task</button>
                            <button className={`nav-link ${current === "current" ? "active" : ""}`} onClick={() => setActiveTab("current")} type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">Current Task</button>
                            <button className={`nav-link ${current === "completed" ? "active" : ""}`} onClick={() => setActiveTab("completed")} type="button" role="tab" aria-controls="purchase-tab-pane" aria-selected="false">Completed Task</button>
                        </div>
                    </ul>
                </div>
                <div>
                    {children}
                </div>
            </>
    );
}

export default TaskLayout;
