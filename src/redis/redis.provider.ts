import { Redis } from 'ioredis';
import { ConfigService } from '@nestjs/config';

export const RedisClientProvider = {
  provide: 'REDIS_CLIENT',
  useFactory: (configService: ConfigService) => {
    const redis = new Redis(configService.get<string>('REDIS_URL')!, {
      tls: {
        rejectUnauthorized: false,
      },
    });
    return redis;
  },
  inject: [ConfigService],
};
