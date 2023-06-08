import { BadRequestException, Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { APP_ERROR } from 'common/errors';
import { UsersService } from 'modules/users/users.service';

import { Post, PostDocument } from './schemas';
import {
  DeletePostDto,
  UpdatePostDto,
  CreatePostDto,
  FavoritePostDto,
  MyPostsDto,
  PostsDto,
} from './dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<PostDocument>,
    private readonly usersService: UsersService,
  ) {}

  async getPosts(postsDto: PostsDto) {
    const { page, limit } = postsDto;

    const skip = (page - 1) * limit;

    const [{ posts, totalCount }] = await this.postModel.aggregate([
      {
        $facet: {
          posts: [
            { $sort: { createdAt: -1 } },
            { $skip: skip },
            { $limit: limit },
            {
              $lookup: {
                from: 'users',
                localField: 'author',
                foreignField: '_id',
                as: 'author',
                pipeline: [{ $project: { username: 1, avatar: 1 } }],
              },
            },
            { $unwind: '$author' },
          ],
          totalCount: [{ $count: 'totalItems' }],
        },
      },
    ]);

    let pagesCount = 0;

    if (totalCount.length) {
      const [{ totalItems = 0 }] = totalCount;

      pagesCount = Math.ceil(totalItems / limit);
    }

    return {
      posts,
      page,
      limit,
      pagesCount,
      hasNextPage: page < pagesCount,
    };
  }

  async getMyPosts(myPostsDto: MyPostsDto) {
    const { userId, page, limit } = myPostsDto;

    const skip = (page - 1) * limit;

    const [{ posts, totalCount }] = await this.postModel.aggregate([
      {
        $match: { author: new Types.ObjectId(userId) },
      },
      {
        $facet: {
          posts: [
            { $sort: { createdAt: -1 } },
            { $skip: skip },
            { $limit: limit },
            {
              $lookup: {
                from: 'users',
                localField: 'author',
                foreignField: '_id',
                as: 'author',
                pipeline: [{ $project: { username: 1, avatar: 1 } }],
              },
            },
            { $unwind: '$author' },
          ],
          totalCount: [{ $count: 'totalItems' }],
        },
      },
    ]);

    let pagesCount = 0;

    if (totalCount.length) {
      const [{ totalItems = 0 }] = totalCount;

      pagesCount = Math.ceil(totalItems / limit);
    }

    return {
      posts,
      page,
      limit,
      pagesCount,
      hasNextPage: page < pagesCount,
    };
  }

  async getFavoritesPosts(myPostsDto: MyPostsDto) {
    const { userId, page, limit } = myPostsDto;
    const skip = (page - 1) * limit;

    const user = await (
      await this.usersService.findUserById(userId)
    ).populate({
      path: 'favoritesPosts',
      options: {
        sort: { updatedAt: -1 },
        skip,
        limit,
      },
      populate: {
        path: 'author',
        select: '_id username',
      },
    });

    const favoritesPosts = user.favoritesPosts;

    return favoritesPosts;
  }

  async getPostById(postId: string) {
    return await this.postModel.findById(postId);
  }

  async createPost(createPostDto: CreatePostDto) {
    const { content, author } = createPostDto;

    return await this.postModel.create({ content, author });
  }

  async deletePostById(deletePostDto: DeletePostDto) {
    const { userId, postId } = deletePostDto;

    const post = await this.postModel.findById(postId);

    post.favoritedBy.forEach(async (userId) => {
      const user = await this.usersService.findUserById(userId);
      user.favoritesPosts = user.favoritesPosts.filter(
        (id) => id.toString() !== postId,
      );
      user.save();
    });

    const deletedPost = await this.postModel.findOneAndRemove({
      _id: postId,
      author: userId,
    });

    if (!deletedPost) {
      throw new BadRequestException(APP_ERROR.POST_NOT_FOUND);
    }

    return true;
  }

  async updatePost(updatePostDto: UpdatePostDto) {
    const { userId, postId, content } = updatePostDto;

    const updatedPost = await this.postModel.findOneAndUpdate(
      { _id: postId, author: userId },
      {
        $set: {
          content,
        },
      },
      {
        new: true,
      },
    );

    if (!updatedPost) {
      throw new BadRequestException(APP_ERROR.POST_NOT_FOUND);
    }

    return updatedPost;
  }

  async toggleFavorite(favoritePostDto: FavoritePostDto) {
    const { userId, postId } = favoritePostDto;

    const post = await this.getPostById(postId);
    const hasUser = post.favoritedBy.indexOf(userId);

    await this.usersService.setFavorites({ userId, postId: post.id });

    return await this.postModel.findByIdAndUpdate(
      postId,
      {
        [`${hasUser >= 0 ? '$pull' : '$push'}`]: {
          favoritedBy: userId,
        },
      },
      {
        new: true,
      },
    );
  }
}
