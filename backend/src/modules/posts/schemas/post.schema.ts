import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, ObjectId } from 'mongoose';

import { SCHEMAS_NAMES } from 'common/constants';

export type PostDocument = Post & Document;

@Schema({ timestamps: true })
export class Post {
  @Prop({ required: true })
  content: string;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    required: true,
    ref: SCHEMAS_NAMES.USER,
  })
  author: ObjectId;

  @Prop([
    {
      type: MongooseSchema.Types.ObjectId,
      ref: 'User',
    },
  ])
  favoritedBy: ObjectId[];
}

export const PostSchema = SchemaFactory.createForClass(Post);
