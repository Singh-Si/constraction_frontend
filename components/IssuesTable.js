// components/IssuesTable.js
import React from 'react';

const IssuesTable = () => {
  return (
    
    <div className='row-sm'>
      <ul className="mt-4 p-0 text-decoration-none list-style-none w-100 shadow-sm m-auto small">
        <li className="list-group-item fw-bold bg-gray text-black">
          <div className='text-decoration-none text-black'>
            <div className='row bg-light-gray'>
              <div className='border bg-blue p-1 col-1 d-flex align-items-center px-2 m-0 gap-3 text-white'>
                <small className='w-100 text-center'>S.No</small>
              </div>
              <div className='border bg-blue p-3 col-2 d-flex align-items-center px-2 m-0 gap-3 text-white'>
                <small className='w-100 text-center'>Issue Name</small>
              </div>
              <div className='border bg-blue p-3 col-2 d-flex align-items-center px-2 m-0 gap-3 text-white'>
                <small className='w-100 text-center'>Description</small>
              </div>
              <div className='border bg-blue p-3 col-1 d-flex align-items-center px-2 m-0 gap-3 text-white'>
                <small className='w-100 text-center'>Work Category</small>
              </div>
              <div className='border bg-blue p-3 col-1 d-flex align-items-center px-2 m-0 gap-3 text-white'>
                <small className='w-100 text-center'>Sites</small>
              </div>
              <div className='border bg-blue p-3 col-1 d-flex align-items-center px-2 m-0 gap-3 text-white'>
                <small className='w-100 text-center'>Status</small>
              </div>
              <div className='border bg-blue p-3 col-2 d-flex align-items-center px-2 m-0 gap-3 text-white'>
                <small className='w-100 text-center'>Created On</small>
              </div>
              <div className='border bg-blue p-3 col-2 d-flex align-items-center px-2 m-0 gap-3 text-white'>
                <small className='w-100 text-center'>Ended On</small>
              </div>
            </div>
          </div>
        </li>

        {/* Data rows */}
        <li className="list-group-item">
          <div className='text-decoration-none text-black'>
            <div className='row'>
              <div className='border p-3 col-1 d-flex align-items-center px-2 m-0 gap-3'>
                <small className='w-100 text-center'>1</small>
              </div>
              <div className='border p-3 col-2 d-flex align-items-center px-2 m-0 gap-3'>
                <small className='w-100 text-center'>Issue 1</small>
              </div>
              <div className='border p-3 col-2 d-flex align-items-center px-2 m-0 gap-3'>
                <small className='w-100 text-center'>Description of Issue 1</small>
              </div>
              <div className='border p-3 col-1 d-flex align-items-center px-2 m-0 gap-3'>
                <small className='w-100 text-center'>Category 1</small>
              </div>
              <div className='border p-3 col-1 d-flex align-items-center px-2 m-0 gap-3'>
                <small className='w-100 text-center'>Site 1</small>
              </div>
              <div className='border p-3 col-1 d-flex align-items-center px-2 m-0 gap-3'>
                <small className='w-100 text-center'>Open</small>
              </div>
              <div className='border p-3 col-2 d-flex align-items-center px-2 m-0 gap-3'>
                <small className='w-100 text-center'>2024-01-01</small>
              </div>
              <div className='border p-3 col-2 d-flex align-items-center px-2 m-0 gap-3'>
                <small className='w-100 text-center'>2024-01-10</small>
              </div>
            </div>
          </div>
        </li>

        <li className="list-group-item">
          <div className='text-decoration-none text-black'>
            <div className='row'>
              <div className='border p-3 col-1 d-flex align-items-center px-2 m-0 gap-3'>
                <small className='w-100 text-center'>2</small>
              </div>
              <div className='border p-3 col-2 d-flex align-items-center px-2 m-0 gap-3'>
                <small className='w-100 text-center'>Issue 2</small>
              </div>
              <div className='border p-3 col-2 d-flex align-items-center px-2 m-0 gap-3'>
                <small className='w-100 text-center'>Description of Issue 2</small>
              </div>
              <div className='border p-3 col-1 d-flex align-items-center px-2 m-0 gap-3'>
                <small className='w-100 text-center'>Category 2</small>
              </div>
              <div className='border p-3 col-1 d-flex align-items-center px-2 m-0 gap-3'>
                <small className='w-100 text-center'>Site 2</small>
              </div>
              <div className='border p-3 col-1 d-flex align-items-center px-2 m-0 gap-3'>
                <small className='w-100 text-center'>Closed</small>
              </div>
              <div className='border p-3 col-2 d-flex align-items-center px-2 m-0 gap-3'>
                <small className='w-100 text-center'>2024-01-05</small>
              </div>
              <div className='border p-3 col-2 d-flex align-items-center px-2 m-0 gap-3'>
                <small className='w-100 text-center'>2024-01-15</small>
              </div>
            </div>
          </div>
        </li>

        <li className="list-group-item">
          <div className='text-decoration-none text-black'>
            <div className='row'>
              <div className='border p-3 col-1 d-flex align-items-center px-2 m-0 gap-3'>
                <small className='w-100 text-center'>3</small>
              </div>
              <div className='border p-3 col-2 d-flex align-items-center px-2 m-0 gap-3'>
                <small className='w-100 text-center'>Issue 3</small>
              </div>
              <div className='border p-3 col-2 d-flex align-items-center px-2 m-0 gap-3'>
                <small className='w-100 text-center'>Description of Issue 3</small>
              </div>
              <div className='border p-3 col-1 d-flex align-items-center px-2 m-0 gap-3'>
                <small className='w-100 text-center'>Category 3</small>
              </div>
              <div className='border p-3 col-1 d-flex align-items-center px-2 m-0 gap-3'>
                <small className='w-100 text-center'>Site 3</small>
              </div>
              <div className='border p-3 col-1 d-flex align-items-center px-2 m-0 gap-3'>
                <small className='w-100 text-center'>In Progress</small>
              </div>
              <div className='border p-3 col-2 d-flex align-items-center px-2 m-0 gap-3'>
                <small className='w-100 text-center'>2024-01-10</small>
              </div>
              <div className='border p-3 col-2 d-flex align-items-center px-2 m-0 gap-3'>
                <small className='w-100 text-center'>2024-01-20</small>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default IssuesTable;
