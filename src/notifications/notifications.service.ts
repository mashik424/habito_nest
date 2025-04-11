import { Injectable, OnModuleInit, Inject } from '@nestjs/common';
import { Queue } from 'bullmq';
import Redis from 'ioredis';

@Injectable()
export class NotificationsService implements OnModuleInit {
  private reminderQueue: Queue;

  constructor(@Inject('REDIS_CLIENT') private readonly redis: Redis) {}

  onModuleInit() {
    this.reminderQueue = new Queue('habit-reminders', {
      connection: this.redis,
    });
  }

  async scheduleReminder(userId: number, habitId: number, time: string) {
    const reminderTime = new Date(time);
    await this.reminderQueue.add(
      'send-reminder',
      { userId, habitId },
      { delay: reminderTime.getTime() - Date.now() },
    );
  }
}
