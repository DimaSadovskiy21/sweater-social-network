import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Types } from 'mongoose';

import { AccessJwtAuthGuard, RefreshJwtAuthGuard } from 'common/guards';
import { ROUTES, SUBROUTES } from 'common/constants';
import { GetPostsQuery, GetUserId } from 'common/decorators';
import { PostsDto } from 'common/dto';

import { PostDto } from './dto';
import { PostsService } from './posts.service';

@Controller(ROUTES.POSTS)
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  @UseGuards(AccessJwtAuthGuard, RefreshJwtAuthGuard)
  async getPosts(@GetPostsQuery() postsDto: PostsDto) {
    return await this.postsService.getPosts(postsDto);
  }

  @Get(SUBROUTES.GET_FAVORITES_POSTS)
  @UseGuards(AccessJwtAuthGuard, RefreshJwtAuthGuard)
  async getFavoritesPosts(
    @GetPostsQuery() postsDto: PostsDto,
    @GetUserId() userId: Types.ObjectId,
  ) {
    const { page, limit } = postsDto;

    return await this.postsService.getFavoritesPosts({ userId, page, limit });
  }

  @Get(SUBROUTES.GET_POST)
  @UseGuards(AccessJwtAuthGuard, RefreshJwtAuthGuard)
  async getPost(@Param('postId') postId: string) {
    return await this.postsService.getPostById(postId);
  }

  @Post()
  @UseGuards(AccessJwtAuthGuard, RefreshJwtAuthGuard)
  async createPost(@Body() body: PostDto, @GetUserId() userId: Types.ObjectId) {
    const { content } = body;

    return await this.postsService.createPost({ content, author: userId });
  }

  @Delete(SUBROUTES.DELETE_POST)
  @UseGuards(AccessJwtAuthGuard, RefreshJwtAuthGuard)
  async deletePost(
    @Param('postId') postId: string,
    @GetUserId() userId: Types.ObjectId,
  ) {
    return await this.postsService.deletePostById({ userId, postId });
  }

  @Patch(SUBROUTES.UPDATE_POST)
  @UseGuards(AccessJwtAuthGuard, RefreshJwtAuthGuard)
  async updatePost(
    @Body() body: PostDto,
    @Param('postId') postId: string,
    @GetUserId() userId: Types.ObjectId,
  ) {
    const { content } = body;

    return await this.postsService.updatePost({ userId, postId, content });
  }

  @Patch(SUBROUTES.TOGGLE_FAVORITE)
  @UseGuards(AccessJwtAuthGuard, RefreshJwtAuthGuard)
  async toggleFavorite(
    @Param('postId') postId: string,
    @GetUserId() userId: Types.ObjectId,
  ) {
    return await this.postsService.toggleFavorite({ userId, postId });
  }
}
