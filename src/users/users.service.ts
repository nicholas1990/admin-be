import { Injectable, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not, Repository } from 'typeorm';
import { PasswordService } from '../shared/service/password.service';
import { UpdateUserDto } from './dto/update.dto';
import { User } from './entity/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly passwordService: PasswordService,
  ) {}

  async getAll(
    offset?: number,
    limit?: number,
    role?: 'admin' | 'operator',
    email?: string,
  ): Promise<{ items: User[]; count: number }> {
    const filters: any = {};

    if (role) {
      filters.role = role;
    }

    if (email) {
      filters.email = email;
    }

    let conditions: any;

    if (filters) {
      conditions = {
        ...filters,
      };
    }

    const [items, count] = await this.userRepository.findAndCount({
      order: {
        id: 'ASC',
      },
      skip: offset,
      take: limit,
      where: conditions,
    });

    return {
      items,
      count,
    };
  }

  getAllRemoved(): Promise<User[]> {
    return this.userRepository.find({
      withDeleted: true,
      where: { deletedAt: Not(IsNull()) },
    });
  }

  async findOne(id: number): Promise<User> {
    return await this.userRepository.findOne({
      id: id,
    });
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    return await this.userRepository.findOne({
      email: email,
    });
  }

  async add(user: User) {
    user.password = await this.passwordService.getPasswordHash(user.password);

    const newUser = this.userRepository.create(user);
    return await this.userRepository.save(newUser);
  }

  async edit(id: number, user: UpdateUserDto) {
    return await this.userRepository.update(id, {
      firstName: user.firstName,
      lastName: user.lastName,
    });
  }

  async editPassword(id: number, password: string) {
    return await this.userRepository.update(id, { password });
  }

  async remove(id: number) {
    return await this.userRepository.softDelete(id);
  }
}
