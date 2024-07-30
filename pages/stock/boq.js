import Addboq from '@/components/sites/boq/addboq'
import boqcomponet from '@/components/sites/boq/boqcomponet'
import StocksLayout from '@/layouts/StocksLayout'
import Link from 'next/link'
import React from 'react'
import BackIcon from "@/components/utils/global/BackIcon";

const boq = () => {
    const columns = [
        { field: "name", header: "BOQ-ID" },
        { field: "slug", header: "Item Name" },
        { field: "slug", header: "Item Description" },
        { field: "slug", header: "Ratio" },
        { field: "slug", header: "Unit*" },
        { field: "slug", header: "Quantity" },
        { field: "slug", header: "Rate(₹)" },
        { field: "slug", header: "Material cost" },
        { field: "slug", header: "Consumption" },
    ]
    return (
        <StocksLayout current="boq">
            <div className='row bg-light-blue d-flex justify-content-end'>
                <span className='text-blue fw-bold p-2'><BackIcon/>BOQ</span>

            </div>

            <div className="row mt-4">
                <div className="col-3 mb-3">
                    <div className="input-group d-flex align-items-center">
                        <span className="input-group-append d-flex align-items-center position-absolute" style={{ right: 18, display: "flex" }}>
                            <i className="bi bi-search" style={{ color: "#8CBCD9" }}></i>
                        </span>
                        <input
                            type="search"
                            className="outline-none form-control rounded"
                            style={{ border: "1px solid #B8BAC2" }}
                            placeholder="Search BOQ-ID "

                        />


                        <span className="input-group-append d-flex align-items-center position-absolute" style={{ right: 18, display: "flex" }}>
                            <i className="bi bi-search" style={{ color: "#8CBCD9" }}></i>
                        </span>
                    </div>
                </div>
                <div className='col-3 gap-2 d-flex justify-content-between p-0'>
                    <button className=' bg-white text-info new-site-btn border border-info'  >Export Material List</button>
                    <button className=' bg-white text-info new-site-btn border border-info' type="button" data-bs-toggle="offcanvas" >Upload Material List</button>

                </div>

                <div className="col-5 text-end">
                    <button className='btn bg-btn-bg text-white new-site-btn' style={{ boxShadow: "2px 2px 13px #8CBCD9" }} type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">+BOQ</button>
                    <Addboq />               </div>
            </div>

            <div className='row-sm'>
                <ul className="mt-4 p-0 text-decoration-none list-style-none w-100  shadow-sm  m-auto small">
                    <li className="list-group-item list-group-item  fw-bold bg-gray text-black">
                        <div href="/member" className='text-decoration-none text-white'>
                            <div className='row bg-blue'>
                                <div className='border border-gray py-3 col-1 d-flex align-items-center px-2 m-0 gap-3 ' >
                                    <small className='w-100 text-center'>
                                        BOQ ID</small>
                                </div>

                                <div className='border  col-2 d-flex align-items-center px-2 m-0 gap-3 ' >
                                    <small className='w-100 text-center'>
                                        Item Name</small>
                                </div>
                                <div className=' border col-1 d-flex align-items-center px-2 m-0 gap-3 ' >
                                    <small className='w-100 text-center'>
                                        Item Description</small>
                                </div>
                                <div className='border  col-1 d-flex align-items-center px-2 m-0 gap-3 ' >
                                    <small className='w-100 text-center'>
                                        Ratio </small>
                                </div>
                                <div className='border  col-2 d-flex align-items-center px-2 m-0 gap-3 ' >
                                    <small className='w-100 text-center'>
                                        Unit*</small>
                                </div>
                                <div className='border  col-2 d-flex align-items-center px-2 m-0 gap-3 ' >
                                    <small className='w-100 text-center'>
                                        Quantity</small>
                                </div>
                                <div className='border  col-1   text-center  d-flex align-items-center px-2 m-0 gap-3 ' >
                                    <small className='w-100 text-center'>
                                        Rate(₹) </small>
                                </div>
                                <div className='border  col-1   text-center  d-flex align-items-center px-2 m-0 gap-3 ' >
                                    <small className='w-100 text-center'>
                                        Material cost </small>
                                </div>
                                <div className='border  col-1   text-center  d-flex align-items-center px-2 m-0 gap-3 ' >
                                    <small className='w-100 text-center'>
                                        Consumption </small>
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
                                        BOQ-01</small>
                                </div>

                                <div className='border p-3 col-2 d-flex align-items-center px-2 m-0 gap-3 ' >
                                    <small className='w-100 text-center'>
                                        Mat 1</small>
                                </div>
                                <div className=' border p-3 col-1 d-flex align-items-center px-2 m-0 gap-3 ' >
                                    <small className='w-100 text-center'>
                                    -------------------</small>
                                </div>
                                <div className='border p-3 col-1 d-flex align-items-center px-2 m-0 gap-3 ' >
                                    <small className='w-100 text-center'>
                                        6.00</small>
                                </div>
                                <div className='border p-3 col-2 d-flex align-items-center px-2 m-0 gap-3 ' >
                                    <small className='w-100 text-center'>
                                        nos</small>
                                </div>
                                <div className='border p-3 col-2 d-flex align-items-center px-2 m-0 gap-3 ' >
                                    <small className='w-100 text-center'>
                                        12</small>
                                </div>
                                <div className='border p-3 col-1   text-center  d-flex align-items-center px-2 m-0 gap-3 ' >
                                    <small className='w-100 text-center'>
                                    ₹00.00 </small>
                                </div>
                                <div className='border p-3 col-1   text-center  d-flex align-items-center px-2 m-0 gap-3 ' >
                                    <small className='w-100 text-center'>
                                    ₹00.00</small>
                                </div>
                                <div className='border p-3 col-1   text-center  d-flex align-items-center px-2 m-0 gap-3 ' >
                                    <small className='w-100 text-center'>
                                    ₹00.00</small>
                                </div>
                            </div>
                        </div>
                    </li>


                    <li className="list-group-item ">
                        <div href="/member" className='text-decoration-none text-black'>
                            <div className='row '>
                                <div className='border p-3 col-1 d-flex align-items-center px-2 m-0 gap-3 ' >
                                    <small className='w-100 text-center'>
                                        BOQ-02</small>
                                </div>

                                <div className='border p-3 col-2 d-flex align-items-center px-2 m-0 gap-3 ' >
                                    <small className='w-100 text-center'>
                                        Test Cement</small>
                                </div>
                                <div className=' border p-3 col-1 d-flex align-items-center px-2 m-0 gap-3 ' >
                                    <small className='w-100 text-center'>
                                        -------------------</small>
                                </div>
                                <div className='border p-3 col-1 d-flex align-items-center px-2 m-0 gap-3 ' >
                                    <small className='w-100 text-center'>
                                        2.00</small>
                                </div>
                                <div className='border p-3 col-2 d-flex align-items-center px-2 m-0 gap-3 ' >
                                    <small className='w-100 text-center'>
                                        nos</small>
                                </div>
                                <div className='border p-3 col-2 d-flex align-items-center px-2 m-0 gap-3 ' >
                                    <small className='w-100 text-center'>
                                        12</small>
                                </div>
                                <div className='border p-3 col-1   text-center  d-flex align-items-center px-2 m-0 gap-3 ' >
                                    <small className='w-100 text-center'>
                                    ₹00.00</small>
                                </div>
                                <div className='border p-3 col-1   text-center  d-flex align-items-center px-2 m-0 gap-3 ' >
                                    <small className='w-100 text-center'>
                                    ₹00.00</small>
                                </div>
                                <div className='border p-3 col-1   text-center  d-flex align-items-center px-2 m-0 gap-3 ' >
                                    <small className='w-100 text-center'>
                                    ₹00.00</small>
                                </div>
                            </div>
                        </div>
                    </li>


                    <li className="list-group-item ">
                        <div href="/member" className='text-decoration-none text-black'>
                            <div className='row '>
                                <div className='border p-3 col-1 d-flex align-items-center px-2 m-0 gap-3 ' >
                                    <small className='w-100 text-center'>
                                        BOQ-03</small>
                                </div>

                                <div className='border p-3 col-2 d-flex align-items-center px-2 m-0 gap-3 ' >
                                    <small className='w-100 text-center'>
                                        Sand</small>
                                </div>
                                <div className=' border p-3 col-1 d-flex align-items-center px-2 m-0 gap-3 ' >
                                    <small className='w-100 text-center'>
                                    -------------------</small>
                                </div>
                                <div className='border p-3 col-1 d-flex align-items-center px-2 m-0 gap-3 ' >
                                    <small className='w-100 text-center'>
                                        2.00</small>
                                </div>
                                <div className='border p-3 col-2 d-flex align-items-center px-2 m-0 gap-3 ' >
                                    <small className='w-100 text-center'>
                                        nos</small>
                                </div>
                                <div className='border p-3 col-2 d-flex align-items-center px-2 m-0 gap-3 ' >
                                    <small className='w-100 text-center'>
                                        12</small>
                                </div>
                                <div className='border p-3 col-1   text-center  d-flex align-items-center px-2 m-0 gap-3 ' >
                                    <small className='w-100 text-center'>
                                    ₹00.00</small>
                                </div>
                                <div className='border p-3 col-1   text-center  d-flex align-items-center px-2 m-0 gap-3 ' >
                                    <small className='w-100 text-center'>
                                    ₹00.00</small>
                                </div>
                                <div className='border p-3 col-1   text-center  d-flex align-items-center px-2 m-0 gap-3 ' >
                                    <small className='w-100 text-center'>
                                    ₹00.00</small>
                                </div>
                            </div>
                        </div>
                    </li>





                </ul>
            </div >
        </StocksLayout>
    )
}

