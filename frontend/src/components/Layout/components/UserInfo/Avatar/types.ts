import { ChangeEvent, Ref } from "react";

export interface IAvatarProps {
  avatar: string | undefined;
  isLoading: boolean;
  isShowChangeAvatar: boolean;
  uploadAvatar: Ref<HTMLInputElement>;
  handleMouseEnterShowChangeAvatar: () => void;
  handleMouseLeaveShowChangeAvatar: () => void;
  handleClickUploadAvatar: () => void;
  handleChangeUploadAvatar: (event: ChangeEvent<HTMLInputElement>) => void;
}

export interface IOverlineStyledProps {
  $isShowChangeAvatar: boolean;
  $isLoading: boolean;
}
