import * as Yup from "yup";

export const validationSchema = Yup.object({
    taskno: Yup.string().required("Task Number is required"),
    
})