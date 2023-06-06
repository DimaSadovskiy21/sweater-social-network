import { FC, useState } from "react";

import { IPostProps } from "./types";
import { DeletePostStyled, EditPostStyled, PostWrapper } from "./styles";
import { ToggleFavorite } from "./components/ToggleFavorite";
import { useDeletePost } from "api/posts/useDeletePost";

const Post: FC<IPostProps> = ({ _id, content, favoritedBy, author }) => {
  const { username } = author;

  const { mutate: deletePost } = useDeletePost();

  const [editStatus, setEditStatus] = useState(false);

  const [contentLocal, setContentLocal] = useState(content)

  const handleClickDeletePost = () => deletePost({ postId: _id });

  const handleClickEditStatus = () => setEditStatus(!editStatus);

  return (
    <PostWrapper>
      <DeletePostStyled onClick={handleClickDeletePost} />
      <EditPostStyled onClick={handleClickEditStatus} />
      {editStatus ? <textarea value={contentLocal}/> : <p>{contentLocal}</p>}
      <p>Like : {favoritedBy.length}</p>
      <p>author: {username}</p>
      <ToggleFavorite postId={_id} favoritedBy={favoritedBy} />
    </PostWrapper>
  );
};

export default Post;
