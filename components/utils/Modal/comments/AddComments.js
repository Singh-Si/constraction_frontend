import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { parseCookies } from "nookies";
import { useRef } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";

const AddComments = ({ id, fetchData }) => {
    const closeModalonSave = useRef(null)

    const initialValues = {
        comment: ""
    }

    const validationSchema = Yup.object({
        comment: Yup.string().required("Comment is required"),
    })

    const onSubmit = async (values, { resetForm }) => {
        const data = {
            comment: values.comment,
        }

        try {
            const { token, currentOrganizationId, siteId, floorId } = parseCookies();

            const response = await axios.post(`https://construction-backend.onrender.com/task/comment/add`, data, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                params: {
                    organization: currentOrganizationId,
                    site: siteId,
                    floor: floorId,
                    task: id
                },
            });

            if (response?.data?.success) {
                closeModalonSave.current.click();
                resetForm();
                fetchData();
                toast.success(response?.data?.message, { position: "bottom-center" })
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="modal fade" id="commentBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="issuesBackdrop" aria-hidden="true">
            <div className="modal-dialog w-100">
                <div className="modal-content w-100">
                    <div className="modal-body w-100">
                        <Formik
                            initialValues={initialValues}
                            onSubmit={onSubmit}
                            validationSchema={validationSchema}
                        >
                            {({
                                values,
                                resetForm,
                                isSubmitting,
                            }) => {

                                return <Form>
                                    <div className='row d-flex justify-content-center'>
                                        <div className="modal-header w-100">
                                            <h1 className="modal-title fs-5" id="issuesBackdrop">Add Comments</h1>
                                            <button id="close" ref={closeModalonSave} onClick={resetForm} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>

                                        <div className="row text-start mb-1 mt-3 p-0">
                                            <label htmlFor="exampleInputPassword1" className="form-label">Write Comments</label>
                                        </div>

                                        <div className="col-12">
                                            <Field
                                                name="comment"
                                                type="text" className="form-control bg-gray"
                                                placeholder="Memntion Comments in the Task" />

                                            <ErrorMessage
                                                name="comment"
                                                render={(msg) => (
                                                    <small style={{ color: "red" }}>{msg}</small>
                                                )}
                                            />
                                        </div>
                                    </div>

                                    <div className="col-12 mt-3 d-flex justify-content-end">
                                        <button type="submit" className="btn bg-btn-bg text-white"
                                            disabled={isSubmitting}
                                        >+ Add</button>
                                    </div>
                                </Form>
                            }}
                        </Formik>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default AddComments