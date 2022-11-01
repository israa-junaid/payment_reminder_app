import * as yup from "yup";
import { format } from "date-fns";
const date = new Date();
export const userSchema = yup.object().shape({
  username: yup.string(),
  email: yup
    .string()

    .email("Please enter a valid email address"),
  password: yup.string(),
  phone: yup
    .string()

    .matches(
      /^((\+92)?(0092)?(92)?(0)?)(3)([0-9]{9})$/gm,
      "Enter Contact in the format 030X-XXXXXXXX"
    ),
  nic: yup
    .string()

    .matches(/^[0-9]{13}$/, "CNIC must be 13 digits long"),
  designation: yup.string(),
  department: yup.string(),
  maritalStatus: yup.string(),
  dateOfBirth: yup.date(),
  emerg_name: yup.string(),
  emerg_contact: yup
    .string()

    .matches(
      /^((\+92)?(0092)?(92)?(0)?)(3)([0-9]{9})$/gm,
      "Enter Contact in the format 030X-XXXXXXXX"
    ),
  gender: yup.string(),
  JoiningDate: yup.date(),
  role: yup.string(),
  photo: yup.string(),
  leaves: yup.string(),
  supervisedBy: yup.string(),
});
