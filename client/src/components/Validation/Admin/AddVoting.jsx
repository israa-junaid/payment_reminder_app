import * as yup from "yup";

export const userSchema = yup.object().shape({
  voteName: yup.string(),
  startTime: yup.string(),
  endTime: yup.string(),
  date: yup.string(),
  // choices: yup.array().min(2, "Minimum two polling options required"),
});
