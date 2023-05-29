import { FC } from 'react';
import { Link } from 'react-router-dom';

import { FormLayout } from "components/FormLayout";
import { Input } from "components/Input";
import { Button } from "components/Button";
import { ROUTES } from 'common/constants';

import { ILoginValues } from './types';
import { Links } from './styles';

import { IPagesProps } from '../types';

const Login: FC<IPagesProps<ILoginValues>> = ({ formik, isLoading }) => {
  const { values, errors, touched, handleSubmit, handleBlur, handleChange } = formik;

  return (
    <FormLayout onSubmit={handleSubmit}>
      <Input
        type="email"
        placeholder="Email"
        name="email"
        value={values.email}
        onBlur={handleBlur}
        onChange={handleChange}
        touched={touched.email}
        errorMessage={errors.email}
        disabled={isLoading}
      />

      <Input
        type="password"
        placeholder="Password"
        name="password"
        value={values.password}
        onBlur={handleBlur}
        onChange={handleChange}
        touched={touched.password}
        errorMessage={errors.password}
        autoComplete="on"
        disabled={isLoading}
      />

      <Button type="submit" disabled={isLoading} isLoading={isLoading}>
        Sign In
      </Button>

      <Links>
        <p>
          Don't you have an account? <Link to={ROUTES.REGISTER}>Click here!</Link>
        </p>
        <p>
          Forgot your password? <Link to={ROUTES.FORGOT_PASSWORD}>Click here!</Link>
        </p>
      </Links>
    </FormLayout>
  );
};

export default Login;
