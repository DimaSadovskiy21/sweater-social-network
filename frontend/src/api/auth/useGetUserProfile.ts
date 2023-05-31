import { UseQueryResult, useQuery } from "@tanstack/react-query";

import { IUserResponse } from "types/user";
import { TAxiosRequestError } from "types/error";
import { instance } from "api/base";

import { AUTH } from "./constants";
import { QUERY_KEYS } from "../constants";

export const useGetUserProfile = (): UseQueryResult<
  IUserResponse,
  TAxiosRequestError
> =>
  useQuery(
    [QUERY_KEYS.USER_PROFILE],
    async () => {
      const { data: userProfileResponse } = await instance.get(
        AUTH.USER_PROFILE
      );

      return userProfileResponse;
    },
    {
      retry: false,
      refetchOnWindowFocus: false,
      notifyOnChangeProps: "all",
    }
  );
