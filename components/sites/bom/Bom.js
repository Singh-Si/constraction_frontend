import React from 'react';

const BomComponent = ({ material }) => {
    return (
        <div className='col p-0 overflow-scroll' style={{ height: '70vh' }}>
            <ul className="list-group shadow-sm m-auto">
                <div className='row-sm'>
                    <ul className="mt-4 p-0 text-decoration-none list-style-none w-100 shadow-sm m-auto small">
                        <li className="list-group-item fw-bold bg-gray text-black">
                            <div className='text-decoration-none text-black'>
                                <div className='row bg-light-gray'>
                                    <div className='border border-gray py-3 col-1 d-flex align-items-center px-2 m-0 gap-3'>
                                        <small className='w-100 text-center'>Sr No.</small>
                                    </div>
                                    <div className='border col-3 d-flex align-items-center px-2 m-0 gap-3'>
                                        <small className='w-100 text-center'>Material Name</small>
                                    </div>
                                    <div className='border col-3 d-flex align-items-center px-2 m-0 gap-3'>
                                        <small className='w-100 text-center'>Brand Name</small>
                                    </div>
                                    <div className='border col-2 text-center d-flex align-items-center px-2 m-0 gap-3'>
                                        <small className='w-100 text-center'>UOM</small>
                                    </div>
                                    <div className='border col-1 text-center d-flex align-items-center px-2 m-0 gap-3'>
                                        <small className='w-100 text-center'>In Stocks</small>
                                    </div>
                                    <div className='border col-2 text-center d-flex align-items-center px-2 m-0 gap-3'>
                                        <small className='w-100 text-center'>Unit Cost</small>
                                    </div>
                                </div>
                            </div>
                        </li>

                        {/* Render the clicked material details */}
                        {material && (
                            <li className="list-group-item">
                                <div className=' text-decoration-none text-black'>
                                    <div className='row'>
                                        <div className='border p-3 col-1 d-flex align-items-center px-2 m-0 gap-3'>
                                            <small className='w-100 text-center'>1</small>
                                        </div>
                                        <div className='border p-3 col-3 d-flex align-items-center px-2 m-0 gap-3'>
                                            <small className='w-100 text-center'>{material.materialName}</small>
                                        </div>
                                        <div className='border p-3 col-3 d-flex align-items-center px-2 m-0 gap-3'>
                                            <small className='w-100 text-center'>{material.brandName}</small>
                                        </div>
                                        <div className='border p-3 col-2 d-flex align-items-center px-2 m-0 gap-3'>
                                            <small className='w-100 text-center'>{material.uom}</small>
                                        </div>
                                        <div className='border p-3 col-1 d-flex align-items-center px-2 m-0 gap-3'>
                                            <small className='w-100 text-center'>{material.inStocks}</small>
                                        </div>
                                        <div className='border p-3 col-2 d-flex align-items-center px-2 m-0 gap-3'>
                                            <small className='w-100 text-center'>₹ {material.unitCost}</small>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        )}

                        {/* Display message if no material is clicked */}
                        {!material && (
                            <li className="list-group-item">
                                <div className='text-decoration-none text-black'>
                                    <div className='row'>
                                        <div className='p-3 col-12 d-flex align-items-center justify-content-center'>
                                            <small>No material selected.</small>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        )}
                    </ul>
                </div>
            </ul>
        </div>
    );
}

export default BomComponent;
