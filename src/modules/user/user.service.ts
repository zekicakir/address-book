import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findOne(username: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { username } });
  }
  async getAll(): Promise<Array<User> | undefined> {
    const users =await this.userRepository.find();
    return users;
  }
  async create(user: User): Promise<User> {
    return this.userRepository.save(user);
  }
}
 
