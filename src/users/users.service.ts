import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    return await this.userRepository.findOne({
      id: id,
    });
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    console.log('findOneByEmail');
    return await this.userRepository.findOne({
      email: email,
    });
  }

  // async findOne(username: string): Promise<User | undefined> {
  //   return this.users.find(user => user.username === username);
  // }

  async add(user: User) {
    user.password = await this.setPassword(user.password); // TODO: chiedere
    // user.role = user.role ?? 'user';

    const newUser = this.userRepository.create(user);
    return await this.userRepository.save(newUser);
  }

  private async setPassword(password: string) {
    return await bcrypt.hash(password, 10);
  }

  async edit(id: number, user: Partial<User>) {
    return await this.userRepository.update(id, user);
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
