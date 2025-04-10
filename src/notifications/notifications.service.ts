import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import Redis from 'ioredis';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectQueue('habit-reminders') private reminderQueue: Queue,
    private configService: ConfigService,
  ) {}

  async scheduleReminder(userId: number, habitId: number, time: string) {
    const redis = new Redis(
      this.configService.get<string>('UPSTASH_REDIS_URL')!,
      {
        tls: {},
      },
    );
    redis
      .set('test23', 'success')
      .then(() => redis.get('test'))
      .then(() => {
        console.log('Redis connection successful');
      })
      .catch(() => {
        console.error('Redis connection failed');
      });
    const reminderTime = new Date(time);
    await this.reminderQueue.add(
      'send-reminder',
      { userId, habitId },
      { delay: reminderTime.getTime() - Date.now() },
    );
  }
}
