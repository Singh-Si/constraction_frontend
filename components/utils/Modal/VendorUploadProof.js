import React, { useEffect, useLayoutEffect, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import AddFinancialDetails from "./AddVendorFinancial";
import axios from "axios";
import { parseCookies } from "nookies";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { fetchVendordata } from "@/store/vendor/getvendor";
import BackButton from '../global/BackButton';

const AddVendorUploadProof = ({ personalDetails, finaicialdetails }) => {
  const initialvalues = {
    returnPolicy: "",
    paymentTerms: "",
  };
  const { token, currentOrganizationId } = parseCookies();
  const dispatch = useDispatch();
  const [addFinancialDetailsstatus, setaddFinancialDetailsstatus] = useState(false);
  const onSubmit = async (values) => {
    const data = { ...values, organization: currentOrganizationId };
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/vendor/adddetails?organization=${currentOrganizationId}`,
        personalDetails,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res?.data?.success) {
        const rootvendorId = res?.data?.data?.rootVendorDetails?._id;
        try {
          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/vendor/addfinancial?organization=${currentOrganizationId}&rootVendorDetails=${rootvendorId}`,
            finaicialdetails,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
         
          if (res?.data?.success) {
            
          }
        } catch (error) {
          console.log(error);
        }
        try {
          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/vendor/addtermsandcondition?organization=${currentOrganizationId}&rootVendorDetails=${rootvendorId}`,
            data,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
         
          if (res?.data?.success) {
            
            toast.success("Vendor Details Added  Successfully .", {
              position: "top-center",
            });
            dispatch(fetchVendordata());

          
            setShowModal(true); // Show modal after successful submission
          }
        } catch (error) {
          console.log(error);
        }
       
        dispatch(fetchVendordata());
      }
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div>
      <ToastContainer />

      <div
        className="offcanvas offcanvas-end w-50 bg-white"
        tabIndex="-1"
        id="termsandcondition"
        aria-labelledby="offcanvasRightLabel"
      >
        <div className="offcanvas-header bg-light-blue mb-0">

          <h5 className="offcanvas-title" id="offcanvasRightLabel">
          <BackButton id="offfinancialcanvasRight" />Terms and Condition
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
            initialValues={initialvalues}
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
                        Return and Cancellation Policy
                      </label>
                      {/* <span className="text-danger">*</span> */}
                    </div>
                    <Field
                      type="text"
                      name="returnPolicy"
                      className="form-control "
                      placeholder="Enter Return Policy"
                    // onBlur={handleBlur}
                    />

                    <ErrorMessage
                      name="returnPolicy"
                      render={(msg) => (
                        <small style={{ color: "red" }}>{msg}</small>
                      )}
                    />
                  </div>

                  <div className="form-group">
                    <div className="text-start w-100 mb-2">
                      <label htmlFor="exampleInputPassword1">
                        Payment Terms
                      </label>
                      {/* <span className="text-danger">*</span> */}
                    </div>
                    <Field
                      type="text"
                      name="paymentTerms"
                      className="form-control "
                      placeholder="Enter Payment Terms "
                    // value={currentOrganizationId}
                    />

                    <ErrorMessage
                      name="paymentTerms"
                      render={(msg) => (
                        <small style={{ color: "red" }}>{msg}</small>
                      )}
                    />
                  </div>

                  <div className="text-start w-100 m-auto mt-4 d-flex justify-content-between">


                    <button
                      type="submit"
                      className="text-white m-auto w-25 bg-btn-bg auth_btn"
                      data-bs-dismiss="offcanvas"
                      aria-label="Close"
                    >
                      Submit
                    </button>
                    <br />
                  </div>
                </Form>
              );
            }}
          </Formik>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default AddVendorUploadProof;

