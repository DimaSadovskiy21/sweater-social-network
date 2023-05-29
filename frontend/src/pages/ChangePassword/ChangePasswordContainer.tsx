import { useFormik } from 'formik';
import { useParams } from 'react-router-dom';

import { useChangePassword } from 'api/auth';

import ChangePassword from './ChangePassword';
import { validationSchema } from './validation';
import { INITIAL_VALUES } from './constants';

const ChangePasswordContainer = () => {
  const { token } = useParams();

  const { isLoading, mutate: changePassword } = useChangePassword();

  const formik = useFormik({
    initialValues: INITIAL_VALUES,
    validationSchema,
    validateOnBlur: true,
    onSubmit: ({ password }, { resetForm }) => {
      changePassword({ password, token });
      resetForm({ values: INITIAL_VALUES });
    },
  });

  return <ChangePassword formik={formik} isLoading={isLoading} />;
};

export default ChangePasswordContainer;
