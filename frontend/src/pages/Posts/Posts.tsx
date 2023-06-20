import { FC } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import { Post } from "components/Post";
import { Preloader } from "components/Loaders/Preloader";
import { Message } from "components/Message";

import { IPostsProps } from "./types";
import { PostsWrapper } from "./styles";
import { MESSAGES } from "./constants";

const Posts: FC<IPostsProps> = ({
  posts,
  dataLength,
  checkPosts,
  hasNextPage = false,
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

export default Posts;
