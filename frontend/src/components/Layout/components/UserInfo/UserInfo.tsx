import { useQueryClient } from "@tanstack/react-query";

import { IUserResponse } from "types/user";
import { QUERY_KEYS } from "api/constants";

import { UserAvatarWrapper, UserInfoWrapper, Username } from "./styles";
import { Avatar } from "./components/Avatar";
import { Status } from "./components/Status";

const UserInfo = () => {
  const queryClient = useQueryClient();
  const userProfile = queryClient.getQueryData<IUserResponse>([
    QUERY_KEYS.USER_PROFILE,
  ]);

  const username = userProfile?.username;

  return (
    <UserInfoWrapper>
      <UserAvatarWrapper>
        <Avatar />
        {username && <Username>@{username}</Username>}
      </UserAvatarWrapper>
      <Status/>
      
    </UserInfoWrapper>
  );
};

export default UserInfo;
