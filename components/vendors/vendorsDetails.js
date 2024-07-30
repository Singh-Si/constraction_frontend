import { ErrorMessage, Field, Form, Formik } from "formik";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import EditVendordetails from "../utils/Modal/EditVendorDetails";
import EditFinancialdetails from "../utils/Modal/EditFinancialDetails";
import EditTermsAndCondition from "../utils/Modal/EdittermsandCondition";

const VendorsDetails = ({ vendorDetails }) => {
  const vendor = vendorDetails && vendorDetails[0];
  console.log(vendor, "VendorsDetailsVendorsDetailsVendorsDetails");
  const [editpersonalDetails, seteditpersonalDetails] = useState(null);
  const [editfinancialDetails, seteditfinancialDetails] = useState(null);
  const [edittermsDetails, setedittermsDetails] = useState(null);

  return (
    <>
      {vendor ? (
        <div
          className="col-12 p-0 overflow-y-scroll overflow-x-none"
          style={{ height: "80vh" }}
        >
          <ul className=" list-group shadow-sm m-auto ">
            <li className="list-group-item p-3 text-white  fw-bolder bg-blue">
              <div className="row-sm d-flex">
                <div className="col">{vendor?.vendor?.vendorName}</div>
                <button
                  type="button"
                  className=" bg-blue text-white rounded px-2 py-1"
                  data-bs-toggle="modal"
                  onClick={() => seteditpersonalDetails(vendor?.vendor)}
                  data-bs-target=".bd-edit-modal-xl"
                >
                  <small className="cursor-pointer">
                    <i className="bi bi-pencil-fill"></i>
                  </small>
                </button>
              </div>
            </li>

            {/* <li> */}
            <div className="row-sm p-4 ">
              <div className="col-12">
                <div className="tab-content">
                  <div
                    role="tabpanel"
                    id="react-aria2791842971-:r1a:-tabpane-1"
                    aria-labelledby="react-aria2791842971-:r1a:-tab-1"
                    className="fade tab-pane active show"
                  >
                    <div className="row" style={{ position: "relative" }}>
                      <div className="col">
                        <div className="row">
                          <div className="col-12">
                            <div className="mb-4">
                              <div className="col-6">
                                <label className="form-label">
                                  Vendor Name
                                </label>
                              </div>
                              <span className="form-control">
                                {vendor?.vendor?.vendorName}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-12">
                            <div className="mb-4">
                              <label className="form-label">
                                Business Address{" "}
                              </label>
                              {/* {isInputField ? */}
                              <span className="form-control">
                                {vendor?.vendor?.address}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-6">
                            <div className="mb-4">
                              <label className="form-label">Vendor level</label>
                              <span className="form-control">
                                {vendor?.vendor?.vendorLevel}
                              </span>
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="mb-4">
                              <label className="form-label">Vendor Type</label>

                              <span className="form-control">
                                {vendor?.vendor?.vendorType}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-6">
                            <div className="mb-4">
                              <label className="form-label">
                                Contact Person
                              </label>

                              <span className="form-control">
                                {vendor?.vendor?.contactPerson}
                              </span>
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="form-group">
                              <label className="form-label">Contact No.</label>
                              <span className="form-control">
                                {vendor?.vendor?.contactNo}
                              </span>
                            </div>
                          </div>

                          <div className="col-12">
                            <div>
                              <label className="form-label">Email ID</label>
                              <span className="form-control">
                                {vendor?.vendor?.vendorEmail}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* </li> */}
            <div className="row-sm ">
              <div className="row-sm ">
                <div className="bg-light-info p-3 fw-bold d-flex justify-content-between">
                  <span>Financial Details</span>
                  <button
                    type="button"
                    className=" bg-light-info text-white rounded px-2 py-1"
                    data-bs-toggle="modal"
                    onClick={() =>
                      seteditfinancialDetails(vendor?.finaicialdetails)
                    }
                    data-bs-target=".edit-finance-modal-xl"
                  >
                    <small className="cursor-pointer text-blue">
                      <i className="bi bi-pencil-fill"></i>
                    </small>
                  </button>
                </div>
                <div className="p-4 rounded-lg">
                  <div className="row">
                    <div className="col-4">
                      <div className="mb-4">
                        <label className="form-label">GST Treatment</label>

                        <div className="">
                          <span>
                            {vendor?.finaicialdetails
                              ? vendor?.finaicialdetails?.gstTreatment
                              : "none"}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="form-group">
                        <label className="form-label">GSTIN</label>
                        <div>
                          {" "}
                          <span>
                            {vendor?.finaicialdetails
                              ? vendor?.finaicialdetails?.gstIn
                              : "none"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="col-4">
                      <div>
                        <label className="form-label">Billing Address</label>
                        {/* {isInputField ?  */}
                        <div>
                          <span>
                            {vendor?.finaicialdetails
                              ? vendor?.finaicialdetails?.gstTreatment
                              : "none"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-4 rounded-lg">
                <ul className="p-0">
                  <li className="list-group-item p-2 text-white rounded-top fw-bolder bg-blue">
                    <div className="row">
                      <div className="col">Bank Name</div>
                      <div className="col">Account No.</div>
                      <div className="col">A/C Holder Name</div>
                      <div className="col">IFSC CODE</div>
                    </div>
                  </li>

                  <li className="list-group-item h-100vh shadow-none">
                    <div className="text-decoration-none text-dark-gray">
                      <div className="row gap-5 fw-bold p-2">
                        <div className="col d-flex align-items-center px-2 m-0 gap-3 ">
                          {vendor?.finaicialdetails
                            ? vendor?.finaicialdetails?.bankName
                            : "none"}
                        </div>
                        <div className="col d-flex align-items-center px-2 m-0 gap-3 ">
                          {" "}
                          {vendor?.finaicialdetails
                            ? vendor?.finaicialdetails?.accountNumber
                            : "none"}
                          {/* {vendor?.finaicialdetails?.accountNumber} */}
                        </div>
                        <div className="col d-flex align-items-center px-2 m-0 gap-3 ">
                          {" "}
                          {vendor?.finaicialdetails
                            ? vendor?.finaicialdetails?.accountHolder
                            : "none"}
                        </div>
                        <div className="col d-flex align-items-center px-2 m-0 gap-3 ">
                          {" "}
                          {vendor?.finaicialdetails
                            ? vendor?.finaicialdetails?.IFSCcode
                            : "none"}
                          {/* {vendor?.finaicialdetails?.IFSCcode} */}
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            {/* <div className="row-sm ">
            <div className="bg-light-info p-3 fw-bold d-flex justify-content-between">
              <span>Proof for Verification</span>
              <small>
                <i className="bi bi-pencil-fill"></i>
              </small>
            </div>
            <div className="p-4 rounded-lg d-flex gap-2">
              <span className="text-black bg-gray  p-3 rounded">File 1</span>
              <span className="text-black bg-gray  p-3 rounded">File 1</span>
              <span className="text-black bg-gray  p-3 rounded">File 1</span>
            </div>
          </div> */}

            <div className="row-sm ">
              <div className="bg-light-info p-3 fw-bold d-flex justify-content-between">
                <span>Terms and Condition</span>
                <button
                  type="button"
                  className=" bg-light-info text-blue rounded px-2 py-1"
                  data-bs-toggle="modal"
                  onClick={() => setedittermsDetails(vendor?.termsAndCondition)}
                  data-bs-target=".bd-edit-terms-modal-xl"
                >
                  <small className="cursor-pointer">
                    <i className="bi bi-pencil-fill"></i>
                  </small>
                </button>
              </div>
              <div className="p-4 rounded-lg">
                <div className="row ">
                  <label className="">Payment Terms :</label>
                  <br />
                  <small className="form-control">
                    {vendor?.termsAndCondition?.paymentTerms
                      ? vendor?.termsAndCondition?.paymentTerms
                      : "None"}
                  </small>
                </div>
                <div className="row mt-4">
                  <span className=" fw-bold">Return Policy : </span>
                  <br />
                  <small className="form-control">
                    {vendor?.termsAndCondition?.returnPolicy
                      ? vendor?.termsAndCondition?.returnPolicy
                      : "None  "}
                  </small>
                </div>

                {/* <ul>
                <li className="list-group-item p-2 text-white rounded-top  bg-blue">
                  <div className="row">
                    <div className="col">
                      <small>Team</small>{" "}
                    </div>
                    <div className="col">
                      <small>No of days</small>
                    </div>
                    <div className="col">
                      <small>Condition</small>
                    </div>
                  </div>
                </li>

                <li className="list-group-item h-100vh shadow-none">
                  <div className="text-decoration-none text-black">
                    <div className="row gap-5  p-2 border-bottom">
                      <div className="col d-flex align-items-center px-2 m-0 gap-3 ">
                        <small>none</small>
                      </div>
                      <div className="col d-flex align-items-center px-2 m-0 gap-3 ">
                        {" "}
                        <small> 20 Days</small>
                      </div>
                      <div className="col d-flex align-items-center px-2 m-0 gap-3 ">
                        {" "}
                        <small>XYZ</small>
                      </div>
                    </div>
                    <div className="row gap-5  p-2 ">
                      <div className="col d-flex align-items-center px-2 m-0 gap-3 ">
                        <small>Team Name 01</small>
                      </div>
                      <div className="col d-flex align-items-center px-2 m-0 gap-3 ">
                        {" "}
                        <small> 20 Days</small>
                      </div>
                      <div className="col d-flex align-items-center px-2 m-0 gap-3 ">
                        {" "}
                        <small>XYZ</small>
                      </div>
                    </div>
                  </div>
                </li>
              </ul> */}
              </div>
            </div>

            {/* <div className="row-sm ">
              <div className="bg-light-info p-3 fw-bold">
                Payment Invoices & Credits{" "}
              </div>

              <div className="row-sm  d-flex p-3 gap-5">
                <div className="col-4 border p-3">
                  <div>
                    <span className="fw-bold"> Vendor Standing Amount</span>
                    <br />
                    <small>123</small>
                  </div>
                </div>
                <div className="col-4 border p-3">
                  <div>
                    <span className="fw-bold"> Vendor Credit</span>
                    <br />
                    <small>123</small>
                  </div>
                </div>
              </div>
              <div className="p-4 rounded-lg">
                <button className="bg-light-blue  rounded p-2 text-dark-gray">
                  <i className="bi bi-box-arrow-in-down"></i> Upload
                </button>
              </div>
            </div> */}
          </ul>
        </div>
      ) : (
        <div className="text-center">
          <span>Click on Vender Name to Show Details. </span>
          <div>
            <Image src="" />
          </div>
        </div>
      )}

      <EditVendordetails vendorDetails={editpersonalDetails} vendorId={vendor?.vendor?._id}/>
      <EditFinancialdetails vendorDetails={editfinancialDetails} vendorId={vendor?.finaicialdetails?._id}/>
      <EditTermsAndCondition vendorDetails={edittermsDetails} vendorId={vendor?.termsAndCondition?._id}/>
    </>
  );
};

export default VendorsDetails;
