import * as Yup from "yup";

export const validationSchema = Yup.object({
    siteName: Yup.string()
        .min(4, 'Name must be at least 4 digits').required("Site Name is required"),
    clientName: Yup.string()
        .min(4, 'Name must be at least 4 digits').required("Client Name is required"),
})