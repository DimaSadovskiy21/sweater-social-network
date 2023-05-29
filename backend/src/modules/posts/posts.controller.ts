import {
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';

import { AccessJwtAuthGuard, RefreshJwtAuthGuard } from 'guards';
import { ROUTES, SUBROUTES } from 'common/constants';

import { PostsDto } from './dto';
import { PostsService } from './posts.service';
import { GetPostsQuery } from 'common/decorators/GetPostsQuery';

@Controller(ROUTES.POSTS)
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  @UseGuards(AccessJwtAuthGuard, RefreshJwtAuthGuard)
  async getPosts(@GetPostsQuery() postsDto: PostsDto) {
    return await this.postsService.getPosts(postsDto);
  }

  @Get(SUBROUTES.GET_MY_POSTS)
  @UseGuards(AccessJwtAuthGuard, RefreshJwtAuthGuard)
  async getMyPosts(@GetPostsQuery() postsDto: PostsDto, @Req() req: Request) {
    const userId = req.user['_id'];
    const { page, limit } = postsDto;

    return await this.postsService.getMyPosts({
      userId,
      page,
      limit,
    });
  }

  @Get(SUBROUTES.GET_POST)
  @UseGuards(AccessJwtAuthGuard, RefreshJwtAuthGuard)
  async getPost(@Param('postId') postId: string) {
    return await this.postsService.getPostById(postId);
  }

  @Post()
  @UseGuards(AccessJwtAuthGuard, RefreshJwtAuthGuard)
  async createPost(@Req() req: Request) {
    const content = req.body.content;
    const author = req.user['_id'];

    return await this.postsService.createPost({ content, author });
  }

  @Delete(SUBROUTES.DELETE_POST)
  @UseGuards(AccessJwtAuthGuard, RefreshJwtAuthGuard)
  async deletePost(@Req() req: Request) {
    const userId = req.user['_id'];
    const postId = req.params.postId;

    return await this.postsService.deletePostById({ userId, postId });
  }

  @Patch(SUBROUTES.UPDATE_POST)
  @UseGuards(AccessJwtAuthGuard, RefreshJwtAuthGuard)
  async updatePost(@Req() req: Request) {
    const userId = req.user['_id'];
    const postId = req.params.postId;
    const content = req.body['content'];

    return await this.postsService.updatePost({ userId, postId, content });
  }

  @Patch(SUBROUTES.TOGGLE_FAVORITE)
  @UseGuards(AccessJwtAuthGuard, RefreshJwtAuthGuard)
  async toggleFavorite(@Req() req: Request) {
    const userId = req.user['_id'];
    const postId = req.params.postId;

    return await this.postsService.toggleFavorite({ userId, postId });
  }
}
