import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { vendorValidation } from "@/schemas/vendor/vendorValidation";

function EditVendordetails({ vendorDetails ,vendorId }) {
  const initialValues = {
    vendorName: vendorDetails?.vendorName || "",
    address: vendorDetails?.address || "",
    vendorLevel: vendorDetails?.vendorLevel || "",
    vendorType: vendorDetails?.vendorType || "",
    contactPerson: vendorDetails?.contactPerson || "",
    designation: vendorDetails?.designation || "",
    contactNo: vendorDetails?.contactNo || "",
    vendorEmail: vendorDetails?.vendorEmail || "",
  };

  const { currentOrganizationId, token } = parseCookies();
  const onSubmit = async (values) => {

    try {
      const res = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/vendor/edit/personalDetails?organization=${currentOrganizationId}&vendorId=${vendorId}`,
        values,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res?.data?.success) {
       
      
        toast.success("Vendor Details Updated Succesfully .", {
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
        className="modal fade bd-edit-modal-xl"
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
                Edit Vendor Details
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
                validationSchema={vendorValidation}
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
                            Vendor Name
                          </label>
                          <span className="text-danger">*</span>
                        </div>
                        <Field
                          type="text"
                          name="vendorName"
                          className="form-control "
                          placeholder="Enter Vendor Name"
                          // onBlur={handleBlur}
                        />

                        <ErrorMessage
                          name="vendorName"
                          render={(msg) => (
                            <small style={{ color: "red" }}>{msg}</small>
                          )}
                        />
                      </div>

                      <div className="form-group">
                        <div className="text-start w-100 mb-2">
                          <label htmlFor="exampleInputPassword1">
                            Business Address
                          </label>
                          <span className="text-danger">*</span>
                        </div>
                        <Field
                          type="text"
                          name="address"
                          className="form-control "
                          placeholder="Enter Business Address"
                          // value={currentOrganizationId}
                        />

                        <ErrorMessage
                          name="address"
                          render={(msg) => (
                            <small style={{ color: "red" }}>{msg}</small>
                          )}
                        />
                      </div>
                      <div className="row">
                        <div className="form-group col-6">
                          <label htmlFor="exampleInputPassword1 ">
                            Vendor Level
                          </label>
                          <br />
                          <Field
                            as="select"
                            name="vendorLevel"
                            id="inputdate"
                            className={`form-control form-select ${
                              errors.vendorType && touched.vendorType
                                ? "is-invalid"
                                : ""
                            }`}
                            placeholder="Enter vendor Type"
                            // min={endDateState}
                          >
                            <option value="None">Select vendor type</option>
                            <option value="Trader">Trader </option>
                            <option value="Dealor">Dealor </option>
                            <option value="Distributor">Distributor </option>
                            <option value="Brand Manufacture">
                              Brand Manufacture{" "}
                            </option>
                            <option value="Manufacture">
                              Contract Manufacture{" "}
                            </option>
                          </Field>
                        </div>
                        <div className="form-group col-6">
                          <label htmlFor="exampleInputPassword1 ">
                            Vendor Type
                          </label>
                          <br />
                          <Field
                            as="select"
                            name="vendorType"
                            id="inputdate"
                            className={`form-control form-select ${
                              errors.vendorType && touched.vendorType
                                ? "is-invalid"
                                : ""
                            }`}
                            placeholder="Enter vendor Type"
                            // min={endDateState}
                          >
                            <option value="None">Select vendor type</option>
                            <option value="Agency">Agency </option>
                            <option value="Labour">Labour </option>
                            <option value="Material">Material </option>
                            <option value="Professional">Professional </option>
                          </Field>
                        </div>
                      </div>
                      <div className="row">
                        <div className="form-group col-6">
                          <label htmlFor="exampleInputPassword1 ">
                            Contact Person Name
                            <span className="text-danger">*</span>
                          </label>
                          <br />
                          <Field
                            type="text"
                            name="contactPerson"
                            className="form-control  "
                            placeholder="Enter Contact Person"
                          />

                          <ErrorMessage
                            name="contactPerson"
                            render={(msg) => (
                              <small style={{ color: "red" }}>{msg}</small>
                            )}
                          />
                        </div>
                        <div className="form-group col-6">
                          <label htmlFor="exampleInputPassword1 ">
                            Designation
                          </label>
                          <br />
                          <Field
                            type="text"
                            name="designation"
                            className="form-control  "
                            placeholder="Enter Person Designation"
                            // min={minEndDate}
                          />

                          <ErrorMessage
                            name="designation"
                            render={(msg) => (
                              <small style={{ color: "red" }}>{msg}</small>
                            )}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="form-group col-6">
                          <label htmlFor="exampleInputPassword1 ">
                            Contact No.<span className="text-danger">*</span>
                          </label>
                          <br />
                          <Field
                            type="number"
                            name="contactNo"
                            id="inputdate"
                            className="form-control  "
                            placeholder="Enter Contact No."
                          />

                          <ErrorMessage
                            name="contactNo"
                            render={(msg) => (
                              <small style={{ color: "red" }}>{msg}</small>
                            )}
                          />
                        </div>
                        <div className="form-group col-6">
                          <label htmlFor="exampleInputPassword1 ">
                            Email Id<span className="text-danger">*</span>
                          </label>
                          <br />
                          <Field
                            type="email"
                            name="vendorEmail"
                            className="form-control"
                            placeholder="email"
                          />

                          <ErrorMessage
                            name="vendorEmail"
                            render={(msg) => (
                              <small style={{ color: "red" }}>{msg}</small>
                            )}
                          />
                        </div>
                      </div>

                      <div className="text-start w-50 m-auto mt-4">
                        <button
                          type="submit"
                          className="text-white m-auto w-100 bg-btn-bg auth_btn"                          
                          disabled={
                            !values.contactNo ||
                            !values.vendorName ||
                            !values.address ||
                            !values.contactPerson ||
                            !values.vendorEmail
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
                            "Add"
                          )}
                        </button>
                        <br />
                      </div>
                    </Form>
                  );
                }}
              </Formik>

              <div className="d-flex w-100 justify-content-between mt-4 align-items-center">
                {/* <div>
                  <button
                    type="button"
                    className="text-white bg-btn-bg btn"
                    onClick={onSubmit}
                    disabled={loading}
                  >
                    {!loading ? (
                      "Invite"
                    ) : (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          aria-hidden="true"
                        ></span>
                        <span role="status">Loading...</span>
                      </>
                    )}
                  </button>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditVendordetails;
