import { useRef } from 'react';
import { Bounce, toast } from 'react-toastify';
import { useRouter } from 'next/router';
import axios from 'axios';
import { ErrorMessage, Field, Formik, Form } from 'formik';
import { parseCookies } from "nookies";
import { validationSchema } from "@/schemas/floorSchema/AddFloorSchema";

const AddFloor = () => {
    const clearDataRef = useRef();
    const closeModalRef = useRef();
    const router = useRouter();
    const { currentOrganizationId, token, siteId } = parseCookies();

    const initialValues = {
        name: '',
        number: '',
    };

    const onSubmit = async (values, { resetForm }) => {
        const data = {
            name: values?.name,
            number: values?.number
        };

        try {
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/floor/add?organization=${currentOrganizationId}&site=${siteId}`, data, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            closeModalRef.current.click()
            toast.success("Floor Added Successfully", {
                position: "top-center",
                pauseOnHover: false,
                progress: 0,
                theme: "colored",
            });

            router.push(router.asPath);
            resetForm();
        } catch (error) {
            toast.error("Failed to add floor");
        }
    };

    return (
        <div
            className="offcanvas offcanvas-end w-25 bg-white"
            tabIndex="-1"
            id="offcanvasRight"
            aria-labelledby="offcanvasRightLabel"
            data-bs-backdrop="static"
        >
            <div className="offcanvas-header bg-light-blue mb-0">
                <h5 className="offcanvas-title" id="offcanvasRightLabel">
                    Add Floor
                </h5>

                <button
                    type="button"
                    className="btn-close me-0"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                    onClick={() => clearDataRef.current.resetForm()}
                    ref={closeModalRef}
                ></button>
            </div>
            <div className="offcanvas-body p-3">
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                    innerRef={clearDataRef}
                >
                    {({
                        values,
                        handleBlur,
                        isSubmitting,
                    }) => (
                        <Form className="d-flex flex-column gap-4 m-auto p-2">

                            <div className="form-group">
                                <div className="text-start w-100 mb-2">
                                    <label htmlFor="exampleInputPassword1">
                                        Enter Floor Number
                                    </label>
                                    <span className="text-danger">*</span>
                                </div>
                                <Field
                                    type="number"
                                    name="number"
                                    className="form-control form-control-bg-color"
                                    placeholder="Enter Floor Number"


                                />

                                <ErrorMessage
                                    name="number"
                                    render={(msg) => (
                                        <small style={{ color: "red" }}>{msg}</small>
                                    )}
                                />
                            </div>

                            <div className="form-group ">
                                <div className="text-start w-100 mb-2">
                                    <label htmlFor="exampleInputPassword1 ">
                                        Enter Floor Name
                                    </label>
                                    <span className="text-danger">*</span>
                                </div>
                                <Field
                                    type="text"
                                    name="name"
                                    className="form-control form-control-bg-color"
                                    placeholder="Enter floor Name"
                                    onBlur={handleBlur}
                                />

                                <ErrorMessage
                                    name="name"
                                    render={(msg) => (
                                        <small style={{ color: "red" }}>{msg}</small>
                                    )}
                                />
                            </div>
                            <div className="text-start w-50 m-auto mt-4">
                                <button
                                    type="submit"
                                    className="text-white bg-btn-bg m-auto w-100  auth_btn"
                                    disabled={isSubmitting || !values.name || !values.number}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                                            <span className="ms-2" role="status">Loading...</span>
                                        </>
                                    ) : (
                                        "Add Floor"
                                    )}
                                </button>
                                <br />
                            </div>
                        </Form>
                    )}
                </Formik>
                <div></div>
            </div>
        </div>
    );
};

export default AddFloor;