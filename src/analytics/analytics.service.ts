import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  HabitLog,
  HabitLogDocument,
} from '../habit-logs/schemas/habit-log.schema';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectModel(HabitLog.name) private habitLogModel: Model<HabitLogDocument>,
  ) {}

  async calculateCompletionRate(habitId: number) {
    const logs = await this.habitLogModel.find({ habitId }).exec();
    const completed = logs.filter((log) => log.status === 'complete').length;
    return logs.length ? (completed / logs.length) * 100 : 0;
  }

  async calculateStreak(habitId: number) {
    const logs = await this.habitLogModel
      .find({ habitId })
      .sort({ date: -1 })
      .exec();
    let streak = 0;
    const currentDate = new Date();

    for (const log of logs) {
      const logDate = new Date(log.date);
      if (
        log.status === 'complete' &&
        logDate.toDateString() === currentDate.toDateString()
      ) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else {
        break;
      }
    }
    return streak;
  }
}
