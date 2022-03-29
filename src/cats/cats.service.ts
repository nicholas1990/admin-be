import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cat } from './entity/cats.entity';
// import { Cat as CatI } from './interfaces/cat.interface';
import { CreateCatDto } from './dto/create.dto';

export interface Pagination {
  catList: Cat[];
  number: number;
}

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];
  constructor(
    @InjectRepository(Cat)
    private catsRepository: Repository<Cat>,
  ) {}

  async getAll(
    offset?: number,
    limit?: number,
  ): Promise<{ items: Cat[]; count: number }> {
    const [items, count] = await this.catsRepository.findAndCount({
      // relations: ['author'],
      order: {
        id: 'ASC',
      },
      skip: offset,
      take: limit,
    });

    return {
      items,
      count,
    };
  }

  getOneCat(): string {
    return 'Get one cat!';
  }

  async insert(cat: CreateCatDto): Promise<Cat> {
    const _cat: Cat = this.catsRepository.create(cat);
    await this.catsRepository.save(_cat);
    return _cat;
  }

  // findAll(): Promise<User[]> {
  //   return this.usersRepository.find();
  // }

  // create() {}

  // findOne(id: string): Promise<User> {
  //   return this.usersRepository.findOne(id);
  // }

  async remove(id: string): Promise<void> {
    await this.catsRepository.delete(id);
  }
}
