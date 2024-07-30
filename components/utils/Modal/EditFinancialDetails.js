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

function EditFinancialdetails({ vendorDetails ,vendorId}) {

    
  const initialValues = {
    gstTreatment: vendorDetails?.gstTreatment || "",
    gstIn: vendorDetails?.gstIn || "",
    pan: vendorDetails?.pan || "",
    bankName: vendorDetails?.bankName || "",
    accountHolder: vendorDetails?.accountHolder || "",
    accountNumber: vendorDetails?.accountNumber || "",
    IFSCcode: vendorDetails?.IFSCcode || "",
  };

  const { currentOrganizationId, token } = parseCookies();

  const onSubmit = async (values) => {
    try {
      const res = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/vendor/edit/financialDetails?organization=${currentOrganizationId}&vendorId=${vendorId}`,
        values,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res?.data?.success) {
        toast.success("Financial  Details Updated Succesfully .", {
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
        className="modal fade edit-finance-modal-xl"
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
                Vendor Financial Details
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
                  console.log(values, "valuessssssssssssssss");
                  console.log(errors, "errors");
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
                          <option value="Unregistered Business">
                            Unregistered Business{" "}
                          </option>
                          <option value="Overseas">Overseas </option>
                          <option value="Special Economic Zone">
                            Special Economic Zone
                          </option>
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
                        {values?.gstTreatment !== "Unregistered Business" && (
                          <div className="form-group col-6">
                            <div className="text-start w-100">
                              <label htmlFor="exampleInputPassword1">
                                GSTIN
                              </label>
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
                          </div>
                        )}

                        <div className="form-group col-6">
                          <label htmlFor="exampleInputPassword1 ">
                            PAN<span className="text-danger">*</span>
                          </label>

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
                          <label htmlFor="exampleInputPassword1 ">
                            Bank Name
                          </label>

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
                            Account Holder
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
                            type="text"
                            name="accountNumber"
                            id="inputdate"
                            className="form-control  "
                            placeholder="Account Number"
                          />
                        </div>
                        <div className="form-group col-6">
                          <label htmlFor="exampleInputPassword1 ">
                            IFSC Code
                          </label>
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

                      <div className="text-start w-50 m-auto mt-4">
                        <button
                          type="submit"
                          className="text-white m-auto w-100 bg-btn-bg auth_btn"
                          data-bs-toggle="offcanvas"
                        
                          disabled={
                            !values.gstTreatment ||
                            (values?.gstTreatment !== "Unregistered Business" &&
                              !values.gstIn) ||
                            !values.pan
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

export default EditFinancialdetails;
