import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  url: Yup.string().url().required("required"),
});

export const signInValidationSchema = Yup.object().shape({
  username: Yup.string().required("username is required"),
  password: Yup.string().required("password URL is required"),
});
