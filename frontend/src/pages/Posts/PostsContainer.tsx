import { useGetPosts } from "api/posts";
import { getDataLength } from "utils/getDataLength";

import Posts from "./Posts";
import { Preloader } from "components/Loaders/Preloader";

const PostsContainer = () => {
  const { data, hasNextPage, fetchNextPage, isFetchedAfterMount } =
    useGetPosts();

  const dataLength = getDataLength(data?.pages);

  const checkPosts = data?.pages?.[0].length;

  return isFetchedAfterMount ? (
    <Posts
      posts={data?.pages}
      dataLength={dataLength}
      checkPosts={checkPosts}
      hasNextPage={hasNextPage}
      fetchNextPage={fetchNextPage}
    />
  ) : (
    <Preloader />
  );
};

export default PostsContainer;
