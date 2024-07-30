import { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import config from "@/config/config";
import { parseCookies } from "nookies";
import axios from "axios";
import { bomValidationSchema } from "@/schemas/materialSchema/BomSchema";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Select from 'react-select'

const BomCreate = () => {
    const [selectedOptions, setSelectedOptions] = useState([])
    const [showLengthBreadthHeight, setShowLengthBreadthHeight] = useState(false);
    const [showWeightField, setShowWeightField] = useState(false);
    const [manufacturing, setManufacturing] = useState(false);
    const [uPCEAN, setUPCEAN] = useState(false);
    const [isbnoptionField, setIsbnoptionField] = useState(false);
    const [colorOptionField, setColorOptionField] = useState(false);

    const router = useRouter();
    const { currentOrganizationId, token } = parseCookies();
    const buildings = ["Kg", "Square meter", "Meter", "Numbers", "Square feet", "Running feet", "Bags"];

    const options = [
        { value: 'Dimensions', label: 'Dimensions' },
        { value: 'Weight', label: 'Weight' },
        { value: 'Manufacturing Part', label: 'Manufacturing, Part Number' },
        { value: 'UPC, /EAN', label: 'UPC, /EAN' },
        { value: 'ISBN', label: 'ISBN' },
        { value: 'Color', label: 'Color' },
    ]

    const handleChange = (selectedOptions) => {
        setSelectedOptions(selectedOptions);

        const showDimensions = selectedOptions.some(option => option.value === 'Dimensions');

        const showWeight = selectedOptions.some(option => option.value === 'Weight');

        const Manufacturingpart = selectedOptions.some(option => option.value === 'Manufacturing Part');

        const uPCEAN = selectedOptions.some(option => option.value === 'UPC, /EAN');

        const showISBN = selectedOptions.some(option => option.value === 'ISBN');

        const showColor = selectedOptions.some(option => option.value === 'Color');

        setShowLengthBreadthHeight(showDimensions);
        setShowWeightField(showWeight);
        setManufacturing(Manufacturingpart);
        setUPCEAN(uPCEAN);
        setIsbnoptionField(showISBN);
        setColorOptionField(showColor);

    }

    const initialValues = {
        materialCode: "",
        materialName: "",
        brandName: "",
        uom: "",
        unitCost: "",
        gst: "",
        description: "",
        HSN: "",
        inStocks:"",
        length: "",
        breadth: "",
        height: "",
        Diameter: "",
        Weight: "",
        Manufacturing: "",
        UPC: "",
        EAN: "",
        ISBN: "",
        Color: "",
        inStocks:"",
        usedFromStocks:""
    }

    const onSubmit = async (values) => {
        const totalLength = `${values?.length}${values?.lengthUnit}`;
        const totalBreadth = `${values?.breadth}${values?.breadthUnit}`;
        const totalHeight = `${values?.height}${values?.heightUnit}`;
        const data = {
            materialCode: values.materialCode,
            materialName: values?.materialName,
            brandName: values?.brandName,
            uom: values?.uom,
            unitCost: values?.unitCost,
            gst: values?.gst,
            description: values?.description,
            hsn: values?.HSN,
            inStocks:values?.inStocks,
            usedFromStocks:values?.usedFromStocks,
            length: totalLength || "",
            breadth: totalBreadth || "",
            height: totalHeight || "",
            diameter: values.Diameter || "",
            weight: values.Weight || "",
            manufacturing: values.Manufacturing || "",
            upc: values.UPC || "",
            ean: values.EAN || "",
            isbn: values.ISBN || "",
            color: values.Color || "",
        }

        try {
            const response = await axios.post(`${config.API_URL}/material/add?organization=${currentOrganizationId}`, data,
                { headers: { Authorization: `Bearer ${token}` } }
            )

            if (response.data.success) {
                toast.success("Material Added Succesfully", { position: "top-center" });
                router.push(router.asPath)
            }
        } catch (error) {
            console.log(error, "Error")
        }
    }

    return (
        <div
            className="offcanvas offcanvas-end  bg-white p-0 w-50"
            tabIndex="-1"
            id="offcanvasRight"
            aria-labelledby="offcanvasRightLabel"
            data-bs-backdrop="static"
        >
            <div className="offcanvas-body p-0">
                <Formik
                    initialValues={initialValues}
                    validationSchema={bomValidationSchema}
                    onSubmit={onSubmit}
                >
                    {({
                        resetForm,
                        isSubmitting,
                    }) => {

                        return (
                            <Form className="d-flex flex-column">
                                <div className="offcanvas-header bg-light-blue mb-0">
                                    <span className="offcanvas-title fw-bold text-blue" id="offcanvasRightLabel">
                                        Add Material
                                    </span>
                                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" onClick={() => resetForm()}></button>
                                </div>

                                <div className="d-flex gap-3 flex-column p-3">
                                    <div className="row">
                                        <div className="form-group col-6 ">
                                            <div className="text-start w-100 mb-2">
                                                <label htmlFor="exampleInputPassword1 ">
                                                    Material ID
                                                </label>
                                            </div>
                                            <Field
                                                type="text"
                                                name="materialCode"
                                                className="form-control  border-info  "
                                                placeholder="Ex. Material123"
                                            />

                                            <ErrorMessage
                                                name="materialCode"
                                                render={(msg) => (
                                                    <small style={{ color: "red" }}>{msg}</small>
                                                )}
                                            />
                                        </div>

                                        <div className="form-group col-6">
                                            <div className="text-start w-100 mb-2">
                                                <label htmlFor="exampleInputPassword1">
                                                    Material Name
                                                </label>
                                                <span className="text-danger">*</span>
                                            </div>
                                            <Field
                                                type="text"
                                                name="materialName"
                                                className="form-control  border-info"
                                                placeholder="Enter Material Name"
                                            />

                                            <ErrorMessage
                                                name="materialName"
                                                render={(msg) => (
                                                    <small style={{ color: "red" }}>{msg}</small>
                                                )}
                                            />
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="form-group col-6">
                                            <label htmlFor="exampleInputPassword1 ">
                                                Brand Name
                                            </label>
                                            <br />
                                            <Field
                                                type="text"
                                                name="brandName"
                                                className="form-control  border-info"
                                                placeholder="Enter Brand Name"
                                            />

                                            <ErrorMessage
                                                name="brandName"
                                                render={(msg) => (
                                                    <small style={{ color: "red" }}>{msg}</small>
                                                )}
                                            />
                                        </div>
                                        <div className="form-group col-6">
                                            <label htmlFor="exampleInputPassword1 ">
                                                UOM<span className="text-danger">*</span>
                                            </label>

                                            <Field
                                                as="select"
                                                type="text"
                                                name="uom"
                                                className="form-select border-info"
                                            >
                                                <option value="">Select option</option>
                                                {buildings.map((building, index) => (
                                                    <option key={index} value={building}>
                                                        {building}
                                                    </option>
                                                ))}
                                            </Field>

                                            <ErrorMessage
                                                name="uom"
                                                render={(msg) => (
                                                    <small style={{ color: "red" }}>{msg}</small>
                                                )}
                                            />
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="form-group col-6">
                                            <label htmlFor="exampleInputPassword1 ">
                                                GST<span className="text-danger">*</span>
                                            </label>
                                            <br />
                                            <Field
                                                as="select"
                                                type="text"
                                                name="gst"
                                                className="formik_select_input border-info text-black fw-medium "
                                                style={{ fontSize: "0.875rem", }}
                                            >
                                                <option value="">Select</option>
                                                <option value="5%">5%</option>
                                                <option value="12%">12%</option>
                                                <option value="18%">18%</option>
                                                <option value="28%">28%</option>
                                            </Field>

                                            <ErrorMessage
                                                name="gst"
                                                render={(msg) => (
                                                    <small style={{ color: "red" }}>{msg}</small>
                                                )}
                                            />
                                        </div>
                                        <div className="form-group col-6">
                                            <label htmlFor="exampleInputPassword1 ">
                                                HSN
                                            </label>
                                            <br />
                                            <Field
                                                type="string"
                                                name="HSN"
                                                className="form-control  border-info"
                                                placeholder="Enter HSN Number"
                                            />

                                            <ErrorMessage
                                                name="HSN"
                                                render={(msg) => (
                                                    <small style={{ color: "red" }}>{msg}</small>
                                                )}
                                            />
                                        </div>
                                    </div>

                                     <div className="row">
                                     <div className="form-group col-6">
                                            <label htmlFor="exampleInputPassword1 ">
                                                In Stocks
                                            </label>
                                            <br />
                                            <Field
                                                type="string"
                                                name="inStocks"
                                                className="form-control  border-info"
                                                placeholder="Enter the number for in stocks"
                                            />

                                            <ErrorMessage
                                                name="inStocks"
                                                render={(msg) => (
                                                    <small style={{ color: "red" }}>{msg}</small>
                                                )}
                                            />
                                        </div>
                                        <div className="form-group col-6">
                                            <label htmlFor="exampleInputPassword1 ">
                                                Used from stocks 
                                            </label>
                                            <br />
                                            <Field
                                                type="string"
                                                name="usedFromStocks"
                                                className="form-control  border-info"
                                                placeholder="Enter number for used from stocks"
                                            />

                                            <ErrorMessage
                                                name="usedFromStocks"
                                                render={(msg) => (
                                                    <small style={{ color: "red" }}>{msg}</small>
                                                )}
                                            />
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="form-group col-6">
                                            <label htmlFor="exampleInputPassword1 ">
                                                Unit Cost
                                            </label>
                                            <br />
                                            <Field
                                                type="number"
                                                name="unitCost"
                                                className="form-control  border-info"
                                                placeholder="₹ 0"
                                            />

                                            <ErrorMessage
                                                name="unitCost"
                                                render={(msg) => (
                                                    <small style={{ color: "red" }}>{msg}</small>
                                                )}
                                            />
                                        </div>


                                        <div className="form-group col-6">
                                            <label htmlFor="exampleInputPassword1 ">
                                                Description
                                            </label>
                                            <br />
                                            <Field
                                                type="text"
                                                name="description"
                                                className="form-control  border-info"
                                                placeholder="Enter Description"
                                            />

                                            <ErrorMessage
                                                name="description"
                                                render={(msg) => (
                                                    <small style={{ color: "red" }}>{msg}</small>
                                                )}
                                            />
                                        </div>
                                    </div>

                                    <div className="mt-3">
                                        <Select options={options}
                                            isMulti={true}
                                            onChange={handleChange}
                                            value={selectedOptions}
                                        />
                                    </div>

                                    <div className="row mt-3">
                                        {showLengthBreadthHeight &&
                                            <div className="row">
                                                <div className="col-4">
                                                    <label htmlFor="exampleInputPassword1">
                                                        Length
                                                    </label>
                                                    <br />

                                                    <div className="input-group">
                                                        <Field
                                                            type="text"
                                                            name="length"
                                                            className="form-control border-info length_css w-50"
                                                            placeholder="Please Enter Length"
                                                        />

                                                        <Field
                                                            as="select"
                                                            name="lengthUnit"
                                                            className="form-select border-info"
                                                        >
                                                            <option value="(m)">m</option>
                                                            <option value="(cm)">cm</option>
                                                            <option value="(in)">in</option>
                                                            <option value="(feet)">feet</option>
                                                        </Field>
                                                    </div>

                                                    <ErrorMessage
                                                        name="length"
                                                        render={(msg) => (
                                                            <small style={{ color: "red" }}>{msg}</small>
                                                        )}
                                                    />

                                                    <ErrorMessage
                                                        name="lengthUnit"
                                                        render={(msg) => (
                                                            <small style={{ color: "red" }}>{msg}</small>
                                                        )}
                                                    />
                                                </div>

                                                <div className="form-group col-4">
                                                    <label htmlFor="exampleInputPassword1 ">
                                                        Breadth
                                                    </label>

                                                    <div className="input-group">
                                                        <Field
                                                            type="text"
                                                            name="breadth"
                                                            className="form-control border-info length_css w-50"
                                                            placeholder="Please Enter Breadth"
                                                        />
                                                        <Field
                                                            as="select"
                                                            name="breadthUnit"
                                                            className="form-select border-info"
                                                        >
                                                            <option value="(m)">m</option>
                                                            <option value="(cm)">cm</option>
                                                            <option value="(in)">in</option>
                                                            <option value="(feet)">feet</option>
                                                        </Field>

                                                        <ErrorMessage
                                                            name="breadth"
                                                            render={(msg) => (
                                                                <small style={{ color: "red" }}>{msg}</small>
                                                            )}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="form-group col-4">
                                                    <label htmlFor="exampleInputPassword1 ">
                                                        Height
                                                    </label>

                                                    <div className="input-group">
                                                        <Field
                                                            type="string"
                                                            name="height"
                                                            className="form-control border-info length_css w-50"
                                                            placeholder="Please Enter Height"
                                                        />

                                                        <Field
                                                            as="select"
                                                            name="heightUnit"
                                                            className="form-select border-info"
                                                        >
                                                            <option value="(m)">m</option>
                                                            <option value="(cm)">cm</option>
                                                            <option value="(in)">in</option>
                                                            <option value="(feet)">feet</option>
                                                        </Field>
                                                    </div>

                                                    <ErrorMessage
                                                        name="height"
                                                        render={(msg) => (
                                                            <small style={{ color: "red" }}>{msg}</small>
                                                        )}
                                                    />
                                                </div>

                                                <div className="form-group col-4 mt-3">
                                                    <label htmlFor="exampleInputPassword1">
                                                        Diameter
                                                    </label>
                                                    <br />
                                                    <Field
                                                        type="string"
                                                        name="Diameter"
                                                        className="form-control border-info"
                                                    />

                                                    <ErrorMessage
                                                        name="Diameter"
                                                        render={(msg) => (
                                                            <small style={{ color: "red" }}>{msg}</small>
                                                        )}
                                                    />
                                                </div>
                                            </div>
                                        }

                                        {showWeightField &&
                                            <div className="form-group col-4 mt-3">
                                                <label htmlFor="exampleInputPassword1 ">
                                                    Weight
                                                </label>

                                                <div className="input-group">
                                                    <Field
                                                        type="text"
                                                        name="Weight"
                                                        className="form-control  border-info w-50"
                                                        placeholder="weight in kg's"
                                                    />

                                                    <ErrorMessage
                                                        name="Weight"
                                                        render={(msg) => (
                                                            <small style={{ color: "red" }}>{msg}</small>
                                                        )}
                                                    />
                                                </div>
                                            </div>
                                        }

                                        {manufacturing && <div className="form-group col-4 mt-3">
                                            <label htmlFor="exampleInputPassword1 ">
                                                Manufacturing, Part Number
                                            </label>

                                            <Field
                                                type="string"
                                                name="Manufacturing"
                                                className="form-control  border-info"
                                            />

                                            <ErrorMessage
                                                name="Manufacturing"
                                                render={(msg) => (
                                                    <small style={{ color: "red" }}>{msg}</small>
                                                )}
                                            />
                                        </div>}

                                        {uPCEAN &&
                                            <>
                                                <div className="form-group col-4 mt-3">
                                                    <label htmlFor="exampleInputPassword1 ">
                                                        UPC
                                                    </label>

                                                    <Field
                                                        type="string"
                                                        name="UPC"
                                                        className="form-control  border-info"
                                                    />

                                                    <ErrorMessage
                                                        name="UPC"
                                                        render={(msg) => (
                                                            <small style={{ color: "red" }}>{msg}</small>
                                                        )}
                                                    />
                                                </div>

                                                <div className="form-group col-4 mt-3">
                                                    <label htmlFor="exampleInputPassword1 ">
                                                        EAN
                                                    </label>

                                                    <Field
                                                        type="string"
                                                        name="EAN"
                                                        className="form-control  border-info"
                                                    />

                                                    <ErrorMessage
                                                        name="EAN"
                                                        render={(msg) => (
                                                            <small style={{ color: "red" }}>{msg}</small>
                                                        )}
                                                    />
                                                </div>
                                            </>
                                        }

                                        {isbnoptionField && <div className="form-group col-4 mt-3">
                                            <label htmlFor="exampleInputPassword1 ">
                                                ISBN
                                            </label>

                                            <Field
                                                type="string"
                                                name="ISBN"
                                                className="form-control  border-info"
                                            />

                                            <ErrorMessage
                                                name="ISBN"
                                                render={(msg) => (
                                                    <small style={{ color: "red" }}>{msg}</small>
                                                )}
                                            />
                                        </div>}

                                        {colorOptionField && <div className="form-group col-4 mt-3">
                                            <label htmlFor="exampleInputPassword1 ">
                                                Color
                                            </label>

                                            <Field
                                                type="string"
                                                name="Color"
                                                className="form-control  border-info"
                                            />

                                            <ErrorMessage
                                                name="Color"
                                                render={(msg) => (
                                                    <small style={{ color: "red" }}>{msg}</small>
                                                )}
                                            />
                                        </div>}
                                    </div>
                                </div>

                                <div className="d-flex justify-content-center p-3  w-100">
                                    <button
                                        type="submit"
                                        className="text-white w-25 bg-btn-bg auth_btn"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <span
                                                    className="spinner-border spinner-border-sm"
                                                    data-bs-toggle="offcanvas" data-bs-target="#addoffcanvasRight" aria-controls="offcanvasRight"
                                                ></span>
                                                <span className="ms-2" role="status">
                                                    Loading...
                                                </span>
                                            </>
                                        ) : (
                                            "Submit"
                                        )}
                                    </button>
                                </div>
                            </Form>
                        );
                    }}
                </Formik>
            </div>
        </div>
    )
}

export default BomCreate