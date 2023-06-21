import { useGetPosts } from "api/posts";

import Posts from "./Posts";

const PostsContainer = () => {
  const { data, hasNextPage, fetchNextPage, isFetchedAfterMount } = useGetPosts();

  return (
    <Posts
      posts={data?.pages}
      hasNextPage={hasNextPage}
      isPostsFetching={!isFetchedAfterMount}
      fetchNextPage={fetchNextPage}
    />
  );
};

export default PostsContainer;
