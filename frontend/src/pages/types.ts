import { FormikProps } from 'formik';

export interface IPagesProps<T> {
  formik: Pick<
    FormikProps<T>,
    'values' | 'errors' | 'touched' | 'handleSubmit' | 'handleBlur' | 'handleChange'
  >;
  isLoading: boolean;
}
