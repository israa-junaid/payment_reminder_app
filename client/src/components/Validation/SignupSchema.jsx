import * as yup from "yup";

export const userSchema = yup.object().shape({
  username: yup.string().required("Name is required"),
  
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email address is required"),
 
  password: yup.string().required("Password is required"),

});
