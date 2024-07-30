import React from 'react'

const SiteTransferCompo = () => {

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
};

const handleImageClick = () => {
  document.getElementById('fileInput').click();
};

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

        <div className='row-sm mt-5'>
          <div className='col-11 m-auto border p-0  rounded'>
            <div className='bg-blue w-100 rounded-top p-2'>
              <small className='text-white' >Site Transfer Details</small>
            </div>
            <div className='p-3 d-flex justify-content-between'>
              <div>
                <span className='text-blue fw-bold'> ST ID</span><br />
                <small className='text-black'> ST:03</small>
              </div>
              <div>
                <span className='text-blue fw-bold'>Category</span><br />
                <small className='text-black'> Material</small>
              </div>
              <div>
                <span className='text-blue fw-bold'>Title</span><br />
                <small className='text-black'>Steel Bar 12 mm</small>
              </div>
              <div>
                <span className='text-blue fw-bold'>Transfer From</span><br />
                <small className='text-black'>Site-001</small>
              </div>
              <div>
                <span className='text-blue fw-bold'>Total Qunatity </span><br />
                <small className='text-black'>00.00</small>
              </div>
              <div>
                <span className='text-blue fw-bold'>Set Qunatity</span><br />
                <small className='text-black'>00.000</small>
              </div>
              <div>
                <span className='text-blue fw-bold'>Set By</span><br />
                <small className='text-black'>Mr. XYZ</small>
              </div>
              <div>
                <span className='text-blue fw-bold'>Send Date & Time</span><br />
                <small className='text-black'>10 Feb 2024, 04:05 PM</small>
              </div>
            </div>
          </div>

        </div>

        <div className='row-sm mt-5'>
          <div className='col-11 m-auto border p-0  rounded'>
            <div className='bg-blue w-100 rounded-top p-2'>
              <small className='text-white' >Receiving Transfer Details</small>
            </div>
            <div className='p-3 d-flex justify-content-between'>
              <div>
                <small className='text-blue fw-bold'>ST ID</small><br />
                <small className='text-black'>ST :03</small>
              </div>
              <div>
                <small className='text-blue fw-bold'>Category</small><br />
                <small className='text-black'>Material</small>
              </div>
              <div>
                <small className='text-blue fw-bold'>Total Cost</small><br />
                <small className='text-black'>00.00</small>
              </div>
              <div>
                <small className='text-blue fw-bold'>Unit Cost</small><br />
                <small className='text-black'> 10286</small>
              </div>
            </div>
          </div>

        </div>

        <div className='row-sm mt-5'>
          <div className='col-11 m-auto border p-0  rounded'>
            <div className='bg-blue w-100 rounded-top p-2'>
              <small className='text-white' >Damaged/Lost</small>
            </div>

            <div className='mt-5'>
              <small className=' px-4 fw-bold'>Item Description</small>

            </div>

          </div>
        </div>

        <div className='row-sm mt-5'>
          <div className='col-11 m-auto border p-0  rounded'>
            <div className='bg-blue w-100 rounded-top p-2'>
              <small className='text-white' >Item Description</small>
            </div>

            <div className='mt-5 '>
              <small className=' px-4 fw-bold'>Item Description</small>

            </div>

          </div>
        </div>

        <div className='row-sm mt-5'>
          <div className='col-11 m-auto border p-0  rounded'>
            <div className='bg-blue w-100 rounded-top p-2'>
              <small className='text-white' >Upload Item related Image & Document</small>
            </div>

            <div className='mt-5 p-5'>

              <input
                type='file'
                id='fileInput'
                className='form-control'
                onChange={handleFileChange}
              />

            </div>

          </div>
        </div>




      </ul>
    </div>

  )
}

export default SiteTransferCompo