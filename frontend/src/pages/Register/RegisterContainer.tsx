import { useFormik } from 'formik';

import Register from './Register';
import { validationSchema } from './validation';
import { INITIAL_VALUES } from './constants';
import { useRegister } from 'api/auth';

const RegisterContainer = () => {
  const { isLoading, mutate: register } = useRegister();

  const formik = useFormik({
    initialValues: INITIAL_VALUES,
    validationSchema,
    validateOnBlur: true,
    onSubmit: (values, { resetForm }) => {
      register(values);
      resetForm({ values: INITIAL_VALUES });
    },
  });

  return <Register formik={formik} isLoading={isLoading} />;
};

export default RegisterContainer;
