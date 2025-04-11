import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';

@Module({
  imports: [],
  providers: [NotificationsService],
  exports: [NotificationsService],
})

// This module handles the notifications for the habit tracking application.
export class NotificationsModule {}
