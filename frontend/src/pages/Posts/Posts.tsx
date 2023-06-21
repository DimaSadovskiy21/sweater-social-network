import { FC } from "react";

import { PostsList } from "components/PostsList";

import { MESSAGES } from "./constants";
import { TPostsProps } from "./types";

const Posts: FC<TPostsProps> = (postsListProps) => (
  <PostsList noPostsMessage={MESSAGES.NO_POSTS} {...postsListProps} />
);

export default Posts;