export default boq
// import Addboq from '@/components/sites/boq/addboq'
// import boqcomponet from '@/components/sites/boq/boqcomponet'
// import StocksLayout from '@/layouts/StocksLayout'
// import Link from 'next/link'
// import React from 'react'
// import BackIcon from "@/components/utils/global/BackIcon";
// const boq = () => {
//     return (
//         <StocksLayout current="boq">
//             <div className='row bg-light-blue d-flex justify-content-end'>
//                 <span className='text-blue fw-bold p-2'><BackIcon/>BOQ </span>

//             </div>
//             <div className='row-sm d-flex justify-content-end gap-2 mt-4'>
//                 <div className='col-2 text-end '>
//                     <button type="button" className="border fw-bolder border-info border-2 text-info m-auto w-75 bg-white rounded px-0 py-1  " data-bs-toggle="modal" data-bs-target=".bd-example-modal-xl"><i className="bi bi-file-earmark-excel"></i> Export Excel</button>
//                 </div>
//                 <div className='col-2'>
//                     <button type="button" className="border-info fw-bolder border-2 text-info m-auto w-75 bg-white rounded border py-1  btn-primary" data-bs-toggle="modal" data-bs-target=".bd-example-modal-xl"><i className="bi bi-file-earmark-excel"></i> Update Excel</button>
//                 </div>

