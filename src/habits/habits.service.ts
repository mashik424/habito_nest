import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Habit } from './entities/habit.entity';
import { CreateHabitDto } from './dto/create_habit.dto';
import { UpdateHabitDto } from './dto/update_habit.dto';
import { NotificationsService } from 'src/notifications/notifications.service';

@Injectable()
export class HabitsService {
  constructor(
    @InjectRepository(Habit)
    private readonly habitRepository: Repository<Habit>,
    private notificationsService: NotificationsService,
  ) {}

  // Create a new habit
  async createHabit(habitData: CreateHabitDto, userId: number): Promise<Habit> {
    const habit = this.habitRepository.create({
      title: habitData.title,
      description: habitData.description,
      frequency: habitData.frequency,
      reminderTime: habitData.reminderTime,
      user: { id: userId },
    });

    if (habitData.reminderTime) {
      await this.notificationsService.scheduleReminder(
        userId,
        habit.id,
        habitData.reminderTime,
      );
    }

    return this.habitRepository.save(habit);
  }

  // Update a habit by ID
  async updateHabit(
    id: number,
    updateData: UpdateHabitDto,
    userId: number,
  ): Promise<Habit | null> {
    await this.habitRepository.update(id, {
      title: updateData.title,
      description: updateData.description,
      frequency: updateData.frequency,
    });
    return this.findUsersHabitById(id, userId);
  }

  // Find all habits
  async findAllHabits(userId: number): Promise<Habit[]> {
    return this.habitRepository.find({
      where: { user: { id: userId } },
    });
  }

  // Find a habit by ID
  async findHabitById(id: number): Promise<Habit | null> {
    return this.habitRepository.findOneBy({ id });
  }

  // Find a habit by ID
  async findUsersHabitById(id: number, userId: number): Promise<Habit | null> {
    return this.habitRepository.findOne({
      where: { id, user: { id: userId } },
    });
  }

  // Delete a habit by ID
  async deleteHabit(id: number, userId: number): Promise<void> {
    await this.habitRepository.delete({ id, user: { id: userId } });
  }
}
