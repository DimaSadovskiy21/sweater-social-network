import { FC } from "react";

import { Logo } from "assets";

import { IFormLayoutProps } from "./types";
import { FormWrapper, Title, TitleWrapper } from "./styles";

const FormLayout: FC<IFormLayoutProps> = ({
  children,
  ...restProps
}) => (
  <FormWrapper {...restProps}>
    <TitleWrapper>
      <Logo />
      <Title>Sweater</Title>
    </TitleWrapper>
    {children}
  </FormWrapper>
);
export default FormLayout;
