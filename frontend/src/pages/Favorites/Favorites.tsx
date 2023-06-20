import { FC } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import { Post } from "components/Post";
import { Message } from "components/Message";
import { Preloader } from "components/Loaders/Preloader";

import { IPostsProps } from "./types";
import { PostsWrapper } from "./styles";
import { MESSAGES } from "./constants";

const Favorites: FC<IPostsProps> = ({
  posts,
  dataLength,
  hasNextPage = false,
  checkPosts,
  fetchNextPage,
}) => (
  <PostsWrapper>
    <InfiniteScroll
      next={fetchNextPage}
      hasMore={hasNextPage}
      loader={<Preloader />}
      dataLength={dataLength}
    >
      {checkPosts ? (
        posts?.map((page) =>
          page.map((post) => (
            <Post
              key={post._id}
              {...post}
            />
          ))
        )
      ) : (
        <Message message={MESSAGES.NO_POSTS} />
      )}
    </InfiniteScroll>
  </PostsWrapper>
);

export default Favorites;
