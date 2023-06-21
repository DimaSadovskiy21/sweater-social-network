import { useGetFavoritesPosts } from "api/posts";

import Favorites from "./Favorites";

const FavoritesContainer = () => {
  const { data, hasNextPage, fetchNextPage, isFetchedAfterMount } = useGetFavoritesPosts();

  return (
    <Favorites
      posts={data?.pages}
      hasNextPage={hasNextPage}
      isPostsFetching={!isFetchedAfterMount}
      fetchNextPage={fetchNextPage}
    />
  );
};

export default FavoritesContainer;
