import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { parseCookies } from "nookies";
import { toast } from "react-toastify";
import { validationSchema } from "@/schemas/taskSchema/EditTaskDetailsSchema";
import { useRouter } from "next/router";

const EditTaskDetails = ({ taskresponse, handleLinkClick }) => {
    const [desc, setDesc] = useState('');
    const [workCategory, setWorkCategory] = useState([]);
    const [endDateState, setEndDateState] = useState([]);

    const router  = useRouter();

    const { token, currentOrganizationId, siteId, floorId } = parseCookies();

    const clearDataRef = useRef();

    const initialValues = {
        taskno: taskresponse?.taskName || "",
        workcategory: taskresponse?.workCategory?.name || "",
        startdate: taskresponse?.startDate || "",
        enddate: taskresponse?.endDate || "",
        estimatedcost: taskresponse?.expectedCost || "",
        totalcost: taskresponse?.totalCost || "",
    }

    function formatDate(date) {
        return date.toISOString().split('T')[0];
    }

    function CreateDate() {
        const formattedDate = new Date();
        return formatDate(formattedDate);
    }

    const onSubmit = async (values) => {
        const data = {
            taskName: values.taskno,
            description: desc,
            workCategory: values.workCategory,
            startDate: values.startdate,
            endDate: values.enddate,
            expectedCost: values.estimatedcost,
            totalCost: values.totalcost,
        }

        try {
            const response = await axios.patch(`https://construction-backend.onrender.com/task/update`, data, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                params: {
                    organization: currentOrganizationId,
                    site: siteId,
                    floor: floorId,
                    task: taskresponse._id
                },
            });

            if (response?.data?.success) {
                toast.success(response?.data?.message, { position: "top-center" })

                document.getElementById("close").click();
                handleLinkClick(taskresponse._id)
                router.push(router.asPath);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        async function fetchWorkCategory() {
            try {
                const response = await axios.get(`https://construction-backend.onrender.com/work-categories?organization=${currentOrganizationId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                if (response?.data?.workCategories) {
                    setWorkCategory(response?.data?.workCategories);
                }

            } catch (error) {
                console.log(error, "error");
            }
        }

        fetchWorkCategory()
    }, [])

    return (
        <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg w-100 h-auto">
                <div className="modal-content w-100">
                    <div className="modal-header w-100">
                        <h1 className="modal-title fs-5" id="staticBackdropLabel">Edit Task Details</h1>
                        <button id="close" type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                            onClick={() => clearDataRef.current.resetForm()}

                        ></button>
                    </div>

                    <div className="w-100 bg-none mt-4">
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={onSubmit}
                            innerRef={clearDataRef}
                        >
                            {({
                                handleChange,
                                isSubmitting,
                            }) => {
                                return <Form>
                                    <div className='row'>
                                        <div className="col-6 mb-3">
                                            <label htmlFor="exampleInputEmail1" className="form-label">Task Name</label>

                                            <span className="text-danger">*</span>

                                            <Field
                                                name="taskno"
                                                type="text" className="form-control border-info" aria-describedby="emailHelp"
                                            />

                                            <ErrorMessage name="taskno"
                                                render={(msg) => (
                                                    <small style={{ color: "red" }}>{msg}</small>
                                                )}
                                            />
                                        </div>

                                        <div className="col-6 mb-3">
                                            <label htmlFor="exampleInputPassword1" className="form-label">Work Category</label>

                                            <span className="text-danger">*</span>

                                            <Field
                                                as="select"
                                                type="text"
                                                name="workCategory"
                                                className="border-info form-select"
                                                style={{ height: 46, borderRadius: 10 }}
                                            >
                                                <option className=" form-select" value="">{taskresponse?.workCategory?.name}</option>
                                                {workCategory?.map((curVal) => {
                                                    const { _id, name } = curVal;
                                                    return (
                                                        <option className=" form-select" key={_id} value={_id}>
                                                            {name}
                                                        </option>
                                                    );
                                                })}
                                            </Field>

                                            <ErrorMessage
                                                name="workcategory"
                                                render={(msg) => (
                                                    <small style={{ color: "red" }}>{msg}</small>
                                                )}
                                            />
                                        </div>

                                        <div className="col-6 mb-3">
                                            <label htmlFor="exampleInputPassword1" className="form-label">Start Date</label>

                                            <span className="text-danger">*</span>

                                            <Field
                                                name="startdate"
                                                type="date"
                                                id="inputdate"
                                                className="form-control border-info"
                                                placeholder="dd/mm/yyyy"
                                                onChange={(e) => {
                                                    const newStartDate = e.target.value;
                                                    handleChange(e);
                                                    const nextDay = new Date(newStartDate);
                                                    nextDay.setDate(nextDay.getDate() + 1);
                                                    const formattedNextDay = nextDay.toISOString().split('T')[0];
                                                    setEndDateState(formattedNextDay);
                                                }}
                                                // min={CreateDate()}
                                            />

                                            <ErrorMessage
                                                name="startdate"
                                                render={(msg) => (
                                                    <small style={{ color: "red" }}>{msg}</small>
                                                )}
                                            />
                                        </div>

                                        <div className="col-6 mb-3">
                                            <label htmlFor="exampleInputPassword1" className="form-label">End Date</label>

                                            <span className="text-danger">*</span>

                                            <Field
                                                name="enddate"
                                                type="date"
                                                id="inputdate"
                                                className="form-control border-info"
                                                placeholder="dd/mm/yyyy"
                                                // min={endDateState}
                                            />

                                            <ErrorMessage
                                                name="enddate"
                                                render={(msg) => (
                                                    <small style={{ color: "red" }}>{msg}</small>
                                                )}
                                            />
                                        </div>

                                        <div className="col-6 mb-3">
                                            <label htmlFor="exampleInputPassword1" className="form-label">Estimated Cost</label>

                                            <span className="text-danger">*</span>

                                            <Field
                                                name="estimatedcost"
                                                type="number" className="form-control border-info"
                                                placeholder="0.00" />

                                            <ErrorMessage
                                                name="estimatedcost"
                                                render={(msg) => (
                                                    <small style={{ color: "red" }}>{msg}</small>
                                                )}
                                            />
                                        </div>

                                        <div className="col-6 mb-3">
                                            <label htmlFor="exampleInputPassword1" className="form-label border-info">Total Cost</label>

                                            <span className="text-danger">*</span>

                                            <Field
                                                name="totalcost"
                                                type="number" className="form-control border-info" placeholder="0.00" />

                                            <ErrorMessage
                                                name="totalcost"
                                                render={(msg) => (
                                                    <small style={{ color: "red" }}>{msg}</small>
                                                )}
                                            />
                                        </div>

                                        <div>
                                            <label className="form-label" htmlFor="floatingTextarea">Enter Description</label>

                                            <textarea
                                                className="form-control border-info"
                                                placeholder="Leave a comment here"
                                                id="desc"
                                                value={desc}
                                                onChange={(e) => setDesc(e.target.value)} // Update the desc variable
                                                style={{ height: 46, borderRadius: 10 }}
                                            ></textarea>
                                        </div>
                                    </div>

                                    <div className="w-100 mt-4 text-end">
                                        {isSubmitting ?
                                            <button className="btn btn-primary" type="button" disabled>
                                                <span className="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>
                                                <span role="status">Loading...</span>
                                            </button>
                                            :
                                            <button type="submit" className="btn bg-btn-bg text-white" disabled={isSubmitting}>
                                                Submit
                                            </button>}
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

export default EditTaskDetails;