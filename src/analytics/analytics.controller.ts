import { Controller, Get, Param } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';

@Controller('analytics')
export class AnalyticsController {
  constructor(private analyticsService: AnalyticsService) {}

  @Get('completion-rate/:habitId')
  getCompletionRate(@Param('habitId') habitId: number) {
    return this.analyticsService.calculateCompletionRate(habitId);
  }

  @Get('streak/:habitId')
  getStreak(@Param('habitId') habitId: number) {
    return this.analyticsService.calculateStreak(habitId);
  }
}
