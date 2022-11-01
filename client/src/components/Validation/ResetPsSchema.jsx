import * as yup from "yup";

export const userSchema = yup.object({
  password: yup.string().required("Password is required"),
  passwordConfirmation: yup
    .string()
    .test("passwords-match", "Passwords must match", function (value) {
      return this.parent.password === value;
    }),
});
