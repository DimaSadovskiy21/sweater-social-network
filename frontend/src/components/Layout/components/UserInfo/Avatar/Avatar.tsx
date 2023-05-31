import { FC } from "react";

import { NoAvatarLarge } from "assets/vectors";
import { MiniLoader } from "components/MiniLoader";

import { IAvatarProps } from "./types";

import {
  AvatarWrapper,
  ChooseFile,
  NoAvatarWrapper,
  Overline,
  UserAvatar,
} from "./styles";

const Avatar: FC<IAvatarProps> = ({
  avatar,
  isLoading,
  isShowChangeAvatar,
  uploadAvatar,
  handleMouseEnterShowChangeAvatar,
  handleMouseLeaveShowChangeAvatar,
  handleClickUploadAvatar,
  handleChangeUploadAvatar,
}) => {
  return (
    <AvatarWrapper
      onMouseEnter={handleMouseEnterShowChangeAvatar}
      onMouseLeave={handleMouseLeaveShowChangeAvatar}
    >
      {avatar ? (
        <UserAvatar src={avatar} alt="avatar" />
      ) : (
        <NoAvatarWrapper>
          <NoAvatarLarge />
        </NoAvatarWrapper>
      )}
      <Overline
        $isShowChangeAvatar={isShowChangeAvatar}
        $isLoading={isLoading}
        onClick={handleClickUploadAvatar}
      >
        {isLoading ? <MiniLoader /> : <p>change avatar</p>}
      </Overline>
      <ChooseFile
        type="file"
        onChange={handleChangeUploadAvatar}
        ref={uploadAvatar}
        accept="image/*, .png, .jpg, .gif, .web"
      />
    </AvatarWrapper>
  );
};
export default Avatar;
