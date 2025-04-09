import { Controller, Post, Get, Body, Param, UseGuards } from '@nestjs/common';
import { HabitLogsService } from './habit-logs.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('habit-logs')
export class HabitLogsController {
  constructor(private habitLogsService: HabitLogsService) {}

  @Post()
  logHabit(
    @Body()
    body: {
      habitId: number;
      date: Date;
      status: string;
      note?: string;
    },
  ) {
    return this.habitLogsService.logHabit(
      body.habitId,
      body.date,
      body.status,
      body.note,
    );
  }

  @Get(':habitId')
  getLogsByHabit(@Param('habitId') habitId: number) {
    return this.habitLogsService.getLogsByHabit(habitId);
  }
}