//             </div>
//             <div className='row-sm'>
//                 <ul className="mt-4 p-0 text-decoration-none list-style-none w-100  shadow-sm  m-auto small">
//                     <li className="list-group-item list-group-item  fw-bold bg-gray text-black">
//                         <div href="/member" className='text-decoration-none text-black'>
//                             <div className='row bg-light-gray'>
//                                 <div className='border bg-blue p-1 col-1 d-flex align-items-center px-2 m-0 gap-3 text-white' >
//                                     <small className='w-100 text-center'>
//                                         GRN-ID</small>
//                                 </div>

//                                 <div className='border p-3 col-2 d-flex align-items-center px-2 m-0 gap-3 ' >
//                                     <small className='w-100 text-center'>
//                                         Item Name</small>
//                                 </div>
//                                 <div className=' border p-3 col-2 d-flex align-items-center px-2 m-0 gap-3 ' >
//                                     <small className='w-100 text-center'>
//                                         Total Quantity</small>
//                                 </div>
//                                 <div className='border p-3 col-2 d-flex align-items-center px-2 m-0 gap-3 ' >
//                                     <small className='w-100 text-center'>
//                                         Vendor </small>
//                                 </div>
//                                 <div className='border p-3 col-2 d-flex align-items-center px-2 m-0 gap-3 ' >
//                                     <small className='w-100 text-center'>
//                                         Delivery Value</small>
//                                 </div>
//                                 <div className='border p-3 col-1 d-flex align-items-center px-2 m-0 gap-3 ' >
//                                     <small className='w-100 text-center'>
//                                         Deliverd ON</small>
//                                 </div>
//                                 <div className='border p-3 col-1   text-center  d-flex align-items-center px-2 m-0 gap-3 ' >
//                                     <small className='w-100 text-center'>
//                                         Upload Invoice</small>
//                                 </div>
//                                 <div className='border p-3 col-1   text-center  d-flex align-items-center px-2 m-0 gap-3 ' >
//                                     <small className='w-100 text-center'>
//                                         Edit</small>
//                                 </div>
//                             </div>
//                         </div>
//                     </li>


