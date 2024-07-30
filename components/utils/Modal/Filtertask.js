import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react'

const AddTask = () => {
    return (
        <div>
            <div
                className="offcanvas offcanvas-end w-50 bg-white"
                tabIndex="-1"
                id="offcanvasRight"
                aria-labelledby="offcanvasRightLabel"
                data-bs-backdrop="static"
            >
                <div className="offcanvas-header bg-light-blue mb-0">
                    <h5 className="offcanvas-title" id="offcanvasRightLabel">
                        Task  Filters
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
                    // initialValues={initialValues}
                    // validationSchema={createSiteValidation}
                    // onSubmit={onSubmit}
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
                                                Work Category
                                            </label>
                                            <span className="text-danger">*</span>
                                        </div>
                                        <Field
                                            type="text"
                                            name="name"
                                            className="form-control"
                                            placeholder="Enter Site Name"
                                        />

                                        <ErrorMessage
                                            name="name"
                                            render={(msg) => (
                                                <small style={{ color: "red" }}>{msg}</small>
                                            )}
                                        />
                                    </div>

                                    <div className='mt-5'>
                                        <span className='fw-bold'>Filter By Date</span>
                                        <hr />
                                    </div>
                                    <div className="row">
                                        <div className="form-group col-6">
                                            <label htmlFor="exampleInputPassword1 ">
                                                Start Date<span className="text-danger">*</span>
                                            </label>
                                            <br />
                                            <Field
                                                type="date"
                                                name="startDate"
                                                id="inputdate"
                                                className="form-control  border-info"
                                                placeholder="dd/mm/yyyy"
                                            />

                                            <ErrorMessage
                                                name="startDate"
                                                render={(msg) => (
                                                    <small style={{ color: "red" }}>{msg}</small>
                                                )}
                                            />
                                        </div>
                                        <div className="form-group col-6">
                                            <label htmlFor="exampleInputPassword1 ">
                                                End Date<span className="text-danger">*</span>
                                            </label>
                                            <br />
                                            <Field
                                                type="date"
                                                name="endDate"
                                                id="inputdate"
                                                className="form-control  border-info"
                                                placeholder="dd/mm/yyyy"
                                            />

                                            <ErrorMessage
                                                name="endDate"
                                                render={(msg) => (
                                                    <small style={{ color: "red" }}>{msg}</small>
                                                )}
                                            />
                                        </div>
                                    </div>

                                    <div className='row'>

                                        <div className='col-6'>
                                            <small className='fw-bold'>Assign User Search</small>
                                            <div className='form-control'>
                                                <span>User Search</span>
                                            </div>
                                        </div>
                                        <div className='mt-5'>
                                            <small className='fw-bold rounded-3 border p-2'>Priyanchu</small>
                                            <small className='fw-bold rounded-3 border p-2'>Priyanchu</small>
                                            <small className='fw-bold rounded-3 border p-2'>Priyanchu</small>
                                            <small className='fw-bold rounded-3 border p-2'>Priyanchu</small>
                                        </div>

                                    </div>

                                    <div className="text-start w-50 m-auto mt-4 d-flex justify-content-between">
                                        <button
                                            type="submit"
                                            className="text-info bg-white border  m-auto w-100 border-info rounded-2 p-2"
                                        >RESET</button>
                                        <button
                                            type="submit"
                                            className="text-white m-auto w-100 bg-btn-bg auth_btn"
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
                                                "Apply Filter"
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
    )
}

export default AddTask