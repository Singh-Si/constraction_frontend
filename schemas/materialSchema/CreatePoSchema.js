import * as Yup from "yup";

export const CreatePoSchema = Yup.object({
    poid: Yup.string().required("Please Enter PO"),
    vendorId: Yup.string().required("Please Select any Vender Or create one"),
    expectedDelivery: Yup.string().required("Please Enter Expected Delivery Date"),
    deliveryAddress: Yup.string().required("Please Enter Delivery Address"),
})