//                     {/* data of the table */}

//                     <li className="list-group-item ">
//                         <div href="/member" className='text-decoration-none text-black'>
//                             <div className='row '>
//                                 <div className='border p-3 col-1 d-flex align-items-center px-2 m-0 gap-3 ' >
//                                     <small className='w-100 text-center'>
//                                         GRN-03</small>
//                                 </div>

//                                 <div className='border p-3 col-2 d-flex align-items-center px-2 m-0 gap-3 ' >
//                                     <small className='w-100 text-center'>
//                                         Steel 12 mm</small>
//                                 </div>
//                                 <div className=' border p-3 col-2 d-flex align-items-center px-2 m-0 gap-3 ' >
//                                     <small className='w-100 text-center'>
//                                         10.00 ns</small>
//                                 </div>
//                                 <div className='border p-3 col-2 d-flex align-items-center px-2 m-0 gap-3 ' >
//                                     <small className='w-100 text-center'>
//                                         Vendor Name</small>
//                                 </div>
//                                 <div className='border p-3 col-2 d-flex align-items-center px-2 m-0 gap-3 ' >
//                                     <small className='w-100 text-center'>
//                                         000.00</small>
//                                 </div>
//                                 <div className='border p-3 col-1 d-flex align-items-center px-2 m-0 gap-3 ' >
//                                     <small className='w-100 text-center'>
//                                         10 feb 2024</small>
//                                 </div>
//                                 <div className='border p-3 col-1   text-center  d-flex align-items-center px-2 m-0 gap-3 ' >
//                                     <small className='w-100 text-center'>
//                                         Upload</small>
//                                 </div>
//                                 <div className='border p-3 col-1   text-center  d-flex align-items-center px-2 m-0 gap-3 ' >
//                                     <small className='w-100 text-center'>
//                                         <i className='bi bi-pencil'></i></small>
//                                 </div>
//                             </div>
//                         </div>
//                     </li>

//                     <li className="list-group-item ">
//                         <div href="/member" className='text-decoration-none text-black'>
//                             <div className='row '>
//                                 <div className='border p-3 col-1 d-flex align-items-center px-2 m-0 gap-3 ' >
//                                     <small className='w-100 text-center'>
//                                         GRN-03</small>
//                                 </div>

//                                 <div className='border p-3 col-2 d-flex align-items-center px-2 m-0 gap-3 ' >
//                                     <small className='w-100 text-center'>
//                                         Steel 12 mm</small>
//                                 </div>
//                                 <div className=' border p-3 col-2 d-flex align-items-center px-2 m-0 gap-3 ' >
//                                     <small className='w-100 text-center'>
//                                         10.00 ns</small>
//                                 </div>
//                                 <div className='border p-3 col-2 d-flex align-items-center px-2 m-0 gap-3 ' >
//                                     <small className='w-100 text-center'>
//                                         Vendor Name</small>
//                                 </div>
//                                 <div className='border p-3 col-2 d-flex align-items-center px-2 m-0 gap-3 ' >
//                                     <small className='w-100 text-center'>
//                                         000.00</small>
//                                 </div>
//                                 <div className='border p-3 col-1 d-flex align-items-center px-2 m-0 gap-3 ' >
//                                     <small className='w-100 text-center'>
//                                         10 feb 2024</small>
//                                 </div>
//                                 <div className='border p-3 col-1   text-center  d-flex align-items-center px-2 m-0 gap-3 ' >
//                                     <small className='w-100 text-center'>
//                                         Upload</small>
//                                 </div>
//                                 <div className='border p-3 col-1   text-center  d-flex align-items-center px-2 m-0 gap-3 ' >
//                                     <small className='w-100 text-center'>
//                                         <i className='bi bi-pencil'></i></small>
//                                 </div>
//                             </div>
//                         </div>
//                     </li>


//                 </ul>
//                 <Addboq/>
//             </div >

//         </StocksLayout>
//     )
// }

// export default boq