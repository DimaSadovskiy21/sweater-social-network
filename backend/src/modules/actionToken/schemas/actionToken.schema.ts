import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, ObjectId } from 'mongoose';

import { SCHEMAS_NAMES } from 'common/constants';

export type ActionTokenDocument = ActionToken & Document;

@Schema({ timestamps: true, expires: process.env.EXPIRE_ACTION_TOKEN })
export class ActionToken {
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    required: true,
    ref: SCHEMAS_NAMES.USER,
  })
  user: ObjectId;

  @Prop({ required: true })
  token: string;
}

export const ActionTokenSchema = SchemaFactory.createForClass(ActionToken);
ActionTokenSchema.index({ createdAt: 1 }, { expireAfterSeconds: 0 });
