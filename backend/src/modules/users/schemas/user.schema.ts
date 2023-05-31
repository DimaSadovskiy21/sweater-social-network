import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, ObjectId } from 'mongoose';

import { SCHEMAS_NAMES } from 'common/constants';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: false })
  isActivated: boolean;

  @Prop({ default: '' })
  avatar: string;

  @Prop({ default: '' })
  status: string;

  @Prop([{ type: MongooseSchema.Types.ObjectId, ref: SCHEMAS_NAMES.POST }])
  favoritesPosts: ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);
