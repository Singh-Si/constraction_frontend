import * as Yup from "yup";

export const validationSchema = Yup.object({
    name: Yup.string()
        .min(4, 'Name must be at least 4 digits').required("Name is required"),
    role: Yup.string()
        .required('Role is required'),
    email: Yup.string().required("Email is required"),
    
})