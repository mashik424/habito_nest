import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Habit } from './entities/habit.entity';
import { HabitsService } from './habits.service';
import { HabitsController } from './habits.controller';
import { NotificationsModule } from 'src/notifications/notifications.module';

@Module({
  imports: [TypeOrmModule.forFeature([Habit]), NotificationsModule],
  providers: [HabitsService],
  exports: [HabitsService],
  controllers: [HabitsController],
})
export class HabitsModule {}
