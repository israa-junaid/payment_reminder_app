import * as yup from "yup";

export const userSchema = yup.object().shape({
  name: yup.string(),
  arrivalTime: yup.string(),
  departureTime: yup.string(),
});
