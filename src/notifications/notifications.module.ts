import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { NotificationsService } from './notifications.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'habit-reminders',
      redis: { host: 'localhost', port: 6379 },
    }),
  ],
  providers: [NotificationsService],
  exports: [NotificationsService],
})

// This module handles the notifications for the habit tracking application.
export class NotificationsModule {}
