import * as Yup from "yup";

export const createSiteValidation = Yup.object({
    name: Yup.string().required("Name is required"),
    startDate: Yup.date().required('Start Date is required'),
    endDate: Yup.date().required("End Date is required"),
})