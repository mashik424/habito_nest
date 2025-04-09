import { HabitsService } from './habits.service';

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  Request,
} from '@nestjs/common';

import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RequestWithUser } from 'src/auth/jwt.strategy';
import { CreateHabitDto } from './dto/create_habit.dto';
import { UpdateHabitDto } from './dto/update_habit.dto';

@Controller('habits')
@UseGuards(JwtAuthGuard)
export class HabitsController {
  constructor(private habitsService: HabitsService) {}

  @Get()
  async getAllHabits(@Request() req: RequestWithUser) {
    const habits = await this.habitsService.findAllHabits(req.user.userId);
    return { habits: habits };
  }

  @Get(':id')
  getHabitById(@Param('id') id: number, @Request() req: RequestWithUser) {
    return this.habitsService.findUsersHabitById(id, req.user.userId);
  }

  @Post()
  createHabit(
    @Body() createHabitDto: CreateHabitDto,
    @Request() req: RequestWithUser,
  ) {
    return this.habitsService.createHabit(createHabitDto, req.user.userId);
  }

  @Put(':id')
  updateHabit(
    @Param('id') id: number,
    @Body() updateHabitDto: UpdateHabitDto,
    @Request() req: RequestWithUser,
  ) {
    return this.habitsService.updateHabit(id, updateHabitDto, req.user.userId);
  }

  @Delete(':id')
  deleteHabit(@Param('id') id: number, @Request() req: RequestWithUser) {
    return this.habitsService.deleteHabit(id, req.user.userId);
  }
}
