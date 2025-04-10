import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { NotificationsService } from './notifications.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    BullModule.registerQueueAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        name: 'habit-reminders',
        redis: {
          name: 'habit-reminders',
          url: configService.get<string>('UPSTASH_REDIS_URL'),
        },
      }),
    }),
  ],
  providers: [NotificationsService],
  exports: [NotificationsService],
})

// This module handles the notifications for the habit tracking application.
export class NotificationsModule {}
