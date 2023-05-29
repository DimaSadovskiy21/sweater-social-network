import { ExecutionContext, createParamDecorator } from '@nestjs/common';

import { PostsDto } from 'modules/posts/dto';

export const GetPostsQuery = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): PostsDto => {
    const request = ctx.switchToHttp().getRequest();
    const query = request.query;

    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    return { page, limit };
  },
);
