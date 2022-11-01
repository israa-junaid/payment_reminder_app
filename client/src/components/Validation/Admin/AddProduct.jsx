import * as yup from "yup";

export const userSchema = yup.object().shape({
  name: yup.string(),
  image: yup.string(),
  description: yup.string(),
  price: yup.string(),
  type: yup.string(),
});
