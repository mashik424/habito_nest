import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { NotificationsService } from './notifications.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    BullModule.registerQueueAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      name: 'habit-reminders',
      useFactory: (configService: ConfigService) => ({
        redis: {
          name: 'habit-reminders',
          url: configService.get<string>('UPSTASH_REDIS_URL'),
          maxRetriesPerRequest: 50,
          connectTimeout: 10000,
          retryStrategy: (times) => Math.min(times * 100, 2000),
        },
      }),
    }),
  ],
  providers: [NotificationsService],
  exports: [NotificationsService],
})

// This module handles the notifications for the habit tracking application.
export class NotificationsModule {}
