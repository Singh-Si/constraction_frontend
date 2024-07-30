import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import { ErrorMessage, Field, Form, Formik } from "formik";
import {
  financeDetailValidation,
  vendorValidation,
} from "@/schemas/vendor/vendorValidation";

function EditTermsAndCondition({ vendorDetails ,vendorId}) {
  const initialvalues = {
    returnPolicy: vendorDetails?.returnPolicy || "",
    paymentTerms: vendorDetails?.paymentTerms || "",
  };

  const { currentOrganizationId, token } = parseCookies();

  const onSubmit = async (values) => {
    try {
      const res = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/vendor/edit/termsAndCondition?organization=${currentOrganizationId}&vendorId=${vendorId}`,
        values,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res?.data?.success) {
        toast.success("Terms and  Details Updated Succesfully .", {
          position: "top-center",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div
        className="modal fade bd-edit-terms-modal-xl"
        tabIndex="-1"
        id="editVendorModal"
        role="dialog"
        aria-labelledby="inviteMemberModal"
        aria-hidden="true"
        data-bs-backdrop="static"
      >
        <div className="modal-dialog modal-lg w-100 h-auto" role="document">
          <div className="modal-content w-100 h-auto">
            <div className="modal-header w-100 h-auto">
              <h5 className="modal-title h4" id="myExtraLargeModalLabel">
                Vendor Terms  Details
              </h5>
              <button
                type="button"
                id="close_invite_modal"
                className="btn-close me-0"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="w-100 bg-none">
              <Formik
                enableReinitialize
                initialValues={initialvalues}
                // validationSchema={createSiteValidation}
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
                          <span className="text-danger">*</span>
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
                          <span className="text-danger">*</span>
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
                        >
                          Submit
                        </button>
                        <br />
                      </div>
                    </Form>
                  );
                }}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditTermsAndCondition;
