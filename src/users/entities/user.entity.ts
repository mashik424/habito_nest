import { Habit } from 'src/habits/entities/habit.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @OneToMany(() => Habit, (habit) => habit.user)
  habits: Habit[];

  toString(): string {
    return `(id: ${this.id})`;
  }
}
