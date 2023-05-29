import { FC } from "react";

import { IButtonProps } from "./types";
import { CustomButton } from "./styles";
import { MiniLoader } from "../MiniLoader";

const Button: FC<IButtonProps> = ({ children, isLoading, ...restProps }) => (
  <CustomButton {...restProps}>
    {isLoading ? <MiniLoader /> : children}
  </CustomButton>
);

export default Button;
