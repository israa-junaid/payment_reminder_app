import * as yup from "yup";

export const userSchema = yup.object().shape({
  title: yup.string(),
  type: yup.string(),
  coins: yup.number("Please enter a number"),
});
