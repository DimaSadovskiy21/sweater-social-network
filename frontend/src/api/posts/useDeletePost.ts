import {
  UseMutationResult,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { transformRoute, generateNotification } from "utils";
import { TAxiosRequestError } from "types/error";
import { IPostResponse } from "types/post";


import { IDeletePostArgs } from "./types";
import { POST } from "./constants";
import { QUERY_KEYS } from "../constants";
import { handleResponseError } from "../utils";
import { instance } from "../base";

export const useDeletePost = (): UseMutationResult<
  IPostResponse,
  TAxiosRequestError,
  IDeletePostArgs
> => {
  const queryClient = useQueryClient();

  const handleSuccessResponse = () => {
    queryClient.invalidateQueries([QUERY_KEYS.POSTS]);
    queryClient.invalidateQueries([QUERY_KEYS.FAVORITES_POSTS]);
  };

  const handleErrorResponse = (error: TAxiosRequestError) => {
    const message = handleResponseError(error);

    generateNotification({ type: "error", content: message });
  };

  return useMutation(
    async (payload: IDeletePostArgs) => {
      const { postId } = payload;
      const { data: newPost } = await instance.delete(
        transformRoute(POST.DELETE_POST, postId)
      );

      return newPost;
    },
    {
      onSuccess: handleSuccessResponse,
      onError: handleErrorResponse,
    }
  );
};
