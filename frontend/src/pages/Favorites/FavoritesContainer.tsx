import { useGetFavoritesPosts } from "api/posts";
import { getDataLength } from "utils/getDataLength";
import { Preloader } from "components/Loaders/Preloader";

import Favorites from "./Favorites";

const FavoritesContainer = () => {
  const { data, hasNextPage, fetchNextPage, isFetchedAfterMount } =
    useGetFavoritesPosts();

  const dataLength = getDataLength(data?.pages);

  const checkPosts = data?.pages?.[0].length;

  return isFetchedAfterMount ? (
    <Favorites
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

export default FavoritesContainer;
