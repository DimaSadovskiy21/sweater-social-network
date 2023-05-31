import { useQueryClient } from "@tanstack/react-query";

import { IUserResponse } from "types/user";
import { QUERY_KEYS } from "api/constants";

import { UserAvatarWrapper, UserInfoWrapper, Username } from "./styles";
import { Avatar } from "./Avatar";

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
        {username && <Username>{username}</Username>}
      </UserAvatarWrapper>
      <p>gfggfgfggf</p>
      <div>
        <p>Likes 25</p> <p>Posts 25</p>
      </div>
    </UserInfoWrapper>
  );
};

export default UserInfo;
