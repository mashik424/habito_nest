import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class Habit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: 'jsonb', nullable: true }) // Example: ["Monday", "Wednesday"]
  frequency: string[];

  @Column({ nullable: true })
  reminderTime: string;

  @ManyToOne(() => User, (user) => user.habits)
  user: User;

  toString(): string {
    return `(id: ${this.id}, title: ${this.title}, user: ${this.user.toString()})`;
  }
}
