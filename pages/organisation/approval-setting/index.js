import AddApprover from '@/components/utils/Modal/AddApprover'
import React, { useState } from 'react'

const Approvalsetting = () => {

  const [modal ,setModal] = useState(false)
  const handleOpen = ()=>{
    setModal(true)
  }
  const closeModal = ()=>{
    setModal(false)
  }
  
  return (
    <div>


      <div className='row d-flex justify-content-between'>
        <div className='col-6'>
          <div className='d-flex gap-5'>
            <div className='w-100 bg-blue rounded-5 px-3 py-2'>
              <span className=' w-100  text-white '>Money Transfer Approval</span>

              <br />
            </div>
            <div>
              <span className='text-info fw-bold cursor-pointer' onClick={()=>handleOpen()}> +AddApprover</span>
            </div>
          </div>
          <span>To verify the money transfer for material, work etc.</span>

        </div>
        <div className='col-5 '>
          <small className='text-dark-gray fw-bold'>Assign Three Member only</small>
          <div className='border p-3'>

            <small className='forrm-control border border-2 bg-gray p-1'>Name-01</small>
          </div>
        </div>

      </div>
      <div className='row mt-5 d-flex justify-content-between'>
        <div className='col-6'>
          <div className='d-flex gap-5'>
            <div className='w-100 bg-blue rounded-5 px-3 py-2'>
              <span className=' w-100  text-white '>Minor money Transfer Approval</span>

              <br />
            </div>
            <div>
              <span className='text-info fw-bold cursor-pointer' onClick={()=>handleOpen()}>+AddApprover</span>
            </div>
          </div>
          <span>To small payments, purchases, and reimbursements..</span>
          <div className='mt-3 d-flex gap-3'>
            <small className=' p-2 border disabled'> Min Amount -₹ 00.000/</small>
            <small className='p-2 border border-info rounded-3'>Set Amount</small>
          </div>

        </div>
        <div className='col-5 '>
          <small className='text-dark-gray fw-bold ' >Assign Three Member only</small>
          <div className='border p-3'>

            <small className='forrm-control border border-2 bg-gray p-1'>Name-01</small>
          </div>
        </div>

      </div>
      <div className='row mt-5 d-flex justify-content-between'>
        <div className='col-6'>
          <div className='d-flex gap-5'>
            <div className='w-100 bg-blue rounded-5 px-3 py-2'>
              <span className=' w-100  text-white '>GRN Payment Approval</span>

              <br />
            </div>
            <div>
              <span className='text-info fw-bold cursor-pointer ' onClick={()=>handleOpen()}> +AddApprover</span>
            </div>
          </div>
          <span>To Verify the order received with good notes by GRN photos.</span>

        </div>
        <div className='col-5 '>
          <small className='text-dark-gray fw-bold'>Assign Three Member only</small>
          <div className='border p-3'>

            <small className='forrm-control border border-2 bg-gray p-1'>Name-01</small>
          </div>
        </div>

      </div>
      <AddApprover showModal  ={modal} closeModal={closeModal}/>
    </div>
  )
}

export default Approvalsetting