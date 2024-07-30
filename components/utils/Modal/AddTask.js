
import axios from 'axios';
import nookies from "nookies"
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { validationSchema } from '@/schemas/taskSchema/AddTaskSchema';

const AddTask = () => {
    const [workCategory, setWorkCategory] = useState();
    const [minEndDate, setMinEndDate] = useState();
    const [endDateState, setEndDateState] = useState();

    const { currentOrganizationId, token, floorId, siteId } = nookies.get();

    const router = useRouter();

    const initialValues = {
        name: "",
        description: "",
        workCategory: "",
        startDate: "",
        endDate: "",
        // expectedCost: ""
    }

    function formatDate(date) {
        return date.toISOString().split('T')[0];
    }

    function CreateDate() {
        const formattedDate = new Date();
        return formatDate(formattedDate);
    }

    function CreateEndDate(startDate) {
        const formattedStartDate = new Date(startDate);
        const nextDay = new Date(formattedStartDate);
        nextDay.setDate(formattedStartDate.getDate() + 1);
        const formattedEndDate = formatDate(nextDay);

        setMinEndDate(startDate);
        setEndDateState(formattedEndDate);

        return formattedEndDate;
    }

    var startDate = CreateDate();

    const onSubmit = async (values) => {
        const data = {
            taskName: values?.name,
            description: values?.description,
            workCategory: values?.workCategory,
            startDate: values?.startDate,
            endDate: values?.endDate,
            // expectedCost: values?.expectedCost,
        }

        try {
            const res = await axios.post(`https://construction-backend.onrender.com/task/add?organization=${currentOrganizationId}&site=${siteId}&floor=${floorId}`, data, {
                headers: { "Authorization": `Bearer ${token}` }
            });

            if (res.data.success) {
                document.getElementById("addtaskclose").click();
                toast.success("Task Succesfully Created", { position: "top-center" })
                router.push(router.asPath);
            }
        } catch (error) {
            console.log(error)
        }
    }

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

    useEffect(() => {
        setEndDateState(CreateEndDate(startDate));
    }, [startDate]);

    return (
        <div
            className="offcanvas offcanvas-end w-25 bg-white"
            tabIndex="-1"
            id="taskoffcanvasRight"
            aria-labelledby="offcanvasRightLabel"
            data-bs-backdrop="static"
        >
            <div className="offcanvas-header bg-light-blue mb-0">
                <h5 className="offcanvas-title" id="offcanvasRightLabel">
                    Add Task
                </h5>

                <button
                    type="button"
                    id="addtaskclose"
                    className="btn-close me-0"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                >
                </button>
            </div>
            <div className="offcanvas-body p-3">
                <Formik
                    enableReinitialize
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    {({
                        handleChange,
                        isSubmitting,
                    }) => {

                        return (
                            <Form className=" d-flex flex-column gap-4 m-auto p-2">
                                <div className="form-group ">
                                    <div className="text-start w-100 mb-2">
                                        <label htmlFor="exampleInputPassword1">
                                            Task Name
                                        </label>
                                        <span className="text-danger">*</span>
                                    </div>
                                    <Field
                                        type="text"
                                        name="name"
                                        className="form-control border-info"
                                        placeholder="Enter Task Name"
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
                                            Description (Optional)
                                        </label>
                                    </div>
                                    <Field
                                        type="text"
                                        name="description"
                                        className="form-control border-info"
                                        placeholder="Enter Description"
                                    />

                                    <ErrorMessage
                                        name="description"
                                        render={(msg) => (
                                            <small style={{ color: "red" }}>{msg}</small>
                                        )}
                                    />
                                </div>

                                <div className="form-group">
                                    <div className="text-start w-100 mb-2">
                                        <label htmlFor="exampleInputPassword1">
                                            Work Category
                                        </label>
                                        <span className="text-danger">*</span>
                                    </div>
                                    <Field
                                        as="select"
                                        type="text"
                                        name="workCategory"
                                        className="form-label border-info p-2 w-100 rounded"
                                        placeholder="Enter Site Name"
                                    >
                                        <option value="">Select Category</option> {/* Add an empty option */}
                                        {workCategory?.map((curVal) => {
                                            const { _id, name } = curVal;
                                            return (
                                                <option key={_id} value={_id}>
                                                    {name}
                                                </option>
                                            );
                                        })}
                                    </Field>

                                    <ErrorMessage
                                        name="workCategory"
                                        render={(msg) => (
                                            <small style={{ color: "red" }}>{msg}</small>
                                        )}
                                    />
                                </div>

                                <div className="row d-flex justify-content-between">
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
                                            onChange={(e) => {
                                                const newStartDate = e.target.value;
                                                setMinEndDate(CreateEndDate(newStartDate));
                                                handleChange(e);
                                            }}
                                            min={CreateDate()}
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
                                            min={endDateState}
                                        />

                                        <ErrorMessage
                                            name="endDate"
                                            render={(msg) => (
                                                <small style={{ color: "red" }}>{msg}</small>
                                            )}
                                        />
                                    </div>

                                </div>

                                {/* <div className='row '>
                                    <div className="form-group col-6    ">
                                        <label htmlFor="exampleInputPassword1 ">
                                            Estimated Task Cost<span className="text-danger">*</span>
                                        </label>
                                        <br />
                                        <Field
                                            type="number"
                                            name="expectedCost"
                                            id="inputdate"
                                            className="form-control  border-info"
                                            placeholder="00/00"
                                        />
                                      

                                        <ErrorMessage
                                            name="expectedCost"
                                            render={(msg) => (
                                                <small style={{ color: "red" }}>{msg}</small>
                                            )}
                                        />
                                    </div>
                                </div> */}

                                <div className="text-start w-50 m-auto mt-4 d-flex justify-content-between">

                                    <button
                                        type="submit"
                                        className="text-white m-auto w-100 bg-btn-bg auth_btn"
                                        disabled={isSubmitting}
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
                                            "Add"
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
    )
}

export default AddTask;