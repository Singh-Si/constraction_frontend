import * as Yup from "yup";

export const validationSchema = Yup.object({
    name: Yup.string().required("Task Name is required"),
    workCategory: Yup.string().required("Work Category is required"),
    startDate: Yup.string().required("Start Date is required"),
    endDate: Yup.string().required("End date is required"),
    // expectedCost: Yup.string().required("Estimated Cost is required"),
})