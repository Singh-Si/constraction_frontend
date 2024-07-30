import * as Yup from "yup";

export const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  number: Yup.number()
    .typeError('Floor Number must be a number') // Display error if not a number
    .required('Floor Number is required')
    .min(-4, 'Floor Number must be greater than -4')
    .max(999, 'Floor Number must be less than or equal to 999')
})