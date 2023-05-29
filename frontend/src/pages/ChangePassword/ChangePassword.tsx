import { FC } from "react";

import { FormLayout } from "components/FormLayout";
import { Input } from "components/Input";
import { Button } from "components/Button";

import { IChangePasswordValues } from "./types";
import { IPagesProps } from "../types";

const ChangePassword: FC<IPagesProps<IChangePasswordValues>> = ({ formik, isLoading }) => {
  const { values, errors, touched, handleSubmit, handleBlur, handleChange } =
    formik;

  return (
    <FormLayout onSubmit={handleSubmit} >
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

      <Button type="submit" disabled={isLoading} isLoading={isLoading}>Change Password</Button>
    </FormLayout>
  );
};

export default ChangePassword;
