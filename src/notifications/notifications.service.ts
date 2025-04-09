import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class NotificationsService {
  constructor(@InjectQueue('habit-reminders') private reminderQueue: Queue) {}

  async scheduleReminder(userId: number, habitId: number, time: string) {
    const reminderTime = new Date(time);
    await this.reminderQueue.add(
      'send-reminder',
      { userId, habitId },
      { delay: reminderTime.getTime() - Date.now() },
    );
  }
}
