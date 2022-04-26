import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Society } from './entity/society.entity';

@Injectable()
export class SocietiesService {
  constructor(
    @InjectRepository(Society)
    private societyRepository: Repository<Society>,
  ) {}

  async getAll(
    offset?: number,
    limit?: number,
  ): Promise<{ items: Society[]; count: number }> {
    const [items, count] = await this.societyRepository.findAndCount({
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

  /**
   * This entity is in relation with payments, for some reason,
   * by injecting the repositories, I cannot access the entity correctly,
   * so I have implemented this method and use it from the payment service.
   *
   * @param id
   * @returns
   */
  async findOne(id: string): Promise<Society> {
    return await this.societyRepository.findOne({
      id: id,
    });
  }

  async add(society: Society): Promise<Society> {
    const newSociety = this.societyRepository.create(society);
    return await this.societyRepository.save(newSociety);
  }

  async edit(id: number, society: Partial<Society>) {
    return await this.societyRepository.update(id, society);
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.societyRepository.softDelete(id);
  }
}
