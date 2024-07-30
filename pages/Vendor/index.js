import React, { useEffect, useState } from "react";
import Link from "next/link";
import VendorsDetails from "@/components/vendors/vendorsDetails";
import { useDispatch, useSelector } from "react-redux";
import { fetchVendordata } from "@/store/vendor/getvendor";
import axios from "axios";
import { parseCookies } from "nookies";
import Loader from "@/layouts/loader/Loader";
import AddVendors from "@/components/utils/Modal/AddVendors";
import Image from "next/image";
import BackButton from "@/components/utils/global/BackButton";
import BackIcon from "@/components/utils/global/BackIcon";
import SearchInput from "@/components/utils/SearchInput";

const Vendor = () => {
  const [getvendorDetails, setvendorDetails] = useState(null);
  const [active, setActive] = useState(null);
  const [filterText, setFilterText] = useState('');
  const dispatch = useDispatch();
  const { userData, status } = useSelector((store) => store?.vendorSlice);
  const vendorData = userData?.data;
  const firstRootVendor = vendorData && vendorData[0]?._id;
  
  const filteredVendors = vendorData?.filter(
    (vendor) =>
      vendor &&
      vendor?.vendor?.vendorName &&
      vendor?.vendor?.vendorName.toLowerCase().indexOf(filterText.toLowerCase()) !== -1
  );

  useEffect(() => {
    dispatch(fetchVendordata());
  }, [dispatch]);

  const handlevendorDetails = async (vendorId) => {
    setActive(vendorId);
    try {
      const { token, currentOrganizationId } = parseCookies();
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/vendor/getByOrganiztion`,
        {
          params: {
            organization: currentOrganizationId,
            rootvendorId: vendorId,
          },
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setvendorDetails(response?.data?.data);
      setActive(vendorId);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handlevendorDetails(firstRootVendor);
  }, [firstRootVendor]);

  return (
    <div>
      <div className="row">
        <div className="col-12 mb-3 bg-light-info text-blue fw-bolder p-2">
          <BackIcon />
          <span>Vendor</span>
        </div>
      </div>
      <div className="row">
        <div className="col-6 mb-3">
          <SearchInput 
            placeholder="Search vendor" 
            onChange={(e) => setFilterText(e.target.value)} 
            value={filterText} 
          />
        </div>
        <div className="col-6 text-end">
          <button
            className="btn bg-btn-bg text-white new-site-btn"
            style={{ boxShadow: "2px 2px 13px #8CBCD9" }}
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasRight"
            aria-controls="offcanvasRight"
          >
            + Vendor
          </button>
        </div>
      </div>

      {status !== "succeeded" ? (
        <Loader />
      ) : vendorData && vendorData?.length > 0 ? (
        <div className="row  d-flex flex-direction-column border-top border-blue mt-4 border-bottom-0 border-left-0">
          <div
            className="col-3 p-0  overflow-y-scroll overflow-x-none"
            style={{ height: "80vh" }}
          >
            <div className="nav flex-column nav-pills mb-3 mtngtabs mting">
              <div className="d-flex justify-content-between p-2 border-bottom border-2 bg-light-info">
                <small className="fw-bold ">All Vendors List</small>
              </div>
              {filteredVendors && filteredVendors?.map((vendor) => (
               
                    <Link 
                    key={vendor?._id}
                    data-bs-toggle="pill"
                    className={`text-decoration-none text-black p-3 border-bottom `}


                    onClick={() => handlevendorDetails(vendor?._id)} href={{ pathname: `/vendor/${vendor?._id}` }} >
                    {/* <div className='d-flex justify-content-start gap-4  cursor-pointer' > */}
           
            <div className="d-flex  justify-content-between">
                      <small className="fw-bold py-1">
                        {vendor?.vendor?.vendorName}
                      </small>
              <small className=" text-blue">
                        <i className="ti ti-chevron-right fs-4"></i>
                      </small>

                        </div>
                      {/* </div>
                    <div className='d-flex align-items-center gap-3 fw-bold cursor-pointer p-2'>
                      <button type='button' onClick={() => setFormData(prevFormData => ({ ...prevFormData, ...vendor }))} className='text-white' data-bs-toggle="offcanvas" data-bs-target="#editoffcanvasRight" aria-controls="offcanvasRight">
                        <i className="bi bi-pencil-square text-info fs-5"></i>
                      </button> 
                    </div> */}

</Link>
              ))}
            </div>
          </div>
          <div className="col-9 border border-blue border-bottom-0  border-left-0  border border-blue border-top-0 p-0">
            <VendorsDetails vendorDetails={getvendorDetails} />
          </div>
        </div>
      ) : (
        <div className="">
          <div className="d-flex justify-content-center flex-column align-items-center">
            <Image
              src="/assets/images/no-vendor.jpg"
              alt="No Vendor"
              className="w-25"
              width={350}
              height={250}
            />
            <span className="underline">No Vendor Found.</span>
            <span className="underline">Please Add Your Vendor.</span>
          </div>
        </div>
      )}
      <AddVendors />
    </div>
  );
};

export default Vendor;
