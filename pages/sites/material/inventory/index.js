import MaterialLayout from '@/layouts/MaterialLayout';
import Link from 'next/link'
import { useRouter } from 'next/router'
import { parseCookies } from 'nookies'
import React from 'react';

const Inventory = () => {
    const columns = [
        { field: "name", header: "S.no" },
        { field: "slug", header: "Material Name" },
        { field: "slug", header: "Total Stocks" },
        { field: "slug", header: "In Stocks" },
        { field: "slug", header: "Used From Stocks" },
        { field: "slug", header: "Transfer Stocks" },
        { field: "slug", header: "Added Stocks" },
        { field: "slug", header: "Estimated Stocks" },
        { field: "slug", header: "Total Ordered Stocks" },
    ]
    
    return (
        <MaterialLayout current="inventory">
            <div className='row d-flex justify-content-end'>
                <div className='col-3 gap-2 d-flex  '>

                    <button type="button" className="border-info text-info m-auto w-75  bg-white rounded px-2 py-1 btn btn-primary" data-bs-toggle="modal" data-bs-target=".bd-example-modal-xl">+ Export Excel</button>
                    <button type="button" className="border-info text-white m-auto w-75 bg-btn-bg rounded px-2 py-1 btn btn-primary capitalize" data-bs-toggle="modal" data-bs-target=".bd-example-modal-xl">+ Add Material </button>
                </div>

            </div>
           
            <div className='row-sm'>
                <ul className="mt-4 p-0 text-decoration-none list-style-none w-100  shadow-sm  m-auto small">
                    <li className="list-group-item list-group-item  fw-bold bg-gray text-black">
                        <div href="/member" className='text-decoration-none text-black'>
                            <div className='row bg-light-gray'>
                                <div className='border border-gray py-3 col-1 d-flex align-items-center px-2 m-0 gap-3 ' >
                                    <small className='w-100 text-center'>
                                        Sr No.</small>
                                </div>

                                <div className='border  col-2 d-flex align-items-center px-2 m-0 gap-3 ' >
                                    <small className='w-100 text-center'>
                                        Material Name</small>
                                </div>
                                <div className=' border col-1 d-flex align-items-center px-2 m-0 gap-3 ' >
                                    <small className='w-100 text-center'>
                                        Total Stocks</small>
                                </div>
                                <div className='border  col-1 d-flex align-items-center px-2 m-0 gap-3 ' >
                                    <small className='w-100 text-center'>
                                        In Stocks </small>
                                </div>
                                <div className='border  col-2 d-flex align-items-center px-2 m-0 gap-3 ' >
                                    <small className='w-100 text-center'>
                                        Used From Stock</small>
                                </div>
                                <div className='border  col-2 d-flex align-items-center px-2 m-0 gap-3 ' >
                                    <small className='w-100 text-center'>
                                        Transfer Stock</small>
                                </div>
                                <div className='border  col-1   text-center  d-flex align-items-center px-2 m-0 gap-3 ' >
                                    <small className='w-100 text-center'>
                                        Added Stock </small>
                                </div>
                                <div className='border  col-1   text-center  d-flex align-items-center px-2 m-0 gap-3 ' >
                                    <small className='w-100 text-center'>
                                        Estimated Stock </small>
                                </div>
                                <div className='border  col-1   text-center  d-flex align-items-center px-2 m-0 gap-3 ' >
                                    <small className='w-100 text-center'>
                                        Total Order Stock </small>
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
                                        01</small>
                                </div>

                                <div className='border p-3 col-2 d-flex align-items-center px-2 m-0 gap-3 ' >
                                    <small className='w-100 text-center'>
                                        Marbles</small>
                                </div>
                                <div className=' border p-3 col-1 d-flex align-items-center px-2 m-0 gap-3 ' >
                                    <small className='w-100 text-center'>
                                        10 PC</small>
                                </div>
                                <div className='border p-3 col-1 d-flex align-items-center px-2 m-0 gap-3 ' >
                                    <small className='w-100 text-center'>
                                        10 PC</small>
                                </div>
                                <div className='border p-3 col-2 d-flex align-items-center px-2 m-0 gap-3 ' >
                                    <small className='w-100 text-center'>
                                        00 PC</small>
                                </div>
                                <div className='border p-3 col-2 d-flex align-items-center px-2 m-0 gap-3 ' >
                                    <small className='w-100 text-center'>
                                        08 PC</small>
                                </div>
                                <div className='border p-3 col-1   text-center  d-flex align-items-center px-2 m-0 gap-3 ' >
                                    <small className='w-100 text-center'>
                                        08 PC</small>
                                </div>
                                <div className='border p-3 col-1   text-center  d-flex align-items-center px-2 m-0 gap-3 ' >
                                    <small className='w-100 text-center'>
                                        08 PC</small>
                                </div>
                                <div className='border p-3 col-1   text-center  d-flex align-items-center px-2 m-0 gap-3 ' >
                                    <small className='w-100 text-center'>
                                        00 PC</small>
                                </div>
                            </div>
                        </div>
                    </li>


                    <li className="list-group-item ">
                        <div href="/member" className='text-decoration-none text-black'>
                            <div className='row '>
                                <div className='border p-3 col-1 d-flex align-items-center px-2 m-0 gap-3 ' >
                                    <small className='w-100 text-center'>
                                        01</small>
                                </div>

                                <div className='border p-3 col-2 d-flex align-items-center px-2 m-0 gap-3 ' >
                                    <small className='w-100 text-center'>
                                        Marbles</small>
                                </div>
                                <div className=' border p-3 col-1 d-flex align-items-center px-2 m-0 gap-3 ' >
                                    <small className='w-100 text-center'>
                                        10 PC</small>
                                </div>
                                <div className='border p-3 col-1 d-flex align-items-center px-2 m-0 gap-3 ' >
                                    <small className='w-100 text-center'>
                                        10 PC</small>
                                </div>
                                <div className='border p-3 col-2 d-flex align-items-center px-2 m-0 gap-3 ' >
                                    <small className='w-100 text-center'>
                                        00 PC</small>
                                </div>
                                <div className='border p-3 col-2 d-flex align-items-center px-2 m-0 gap-3 ' >
                                    <small className='w-100 text-center'>
                                        08 PC</small>
                                </div>
                                <div className='border p-3 col-1   text-center  d-flex align-items-center px-2 m-0 gap-3 ' >
                                    <small className='w-100 text-center'>
                                        08 PC</small>
                                </div>
                                <div className='border p-3 col-1   text-center  d-flex align-items-center px-2 m-0 gap-3 ' >
                                    <small className='w-100 text-center'>
                                        08 PC</small>
                                </div>
                                <div className='border p-3 col-1   text-center  d-flex align-items-center px-2 m-0 gap-3 ' >
                                    <small className='w-100 text-center'>
                                        00 PC</small>
                                </div>
                            </div>
                        </div>
                    </li>


                    <li className="list-group-item ">
                        <div href="/member" className='text-decoration-none text-black'>
                            <div className='row '>
                                <div className='border p-3 col-1 d-flex align-items-center px-2 m-0 gap-3 ' >
                                    <small className='w-100 text-center'>
                                        01</small>
                                </div>

                                <div className='border p-3 col-2 d-flex align-items-center px-2 m-0 gap-3 ' >
                                    <small className='w-100 text-center'>
                                        Marbles</small>
                                </div>
                                <div className=' border p-3 col-1 d-flex align-items-center px-2 m-0 gap-3 ' >
                                    <small className='w-100 text-center'>
                                        10 PC</small>
                                </div>
                                <div className='border p-3 col-1 d-flex align-items-center px-2 m-0 gap-3 ' >
                                    <small className='w-100 text-center'>
                                        10 PC</small>
                                </div>
                                <div className='border p-3 col-2 d-flex align-items-center px-2 m-0 gap-3 ' >
                                    <small className='w-100 text-center'>
                                        00 PC</small>
                                </div>
                                <div className='border p-3 col-2 d-flex align-items-center px-2 m-0 gap-3 ' >
                                    <small className='w-100 text-center'>
                                        08 PC</small>
                                </div>
                                <div className='border p-3 col-1   text-center  d-flex align-items-center px-2 m-0 gap-3 ' >
                                    <small className='w-100 text-center'>
                                        08 PC</small>
                                </div>
                                <div className='border p-3 col-1   text-center  d-flex align-items-center px-2 m-0 gap-3 ' >
                                    <small className='w-100 text-center'>
                                        08 PC</small>
                                </div>
                                <div className='border p-3 col-1   text-center  d-flex align-items-center px-2 m-0 gap-3 ' >
                                    <small className='w-100 text-center'>
                                        00 PC</small>
                                </div>
                            </div>
                        </div>
                    </li>





                </ul>
            </div >

        </MaterialLayout>
    )
}

export default Inventory
