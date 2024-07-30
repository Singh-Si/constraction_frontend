import React from 'react'

const boqcomponet = () => {
    return (
        <div className='col p-0 overflow-scroll' style={{ height: '70vh' }}>
            <ul className=" list-group shadow-sm m-auto ">
                <li className="list-group-item p-3   bg-light-blue" >
                    <div className='row'>
                        <div >
                            <span className='col fw-bolder text-blue '>ST:03 </span>,
                            <small className=' '>(Steel Bar 12 mm)</small>
                        </div>

                    </div>
                </li>

                <div className='row-sm mt-5 d-flex justify-content-between'>
                    <div className='col px-5 '>
                        <button className='p-2 px-4  fw-bold text-success border'>Approve</button>
                        <button className='px-5  fw-bold py-2 text-danger border'>Reject</button>
                    </div>
                    <div className='col-2 px-5 '>
                        <button className='p-2 px-4  fw-bold text-dark-gray border'>Solved</button>
                    </div>

                </div>

                <div className='row-sm mt-5'>
                    <div className='col-11 m-auto border p-0  rounded'>
                        <div className='bg-blue w-100 rounded-top p-2'>
                            <small className='text-white' >Issue Details</small>
                        </div>
                        <div className='p-3 d-flex justify-content-between'>
                            <div>
                                <span className='text-blue fw-bold'> Project Site</span><br />
                                <small className='text-black'>Site-001</small>
                            </div>
                            <div>
                                <span className='text-blue fw-bold'>Material Item Name</span><br />
                                <small className='text-black'>Steel Bar 12 mm</small>
                            </div>
                            <div>
                                <span className='text-blue fw-bold'>Task</span><br />
                                <small className='text-black'>task 001  </small>
                            </div>
                            <div>
                                <span className='text-blue fw-bold'>Transfer From</span><br />
                                <small className='text-black'>Site-001</small>
                            </div>
                            <div>
                                <span className='text-blue fw-bold'>Vendor </span><br />
                                <small className='text-black'>TMT Steel Bar</small>
                            </div>

                        </div>
                    </div>

                </div>

                <div className='row-sm mt-5'>
                    <div className='col-11 m-auto border p-0  rounded'>
                        <div className='bg-blue w-100 rounded-top p-2'>
                            <small className='text-white' >More  Details</small>
                        </div>
                        <div className='p-3 d-flex justify-content-between'>
                            <div>
                                <small className='text-blue fw-bold'>Quantity</small><br />
                                <small className='text-black'>ST :03</small>
                            </div>
                            <div>
                                <small className='text-blue fw-bold'>Date/Time</small><br />
                                <small className='text-black'>10 feb 2024, 04:05 PM</small>
                            </div>
                            <div>
                                <small className='text-blue fw-bold'>Created By</small><br />
                                <small className='text-black'>Mr. XYZ</small>
                            </div>
                            <div>
                                <small className='text-blue fw-bold'>Due Date</small><br />
                                <small className='text-black'> 10 feb 2024</small>
                            </div>
                        </div>
                    </div>

                </div>

                <div className='row-sm mt-5'>
                    <div className='col-11 m-auto border p-0  rounded'>
                        <div className='bg-blue w-100 rounded-top p-2'>
                            <small className='text-white' >Item Description</small>
                        </div>

                        <div className='mt-5'>
                            <small className=' px-4 fw-bold'>Issues</small>

                        </div>

                    </div>
                </div>

                <div className='row-sm mt-5'>
                    <div className='col-11 m-auto border p-0  rounded'>
                        <div className='bg-blue w-100 rounded-top p-2'>
                            <small className='text-white' >Issues</small>
                        </div>

                        <div className='mt-5 '>
                            <small className=' px-4 fw-bold'>Issues</small>

                        </div>

                    </div>
                </div>

                <div className='row-sm mt-5'>
                    <div className='col-11 m-auto border p-0  rounded'>
                        <div className='bg-blue w-100 rounded-top p-2'>
                            <small className='text-white' >Uploaded Item related Image & Document</small>
                        </div>

                        <div className='mt-5 p-5'>

                            <input
                                type='file'
                                id='fileInput'
                                className='form-control'
                            // onChange={handleFileChange}
                            />

                        </div>

                    </div>
                </div>

                <div className='row-sm mt-5'>
                    <div className='col-12 m-auto border p-0  '>
                        <div className='bg-light-blue text-blue  w-100 rounded-top p-2'>
                            <small className='text-blue fw-bolder p-2' >Assign Member to Solve the Issue</small>
                        </div>

                        <div className='col-11 m-auto p-4'>
                            <div> <span className='text-info fw-bold'>+assign member</span></div>
                            <div className='mt-4'>
                                <small className='border border-gray rounded fw-bold p-2'>Member Name</small>
                                <small className='border border-gray rounded fw-bold p-2'>Member Name</small>
                            </div>
                        </div>

                        <div className='mt-2 p-4'>
                            <div className='col-11 m-auto border p-0  rounded'>
                                <div className='bg-blue w-100 rounded-top p-2'>
                                    <small className='text-white' >Issue Solved Details</small>
                                </div>

                                <div className='p-3 d-flex justify-content-between'>
                                    <div>
                                        <small className='text-blue fw-bold'>Solved by</small><br />
                                        <small className='text-black'>----------</small>
                                    </div>
                                    <div>
                                        <small className='text-blue fw-bold'>Material Name</small><br />
                                        <small className='text-black'>Steel bar 12 mm</small>
                                    </div>
                                    <div>
                                        <small className='text-blue fw-bold'>Quantity</small><br />
                                        <small className='text-black'>00.00</small>
                                    </div>
                                    <div>
                                        <small className='text-blue fw-bold'>Date and Time</small><br />
                                        <small className='text-black'>----------</small>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>


            </ul>
        </div>

    )
}

export default boqcomponet