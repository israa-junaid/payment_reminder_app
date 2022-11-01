import * as yup from "yup";

export const userSchema = yup.object().shape({
  name: yup.string("Must be text"),
  taxRate: yup.number("Must be a number"),
  minRange: yup
    .number("Must be a number")
    .integer("Please enter a whole number"),
  maxRange: yup
    .number("Must be a number")
    .integer("Please enter a whole number")
    .moreThan(yup.ref("minRange"), "Cannot be lower than Min Value"),
});
