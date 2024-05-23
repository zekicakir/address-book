import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { user } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(user)
    private readonly userRepository: Repository<user>,
  ) {}

  async findOne(username: string): Promise<user | undefined> {
    return this.userRepository.findOne({ where: { username } });
  }
  async getAll(): Promise<Array<user> | undefined> {
    const users =await this.userRepository.find();
    return users;
  }
  async create(user: user): Promise<user> {
    return this.userRepository.save(user);
  }
}
 
