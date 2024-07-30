import React, { useEffect, useLayoutEffect, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Image from "next/image";

const CreateSiteTransfer = () => {

  const onSubmit = () => {

  }
  return (
    <div>
      <div
        className="offcanvas offcanvas-end  bg-white"
        tabIndex="-1"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
        data-bs-backdrop="static"
        style={{ width: '35%' }}
      >



        <div className="offcanvas-body p-0">
          <Formik
            enableReinitialize
            // initialValues={initialValues}
            // validationSchema={createSiteValidation}
            onSubmit={onSubmit}
          >
            {({
              resetForm,
              handleBlur,
              handleChange,
              isSubmitting,
            }) => {

              return (
                <Form className=" d-flex flex-column">
                  <div className="offcanvas-header bg-light-blue mb-0">
                    <span className="offcanvas-title fw-bold text-blue" id="offcanvasRightLabel">
                      Material Transfer Details 1/3
                    </span>

                    <button
                      type="button"
                      className="btn-close me-0"
                      data-bs-dismiss="offcanvas"
                      aria-label="Close"
                    // onClick={resetForm}
                    >
                    </button>
                  </div>

                  <div className="d-flex gap-3 flex-column p-3">
                    <div className="row">

                      <div className="form-group col-6 ">
                        <div className="text-start w-100 mb-2">
                          <label htmlFor="exampleInputPassword1 ">
                            Select  Category
                          </label>
                          <span className="text-danger">*</span>
                        </div>
                        <select
                          type="text"
                          name="name"
                          className="form-control  border-info  "
                          placeholder="Enter Site Name"
                        // onBlur={handleBlur}
                        >
                          <option>Material</option>
                          <option>Equipment</option>
                        </select>

                        <ErrorMessage
                          name="name"
                          render={(msg) => (
                            <small style={{ color: "red" }}>{msg}</small>
                          )}
                        />
                      </div>

                      <div className="form-group col-6">
                        <div className="text-start w-100 mb-2">
                          <label htmlFor="exampleInputPassword1">
                            Site Transfer ID
                          </label>
                          <span className="text-danger">*</span>
                        </div>
                        <Field
                          type="text"
                          name="organizationName "
                          className="form-control"
                          placeholder="Site Transfer Id"
                        >

                        </Field>

                        <ErrorMessage
                          name="organizationName"
                          render={(msg) => (
                            <small style={{ color: "red" }}>{msg}</small>
                          )}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="form-group col-6 text-start">
                        <label htmlFor="exampleInputPassword1 ">
                          Enter Title<span className="text-danger">*</span>
                        </label>
                        <br />
                        <Field
                          type="text"
                          name="startDate"
                          id="inputdate"
                          className="form-control  border-info"
                          placeholder="Enter Title"

                        // min={CreateDate()}
                        />

                        <ErrorMessage
                          name="startDate"
                          render={(msg) => (
                            <small style={{ color: "red" }}>{msg}</small>
                          )}
                        />
                      </div>
                      <div className="form-group col-6 text-start">
                        <label htmlFor="exampleInputPassword1 ">
                          Transfer From<span className="text-danger">*</span>
                        </label>
                        <br />
                        <select
                          type="text"
                          name="startDate"
                          id="inputdate"
                          className="form-control  border-info"
                          placeholder="Transfer From"

                        // min={CreateDate()}
                        >
                          <option>Select Site</option>
                          <option>Option 1</option>
                          <option>Option 1</option>
                          <option>Option 1</option>
                          <option>Option 1</option>
                        </select>

                        <ErrorMessage
                          name="startDate"
                          render={(msg) => (
                            <small style={{ color: "red" }}>{msg}</small>
                          )}
                        />
                      </div>

                    </div>
                    <div className="row">
                      <div className="form-group col-6 text-start">
                        <label htmlFor="exampleInputPassword1 ">
                          Total Quantity<span className="text-danger">*</span>
                        </label>
                        <br />
                        <Field
                          type="text"
                          name="startDate"
                          id="inputdate"
                          className="form-control  border-info"
                          placeholder="00.00"

                        // min={CreateDate()}
                        />

                        <ErrorMessage
                          name="startDate"
                          render={(msg) => (
                            <small style={{ color: "red" }}>{msg}</small>
                          )}
                        />
                      </div>
                      <div className="form-group col-6 text-start">
                        <label htmlFor="exampleInputPassword1 ">
                          Sent Qunatity<span className="text-danger">*</span>
                        </label>
                        <br />
                        <Field
                          type="text"
                          name="startDate"
                          id="inputdate"
                          className="form-control  border-info"
                          placeholder="00.00"

                        // min={CreateDate()}
                        />

                        <ErrorMessage
                          name="startDate"
                          render={(msg) => (
                            <small style={{ color: "red" }}>{msg}</small>
                          )}
                        />
                      </div>

                    </div>
                    <div className="row">
                      <div className="form-group col-6 text-start">
                        <label htmlFor="exampleInputPassword1 ">
                          Sending By<span className="text-danger">*</span>
                        </label>
                        <br />
                        <Field
                          type="number"
                          name="startDate"
                          id="inputdate"
                          className="form-control  border-info"
                          placeholder="Sending By"

                        // min={CreateDate()}
                        />

                        <ErrorMessage
                          name="startDate"
                          render={(msg) => (
                            <small style={{ color: "red" }}>{msg}</small>
                          )}
                        />
                      </div>
                      <div className="form-group col-6 text-start">
                        <label htmlFor="exampleInputPassword1 ">
                          Send Date/Time<span className="text-danger">*</span>
                        </label>
                        <br />
                        <Field
                          type="date"
                          name="startDate"
                          id="inputdate"
                          className="form-control  border-info"
                          placeholder="00.00"

                        // min={CreateDate()}
                        />

                        <ErrorMessage
                          name="startDate"
                          render={(msg) => (
                            <small style={{ color: "red" }}>{msg}</small>
                          )}
                        />
                      </div>

                    </div>
                  </div>

                  <div className="text-start p-3 mt-5">
                    <button
                      type="submit"
                      className="text-white m-auto w-100 bg-info auth_btn"
                      data-bs-toggle="offcanvas" data-bs-target="#descoffcanvasRight" aria-controls="offcanvasRight"
                    >
                      Next

                    </button>
                    <br />
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>



      <div
        className="offcanvas offcanvas-end  bg-white"
        tabIndex="-1"
        id="descoffcanvasRight"
        aria-labelledby="offcanvasRightLabel"
        data-bs-backdrop="static"
        style={{ width: '35%' }}
      >



        <div className="offcanvas-body p-0">
          <Formik
            enableReinitialize
            // initialValues={initialValues}
            // validationSchema={createSiteValidation}
            onSubmit={onSubmit}
          >
            {({
              resetForm,
              handleBlur,
              handleChange,
              isSubmitting,
            }) => {

              return (
                <Form className=" d-flex flex-column">
                  <div className="offcanvas-header bg-light-blue mb-0">
                    <span className="offcanvas-title fw-bold text-blue" id="descoffcanvasRightLabel">
                      Site Receiveing Details 2/3
                    </span>

                    <button
                      type="button"
                      className="btn-close me-0"
                      data-bs-dismiss="offcanvas"
                      aria-label="Close"
                    // onClick={resetForm}
                    >
                    </button>
                  </div>

                  <div className="d-flex gap-3 flex-column p-3">
                    <div className="row">

                      <div className="form-group col-6 ">
                        <div className="text-start w-100 mb-2">
                          <label htmlFor="exampleInputPassword1 ">
                            Site Transfer ID
                          </label>
                          <span className="text-danger">*</span>
                        </div>
                        <Field
                          type="text"
                          name="name"
                          className="form-control  border-info  "
                          placeholder="Enter Site Name"
                        // onBlur={handleBlur}
                        />

                        <ErrorMessage
                          name="name"
                          render={(msg) => (
                            <small style={{ color: "red" }}>{msg}</small>
                          )}
                        />
                      </div>

                      <div className="form-group col-6">
                        <div className="text-start w-100 mb-2">
                          <label htmlFor="exampleInputPassword1">
                            Enter Title
                          </label>
                          <span className="text-danger">*</span>
                        </div>
                        <Field
                          type="text"
                          name="organizationName "
                          className="form-control"
                          placeholder="Transfer Title"
                        >

                        </Field>

                        <ErrorMessage
                          name="organizationName"
                          render={(msg) => (
                            <small style={{ color: "red" }}>{msg}</small>
                          )}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="form-group col-6 text-start">
                        <label htmlFor="exampleInputPassword1 ">
                          Transfer From<span className="text-danger">*</span>
                        </label>
                        <br />
                        <Field
                          type="text"
                          name="startDate"
                          id="inputdate"
                          className="form-control  border-info"
                          placeholder="PO ID"

                        // min={CreateDate()}
                        />

                        <ErrorMessage
                          name="startDate"
                          render={(msg) => (
                            <small style={{ color: "red" }}>{msg}</small>
                          )}
                        />
                      </div>
                      <div className="form-group col-6 text-start">
                        <label htmlFor="exampleInputPassword1 ">
                          Received Quantity<span className="text-danger">*</span>
                        </label>
                        <br />
                        <Field
                          type="text"
                          name="startDate"
                          id="inputdate"
                          className="form-control  border-info"
                          placeholder="00.00"

                        // min={CreateDate()}
                        />

                        <ErrorMessage
                          name="startDate"
                          render={(msg) => (
                            <small style={{ color: "red" }}>{msg}</small>
                          )}
                        />
                      </div>

                    </div>
                    <div className="row">
                      <div className="form-group col-6 text-start">
                        <label htmlFor="exampleInputPassword1 ">
                          Receiving By<span className="text-danger">*</span>
                        </label>
                        <br />
                        <Field
                          type="text"
                          name="startDate"
                          id="inputdate"
                          className="form-control  border-info"
                          placeholder="UOM"

                        // min={CreateDate()}
                        />

                        <ErrorMessage
                          name="startDate"
                          render={(msg) => (
                            <small style={{ color: "red" }}>{msg}</small>
                          )}
                        />
                      </div>
                      <div className="form-group col-6 text-start">
                        <label htmlFor="exampleInputPassword1 ">
                          Received Date/Time<span className="text-danger">*</span>
                        </label>
                        <br />
                        <Field
                          type="date"
                          name="startDate"
                          id="inputdate"
                          className="form-control  border-info"
                          placeholder="Vendor"

                        // min={CreateDate()}
                        />

                        <ErrorMessage
                          name="startDate"
                          render={(msg) => (
                            <small style={{ color: "red" }}>{msg}</small>
                          )}
                        />
                      </div>

                    </div>

                  </div>

                  <div className="text-start p-3 mt-5">
                    <button
                      type="submit"
                      className="text-white m-auto w-100 bg-info auth_btn"
                      data-bs-toggle="offcanvas" data-bs-target="#descuploadoffcanvasRight" aria-controls="offcanvasRight"
                    >
                      Description
                    </button>
                    <br />
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>




      <div
        className="offcanvas offcanvas-end  bg-white"
        tabIndex="-1"
        id="descuploadoffcanvasRight"
        aria-labelledby="offcanvasRightLabel"
        data-bs-backdrop="static"
        style={{ width: '35%' }}
      >



        <div className="offcanvas-body p-0">
          <Formik
            enableReinitialize
            // initialValues={initialValues}
            // validationSchema={createSiteValidation}
            onSubmit={onSubmit}
          >
            {({
              resetForm,
              handleBlur,
              handleChange,
              isSubmitting,
            }) => {

              return (
                <Form className=" d-flex flex-column">
                  <div className="offcanvas-header bg-light-blue mb-0">
                    <span className="offcanvas-title fw-bold text-blue" id="descoffcanvasRightLabel">
                      Description Details 3/3
                    </span>

                    <button
                      type="button"
                      className="btn-close me-0"
                      data-bs-dismiss="offcanvas"
                      aria-label="Close"
                    // onClick={resetForm}
                    >
                    </button>
                  </div>

                  <div className="d-flex gap-3 flex-column p-3">
                    <div className="row">

                      <div className="form-group col-12 ">
                        <div className="text-start w-100 mb-2">
                          <label htmlFor="exampleInputPassword1 ">
                            Damaged/Lost
                          </label>
                          <span className="text-danger">*</span>
                        </div>
                        <Field
                          type="textarea"
                          name="name"
                          className="form-control  border-info  "
                          placeholder="Enter Site Name"
                        // onBlur={handleBlur}
                        />

                        <ErrorMessage
                          name="name"
                          render={(msg) => (
                            <small style={{ color: "red" }}>{msg}</small>
                          )}
                        />
                      </div>

                      <div className="form-group col-12">
                        <div className="text-start w-100 mb-2">
                          <label htmlFor="exampleInputPassword1">
                            Item Description
                          </label>
                          <span className="text-danger">*</span>
                        </div>
                        <Field
                          type="text"
                          name="organizationName "
                          className="form-control"
                          placeholder="   Item Description"
                        >

                        </Field>

                        <ErrorMessage
                          name="organizationName"
                          render={(msg) => (
                            <small style={{ color: "red" }}>{msg}</small>
                          )}
                        />
                      </div>
                    </div>


                    <div className="col-4">
                      <div className="">
                        <span className="text-blue text-start fw-bold">Upload Item Photos</span>
                      </div>
                      <div className=" mt-2 ">

                        <div className="col-6 p-2 rounded bg-info text-center border border-info">
                          <Image src="/assets/images/upload.png" width={50} height={50} />
                        </div>
                      </div>

                      <input
                        type="file"
                        id="upload  Item Photos"
                        className="form-control d-none"
                      />
                    </div>
                  </div>

                  <div className="text-start p-3 mt-5 d-flex justify-content-between">
                    <div className="col-4">

                      <button
                        type="submit"
                        className="text-info m-auto w-100 bg-white border border-info border-2 rounded  p-2"
                        data-bs-toggle="offcanvas" data-bs-target="#descuploadoffcanvasRight" aria-controls="offcanvasRight"
                      >
                       <span className="fw-bolder">Skip Do it Later</span> 
                      </button>
                    </div>
                    <div className="col-4">

                      <button
                        type="submit"
                        className="text-white m-auto w-100 bg-info auth_btn"
                        data-bs-toggle="offcanvas" data-bs-target="#descuploadoffcanvasRight" aria-controls="offcanvasRight"
                      >
                     Save
                      </button>
                    </div>
                    <br />
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>



    </div>
  )
}

export default CreateSiteTransfer