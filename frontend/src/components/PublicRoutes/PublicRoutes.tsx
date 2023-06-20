import { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { ROUTES } from "constant";
import { Loader } from "components/Loaders/Loader";

import { IPublicRoutesProps } from "./types";
import { PublicWrapper } from "./styles";

const PublicRoutes: FC<IPublicRoutesProps> = ({ status }) => {
  if (status === "success") return <Navigate to={ROUTES.HOME} />;

  return (
    <PublicWrapper>
      {status === "loading" ? <Loader /> : <Outlet />}
    </PublicWrapper>
  );
};

export default PublicRoutes;
