import axios from "axios";

import { Formik, Form, Field, ErrorMessage } from "formik";
import { parseCookies } from 'nookies'
import { ToastContainer, toast } from "react-toastify";
import { validationSchema } from "@/schemas/createOrgSchema";
function CreateRole({ showModal, closeModal }) {
    const { token } = parseCookies();

    const initialValues = {
        name: "",
    }

    const { currentOrganizationId } = parseCookies()

    const onSubmit = (values) => {

        // try {
        //     const response = await axios.post(`https://construction-backend.onrender.com/permission/add/?organization=${currentOrganizationId}`, values, { headers: { Authorization: `Bearer ${token}` } })


        //     if (response?.data?.success) {
        //         toast.success("Role Created Successfully")
        //     }
        //     else {
        //         toast.warning(response.data.error)
        //     }
        // } catch {
        //     console.log("error")
        // }

    }
    // console.log(initialValues)

    return (
        <div>
            <ToastContainer />

            {showModal &&
                <div className="modal-backdrop fade-in-animation">
                    <div className="modal-dialog slide-in-from-bottom h-auto">
                        <div className="modal-content fade-in-animation p-0 h-none justify-content-start">
                            <div className="w-100">
                                <div className='d-flex justify-content-between w-100 border-bottom modal-header bg-light-blue rounded-top'>
                                    <div className='fs-xxl text-blue p-3'>Create Role</div>
                                    <span onClick={closeModal} className='cursor-pointer text-black p-3'>X</span>
                                </div>

                                <div className='w-100 modal-body text-info p-4'>
                                    <Formik
                                        initialValues={initialValues}
                                        validationSchema={validationSchema}
                                        onSubmit={onSubmit}
                                    >
                                        {({ values, setFieldValue, errors, handleBlur, handleChange, dirty, isValid, resetForm, isSubmitting }) => {
                                            return (
                                                <Form>
                                                    <div>
                                                        <div className='text-start w-100 text-blue m-auto mt-4'>
                                                            <label htmlFor="roleName">Role Name</label><span className="text-danger">*</span>
                                                            <Field
                                                                type="text"
                                                                name="name"
                                                                className="w-100 m-auto form-control form-control-bg-color background-white border-blue"
                                                                placeholder="Enter Role Name"
                                                            />
                                                            <ErrorMessage
                                                                name="name"
                                                                render={(msg) => (
                                                                    <small style={{ color: "red" }}>{msg}</small>
                                                                )}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="text-end w-100 m-auto mt-3">
                                                        <button type="submit" className="bg-btn-bg text-white rounded p-2">Next</button>
                                                    </div>
                                                    <hr />
                                                </Form>
                                            )
                                        }}
                                    </Formik>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default AddTeamMember;