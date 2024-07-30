import { toast } from "react-toastify";
import axios from "axios";
import { Field, Form, Formik } from "formik";
import { parseCookies } from "nookies";
import config from "@/config/config";

const EditIssue = ({ editIssuesId, taskresponseid, fetchData }) => {
    const initialValues = {
        issue: editIssuesId?.issue || "",
    }
    
    const onSubmit = async (values, { resetForm }) => {
        const data = {
            issue: values.issue,
        }

        try {
            const { token, currentOrganizationId, siteId, floorId } = parseCookies();

            const response = await axios.patch(`${config.API_URL}/task/issue/update/${editIssuesId?._id}`, data, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                params: {
                    organization: currentOrganizationId,
                    site: siteId,
                    floor: floorId,
                    task: taskresponseid
                },
            });

            document.getElementsByClassName("edit_issue_close_btn")[0].click();
            resetForm();
            fetchData();
            toast.success(response?.data?.message, { position: "bottom-center" })
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="modal fade" id="editIssueModal" tabIndex="-1" aria-labelledby="editIssueModalLabel" aria-hidden="true">
            <div className="modal-dialog w-100">
                <div className="modal-content w-100">
                    <div className="modal-body w-100">
                        <Formik
                            enableReinitialize
                            initialValues={initialValues}
                            onSubmit={onSubmit}
                        >
                            {({
                                isSubmitting,
                            }) => {

                                return <Form>
                                    <div className='row d-flex justify-content-center'>
                                        <div className="modal-header w-100">
                                            <h1 className="modal-title fs-5" id="issuesBackdrop">Edit Issues</h1>

                                            <button
                                                type="button" className="btn-close edit_issue_close_btn" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>

                                        <div className="row text-start mb-1 mt-3 p-0">
                                            <label htmlFor="exampleInputPassword1" className="form-label">Write Issue</label>
                                        </div>

                                        <div className="col-12">
                                            <Field
                                                name="issue"
                                                type="text" className="form-control bg-gray"
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
                                            <button type="submit" className="btn bg-btn-bg text-white" disabled={isSubmitting}>Edit</button>}
                                    </div>
                                </Form>
                            }}
                        </Formik>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditIssue;