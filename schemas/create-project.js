import * as Yup from "yup";

export const validationSchema = Yup.object({
<<<<<<< HEAD
    name: Yup.string().required("Name is required"),
    startDate: Yup.date().required('Start Date is required'),
    endDate: Yup.date()
      .required("End Date is required")
      .min(Yup.ref("startDate"), "End Date Not be selected before Start Date"),
  })
=======
  name: Yup.string().required("Name is required"),
  startDate: Yup.date().required("Start Date is required"),
  endDate: Yup.date()
    .required("End Date is required")
    .min(Yup.ref("startDate"), "End Date Not be selected before Start Date"),
  address: Yup.string().required("Address is required"),
  selectedSitePoc: Yup.string().required("Please select a member"),
  selectOption1: Yup.string().required("Please select a member"),
});
>>>>>>> 463abe6 (frontend additonals changes made)
