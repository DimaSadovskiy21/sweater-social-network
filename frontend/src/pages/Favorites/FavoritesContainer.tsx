import { useGetFavoritesPosts } from "api/posts";

import Favorites from "./Favorites";

const FavoritesContainer = () => {
  const { data, hasNextPage, fetchNextPage } = useGetFavoritesPosts();

  const dataLength =
    data?.pages.reduce((total, page) => total + page.length, 0) || 0;

  return (
    <Favorites
      posts={data?.pages}
      dataLength={dataLength}
      hasNextPage={hasNextPage}
      fetchNextPage={fetchNextPage}
    />
  );
};

export default FavoritesContainer;
