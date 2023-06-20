import { ChangeEvent } from "react";

import { IPostResponse } from "types/post";

export interface IPostContainerProps extends IPostResponse {}

export interface IPostProps
  extends Omit<IPostResponse, "author" | "createdAt" | "updatedAt"> {
  username: string;
  editContent: boolean;
  isOwner: boolean;
  isLoading: boolean;
  contentLocal: string;
  handleClickEditStatus: () => void;
  handleClickDeletePost: () => void;
  handleChangeContent: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  handleBlurSaveContent: () => void;
}

export interface IPostWrapperProps {
  isLoading: boolean;
}
