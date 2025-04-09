import { PartialType } from '@nestjs/mapped-types';
import { CreateHabitDto } from './create_habit.dto';

export class UpdateHabitDto extends PartialType(CreateHabitDto) {}
