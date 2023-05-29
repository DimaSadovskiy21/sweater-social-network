import { useFormik } from 'formik';

import { useForgotPassword } from 'api/auth';

import ForgotPassword from './ForgotPassword';
import { validationSchema } from './validation';
import { INITIAL_VALUES } from './constants';

const ForgotPasswordContainer = () => {
  const { isLoading, mutate: forgotPassword } = useForgotPassword();

  const formik = useFormik({
    initialValues: INITIAL_VALUES,
    validationSchema,
    validateOnBlur: true,
    onSubmit: (values, { resetForm }) => {
      forgotPassword(values);
      resetForm({ values: INITIAL_VALUES });
    },
  });

  return <ForgotPassword formik={formik} isLoading={isLoading} />;
};

export default ForgotPasswordContainer;
