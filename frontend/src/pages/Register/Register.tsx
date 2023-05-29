import { FC } from "react";
import { NavLink } from "react-router-dom";

import { FormLayout } from "components/FormLayout";
import { Input } from "components/Input";
import { Button } from "components/Button";
import { ROUTES } from "common/constants";

import { IRegisterValues } from "./types";
import { SignIn } from "./styles";
import { IPagesProps } from "../types";

const Register: FC<IPagesProps<IRegisterValues>> = ({ formik, isLoading }) => {
  const { values, errors, touched, handleSubmit, handleBlur, handleChange } =
    formik;

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
        type="text"
        placeholder="Username"
        name="username"
        value={values.username}
        onBlur={handleBlur}
        onChange={handleChange}
        touched={touched.username}
        errorMessage={errors.username}
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
        Sign Up
      </Button>

      <SignIn>
        Already have an acount ? <NavLink to={ROUTES.LOGIN}>Sign In</NavLink>
      </SignIn>
    </FormLayout>
  );
};

export default Register;
