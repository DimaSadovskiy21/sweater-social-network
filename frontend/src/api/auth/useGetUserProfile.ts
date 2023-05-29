import { UseQueryResult, useQuery } from '@tanstack/react-query';

import { instance } from 'api/base';

import { AUTH } from './constants';
import { IUserResponse } from './types';
import { QUERY_KEYS } from '../constants';
import { TAxiosRequestError } from '../types';

export const useGetUserProfile = (): UseQueryResult<IUserResponse, TAxiosRequestError> =>
  useQuery(
    [QUERY_KEYS.USER_PROFILE],
    async () => {
      const { data: userProfileResponse } = await instance.get(AUTH.USER_PROFILE);

      return userProfileResponse;
    },
    {
      retry: false,
      refetchOnWindowFocus: false,
    },
  );
