import { FC } from "react";

import { IPostProps } from "./types";
import {
  ButtonsWrapper,
  DeletePostStyled,
  EditPostField,
  EditPostStyled,
  InfoPostWrapper,
  PostWrapper,
} from "./styles";
import { ToggleFavorite } from "./components/ToggleFavorite";

const Post: FC<IPostProps> = ({
  _id,
  content,
  favoritedBy,
  username,
  isOwner,
  isLoading,
  editContent,
  contentLocal,
  handleClickEditStatus,
  handleClickDeletePost,
  handleChangeContent,
  handleBlurSaveContent,
}) => {
  return (
    <PostWrapper isLoading={isLoading}>
      {isOwner && (
        <ButtonsWrapper>
          <EditPostStyled onClick={handleClickEditStatus} />
          <DeletePostStyled onClick={handleClickDeletePost} />
        </ButtonsWrapper>
      )}
      {editContent ? (
        <EditPostField
          value={contentLocal}
          onChange={handleChangeContent}
          onBlur={handleBlurSaveContent}
          autoFocus
        />
      ) : (
        <p>{content}</p>
      )}
      <InfoPostWrapper>
        <p>author: @{username}</p>
        <ToggleFavorite postId={_id} favoritedBy={favoritedBy} />
      </InfoPostWrapper>
    </PostWrapper>
  );
};

export default Post;
