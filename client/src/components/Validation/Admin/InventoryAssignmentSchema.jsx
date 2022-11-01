import * as yup from "yup";

export const userSchema = yup.object().shape({
  userId: yup.string().required("Username is required"),
  inventoryId: yup.string().required("Inventory Item is required"),
});
