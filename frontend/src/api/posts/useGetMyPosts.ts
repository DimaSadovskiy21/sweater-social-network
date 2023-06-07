import {
  UseInfiniteQueryResult,
  useInfiniteQuery,
} from "@tanstack/react-query";

import { IPostResponse } from "types/post";
import { TAxiosRequestError } from "types/error";

import { POST } from "./constants";
import { instance } from "../base";
import { QUERY_KEYS } from "../constants";

export const useGetMyPosts = (): UseInfiniteQueryResult<
  IPostResponse[],
  TAxiosRequestError
> =>
  useInfiniteQuery(
    [QUERY_KEYS.MY_POSTS],
    async ({ pageParam = 1 }) =>
      await instance
        .get(`${POST.MY_POSTS}?page=${pageParam}`)
        .then((response) => response.data.posts),

    {
      retry: false,
      refetchOnWindowFocus: false,
      getNextPageParam: (currentPage, allPages) =>
        !currentPage.length ? undefined : allPages.length + 1,
    }
  );
