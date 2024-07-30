import * as Yup from "yup";

export const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    // workcategory: Yup.string().required("Name is required"),
    startdate: Yup.date().required('Start Date is required'),
    enddate: Yup.date()
        .required("End Date is required")
        .min(Yup.ref("startDate"), "End Date Not be selected before Start Date"),
    estimatedcost: Yup.string().required("Name is required"),
    totalcost: Yup.string().required("Name is required"),
})