import * as yup from "yup";

export const userSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email address is required"),
});
