import Image from "next/image";
import { ErrorMessage, Field, Form, Formik } from "formik"
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { validationSchema } from '@/schemas/createOrgSchema';
import { createOrgAsync } from "@/store/createorgslice/CreateOrgSlice";
import {  toast } from 'react-toastify';
import { getOrganizationAsync } from "@/store/organisation/fetchOrganisation";
function CreateOrganisation({ showModal, closeModal , setCreateOrgModal }) {
    const dispatch = useDispatch();
    const router = useRouter();

    const initialValues = {
        name: '',
        phone: '',
        email: '',
    }
    const onSubmit = async (values) => {
        const { name, phone, email } = values;
        const response = await dispatch(createOrgAsync({ name, phone, email }));

        const userData = response?.payload;
        if (userData?.success) {
            toast.success(userData?.message, { position: "top-center" });
            await dispatch(getOrganizationAsync())
            closeModal()
            router.reload();
        } else {
            toast.error(response?.payload?.error, { position: "top-center" });
        }
    };

    return (
        <div>
            {showModal &&
                <div className="modal-backdrop fade-in-animation  " data-bs-backdrop="true">
                    <div className="modal-dialog slide-in-from-bottom h-auto">
                        <div className="modal-content fade-in-animation p-0 h-none justify-content-start">
                            <div className="w-100 " >
                                <div className='d-flex justify-content-between w-100 border-bottom modal-header bg-light-blue rounded-top ' >
                                    <div className='fs-xxl text-blue p-3 '>Create Organisation</div>
                                    <span onClick={()=>setCreateOrgModal(false)} className='cursor-pointer text-black p-3'>X</span>
                                </div>

                                <div className='w-100 modal-body text-info'>

                                    <div >


                                        <Formik
                                            enableReinitialize
                                            initialValues={initialValues}
                                            validationSchema={validationSchema}
                                            onSubmit={onSubmit}
                                        >
                                            {({ values: { name, phone, email }, setFieldValue, errors, handleBlur, handleChange, dirty, isValid, resetForm, isSubmitting }) => {
                                                return <Form className="form d-flex flex-column gap-4 m-auto"  >
                                                    <div className="form-group mt-4">
                                                        <div className='text-start w-100 mb-2'><label htmlFor="exampleInputPassword1 ">Enter Organization</label><span className="text-danger">*</span></div>
                                                        <Field
                                                            type="text"
                                                            name='name'
                                                            className="form-control form-control-bg-color"
                                                            placeholder="Organization Name"
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
                                                        <div className='text-start w-100 mb-2'><label htmlFor="exampleInputPassword1">Enter Contact No.</label><span className="text-danger">*</span></div>
                                                        <Field
                                                            type="text"
                                                            name='phone'
                                                            className="form-control form-control-bg-color"
                                                            placeholder="Organization Contact"
                                                            maxLength={10}
                                                        />

                                                        <ErrorMessage
                                                            name="phone"
                                                            render={(msg) => (
                                                                <small style={{ color: "red" }}>{msg}</small>
                                                            )}
                                                        />
                                                    </div>

                                                    <div className="form-group">
                                                        <div className='text-start w-100 mb-2'>
                                                            <label htmlFor="exampleInputPassword1">Enter E-mail ID</label><span className="text-danger">*</span></div>
                                                        <Field type="text" name='email' className="form-control form-control-bg-color" placeholder="Organization E-mail ID"
                                                        // onBlur={handleBlur}
                                                        // onChange={handleChange}
                                                        // value={phone}
                                                        />

                                                        <ErrorMessage
                                                            name="email"
                                                            render={(msg) => (
                                                                <small style={{ color: "red" }}>{msg}</small>
                                                            )}
                                                        />
                                                    </div>

                                                    <div className="text-start w-100 mt-4">
                                                        <button type='submit' className="text-white m-auto w-100 bg-btn-bg auth_btn" disabled={isSubmitting}>
                                                            {
                                                                isSubmitting ?
                                                                    <>
                                                                        <span className="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>
                                                                        <span role="status">Loading...</span>
                                                                    </>

                                                                    : "Create"}
                                                        </button>
                                                        <br />
                                                    </div>
                                                </Form>
                                            }}
                                        </Formik>
                                        <hr />

                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default CreateOrganisation;