import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { HabitLog, HabitLogDocument } from './schemas/habit-log.schema';
import { Model } from 'mongoose';

@Injectable()
export class HabitLogsService {
  constructor(
    @InjectModel(HabitLog.name) private habitLogModel: Model<HabitLogDocument>,
  ) {}

  logHabit(habitId: number, date: Date, status: string, note?: string) {
    const log = new this.habitLogModel({ habitId, date, status, note });
    return log.save();
  }

  getLogsByHabit(habitId: number) {
    return this.habitLogModel.find({ habitId }).exec();
  }
}
