import { FC } from "react";

import { PostsList } from "components/PostsList";

import { MESSAGES } from "./constants";
import { TFavoritesProps } from "./types";

const Favorites: FC<TFavoritesProps> = (postsListProps) => (
  <PostsList noPostsMessage={MESSAGES.NO_POSTS} {...postsListProps} />
);

export default Favorites;
