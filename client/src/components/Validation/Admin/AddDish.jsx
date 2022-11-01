import * as yup from "yup";

export const userSchema = yup.object().shape({
  image: yup.string(),
  name: yup.string(),
  description: yup.string(),
});
