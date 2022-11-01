import * as yup from "yup";

export const userSchema = yup.object().shape({
  complainName: yup.string(),
  description: yup.string(),
});
