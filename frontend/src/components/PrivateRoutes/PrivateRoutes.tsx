import { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { ROUTES } from "constant";
import { Loader } from "components/Loaders/Loader";
import { Layout } from "components/Layout";

import { IPrivateRoutesProps } from "./types";
import { PageWrapper, Wrapper } from "./styles";

const PrivateRoutes: FC<IPrivateRoutesProps> = ({ status }) => {
  if (status === "error") return <Navigate to={ROUTES.LOGIN} />;

  return status === "loading" ? (
    <Wrapper>
      <Loader />
    </Wrapper>
  ) : (
    <Layout>
      <PageWrapper>
        <Outlet />
      </PageWrapper>
    </Layout>
  );
};

export default PrivateRoutes;
