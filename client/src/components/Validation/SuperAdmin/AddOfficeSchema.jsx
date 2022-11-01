import * as yup from "yup";

export const userSchema = yup.object().shape({
  title: yup.string(),
  description: yup.string(),
  dueDate: yup
  .string("Enter Due date")
  .required("Due date is required"),
 
});
