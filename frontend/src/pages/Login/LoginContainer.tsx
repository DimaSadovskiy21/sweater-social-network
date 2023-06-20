import { useFormik } from 'formik';

import { useLogin } from 'api/auth';

import Login from './Login';
import { validationSchema } from './validation';
import { INITIAL_VALUES } from './constants';

export const LoginContainer = () => {
  const { isLoading: isLoginLoading, mutate: loginMutate } = useLogin();

  const formik = useFormik({
    initialValues: INITIAL_VALUES,
    validationSchema,
    validateOnBlur: true,
    onSubmit: (values) => {
      loginMutate(values);
    },
  });

  return <Login formik={formik} isLoading={isLoginLoading} />;
};

export default LoginContainer;
