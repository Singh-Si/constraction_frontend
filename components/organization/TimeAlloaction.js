import React from 'react'

const TimeAlloaction = () => {
    return (
        <div>
            <div className='row d-flex justify-content-start gap-5 p-3 '>
                <div className='col-5 border-info p-3 border rounded'>
                    <div className='border-info  '>
                        <span className='text-info fw-bold'>Select the working Days</span><br />
                        <small className='text-dark-gray'>You will Auto DPR on all working Days</small>
                    </div>
                    <div className='  ' >
                        <div className='d-flex justify-content-between gap-3 mt-3'>


                            <div>
                                <input type='checkbox' />
                                <span className='fw-bold'>Monday</span>
                            </div>
                            <div>
                                <input type='checkbox' />
                                <span className='fw-bold'>Tuesday</span>
                            </div>
                            <div>
                                <input type='checkbox' />
                                <span className='fw-bold'>Wednesday</span>
                            </div>
                            <div>
                                <input type='checkbox' />
                                <span className='fw-bold'>Thursday</span>
                            </div>
                        </div>
                        <div className='d-flex justify-content-start gap-5 mt-4'>
                            <div>
                                <input type='checkbox' />
                                <span className='fw-bold'>Friday</span>
                            </div>
                            <div>
                                <input type='checkbox' />
                                <span className='fw-bold'>Saturday</span>
                            </div>
                            <div>
                                <input type='checkbox' />
                                <span className='fw-bold'>Sunday</span>
                            </div>
                        </div>
                    </div>

                </div>
                <div className='col-2 border p-2 border-info rounded-3 h-50'>
                    <div>
                        <small className='text-info fw-bold'>Set up Time to remind<br /> your site team</small>
                    </div>
                    <div className='d-flex justify-content-between mt-4 px-3 '>
                        <span className='fw-bold fs-5 border-bottom border-info border-2'>12:00</span>
                        <span className='fw-bold fs-5 border-bottom border-info border-2'>AM</span>

                    </div>

                </div>
                <div className='col-2 border border-info rounded-3 h-75 p-2'>
                    <div>
                        <small className='text-info fw-bold'>Set up Time to get auto DPR for office team</small>
                    </div>
                    <div className='d-flex justify-content-between px-3 mt-4  ' >
                        <span className='fw-bold fs-5 border-bottom border-info border-2'>12:00</span>
                        <span className='fw-bold fs-5 border-bottom border-info border-2'>AM</span>

                    </div>

                </div>
            </div>

            <div className='row mt-5'>

                <div >
                    <span className='fw-bold text-info'>Choose Types of report</span>
                </div>
                <div className='col-4 mt-3 d-flex justify-content-between '>
                    <div>
                        <input type='checkbox' />
                        <span className='fw-bold text-dark-gray'>Daily Report </span>
                    </div>
                    <div>
                        <input type='checkbox' />
                        <span className='fw-bold text-dark-gray'>Monthly Report </span>
                    </div>
                    <div>
                        <input type='checkbox' className='py-2 border-info'/>
                        <span className='fw-bold text-dark-gray'>Yearly Report </span>
                    </div>
                </div>

            </div>
            <div className='row text-end'>
                <div className='text-end'>
                    <button className='btn bg-info  text-white new-site-btn' style={{ boxShadow: "2px 2px 13px #8CBCD9" }} type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">save</button>
                    </div>
            </div>
        </div>
    )
}

export default TimeAlloaction