import * as yup from "yup";

export const userSchema = yup.object().shape({
  name: yup.string(),
  salary: yup.number("Must be a number").integer("Please enter a whole number"),
  health_allowance: yup
    .number("Must be a number")
    .integer("Please enter a whole number"),
  fuel_allowance: yup
    .number("Must be a number")
    .integer("Please enter a whole number"),
});
