import MaterialLayout from '@/layouts/MaterialLayout'
import React from 'react'

const Postorders = () => {
    return (
        <div>
        <div className="site-profile" style={{marginBottom :"1rem" }}>
        <div className="site-profile-heading">
          <span style={{ color: "#FFFFFF", opacity: "0.6" }}>
            Sites /{" "}
          </span>
          <span style={{ color: "white", marginLeft: "0.2rem" }}>GRN</span>
        </div>
        </div>
        <MaterialLayout current="grn">
            <div className='row-sm d-flex justify-content-end gap-2'>
            <div className='row-sm d-flex justify-content-end gap-2 mt-4'>
                <div className='text-end '>
                    <button type="button"  style={{background : "none" , border : '1px solid rgba(42 , 62 , 78 , 0.6) ' , borderRadius : '2px'}} data-bs-toggle="modal" data-bs-target=".bd-example-modal-xl"><i class="bi bi-file-earmark-pdf-fill"></i> Export PDF</button>
                </div>
                <div className=''>
                    <button type="button" style={{background : "none" , border : '1px solid rgba(42 , 62 , 78 , 0.6) ' , borderRadius : '2px'}} data-bs-toggle="modal" data-bs-target=".bd-example-modal-xl"><i class="bi bi-file-earmark-spreadsheet"></i>  Export Excel</button>
                </div>
                <div className=''>
                    <button type="button" style={{background : "none" , border : '1px solid rgba(42 , 62 , 78 , 0.6) ' , borderRadius : '2px'}} data-bs-toggle="modal" data-bs-target=".bd-example-modal-xl"><i class="bi bi-file-earmark-arrow-down"></i>  Import Excel</button>
                </div>

            </div>

            </div>
            <div className='row-sm'>
                <ul className="mt-4 p-0 text-decoration-none list-style-none w-100  shadow-sm  m-auto small">
                    <li className="list-group-item list-group-item  fw-bold bg-gray text-black">
                        <div href="/member" className='text-decoration-none text-black'>
                            <div className='row bg-light-gray'>
                                <div className='border bg-blue p-1 col-1 d-flex align-items-center px-2 m-0 gap-3 text-white' style={{background : "rgba(42, 62, 78, 1)" , color : "white"}} >
                                    <small className='w-100 text-center'>
                                        GRN-ID</small>
                                </div>

                                <div className='border p-3 col-2 d-flex align-items-center px-2 m-0 gap-3 ' style={{background : "rgba(42, 62, 78, 1)" , color : "white"}} >
                                    <small className='w-100 text-center'>
                                        Item Name</small>
                                </div>
                                <div className=' border p-3 col-2 d-flex align-items-center px-2 m-0 gap-3 '  style={{background : "rgba(42, 62, 78, 1)" , color : "white"}}>
                                    <small className='w-100 text-center'>
                                        Total Quantity</small>
                                </div>
                                <div className='border p-3 col-2 d-flex align-items-center px-2 m-0 gap-3 ' style={{background : "rgba(42, 62, 78, 1)" , color : "white"}} >
                                    <small className='w-100 text-center'>
                                        Vendor </small>
                                </div>
                                <div className='border p-3 col-2 d-flex align-items-center px-2 m-0 gap-3 ' style={{background : "rgba(42, 62, 78, 1)" , color : "white"}} >
                                    <small className='w-100 text-center'>
                                        Delivery Value</small>
                                </div>
                                <div className='border p-3 col-1 d-flex align-items-center px-2 m-0 gap-3 ' style={{background : "rgba(42, 62, 78, 1)" , color : "white"}} >
                                    <small className='w-100 text-center'>
                                        Deliverd ON</small>
                                </div>
                                <div className='border p-3 col-1   text-center  d-flex align-items-center px-2 m-0 gap-3 '  style={{background : "rgba(42, 62, 78, 1)" , color : "white"}}>
                                    <small className='w-100 text-center'>
                                        Upload Invoice</small>
                                </div>
                                <div className='border p-3 col-1   text-center  d-flex align-items-center px-2 m-0 gap-3 '  style={{background : "rgba(42, 62, 78, 1)" , color : "white"}}>
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
        </div>
    )
}

export default Postorders