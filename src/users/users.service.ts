import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  async createUser(
    name: string,
    email: string,
    password: string,
  ): Promise<User> {
    try {
      const hashedPassword: string = await bcrypt.hash(password, 10);
      const user = this.userRepository.create({
        name,
        email,
        password: hashedPassword,
      });
      return this.userRepository.save(user);
    } catch (error) {
      console.error('Error creating user:', error);
      throw new Error('User creation failed');
    }
  }
}
