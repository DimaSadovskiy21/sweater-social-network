import { useQueryClient } from "@tanstack/react-query";

import { IUserResponse } from "types/user";
import { QUERY_KEYS } from "api/constants";

import { ActivityInfoWrapper, UserAvatarWrapper, UserInfoWrapper, Username } from "./styles";
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
      <ActivityInfoWrapper>
        <p>Likes 25</p> <p>Posts 25</p>
      </ActivityInfoWrapper>
    </UserInfoWrapper>
  );
};

export default UserInfo;
