import { FC } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { IUserResponse } from "types/user";
import { QUERY_KEYS } from "api/constants";
import { useToggleFavorite } from "api/posts";

import { IToggleFavoriteContainerProps } from "./types";
import ToggleFavorite from "./ToggleFavorite";

const ToggleFavoriteContainer: FC<IToggleFavoriteContainerProps> = ({
  postId,
  favoritedBy,
}) => {
  const queryClient = useQueryClient();
  const userProfile = queryClient.getQueryData<IUserResponse>([
    QUERY_KEYS.USER_PROFILE,
  ]);

  const userId = userProfile?._id;

  const { isLoading, mutate: toggleFavorite } = useToggleFavorite();

  const handleClickToggleFavorite = () => {
    userId && toggleFavorite({ postId });
  };

  const checkFavoritedBy = userId && favoritedBy.indexOf(userId);

  return (
    <ToggleFavorite
      checkFavoritedBy={!!checkFavoritedBy}
      isLoading={isLoading}
      likesCount={favoritedBy.length}
      handleClickToggleFavorite={handleClickToggleFavorite}
    />
  );
};

export default ToggleFavoriteContainer;
