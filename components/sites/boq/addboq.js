import React, { useEffect, useState, useRef } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import axios from "axios"; // Don't forget to import axios
import { parseCookies } from 'nookies';
import { useRouter } from "next/router";
import Select from 'react-select'
import config from "@/config/config";
const Addboq = () => {   
    const [materials, setMaterials] = useState([]);
    const [multiValue, setMultiValue] = useState([]);
    const { token, siteId, currentOrganizationId } = parseCookies();
    const router = useRouter();

    const options = materials && materials?.data?.map((material) => ({
        value: material?._id,
        label: material?.materialName,
        uom: material?.uom,
    }));
    const initialValues = {
        materialName: "",
        uom: "",
        totalAmount: "", 
        quantity: "",
        ratio: "",
        wattage: "",
        consumption: "",
        cost: "",
        description: "",
    }
    const handleChange = (selectedOptions) => {
        const selectedMaterials = selectedOptions && selectedOptions.map(option => ({
            material: option.value,
            label: option.label,
            uom: option.uom,

        }));
        setMultiValue(selectedMaterials);
    };
    const onSubmit = async (values) => {
        const data = {
            materialId: multiValue.map(item => ({
                material: item.material,
                materialName: item.label,
                uom: item.uom,               
            })),
            totalAmount: values.totalAmount,
            quantity: values.quantity,
            ratio: values.ratio,
            wattage: values.wattage,
            consumption:values.consumption,
            cost: values.cost,
            description: values.description
        };

        try {
            const response = await axios.post(`${config.API_URL}/boq/add`, data,
                {
                    params: {
                        organization: currentOrganizationId,
                        site: siteId,

                    },
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (response?.data?.success) {
                toast.success("BOQ succesfully added", { position: "top-center" });
                resetForm();
                // clearDataRef.current.click()
                document.getElementById("close").click()
                router.push(router.asPath)
            }
        } catch {
            console.log("error")
        }
    }
    useEffect(() => {

        async function fetchMaterials() {
            try {
                const response = await axios.get(`${config.API_URL}/materials`,
                    {
                        params: {
                            site: siteId,
                            organization: currentOrganizationId,
                        },
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                )

                if (response?.data?.success) {

                    setMaterials(response?.data);
                }
            } catch (error) {
                console.log(error?.response?.data?.error);
            }
        }

        fetchMaterials();
    }, [])

    return (
        <div>
            <div className="offcanvas offcanvas-end bg-white" tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel" data-bs-backdrop="static" style={{ width: '35%' }}>
                <div className="offcanvas-body p-0">
                    <Formik
                        initialValues={initialValues}
                        onSubmit={onSubmit}
                    >
                        {({
                            isSubmitting,
                            resetForm,
                        }) => (
                            <Form className="d-flex flex-column">
                                <div className="offcanvas-header bg-light-blue mb-0">
                                    <span className="offcanvas-title fw-bold text-blue" id="offcanvasRightLabel">
                                        Add BOQ details
                                    </span>
                                    <button
                                        type="button"
                                        className="btn-close me-0"
                                        data-bs-dismiss="offcanvas"
                                        aria-label="Close"
                                        onClick={resetForm}
                                    ></button>
                                </div>
                                <div className="d-flex flex-column p-3">
                                    <div className="row">
                                        <div className="form-group col-6 text-start">
                                                <label htmlFor="exampleInputPassword1">
                                                    Select items
                                                </label>
                                                {/* <span className="text-danger">*</span> */}
<br/>
                                            <div className="form-group text-start">
                                                <Select
                                                    type="string"
                                                    name="materialName"
                                                    options={options}
                                                    isMulti={true}
                                                    onChange={handleChange}
                                                    placeholder="Select material names"
                                                />
                                                
                                                <ErrorMessage
                                                    name="materialName"
                                                    render={(msg) => (
                                                        <small style={{ color: "red" }}>{msg}</small>
                                                    )}
                                                />
                                            </div>
                                            </div>
                                                <div className="form-group col-6 text-start">
                                                    
                                                        <label htmlFor="exampleInputPassword1">
                                                            UOM
                                                        </label>
                                                        {/* <span className="text-danger">*</span> */}
                                                        <div className="form-group">

                                        <Field

                                                        as="select"
                                                        type="string"
                                                        name="uom"
                                                        className="form-control"
                                                    >
                                                        {multiValue.map((item) => (
                                                            item.uom && ( // Check if item.uom exists and is truthy
                                                                <option key={item.material} value={item.uom}>
                                                                    {item.uom}
                                                                </option>
                                                            )
                                                        ))}
                                                    </Field>
                                                    </div>

                                                    <ErrorMessage
                                                        name="uom"
                                                        render={(msg) => (
                                                            <small style={{ color: "red" }}>{msg}</small>
                                                        )}
                                                    />
                                                {/* </div> */}
</div>

                                            {/* <div className="row"> */}
                                        <div className="form-group col-6 text-start">
                                            <label htmlFor="exampleInputPassword1 ">
                                                Quantity
                                                {/* <span className="text-danger">*</span> */}
                                            </label>
                                            <br />
                                            <Field
                                                type="number"
                                                name="quantity"
                                                className="form-control "
                                                placeholder="00.00"
                                            // min={CreateDate()}
                                            />

                                            <ErrorMessage
                                                name="quantity"
                                                render={(msg) => (
                                                    <small style={{ color: "red" }}>{msg}</small>
                                                )}
                                            />
                                        </div>
                                        <div className="form-group col-6 text-start">
                                                <label htmlFor="exampleInputPassword1">
                                                    Ratio
                                                </label>
                                                {/* <span className="text-danger">*</span> */}
                                            <Field
                                                type="number"
                                                name="ratio"
                                                className="form-control"
                                                placeholder="00"
                                            />
                                            <ErrorMessage
                                                name="ratio"
                                                render={(msg) => (
                                                    <small style={{ color: "red" }}>{msg}</small>
                                                )}
                                            />
                                        </div>
                                        {/* </div> */}
                                        <div className="form-group col-6 text-start">
                                            <label htmlFor="exampleInputPassword1 ">
                                                Wattage
                                                {/* <span className="text-danger">*</span> */}
                                            </label>
                                            <br />
                                            <Field
                                                type="number"
                                                name="wattage "
                                                className="form-control"
                                                placeholder="00.00"
                                            // min={CreateDate()}
                                            />

                                            <ErrorMessage
                                                name="wattage"
                                                render={(msg) => (
                                                    <small style={{ color: "red" }}>{msg}</small>
                                                )}
                                            />
                                        </div>
                                        <div className="form-group col-6 text-start">
                                            <label htmlFor="exampleInputPassword1 ">
                                                Consumption
                                                {/* <span className="text-danger">*</span> */}
                                            </label>
                                            <br />
                                            <Field
                                                type="number"
                                                name="consumption "
                                                className="form-control"
                                                placeholder="00.00"
                                            // min={CreateDate()}
                                            />

                                            <ErrorMessage
                                                name="consumption"
                                                render={(msg) => (
                                                    <small style={{ color: "red" }}>{msg}</small>
                                                )}
                                            />
                                        </div>
                                        <div className="form-group col-6 text-start">
                                            <label htmlFor="exampleInputPassword1 ">
                                                Total amount
                                                {/* <span className="text-danger">*</span> */}
                                            </label>
                                            <br />
                                            <Field
                                                type="number"
                                                name="totalAmount"
                                                className="form-control"
                                                placeholder="00.00"
                                            // min={CreateDate()}
                                            />

                                            <ErrorMessage
                                                name="totalAmount"
                                                render={(msg) => (
                                                    <small style={{ color: "red" }}>{msg}</small>
                                                )}
                                            />
                                        </div>
                                        <div className="form-group col-6 text-start">
                                            <label htmlFor="exampleInputPassword1 ">
                                                Material cost
                                                {/* <span className="text-danger">*</span> */}
                                            </label>
                                            <br />
                                            <Field
                                                type="number"
                                                name="cost "
                                                className="form-control"
                                                placeholder="₹000.00"
                                            // min={CreateDate()}
                                            />

                                            <ErrorMessage
                                                name="cost"
                                                render={(msg) => (
                                                    <small style={{ color: "red" }}>{msg}</small>
                                                )}
                                            />
                                        </div>
                                        
                                    </div>

                                    <div className="row">

                                        <div className="form-group">
                                            <div className="text-start w-100 mb-21">
                                                <label htmlFor="exampleInputPassword1 ">
                                                    Description
                                                </label>
                                                {/* <span className="text-danger">*</span> */}
                                            </div>
                                            <Field
                                                as="textarea"
                                                name="description"
                                                id="description"
                                                className="form-control  border-info  "
                                                placeholder="Enter description"
                                                style={{ height: '100px' }} // Increase height as needed

                                            // onBlur={handleBlur}
                                            />

                                            <ErrorMessage
                                                name="description"
                                                render={(msg) => (
                                                    <small style={{ color: "red" }}>{msg}</small>
                                                )}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-4 text-center">
                                    {/* {isSubmitting ?
                                        <button className="btn btn-primary" type="button" disabled>
                                            <span className="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>
                                            <span role="status">Loading...</span>
                                        </button>
                                        : */}
                                    <button type="submit" className="btn bg-btn-bg text-white" onClick={onSubmit}>
                                        Add
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>

                </div>
            </div>
        </div>
    );
};

export default Addboq;
