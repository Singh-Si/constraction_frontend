import axios from "axios";

import { Formik, Form, Field, ErrorMessage } from "formik";
import { parseCookies } from 'nookies'
import {  toast } from "react-toastify";
import * as Yup from "yup";
import { useRouter } from "next/router";

function CreateRole({ showModal, closeModal }) {
    const { token, currentOrganizationId } = parseCookies();
    const router = useRouter();
    const initialValues = {
        name: "",
    }

    const validationSchema = Yup.object({
        name: Yup.string()
            // .min(4, 'Name must be at least 4 digits')
            .required("Name is required"),
    });

    const onSubmit = async (values) => {
        try {
            const response = await axios.post(`https://construction-backend.onrender.com/permission/add/?organization=${currentOrganizationId}`, values, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response?.data?.success) {
                // Close the modal
                const closeBtn = document.getElementById("close");
                if (closeBtn) {
                    closeBtn.click();
                }

                toast.success("Role Created Successfully", { position: 'top-center' });
                router.push(router.asPath);
            } else {
                toast.warning(response.data.error);
            }
        } catch (error) {
            console.error("Error creating role:", error);
        }
    };

    return (
        <div>
            {showModal &&
                <div className="modal-backdrop fade-in-animation">
                    <div className="modal-dialog slide-in-from-bottom h-auto">
                        <div className="modal-content fade-in-animation p-0 h-none justify-content-start">
                            <div className="w-100">
                                <div className='d-flex justify-content-between w-100 border-bottom modal-header bg-light-blue rounded-top'>
                                    <div className='fs-xxl text-blue p-3'>Create Role</div>
                                    <span id="close" onClick={closeModal} className='cursor-pointer text-black p-3'>X</span>
                                </div>

                                <div className='w-100 modal-body text-info p-4'>
                                    <Formik
                                        enableReinitialize
                                        initialValues={initialValues}
                                        validationSchema={validationSchema}
                                        onSubmit={onSubmit}
                                    >
                                        {({ values, setFieldValue, errors, handleBlur, handleChange, dirty, isValid, resetForm, isSubmitting }) => {
                                            return (
                                                <Form>
                                                    <div>
                                                        <div className='text-start w-100 text-blue m-auto'>
                                                            <label htmlFor="roleName ">Role Name</label><span className="text-danger">*</span>
                                                            <Field
                                                                type="text"
                                                                name="name"
                                                                className="w-100 mt-2 m-auto form-control form-control-bg-color background-white border-blue"
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
                                                        <button type="submit" disabled={isSubmitting} className="bg-btn-bg text-white rounded p-2">Create</button>
                                                    </div>
                                                   
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

export default CreateRole;