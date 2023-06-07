import { FC } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import { PageWrapper } from "pages/styles";
import { Post } from "components/Post";
import { Preloader } from "components/Loaders/Preloader";


import { IPostsProps } from "./types";
import { PostsWrapper } from "./styles";

const Posts: FC<IPostsProps> = ({
  posts,
  dataLength,
  hasNextPage,
  fetchNextPage,
}) => (
  <PageWrapper>
    <PostsWrapper>
    <InfiniteScroll
      next={fetchNextPage}
      hasMore={hasNextPage || false}
      loader={<Preloader />}
      dataLength={dataLength}
    >
      {posts?.map((page) =>
        page.map((post) => <Post key={post._id} {...post} />)
      )}
    </InfiniteScroll>
    </PostsWrapper>
  </PageWrapper>
);

export default Posts;
