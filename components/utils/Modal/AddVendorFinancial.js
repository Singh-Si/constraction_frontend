import React, { useEffect, useLayoutEffect, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import AddVendorUploadProof from "./VendorUploadProof";
import axios from "axios";
import { financeDetailValidation } from "@/schemas/vendor/vendorValidation";
import { parseCookies } from "nookies";
import BackButton from '../global/BackButton';
const AddFinancialDetails = ({ personalDetails}) => {
  
  const [financialDetails , setFinancialDetails] = useState(null)
  const initialValues = {
    gstTreatment: "",
    gstIn: "",
    pan: "",
    bankName: "",
    accountHolder: "",
    accountNumber: "",
    IFSCcode: "",
  };

  const { currentOrganizationId, token } = parseCookies();

  const onSubmit = async (values) => {
    console.log(values, "FinancialDetails");
    const data ={...values,organization :currentOrganizationId}
    setFinancialDetails(data);
    
  };
  return (
    <div>
            

      <div
        className="offcanvas offcanvas-end w-50 bg-white"
        id="offfinancialcanvasRight"
        aria-labelledby="offcanvasRightLabel"
      >

        <div className="offcanvas-header bg-light-blue mb-0">
          <h5 className="offcanvas-title" id="offcanvasRightLabel">
          <BackButton id="offcanvasRight" />Add Financial Details
          </h5>

          <button
            type="button"
            className="btn-close me-0"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body p-3">
          <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={financeDetailValidation}
            onSubmit={onSubmit}
          >
            {({
              values,
              setFieldValue,
              errors,
              handleBlur,
              handleChange,
              dirty,
              isValid,
              resetForm,
              isSubmitting,
            }) => {
             
              return (
                <Form className=" d-flex flex-column gap-4 m-auto p-2">
                  <div className="form-group ">
                    <div className="text-start w-100 mb-2">
                      <label htmlFor="exampleInputPassword1 ">
                        GST Treatment
                      </label>
                      <span className="text-danger">*</span>
                    </div>
                    <Field
                        as="select"
                        name="gstTreatment"
                        className={`form-control form-select `}
                        placeholder="Enter vendor Type"
                        // min={endDateState}
                      >
                        <option value="None">Select GST Treatment</option>
                        <option value="Regular">Regular </option>
                        <option value="Composition">Composition </option>
                        <option value="Unregistered Business">Unregistered Business </option>
                        <option value="Overseas">Overseas </option>
                        <option value="Special Economic Zone">Special Economic Zone</option>
                        <option value="Deemed Export">Deemed Export</option>
                      </Field>

                    <ErrorMessage
                      name="gstTreatment"
                      render={(msg) => (
                        <small style={{ color: "red" }}>{msg}</small>
                      )}
                    />
                  </div>
                  <div className="row">
                    {<div className="form-group col-6">
                      <div className="text-start w-100">
                        <label htmlFor="exampleInputPassword1">GSTIN</label>
                        <span className="text-danger">*</span>
                      </div>
                      <Field
                        type="text"
                        name="gstIn"
                        className="form-control "
                        placeholder="Enter GST In "
                      />

                      <ErrorMessage
                        name="gstIn"
                        render={(msg) => (
                          <small style={{ color: "red" }}>{msg}</small>
                        )}
                      />
                    </div>}

                    <div className="form-group col-6">
                      <label htmlFor="exampleInputPassword1 ">PAN<span className="text-danger">*</span></label>
                      
                      <Field
                        type="text"
                        name="pan"
                        id="inputdate"
                        className="form-control  "
                        placeholder="Enter PAN Number"
                        // min={minEndDate}
                      />
                      <ErrorMessage
                        name="pan"
                        render={(msg) => (
                          <small style={{ color: "red" }}>{msg}</small>
                        )}
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="form-group col-6">
                      <label htmlFor="exampleInputPassword1 ">Bank Name</label>
                     
                      <Field
                        type="text"
                        name="bankName"
                        id="inputdate"
                        className="form-control  "
                        placeholder="Bank Name"
                        // min={minEndDate}
                      />
                    </div>
                    <div className="form-group col-6">
                      <label htmlFor="exampleInputPassword1 ">
                        Account Holder Name
                      </label>
                      <br />
                      <Field
                        type="text"
                        name="accountHolder"
                        id="inputdate"
                        className="form-control  "
                        placeholder="Account Holder"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group col-6">
                      <label htmlFor="exampleInputPassword1 ">
                        Account No.
                      </label>
                      <br />
                      <Field
                        type="number"
                        name="accountNumber"
                        id="inputdate"
                        className="form-control  "
                        placeholder="Account Number"
                      />
                    </div>
                    <div className="form-group col-6">
                      <label htmlFor="exampleInputPassword1 ">IFSC Code</label>
                      <br />
                      <Field
                        type="text"
                        name="IFSCcode"
                        id="inputdate"
                        className="form-control  "
                        placeholder="IFSC Code"
                        // min={endDateState}
                      />
                    </div>
                  </div>
                  {/* <div className="d-flex justify-content-between align-items-center w-50 m-auto mt-4">
            <button
                type="submit"
                className="text-white bg-btn-bg auth_btn"
               data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasRight"
            aria-controls="offcanvasRight"
            >
                Back
            </button>
            <button
                type="submit"
                className="text-white bg-btn-bg auth_btn"
                data-bs-toggle="offcanvas"
                data-bs-target="#termsandcondition"
                aria-controls="offfinancialcanvasRight"
                disabled={!values.gstTreatment || values?.gstTreatment !== "Unregistered Business" && !values.gstIn || !values.pan}
            >
                {isSubmitting ? (
                    <>
                        <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                        <span className="ms-2" role="status">Loading...</span>
                    </>
                ) : (
                    "Next"
                )}
                
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-narrow-right" width="34" height="34" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M5 12l14 0" />
                          <path d="M15 16l4 -4" />
                          <path d="M15 8l4 4" />
                        </svg>
                      </button>
        </div> */}
         <div className="text-start w-100 gap-3 m-auto d-flex justify-content-end" >
                    <div>
                      <button type="button" className="btn btn-danger" style={{ padding: "0 10px", height: "50px" }} onClick={resetForm}>Reset<svg style={{ paddingLeft: "10px" }} xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-refresh" width="34" height="34" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4" />
                        <path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4" />
                      </svg></button>
                    </div>

                    <div>
                      <button
                        type="submit"
                        className="text-white m-auto bg-btn-bg auth_btn"
                        style={{ padding: "0 10px", height: "50px" }}

                        data-bs-toggle="offcanvas"
                        data-bs-target="#termsandcondition"
                      aria-controls="offfinancialcanvasRight"
                        disabled={
                          !values.gstTreatment || values?.gstTreatment !== "Unregistered Business" && !values.gstIn || !values.pan
                        }
                      >
                        {isSubmitting ? (
                          <>
                            <span
                              className="spinner-border spinner-border-sm"
                              aria-hidden="true"
                            ></span>
                            <span className="ms-2" role="status">
                              Loading...
                            </span>
                          </>
                        ) : (
                          "Next"
                        )}
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-narrow-right" width="34" height="34" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M5 12l14 0" />
                          <path d="M15 16l4 -4" />
                          <path d="M15 8l4 4" />
                        </svg>
                      </button>
                    </div>
                    </div>
                  {/* <div className="text-start w-50 m-auto mt-4">
                    <button
                      type="submit"
                      className="text-white m-auto w-100 bg-btn-bg auth_btn"
                      data-bs-toggle="offcanvas"
                      // data-bs-target="#offAddVendorUploadProof"
                      data-bs-target="#termsandcondition"
                      aria-controls="offfinancialcanvasRight"
                      disabled={
                        !values.gstTreatment || values?.gstTreatment !== "Unregistered Business" && !values.gstIn || !values.pan 
                      }
                    >
                      {isSubmitting ? (
                        <>
                          <span
                            className="spinner-border spinner-border-sm"
                            aria-hidden="true"
                          ></span>
                          <span className="ms-2" role="status">
                            Loading...
                          </span>
                        </>
                      ) : (
                        "Add "
                      )}
                    </button>
                    <br />
                  </div> */}
                  
                </Form>
              );
            }}
          </Formik>
        
          {/* </form> */}
        </div>
      </div>

      <AddVendorUploadProof  personalDetails={personalDetails} finaicialdetails={financialDetails}/>
    </div>
  );
};

export default AddFinancialDetails;