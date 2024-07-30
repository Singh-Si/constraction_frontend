import SelectMember from '@/components/organization/SelectMember'
import TimeAlloaction from '@/components/organization/TimeAlloaction'
import React from 'react'

const AutoDpr = () => {
    return (
        <div>
            <ul className="nav nav-tabs mb-4 d-flex justify-content-between" id="myTab" role="tablist">
                <div className='d-flex'>
                    <li className="nav-item" role="presentation">
                        <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">Select Member</button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">Time Allocation</button>
                    </li>
                </div>
            </ul>

            <div className="tab-content" id="myTabContent">
                <div className="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabIndex="0"><SelectMember/></div>
                <div className="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabIndex="0"><TimeAlloaction /></div>
            </div>
        </div>
    )
}

export default AutoDpr