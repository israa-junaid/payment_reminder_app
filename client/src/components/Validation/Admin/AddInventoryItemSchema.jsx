import * as yup from "yup";

export const userSchema = yup.object().shape({
  name: yup.string("Enter a valid Name"),
  category: yup.string(),
  vendor: yup.string("Enter a valid Vendor"),
  costPrice: yup.number("Enter a numeric value"),
  quantity: yup.number("Enter a numeric value"),
  purchaseOn: yup.string(),
  description: yup.string(),
});
