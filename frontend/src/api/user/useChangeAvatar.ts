import {
  UseMutationResult,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { TAxiosRequestError } from "types/error";
import { generateNotification } from "utils/generateNotification";

import { USER } from "./constants";
import { handleResponseError } from "../utils";
import { QUERY_KEYS } from "../constants";
import { instance } from "../base";
import { IFileResponse } from "types/file";

export const useChangeAvatar = (): UseMutationResult<
  IFileResponse,
  TAxiosRequestError,
  FormData
> => {
  const queryClient = useQueryClient();

  const handleSuccessResponse = () =>
    queryClient.invalidateQueries({
      queryKey: [QUERY_KEYS.USER_PROFILE],
    });

  const handleErrorResponse = (error: TAxiosRequestError) => {
    const message = handleResponseError(error);

    generateNotification({ type: "error", content: message });
  };

  return useMutation(
    async (payload: FormData) => {
      const { data: userAvatarResponse } = await instance.post(
        USER.CHANGE_AVATAR,
        payload
      );

      return userAvatarResponse;
    },
    {
      onSuccess: handleSuccessResponse,
      onError: handleErrorResponse,
    }
  );
};
