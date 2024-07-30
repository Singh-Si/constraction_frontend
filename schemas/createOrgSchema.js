import * as Yup from "yup";

export const validationSchema = Yup.object({
    name: Yup.string().required(" Name is required"),
    phone: Yup.string()
        .matches(/^\d+$/, 'Only digits are allowed')
        .min(10, 'Phone number must be at least 10 digits')
        .max(10, 'Phone number must be at most 10 digits')
        .required('Phone number is required'),
    email: Yup.string().required("Email is required"),
   
})

export const SitevalidationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    address: Yup.string().required("Address is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
    pin_code: Yup.string().required("Pin Code is required"),
    gst_number: Yup.string().required("GST Number is required"),
    pan_number: Yup.string().required("Pan Code is required"),
    phone: Yup.string()
        .matches(/^\d+$/, 'Only digits are allowed')
        .min(10, 'Phone number must be at most 10 digits')
        .max(10, 'Phone number must be at most 10 digits')
        .required('Phone number is required'),
    email: Yup.string().required("Email is required"),
})