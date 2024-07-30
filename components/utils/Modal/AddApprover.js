import Image from 'next/image'
import React from 'react'

const AddApprover = ({ showModal, closeModal} ) => {

  return (
    <div>
        {showModal &&
                <div className="modal-backdrop fade-in-animation" data-bs-backdrop="true">
                    <div className="modal-dialog slide-in-from-bottom h-auto">
                        <div className="modal-content fade-in-animation p-0 h-none justify-content-start">
                            <div className="w-100">
                                <div className='d-flex justify-content-between w-100 border-bottom modal-header bg-light-blue rounded-top'>
                                    <div className='fs-xxl text-blue p-3 fw-bold'>Add Approver</div>
                                    <span onClick={closeModal} className='cursor-pointer text-black p-3'>X</span>
                                </div>

                                <div className='w-100 modal-body text-info p-4'>
                                    <small className='text-blue fw-bold '>Select member for money transfer</small><br/>
                                    <input className='form-control mt-1'/>
                                    {/* <small>sync</small> */}
                                </div>
                                <div className='py-2 px-4 text-end'>
                                <button className='btn bg-btn-bg text-white'  type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">Save</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
    </div>
  )
}

export default AddApprover