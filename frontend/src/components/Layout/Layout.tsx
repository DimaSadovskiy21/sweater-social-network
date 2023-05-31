import { Outlet } from "react-router-dom";

import { Header } from "./components/Header";
import { UserInfo } from "./components/UserInfo";
import { Container, Main } from "./styles";

const Layout = () => {
  

  return (
    <Container>
       <Header />
      <Main>
        <Outlet />
     <UserInfo  />
      </Main>
    </Container>
  );
};

export default Layout;
