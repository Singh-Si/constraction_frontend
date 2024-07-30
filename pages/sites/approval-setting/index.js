import React from 'react'

const ApprovalSetting = () => {
    return (
        <>
        <div className='row'>
            <h5 className='fw-bold'>Material Module Settings </h5>
        </div>
        <div className='d-flex flex-column gap-5 p-3 mt-4' >
            <div className='row d-flex justify-content-between'>
                <div className='col-4 border border-black  rounded-3 d-flex'>
                    <div className='p-3 d-flex flex-column'>
                        <div><small className='fw-bold'>Indent Approver</small></div>
                        <div> <small className='fst-normal'>User can approve or reject created indent.</small></div>
                    </div>
                    <div className='d-flex align-items-center'>
                        <small className='fw-bold text-info'>+<i className="bi bi-people"></i>Add Approver</small>
                    </div>

                </div>
                <div className='col-3 d-flex align-items-center'>
                    <div>
                        <small>Assign Members Name</small>
                        <input
                        className='form-control rounded-0'
                        placeholder='Assign Member Name'
                        disabled
                        />
                    </div>
                </div>
                <div className='col-2 d-flex align-items-center '>
                        <small className='text-dark-gray'>single user only </small>
                </div>
            </div>
            <div className='row d-flex justify-content-between'>
                <div className='col-4 border border-black rounded-3 d-flex'>
                    <div className='p-3 d-flex flex-column'>
                        <div><small className='fw-bold'>Purchase Order Approver</small></div>
                        <div> <small className='fst-normal'>User can approve or reject created indent.</small></div>
                    </div>
                    <div className='d-flex align-items-center'>
                        <small className='fw-bold text-info'>+<i className="bi bi-people"></i>Add Approver</small>
                    </div>

                </div>
                <div className='col-3 d-flex align-items-center'>
                    <div>
                        <small>Assign Members Name</small>
                        <input
                        className='form-control rounded-0'
                        placeholder='Assign Member Name'
                        disabled
                        />
                    </div>
                </div>
                <div className='col-2 d-flex align-items-center '>
                        <small className='text-dark-gray'>single user only </small>
                </div>
            </div>
            <div className='row d-flex justify-content-between'>
                <div className='col-4 border border-black rounded-3 d-flex'>
                    <div className='p-3 d-flex flex-column'>
                        <div><small className='fw-bold'>Material Issue Approver</small></div>
                        <div> <small className='fst-normal'>User can approve or reject created indent.</small></div>
                    </div>
                    <div className='d-flex align-items-center'>
                        <small className='fw-bold text-info'>+<i className="bi bi-people"></i>Add Approver</small>
                    </div>

                </div>
                <div className='col-3 d-flex align-items-center'>
                    <div>
                        <small>Assign Members Name</small>
                        <input
                        className='form-control rounded-0'
                        placeholder='Assign Member Name'
                        disabled
                        />
                    </div>
                </div>
                <div className='col-2 d-flex align-items-center '>
                        <small className='text-dark-gray'>single user only </small>
                </div>
            </div>
        </div>
        </>
    )
}

export default ApprovalSetting