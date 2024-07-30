import * as Yup from "yup";

export const validationSchema = Yup.object({
    name: Yup.string()
        .min(4, 'Phone number must be at least 4 digits').required("Name is required"),
    phone: Yup.string()
        .matches(/^\d+$/, 'Only digits are allowed')
        .min(10, 'Phone number must be at most 10 digits')
        .max(10, 'Phone number must be at most 10 digits')
        .required('Phone number is required'),
    email: Yup.string().required("Email is required"),
})