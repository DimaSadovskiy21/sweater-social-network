import { useFormik } from "formik";

import { useRegister } from "api/auth";

import { INITIAL_VALUES } from "./constants";
import Register from "./Register";
import { validationSchema } from "./validation";

const RegisterContainer = () => {
  const { isLoading: isRegisterLoading, mutate: registerMutate } = useRegister();

  const formik = useFormik({
    initialValues: INITIAL_VALUES,
    validationSchema,
    validateOnBlur: true,
    onSubmit: (values) => {
      registerMutate(values);
    },
  });

  return <Register formik={formik} isLoading={isRegisterLoading} />;
};

export default RegisterContainer;
