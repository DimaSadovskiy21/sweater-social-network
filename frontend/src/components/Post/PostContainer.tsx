import { ChangeEvent, FC, useState } from "react";

import { useUserProfileCache } from "hooks";
import { useDeletePost, useUpdatePost } from "api/posts";

import { IPostContainerProps } from "./types";
import Post from "./Post";

const PostContainer: FC<IPostContainerProps> = ({
  _id,
  content,
  favoritedBy,
  author,
}) => {
  const { isLoading: isUpdatePostLoading, mutate: updatePostMutate } =
    useUpdatePost();

  const { isLoading: isDeletePostLoading, mutate: deletePostMutate } =
    useDeletePost();

  const [editContent, setEditContent] = useState(false);

  const [contentLocal, setContentLocal] = useState(content);

  const handleClickDeletePost = () => deletePostMutate({ postId: _id });

  const handleClickEditStatus = () => setEditContent(true);

  const handleChangeContent = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContentLocal(event.target.value);
  };

  const handleBlurSaveContent = () => {
    const contentLocalTrim = contentLocal.trim();
    content !== contentLocalTrim &&
      updatePostMutate({ postId: _id, content: contentLocalTrim });
    setEditContent(false);
  };

  const { _id: authorId, username } = author;

  const userProfile = useUserProfileCache();

  const userId = userProfile?._id;

  const isOwner = userId === authorId;

  const isLoading = isUpdatePostLoading || isDeletePostLoading;

  return (
    <Post
      _id={_id}
      content={content}
      favoritedBy={favoritedBy}
      username={username}
      isOwner={isOwner}
      isLoading={isLoading}
      editContent={editContent}
      contentLocal={contentLocal}
      handleClickEditStatus={handleClickEditStatus}
      handleClickDeletePost={handleClickDeletePost}
      handleChangeContent={handleChangeContent}
      handleBlurSaveContent={handleBlurSaveContent}
    />
  );
};

export default PostContainer;
