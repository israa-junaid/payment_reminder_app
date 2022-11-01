import * as yup from "yup";

export const userSchema = yup.object().shape({
  username: yup.string().required("Name is required"),
  phone: yup
    .string()
    .required("Contact is required")
    .matches(
      /^((\+92)?(0092)?(92)?(0)?)(3)([0-9]{9})$/gm,
      "Enter Contact in the format 030XXXXXXXXX"
    ),
  nic: yup
    .string()
    .required("NIC is required")
    .matches(/^[0-9]{13}$/, "CNIC must be 13 digits long without any symbols"),
  designation: yup.string().required("Designation is required"),
  salary: yup.string().required("Salary is required"),
  address: yup.string().required("Address is required"),
  maritalStatus: yup.string().required("Maritial Status is required"),
  dateOfBirth: yup
    .string("Enter your Date of Birth")
    .required("Date of Birth is required"),
  emerg_name: yup.string().required("Emergency Name is required"),
  autoID: yup.string().required("ID Generation method is required"),
  emerg_contact: yup
    .string()
    .required("Emergency Contact is required")
    .matches(
      /^((\+92)?(0092)?(92)?(0)?)(3)([0-9]{9})$/gm,
      "Enter Contact in the format 030XXXXXXXXX"
    ),
  temp: yup.string(),
  office_start: yup.string().required("Office Start time is required"),
  office_end: yup.string().required("Office End time is required"),
  gender: yup.string().required("Gender is required"),
  photo: yup.string(),
});
