import { BadRequestException, HttpException } from '@nestjs/common';

export const generateResponseError = (error: unknown, errorMessage: string) => {
  throw error instanceof HttpException
    ? error
    : new BadRequestException(errorMessage);
};
