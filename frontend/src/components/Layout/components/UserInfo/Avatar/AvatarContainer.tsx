import { ChangeEvent, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { useChangeAvatar } from "api/user";
import { IUserResponse } from "types/user";
import { QUERY_KEYS } from "api/constants";
import Avatar from "./Avatar";

const AvatarContainer = () => {
  const { isLoading, mutate: changeAvatar } = useChangeAvatar();

  const [isShowChangeAvatar, setIsShowChangeAvatar] = useState(false);

  const handleMouseEnterShowChangeAvatar = () => setIsShowChangeAvatar(true);
  const handleMouseLeaveShowChangeAvatar = () => setIsShowChangeAvatar(false);

  const uploadAvatar = useRef<HTMLInputElement | null>(null);

  const handleClickUploadAvatar = () => uploadAvatar.current?.click();

  const handleChangeUploadAvatar = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    const formData = new FormData();
    selectedFile && formData.append("file", selectedFile);

    changeAvatar(formData);
  };

  const queryClient = useQueryClient();
  const userProfile = queryClient.getQueryData<IUserResponse>([
    QUERY_KEYS.USER_PROFILE,
  ]);

  const avatar = userProfile?.avatar;

  return (
    <Avatar
      avatar={avatar}
      isLoading={isLoading}
      isShowChangeAvatar={isShowChangeAvatar}
      uploadAvatar={uploadAvatar}
      handleMouseEnterShowChangeAvatar={handleMouseEnterShowChangeAvatar}
      handleMouseLeaveShowChangeAvatar={handleMouseLeaveShowChangeAvatar}
      handleClickUploadAvatar={handleClickUploadAvatar}
      handleChangeUploadAvatar={handleChangeUploadAvatar}
    />
  );
};

export default AvatarContainer;
