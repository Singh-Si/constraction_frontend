import * as Yup from "yup";

export const CreatIndentSchema = Yup.object({
    assignUser: Yup.string().required("Assign User is required"),
    startDate: Yup.string().required("Start Date is required"),
})