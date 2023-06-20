import { object, string } from "yup";

import { ERRORS } from "constant";

export const validationSchema = object().shape({
  email: string().required(ERRORS.REQUIRED).email(ERRORS.EMAIL),
});
