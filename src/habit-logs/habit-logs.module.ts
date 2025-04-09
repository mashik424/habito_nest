import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HabitLogsService } from './habit-logs.service';
import { HabitLogsController } from './habit-logs.controller';
import { HabitLog, HabitLogSchema } from './schemas/habit-log.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: HabitLog.name, schema: HabitLogSchema },
    ]),
  ],
  providers: [HabitLogsService],
  exports: [HabitLogsService],
  controllers: [HabitLogsController],
})
export class HabitLogsModule {}
