import { FC } from "react";
import { NavLink } from "react-router-dom";

import { ROUTES } from "constant";
import { FormLayout } from "components/FormLayout";
import { Input } from "components/Input";
import { Button } from "components/Button";
import { IPagesProps } from "types/pages";

import { SignIn } from "./styles";
import { IRegisterValues } from "./types";

const Register: FC<IPagesProps<IRegisterValues>> = ({ formik, isLoading }) => {
  const { errors, touched, handleSubmit, getFieldProps } = formik;

  return (
    <FormLayout onSubmit={handleSubmit}>
      <Input
        type="text"
        placeholder="Username"
        touched={touched.username}
        errorMessage={errors.username}
        disabled={isLoading}
        {...getFieldProps("username")}
      />

      <Input
        type="email"
        placeholder="Email"
        touched={touched.email}
        errorMessage={errors.email}
        disabled={isLoading}
        {...getFieldProps("email")}
      />

      <Input
        type="password"
        placeholder="Password"
        touched={touched.password}
        errorMessage={errors.password}
        disabled={isLoading}
        {...getFieldProps("password")}
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
