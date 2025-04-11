import { Job, Worker } from 'bullmq';
import Redis from 'ioredis';

export interface ReminderJobData {
  userId: number;
  habitId: number;
}

const redis = new Redis(process.env.UPSTASH_REDIS_URL!, {
  tls: { rejectUnauthorized: false },
});

new Worker(
  'habit-reminders',
  async (job: Job<ReminderJobData>) => {
    console.log('Sending reminder to:', job.data.userId);
    return Promise.resolve();
  },
  {
    connection: redis,
  },
);
