import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AnalyticsService } from './analytics.service';
import { AnalyticsController } from './analytics.controller';
import {
  HabitLog,
  HabitLogSchema,
} from '../habit-logs/schemas/habit-log.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: HabitLog.name, schema: HabitLogSchema },
    ]),
  ],
  providers: [AnalyticsService],
  exports: [AnalyticsService],
  controllers: [AnalyticsController],
})
export class AnalyticsModule {}
