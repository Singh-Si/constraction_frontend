import React, { useEffect, useLayoutEffect, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";

const EditProfile = () => {

    const onSubmit = () => {

    }
    const initialValues = {
        name: '',
        number: '',
        role: '',
        dailyHour: '',
        payment: '',
        skills: 'true',
        gender: 'true',
        profile: ''
    };
    return (
        <div
                className="offcanvas offcanvas-end  bg-white"
                tabIndex="-1"
                id="ediroffcanvasRight"
                aria-labelledby="offcanvasRightLabel"
                style={{ width: "35%" }}
               
            >

                <div className="offcanvas-body p-0">
                    <div className="offcanvas-header bg-light-blue mb-0">

                        <h5 className="offcanvas-title" id="editoffcanvasRightLabel">
                            Edit / Update Profile
                        </h5>

                        <button
                            type="button"
                            className="btn-close me-0"
                            data-bs-dismiss="offcanvas"
                            aria-label="Close"

                        >
                        </button>
                    </div>
                    

                    <div className="tab-content" id="myTabContent">
              
                        <div className="tab-pane fade show active" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabIndex="0">
                            <Formik
                                enableReinitialize
                                initialValues={initialValues}
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
                                        <>


                                            <Form className=" d-flex flex-column">

                                                <div className="d-flex gap-3 flex-column p-3">
                                                    <div className="form-group ">
                                                        <div className="text-start w-100 mb-2">
                                                            <label htmlFor="exampleInputPassword1 ">
                                                                Name
                                                            </label>
                                                            <span className="text-danger">*</span>
                                                        </div>
                                                        <Field
                                                            type="text"
                                                            name="name"
                                                            className="form-control  border-info  "
                                                            placeholder="Enter Labour Name"
                                                            onBlur={handleBlur}
                                                        />

                                                        <ErrorMessage
                                                            name="name"
                                                            render={(msg) => (
                                                                <small style={{ color: "red" }}>{msg}</small>
                                                            )}
                                                        />
                                                    </div>

                                                    <div className="form-group">
                                                        <div className="text-start w-100 mb-2">
                                                            <label htmlFor="exampleInputPassword1">
                                                                Contact Number
                                                            </label>
                                                            <span className="text-danger">*</span>
                                                        </div>
                                                        <Field
                                                            type="number"
                                                            name="number"
                                                            className="form-control   border-info "
                                                            placeholder="Contact Number"
                                                            maxLength={10}
                                                        // value={organizationName}

                                                        />

                                                        <ErrorMessage
                                                            name="number"
                                                            render={(msg) => (
                                                                <small style={{ color: "red" }}>{msg}</small>
                                                            )}
                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                        <div className="text-start w-100 mb-2">
                                                            <label htmlFor="exampleInputPassword1">
                                                                Labour Specific Role
                                                            </label>
                                                        </div>
                                                        <Field
                                                            type="text"
                                                            name="role"
                                                            className="form-control   border-info "
                                                            placeholder=" Labour Specific Role"
                                                        // value={organizationName}

                                                        />
                                                    </div>
                                                    <div className="row">
                                                        <div className="form-group col-6">
                                                            <label htmlFor="exampleInputPassword1 ">
                                                                Daily Hours<span className="text-danger">*</span>
                                                            </label>
                                                            <br />
                                                            <Field
                                                                type="number"
                                                                name="dailyHour"
                                                                id="inputdate"
                                                                className="form-control  border-info"
                                                                placeholder="Daily Hour"
                                                            // onChange={(e) => {
                                                            //     const newStartDate = e.target.value;
                                                            //     setMinEndDate(CreateEndDate(newStartDate));
                                                            //     handleChange(e);
                                                            // }}
                                                            // min={CreateDate()}
                                                          
                                                            />

                                                            <ErrorMessage
                                                                name="dailyHour"
                                                                render={(msg) => (
                                                                    <small style={{ color: "red" }}>{msg}</small>
                                                                )}
                                                            />
                                                        </div>
                                                        <div className="form-group col-6">
                                                            <label htmlFor="exampleInputPassword1 ">
                                                                Daily Payment<span className="text-danger">*</span>
                                                            </label>
                                                            <br />
                                                            <Field
                                                                type="payment"
                                                                name="payment"
                                                                id="inputdate"
                                                                className="form-control  border-info"
                                                                placeholder="Daily Payment"
                                                            // min={endDateState}
                                                            />

                                                            <ErrorMessage
                                                                name="payment"
                                                                render={(msg) => (
                                                                    <small style={{ color: "red" }}>{msg}</small>
                                                                )}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <small className="bg-gray p-1 fw-bold ">Type of Labours   </small>
                                                        <div className="col-4 mt-3">

                                                            <Field
                                                                type="radio"
                                                                name="skills"
                                                                value="true"
                                                            />
                                                            <small className="fw-bold">Skilled</small>
                                                        </div>
                                                        <div className="col-4 mt-3">

                                                            <Field
                                                                type="radio"
                                                                name="skills"
                                                                value="false"
                                                            />
                                                            <small className="fw-bold"  >Unskilled</small>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <small className="bg-gray p-1 fw-bold ">Gender   </small>
                                                        <div className="col-4 mt-3">

                                                            <Field
                                                                type="radio"
                                                                name="gender"
                                                                value="true"
                                                            />
                                                            <small className="fw-bold">Male</small>
                                                        </div>
                                                        <div className="col-4 mt-3">

                                                            <Field
                                                                type="radio"
                                                                name="gender"
                                                                value="false"
                                                            />
                                                            <small className="fw-bold"  >Female</small>
                                                        </div>
                                                    </div>

                                                    <div className="row">
                                                        <div className="col-6">

                                                            <Field
                                                                type='file'
                                                                name="profile"
                                                                className="form-control"
                                                            />
                                                        </div>
                                                        <div className="col-6">
                                                            <small className="fw-bold">Edit Profile Picture</small>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row-sm text-end">


                                                    <div className="col-4 text-center p-3 mt-5">
                                                        <button
                                                            type="submit"
                                                            className="text-white m-auto w-100 bg-btn-bg auth_btn"
                                                            data-bs-toggle="offcanvas" data-bs-target="#addoffcanvasRight" aria-controls="offcanvasRight"
                                                        >
                                                            {/* {isSubmitting ? (
                                                                <> */}
                                                            {/* <span
                            className="spinner-border spinner-border-sm"
                            data-bs-toggle="offcanvas" data-bs-target="#addoffcanvasRight" aria-controls="offcanvasRight"
                          ></span> */}
                                                            {/* <span className="ms-2" role="status">
                                                                        Loading...
                                                                    </span>
                                                                </>
                                                            ) : ( */}
                                                            Update
                                                            {/* )} */}
                                                        </button>
                                                        <br />
                                                    </div>
                                                </div>
                                            </Form>
                                        </>
                                    );
                                }}
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default EditProfile