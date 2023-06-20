import { object, string } from "yup";

import { ERRORS } from "constant";

export const validationSchema = object().shape({
  password: string().required(ERRORS.REQUIRED).min(8, ERRORS.PASSWORD),
});
