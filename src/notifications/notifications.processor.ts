import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';

export interface ReminderJobData {
  userId: number;
  habitId: number;
}

@Processor('habit-reminders')
export class NotificationsProcessor {
  @Process('send-reminder')
  handleReminder(job: Job<ReminderJobData>) {
    const { userId, habitId } = job.data;
    console.log(`Sending reminder to User ${userId} for Habit ${habitId}`);
    // TODO: Integrate Email/SMS/Push notifications
  }
}
