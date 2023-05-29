import { FC } from "react";

import { FormLayout } from "components/FormLayout";
import { Input } from "components/Input";
import { Button } from "components/Button";

import { IForgotPasswordValues } from "./types";
import { IPagesProps } from "../types";

const ForgotPassword: FC<IPagesProps<IForgotPasswordValues>> = ({ formik, isLoading }) => {
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

      <Button type="submit" disabled={isLoading} isLoading={isLoading}>Send Email</Button>
    </FormLayout>
  );
};

export default ForgotPassword;
