import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type HabitLogDocument = HabitLog & Document;

@Schema()
export class HabitLog {
  @Prop({ required: true })
  habitId: number;

  @Prop({ required: true })
  date: Date;

  @Prop({ default: 'incomplete' })
  status: string;

  @Prop()
  note?: string;
}

export const HabitLogSchema = SchemaFactory.createForClass(HabitLog);
