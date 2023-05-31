import { useQueryClient } from "@tanstack/react-query";

import { useLogout } from "api/auth";
import { QUERY_KEYS } from "api/constants";
import { IUserResponse } from "types/user";

import { ROUTES } from "common/constants";
import { Button } from "components/Button";
import { Navbar } from "components/Navbar";
import { NoAvatarSmall, Logo } from "assets/vectors";

import {
  HeaderWrapper,
  LogoTitle,
  LogoWrapper,
  MenuWrapper,
  UserAvatar,
  NoAvatarWrapper,
} from "./styles";

export const Header = () => {
  const { isLoading, mutate: logout } = useLogout();

  const queryClient = useQueryClient();
  const userProfile = queryClient.getQueryData<IUserResponse>([
    QUERY_KEYS.USER_PROFILE,
  ]);

  const avatar = userProfile?.avatar;

  return (
    <HeaderWrapper>
      <LogoWrapper to={ROUTES.HOME}>
        <Logo />
        <LogoTitle>Sweater</LogoTitle>
      </LogoWrapper>
      <MenuWrapper>
        <Navbar />
        {avatar ? (
          <UserAvatar src={avatar} alt="avatar" />
        ) : (
          <NoAvatarWrapper>
            <NoAvatarSmall />
          </NoAvatarWrapper>
        )}
        <Button isLoading={isLoading} onClick={logout}>
          Logout
        </Button>
      </MenuWrapper>
    </HeaderWrapper>
  );
};

export default Header;
