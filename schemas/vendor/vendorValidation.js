import * as Yup from "yup";

export const vendorValidation = Yup.object({
  vendorName: Yup.string().required("Vendor Name is required"),
  address: Yup.string().required("Address is required"),
  contactPerson: Yup.string().required("Contact Person is required"),
  contactNo: Yup.string().required().matches(/^\d{10}$/,"Contact No must be 10 digit"),
  vendorEmail: Yup.string().required("Email is required"),
});

export const financeDetailValidation = Yup.object({
    gstTreatment:Yup.string().required("GST Treatment is required."),
    gstIn:Yup.string().required("GST IN is required."),
    pan:Yup.string().required("PAN is required")
});
