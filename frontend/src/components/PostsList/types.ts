import { FetchNextPageOptions, InfiniteQueryObserverResult } from "@tanstack/react-query";

import { IPostResponse } from "types/post";
import { TAxiosRequestError } from "types/error";

export interface IPostsListProps {
  isPostsFetching: boolean;
  fetchNextPage: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<InfiniteQueryObserverResult<IPostResponse[], TAxiosRequestError>>;
  noPostsMessage?: string;
  posts?: IPostResponse[][];
  hasNextPage?: boolean;
}
