import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Area } from './entity/area.entity';

@Injectable()
export class AreasService {
  constructor(
    @InjectRepository(Area)
    private areaRepository: Repository<Area>,
  ) {}

  async getAll(
    offset?: number,
    limit?: number,
  ): Promise<{ items: Area[]; count: number }> {
    const [items, count] = await this.areaRepository.findAndCount({
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
  async findOne(id: string): Promise<Area> {
    return await this.areaRepository.findOne({
      id: id,
    });
  }

  async add(area: Area): Promise<Area> {
    const newArea = this.areaRepository.create(area);
    return await this.areaRepository.save(newArea);
  }

  async edit(id: number, { name, description }: Partial<Area>) {
    return await this.areaRepository.update(id, {
      name,
      description,
    });
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.areaRepository.softDelete(id);
  }
}
