import * as yup from "yup";

export const userSchema = yup.object().shape({
  name: yup.string(),
  gradeSelected: yup.string(),
  salary: yup
    .number("Must be a number")
    .integer("Please enter a whole number")
    .when("gradeSelected", {
      is: "manual",
      then: yup.number("Must be a number"),
    }),
  health_allowance: yup
    .number("Must be a number")
    .integer("Please enter a whole number")
    .when("gradeSelected", {
      is: "manual",
      then: yup.number("Must be a number"),
    }),
  fuel_allowance: yup
    .number("Must be a number")
    .integer("Please enter a whole number")
    .when("gradeSelected", {
      is: "manual",
      then: yup.number("Must be a number"),
    }),
  gradeId: yup.string().when("gradeSelected", {
    is: "grade",
    then: yup.string(),
  }),
});
