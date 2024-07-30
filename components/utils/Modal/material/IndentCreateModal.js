import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import Select from 'react-select';
import { useRouter } from "next/router";
import axios from "axios";
import config from "@/config/config";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { parseCookies } from "nookies";
import { CreatIndentSchema } from "@/schemas/materialSchema/CreatIndentSchema";

const IndentCreateModal = () => {
    const [invitationAcceptedMembers, setInvitationAcceptedMembers] = useState([]);
    const [materials, setMaterials] = useState([]);
    const [multiValue, setMultiValue] = useState([]);
    const [quantity, setQuantity] = useState({});

    const clearDataRef = useRef();
    const cookies = parseCookies();
    const token = cookies.token;
    const siteId = cookies.siteId;
    const currentOrganizationId = cookies.currentOrganizationId;
    const router = useRouter();

    const options = materials?.data?.map((material) => ({
        value: material?._id,
        label: material?.materialName,
        uom: material?.uom,
        quantity: quantity[material?._id] || "0"
    }));

    const initialValues = {
        materialId: "",
        assignUser: "",
        startDate: "",
        description: "",
    };

    const handleChange = (selectedOptions) => {
        const selectedMaterials = selectedOptions?.map(option => ({
            material: option.value,
            label: option.label,
            quantity: option.quantity,
            uom: option?.uom,
        }));
        setMultiValue(selectedMaterials);
        const initialQuantities = selectedMaterials?.reduce((acc, curr) => {
            acc[curr.material] = curr.quantity;
            return acc;
        }, {});
        setQuantity(initialQuantities);
    };

    const onSubmit = async (values, { resetForm }) => {
        const data = {
            materialId: multiValue.map(item => ({
                material: item.material,
                quantity: quantity[item.material]
            })),
            assignUser: [values?.assignUser],
            deliveryDate: values?.startDate,
            remarks: values?.description
        };

        try {
            const response = await axios.post(`${config.API_URL}/indent/add`, data, {
                params: {
                    organization: currentOrganizationId,
                    site: siteId,
                },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response?.data?.success) {
                toast.success("Indent Successfully Created", { position: "top-center" });
                resetForm();
                document.getElementById("close").click();
                router.push(router.asPath);
            }
        } catch (error) {
            console.log("Error:", error.message);
        }
    };

    useEffect(() => {
        async function fetchInvitationAcceptedMembers() {
            try {
                const response = await axios.get(`${config.API_URL}/site/getInvitationAcceptMembers`, {
                    params: {
                        organization: currentOrganizationId,
                    },
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                console.log("Fetched Members:", response.data); // Log fetched data
                setInvitationAcceptedMembers(response?.data?.data?.map(member => member.memberDetails) || []);
            } catch (error) {
                console.error("Error fetching members:", error?.response?.data?.error);
            }
        }

        async function fetchMaterials() {
            try {
                const response = await axios.get(`${config.API_URL}/materials`, {
                    params: {
                        site: siteId,
                        organization: currentOrganizationId,
                    },
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (response?.data?.success) {
                    setMaterials(response?.data);
                }
            } catch (error) {
                console.log("Error fetching materials:", error?.response?.data?.error);
            }
        }

        fetchInvitationAcceptedMembers();
        fetchMaterials();
    }, [currentOrganizationId, siteId, token]);

    return (
        <div className="modal fade" id="indentCreateModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdrop" aria-hidden="true">
            <div className="modal-dialog modal-lg w-100 h-auto">
                <div className="modal-content w-100">
                    <div className="modal-header w-100">
                        <h1 className="modal-title fs-5" id="staticBackdropLabel">Create Indent</h1>
                        <button onClick={() => clearDataRef.current.resetForm()} id="close" type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <div className="w-100 bg-none">
                        <Formik
                            initialValues={initialValues}
                            validationSchema={CreatIndentSchema}
                            onSubmit={onSubmit}
                            innerRef={clearDataRef}
                        >
                            {({ isSubmitting }) => (
                                <Form className="d-flex flex-column">
                                    <div className="d-flex gap-3 flex-column p-3">
                                        <div className="form-group col-12 mt-4">
                                            <label htmlFor="exampleInputPassword1">
                                                Select Material
                                            </label>
                                            <span className="text-danger">*</span>

                                            <Select
                                                options={options}
                                                isMulti={true}
                                                onChange={handleChange}
                                                placeholder="Type or Select Material Items..."
                                            />

                                            <div className="row mt-3">
                                                {multiValue.length > 0 && <div className="row bg-light-blue p-2">
                                                    <div className="col-6">
                                                        <span>Name</span>
                                                    </div>
                                                    <div className="col-3">
                                                        <span>UOM</span>
                                                    </div>
                                                    <div className="col-3">
                                                        <span>Quantity</span>
                                                    </div>
                                                </div>}

                                                {multiValue?.map((item) => (
                                                    <div className="row d-flex border-bottom justify-content-center align-items-center" key={item.material}>
                                                        <div className="col-6">
                                                            <span>{item.label}</span>
                                                        </div>
                                                        <div className="col-3">
                                                            <span>{item.uom}</span>
                                                        </div>
                                                        <div className="col-3">
                                                            <input
                                                                className="form-control m-2 w-50"
                                                                value={quantity[item.material] || ''}
                                                                onChange={(e) => setQuantity(prevState => ({
                                                                    ...prevState,
                                                                    [item.material]: e.target.value
                                                                }))}
                                                            />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="form-group col-12 mt-4">
                                                <label htmlFor="materialName">Assign To</label>
                                                <span className="text-danger">*</span>

                                                <Field
                                                    as="select"
                                                    name="assignUser"
                                                    className="form-group formik_select_input"
                                                >
                                                    <option value="">Select Member...</option>
                                                    {invitationAcceptedMembers?.map((option) => (
                                                        <option key={option._id} value={option._id}>
                                                            {option.name}
                                                        </option>
                                                    ))}
                                                </Field>

                                                <ErrorMessage
                                                    name="assignUser"
                                                    render={(msg) => (
                                                        <small style={{ color: "red" }}>{msg}</small>
                                                    )}
                                                />
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="form-group col-12 mt-4">
                                                <label htmlFor="exampleInputPassword1 ">
                                                    Expected Delivery Date
                                                </label>
                                                <span className="text-danger">*</span>

                                                <Field
                                                    type="date"
                                                    name="startDate"
                                                    className="form-control border-info"
                                                    placeholder="Enter Brand Name"
                                                    min={new Date().toISOString().split('T')[0]}
                                                />

                                                <ErrorMessage
                                                    name="startDate"
                                                    render={(msg) => (
                                                        <small style={{ color: "red" }}>{msg}</small>
                                                    )}
                                                />
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="form-group col-12 mt-4">
                                                <label htmlFor="exampleInputPassword1 ">
                                                    Description
                                                </label>
                                                <br />
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

                                            <div className="mt-4 text-end">
                                                {isSubmitting ?
                                                    <button className="btn btn-primary" type="button" disabled>
                                                        <span className="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>
                                                    </button>
                                                    :
                                                    <button type="submit" className="btn bg-btn-bg text-white" disabled={isSubmitting || multiValue.length === 0}>
                                                        Create
                                                    </button>}
                                            </div>
                                        </div>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IndentCreateModal;
