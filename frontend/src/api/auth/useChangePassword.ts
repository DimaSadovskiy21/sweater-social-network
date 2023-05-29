import { UseMutationResult, useMutation, useQueryClient } from '@tanstack/react-query';

import { generateNotification } from 'utils/generateNotification';

import { AUTH } from './constants';
import { IAuthResponse, IChangePasswordArgs } from './types';
import { handleResponseError } from '../utils';
import { TAxiosRequestError } from '../types';
import { QUERY_KEYS } from '../constants';
import { instance } from '../base';

export const useChangePassword = (): UseMutationResult<
  IAuthResponse,
  TAxiosRequestError,
  IChangePasswordArgs
> => {
  const queryClient = useQueryClient();

  const handleSuccessResponse = () =>
    queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USER_PROFILE] });

  const handleErrorResponse = (error: TAxiosRequestError) => {
    const message = handleResponseError(error);

    generateNotification({ type: 'error', content: message });
  };

  return useMutation(
    async (payload: IChangePasswordArgs) => {
      const { data: userProfileResponse } = await instance.patch(AUTH.CHANGE_PASSWORD, payload);
      console.log(userProfileResponse);
      return userProfileResponse;
    },
    {
      onSuccess: handleSuccessResponse,
      onError: handleErrorResponse,
    },
  );
};
