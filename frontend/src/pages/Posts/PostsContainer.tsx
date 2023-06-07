import { useGetPosts } from "api/posts/useGetPosts";
import Posts from "./Posts";

const PostsContainer = () => {
  const { data, hasNextPage, fetchNextPage } = useGetPosts();

  const dataLength =
    data?.pages.reduce((total, page) => total + page.length, 0) || 0;

  return (
    <Posts
      posts={data?.pages}
      dataLength={dataLength}
      hasNextPage={hasNextPage}
      fetchNextPage={fetchNextPage}
    />
  );
};

export default PostsContainer;
