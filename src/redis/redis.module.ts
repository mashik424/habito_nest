import { Module, Global } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RedisClientProvider } from './redis.provider';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [RedisClientProvider],
  exports: [RedisClientProvider],
})
export class RedisModule {}
