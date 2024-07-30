import { useRef } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { parseCookies } from "nookies";
import * as Yup from "yup";

const AddIssues = ({ id, fetchData }) => {
    const initialValues = {
        issue: "",
    }

    const validationSchema = Yup.object({
        issue: Yup.string().required("Issue is required"),
    })

    const closeEditBtn = useRef(null);

    const onSubmit = async (values, { resetForm }) => {
        const data = {
            issue: values.issue,
        }

        try {
            const { token, currentOrganizationId, siteId, floorId } = parseCookies();

            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/task/issue/add`, data, {
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

            closeEditBtn.current.click()
            resetForm();
            fetchData();
            toast.success(response?.data?.message, { position: "bottom-center" })
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="modal fade" id="addIssuesModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="addIssuesModal" aria-hidden="true">
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
                                isSubmitting,
                            }) => {

                                return <Form>
                                    <div className='row d-flex justify-content-center'>
                                        <div className="modal-header w-100">
                                            <h1 className="modal-title fs-5" id="issuesBackdrop">Add Issues</h1>

                                            <button
                                                type="button" ref={closeEditBtn} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>

                                        <div className="row text-start mb-1 mt-3 p-0">
                                            <label htmlFor="exampleInputPassword1" className="form-label">Write Issue</label>
                                        </div>

                                        <div className="col-12">
                                            <Field
                                                name="issue"
                                                type="text" className="form-control bg-gray"
                                                placeholder="Mention Issue in this Task" />

                                            <ErrorMessage
                                                name="issue"
                                                render={(msg) => (
                                                    <small style={{ color: "red" }}>{msg}</small>
                                                )}
                                            />
                                        </div>
                                    </div>

                                    <div className="col-12 mt-3 d-flex justify-content-end">
                                        {isSubmitting ?
                                            <button className="btn btn-primary" type="button" disabled>
                                                <span className="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>
                                                <span role="status">Loading...</span>
                                            </button>
                                            :
                                            <button type="submit" className="btn bg-btn-bg text-white" disabled={isSubmitting}>+ Add</button>}
                                    </div>
                                </Form>
                            }}
                        </Formik>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default AddIssues;