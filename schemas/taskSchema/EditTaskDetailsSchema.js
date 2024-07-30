import * as Yup from "yup";

export const validationSchema = Yup.object({
    taskno: Yup.string().required("Task Number is required"),
    startdate: Yup.string().required("Start Date is required"),
    enddate: Yup.string().required("End date is required"),
    estimatedcost: Yup.string().required("Estimated Cost is required"),
    totalcost: Yup.string().required("Total Cost is required"),
})