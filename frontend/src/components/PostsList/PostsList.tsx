import { FC } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import { Post } from "components/Post";
import { Preloader } from "components/Loaders/Preloader";
import { Message } from "components/Message";
import { getDataLength } from "utils";

import { DEFAULT_NO_POSTS_MESSAGE } from "./constant";
import { PostsWrapper } from "./styles";
import { IPostsListProps } from "./types";

const PostsList: FC<IPostsListProps> = ({
  posts,
  noPostsMessage = DEFAULT_NO_POSTS_MESSAGE,
  hasNextPage = false,
  isPostsFetching,
  fetchNextPage,
}) => {
  const postsLength = getDataLength(posts);

  const isPostsExists = posts?.[0]?.length;

  return (
    <PostsWrapper>
      {isPostsFetching ? (
        <Preloader />
      ) : (
        <InfiniteScroll
          dataLength={postsLength}
          hasMore={hasNextPage}
          loader={<Preloader />}
          next={fetchNextPage}
        >
          {isPostsExists ? (
            posts?.map((page) => page.map((post) => <Post key={post._id} {...post} />))
          ) : (
            <Message message={noPostsMessage} />
          )}
        </InfiniteScroll>
      )}
    </PostsWrapper>
  );
};

export default PostsList;
