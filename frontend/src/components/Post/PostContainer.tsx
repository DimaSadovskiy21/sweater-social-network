import { ChangeEvent, FC, useState } from "react";

import { useDeletePost, useUpdatePost } from "api/posts";

import { IPostContainerProps } from "./types";
import Post from "./Post";

const PostContainer: FC<IPostContainerProps> = ({
  _id,
  content,
  favoritedBy,
  author,
}) => {
  const { mutate: updatePost } = useUpdatePost();

  const { mutate: deletePost } = useDeletePost();

  const [editContent, setEditContent] = useState(false);

  const [contentLocal, setContentLocal] = useState(content);

  const handleClickDeletePost = () => deletePost({ postId: _id });

  const handleClickEditStatus = () => setEditContent(true);

  const handleChangeContent = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContentLocal(event.target.value);
  };

  const handleBlurSaveContent = () => {
    updatePost({ postId: _id, content: contentLocal.trim() });
    setEditContent(false);
  };

  const { username } = author;

  return (
    <Post
      _id={_id}
      content={content}
      favoritedBy={favoritedBy}
      username={username}
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
