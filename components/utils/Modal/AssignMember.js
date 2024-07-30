import { Field, Formik } from 'formik'
import React from 'react'
import { Form } from 'reactstrap'

const AssignMember = ({ showModal, closeModal }) => {
    const initialValues = {
        role: ""
    }

    const onSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <div>
            {showModal &&
                <div className="modal-backdrop fade-in-animation" data-bs-backdrop="true">
                    <div className="modal-dialog slide-in-from-bottom h-auto">
                        <div className="modal-content fade-in-animation p-0 h-none justify-content-start">
                            <div className="w-100">
                                <div className='d-flex justify-content-between w-100 border-bottom modal-header bg-light-blue rounded-top'>
                                    <div className='fs-xxl text-blue p-3 fw-bold'>Assign Role To Member</div>
                                    <span onClick={closeModal} className='cursor-pointer text-black p-3'>X</span>
                                </div>

                                <div className='w-100 modal-body text-info p-4'>
                                    <Formik
                                        // enableReinitialize
                                        initialValues={initialValues}
                                        // validationSchema={validationSchema}
                                        onSubmit={onSubmit}
                                    >
                                        <Form
                                            onSubmit={onSubmit}
                                        >
                                            <spAN>ROLE</spAN>
                                            <section className='text-black'>Organisation Management Team</section>
                                            <div>
                                                <div className='text-start w-100 text-blue m-auto mt-4'>
                                                    {/* <label htmlFor="roleName">Role Name</label><span className="text-danger">*</span> */}
                                                    <Field
                                                        as="select"
                                                        type="text"
                                                        id="role"
                                                        name="role"
                                                        // className="form-select form-control w-100 m-auto form-control form-control-bg-color background-white border-blue"
                                                        // className="form-select form-control form-control-bg-color" // Use "form-select" for Bootstrap form styling
                                                        className="form-select form-control-bg-color"
                                                        placeholder="Enter Role Name"

                                                    // value={role}
                                                    // onChange={(e) => setRole(e.target.value)}
                                                    >
                                                        <option value="Akhil">Akhil</option>
                                                        <option value="Mohit">Mohit</option>
                                                    </Field>
                                                </div>
                                            </div>

                                            <div className="text-end  m-auto mt-3">
                                                <button type="submit" className="bg-btn-bg text-white rounded p-2">SAVE</button>
                                            </div>
                                            <hr />
                                        </Form>
                                    </Formik>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div >
    )
}

export default AssignMember