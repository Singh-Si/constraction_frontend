import { useState } from 'react';
import AddFloor from '@/components/utils/Modal/AddFloor';
import EditFloor from '@/components/utils/Modal/EditFloor';
import React from 'react';
import axios from 'axios';
import Link from 'next/link';
import nookies, { setCookie } from "nookies";

const SitePlan = ({ data }) => {
  const [formData, setFormData] = useState({});
  const [filterText, setFilterText] = useState('');
  const filteredItems = data && data?.filter(
    item => item && item?.name && item?.name.toLowerCase().indexOf(filterText.toLowerCase()) !== -1
  );

  const handleFloorId = (id) => {
    setCookie(null, "floorId", id, {
      maxAge: 24 * 60 * 60,
      path: '/',
    })
  }

  return (
    <>
      <div className="row">
        <div className="col-6 mb-3">
          <input className=" form-control" placeholder="Search Floor" onChange={(e) => { setFilterText(e.target.value) }} filtertext={filterText} />
        </div>

        <div className="col-6 text-end">
          <button className='btn bg-btn-bg text-white new-site-btn' type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">+ Floor</button>
        </div>
      </div>

      <div className='row d-flex justify-content-start gap-4'>
        {filteredItems && filteredItems?.map((floor) => {
          return (
            <div key={floor?._id} className="col-3">
              <div className='d-flex bg-light-gray-xl border rounded justify-content-between '>
                <Link onClick={() => handleFloorId(floor?._id)} href={{ pathname: `siteplan/${floor?._id}` }} className='text-decoration-none text-black '>
                  <div className='d-flex justify-content-start gap-4  cursor-pointer' >
                    <div className='bg-blue text-white fs-lg p-4 rounded-start'>{floor?.number}</div>
                    <div className='d-flex align-items-center fw-bold '><span
                      title={floor?.name}
                      className="overflow-hidden text-nowrap" style={{ maxWidth: "100%", width: "10vw", textOverflow: "ellipsis" }}>{floor?.name}</span></div>
                  </div>
                </Link>

                <div className='d-flex align-items-center gap-3 fw-bold cursor-pointer p-2'>
                  <button type='button' onClick={() => setFormData(prevFormData => ({ ...prevFormData, ...floor }))} className='text-white' data-bs-toggle="offcanvas" data-bs-target="#editoffcanvasRight" aria-controls="offcanvasRight">
                    <i className="bi bi-pencil-square text-info fs-5"></i>
                  </button>
                  <EditFloor formData={formData} />
                </div>
              </div>
            </div>
          )
        })}
        {!filteredItems?.length &&
          <div className='row d-flex justify-content-center align-content-center fw-bold fs-6' style={{ height: "50vh" }}>
            No Floor To Display
          </div>
        }
      </div>
      <AddFloor />
    </>
  )
}

export default SitePlan;

export async function getServerSideProps(context) {
  const { currentOrganizationId, token, siteId } = nookies.get(context);
  let data;
  try {
    if (siteId) {


      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/floors?organization=${currentOrganizationId}&site=${siteId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      data = response?.data?.floors;
    }
    return {
      props: {
        data: data || null
      }
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        data: null,
        error: 'Failed to fetch data'
      }
    };
  }
}