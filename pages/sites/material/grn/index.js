import MaterialLayout from '@/layouts/MaterialLayout'
import React from 'react'

const Postorders = () => {
    return (
        <MaterialLayout current="grn">
            <div className='row-sm d-flex justify-content-end gap-2'>
                <div className='col-2 text-end '>
                    <button type="button" className="border-info border-2 text-info m-auto w-75 bg-white rounded px-0 py-1 btn btn-primary" data-bs-toggle="modal" data-bs-target=".bd-example-modal-xl"><i className="bi bi-file-earmark-excel"></i> Export Excel</button>
                </div>
                <div className='col-2'>
                    <button type="button" className="border-info border-2 text-info m-auto w-75 bg-white rounded  py-1 btn btn-primary" data-bs-toggle="modal" data-bs-target=".bd-example-modal-xl"><i className="bi bi-file-earmark-excel"></i> Update Excel</button>
                </div>

            </div>
            <div className='row-sm'>
                <ul className="mt-4 p-0 text-decoration-none list-style-none w-100  shadow-sm  m-auto small">
                    <li className="list-group-item list-group-item  fw-bold bg-gray text-black">
                        <div href="/member" className='text-decoration-none text-black'>
                            <div className='row bg-light-gray'>
                                <div className='border bg-blue p-1 col-1 d-flex align-items-center px-2 m-0 gap-3 text-white' >
                                    <small className='w-100 text-center'>
                                        GRN-ID</small>
                                </div>

                                <div className='border p-3 col-2 d-flex align-items-center px-2 m-0 gap-3 ' >
                                    <small className='w-100 text-center'>
                                        Item Name</small>
                                </div>
                                <div className=' border p-3 col-2 d-flex align-items-center px-2 m-0 gap-3 ' >
                                    <small className='w-100 text-center'>
                                        Total Quantity</small>
                                </div>
                                <div className='border p-3 col-2 d-flex align-items-center px-2 m-0 gap-3 ' >
                                    <small className='w-100 text-center'>
                                        Vendor </small>
                                </div>
                                <div className='border p-3 col-2 d-flex align-items-center px-2 m-0 gap-3 ' >
                                    <small className='w-100 text-center'>
                                        Delivery Value</small>
                                </div>
                                <div className='border p-3 col-1 d-flex align-items-center px-2 m-0 gap-3 ' >
                                    <small className='w-100 text-center'>
                                        Deliverd ON</small>
                                </div>
                                <div className='border p-3 col-1   text-center  d-flex align-items-center px-2 m-0 gap-3 ' >
                                    <small className='w-100 text-center'>
                                        Upload Invoice</small>
                                </div>
                                <div className='border p-3 col-1   text-center  d-flex align-items-center px-2 m-0 gap-3 ' >
                                    <small className='w-100 text-center'>
                                        Edit</small>
                                </div>
                            </div>
                        </div>
                    </li>
                    

                    {/* data of the table */}

                    <li className="list-group-item ">
                        <div href="/member" className='text-decoration-none text-black'>
                            <div className='row '>
                                <div className='border p-3 col-1 d-flex align-items-center px-2 m-0 gap-3 ' >
                                    <small className='w-100 text-center'>
                                        GRN-03</small>
                                </div>

                                <div className='border p-3 col-2 d-flex align-items-center px-2 m-0 gap-3 ' >
                                    <small className='w-100 text-center'>
                                        Steel 12 mm</small>
                                </div>
                                <div className=' border p-3 col-2 d-flex align-items-center px-2 m-0 gap-3 ' >
                                    <small className='w-100 text-center'>
                                        10.00 ns</small>
                                </div>
                                <div className='border p-3 col-2 d-flex align-items-center px-2 m-0 gap-3 ' >
                                    <small className='w-100 text-center'>
                                        Vendor Name</small>
                                </div>
                                <div className='border p-3 col-2 d-flex align-items-center px-2 m-0 gap-3 ' >
                                    <small className='w-100 text-center'>
                                        000.00</small>
                                </div>
                                <div className='border p-3 col-1 d-flex align-items-center px-2 m-0 gap-3 ' >
                                    <small className='w-100 text-center'>
                                        10 feb 2024</small>
                                </div>
                                <div className='border p-3 col-1   text-center  d-flex align-items-center px-2 m-0 gap-3 ' >
                                    <small className='w-100 text-center'>
                                        Upload</small>
                                </div>
                                <div className='border p-3 col-1   text-center  d-flex align-items-center px-2 m-0 gap-3 ' >
                                    <small className='w-100 text-center'>
                                        <i className='bi bi-pencil'></i></small>
                                </div>
                            </div>
                        </div>
                    </li>
                    
                    <li className="list-group-item ">
                        <div href="/member" className='text-decoration-none text-black'>
                            <div className='row '>
                                <div className='border p-3 col-1 d-flex align-items-center px-2 m-0 gap-3 ' >
                                    <small className='w-100 text-center'>
                                        GRN-03</small>
                                </div>

                                <div className='border p-3 col-2 d-flex align-items-center px-2 m-0 gap-3 ' >
                                    <small className='w-100 text-center'>
                                        Steel 12 mm</small>
                                </div>
                                <div className=' border p-3 col-2 d-flex align-items-center px-2 m-0 gap-3 ' >
                                    <small className='w-100 text-center'>
                                        10.00 ns</small>
                                </div>
                                <div className='border p-3 col-2 d-flex align-items-center px-2 m-0 gap-3 ' >
                                    <small className='w-100 text-center'>
                                        Vendor Name</small>
                                </div>
                                <div className='border p-3 col-2 d-flex align-items-center px-2 m-0 gap-3 ' >
                                    <small className='w-100 text-center'>
                                        000.00</small>
                                </div>
                                <div className='border p-3 col-1 d-flex align-items-center px-2 m-0 gap-3 ' >
                                    <small className='w-100 text-center'>
                                        10 feb 2024</small>
                                </div>
                                <div className='border p-3 col-1   text-center  d-flex align-items-center px-2 m-0 gap-3 ' >
                                    <small className='w-100 text-center'>
                                        Upload</small>
                                </div>
                                <div className='border p-3 col-1   text-center  d-flex align-items-center px-2 m-0 gap-3 ' >
                                    <small className='w-100 text-center'>
                                        <i className='bi bi-pencil'></i></small>
                                </div>
                            </div>
                        </div>
                    </li>


                </ul>
            </div >

        </MaterialLayout>
    )
}

export default Postorders