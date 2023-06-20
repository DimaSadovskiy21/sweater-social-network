import { useLocation } from "react-router-dom";

import { ROUTES } from "constant";

import { LinkStyled, NavbarWrapper } from "./styles";


const Navbar = () => {
  const { pathname } = useLocation();

  return (
    <NavbarWrapper>
      <LinkStyled to={ROUTES.PROFILE} $isActive={pathname === ROUTES.PROFILE}>
        profile
      </LinkStyled>

      <LinkStyled to={ROUTES.POSTS} $isActive={pathname === ROUTES.POSTS}>
        posts
      </LinkStyled>
      <LinkStyled
        to={ROUTES.FAVORITES}
        $isActive={pathname === ROUTES.FAVORITES}
      >
        favorites
      </LinkStyled>
    </NavbarWrapper>
  );
};

export default Navbar;
