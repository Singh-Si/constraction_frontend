import * as Yup from "yup";

export const bomValidationSchema = Yup.object({
    materialName: Yup.string().required("Material Name is required"),
    uom: Yup.string().required("UOM is required"),
    gst: Yup.string().required("GST is required"),
})