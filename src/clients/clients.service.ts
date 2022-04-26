import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, DeleteResult, Like, Repository, UpdateResult } from 'typeorm';
import { Client } from './entity/client.entity';
import { DateService } from 'src/shared/service/date.service';

// import { format } from 'date-fns';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private clientRepository: Repository<Client>,
    private readonly dateService: DateService,
  ) {}

  /**
   * Filter Example:
   * http://localhost:3000/clients?offset=0&limit=20&active=true&born=2021&cardYear=2022&search=dfgdsgds
   *
   * Documentation:
   * https://stackoverflow.com/questions/68584092/using-between-for-query-dates-on-api-repository-typeorm
   *
   * @param offset: number
   * @param limit: number
   * @param active: boolean isActive
   * @param search: string Keyword occurrences
   * @returns
   */
  async getAll(
    offset?: number,
    limit?: number,
    active?: boolean,
    born?: number,
    cardYear?: number,
    search?: string,
  ): Promise<{ items: Client[]; count: number }> {
    console.log('active =>', active);
    // console.log('born =>', born);
    // console.log('cardYear =>', cardYear);
    // console.log('search =>', search);

    // const [cardYearFrom, cardYearTo] =
    //   this.dateService.getYearInterval(cardYear);

    const filters: any = {};

    if (active ?? false) {
      filters.isActive = active;
    }

    if (born) {
      const [bornFrom, bornTo] = this.dateService.getYearInterval(born);
      filters.born = Between(bornFrom, bornTo);
    }

    if (cardYear) {
      // filters.cardYear = Between(cardYearFrom, cardYearTo);
      filters.cardYear = cardYear;
    }

    let conditions: any;

    if (search) {
      conditions = [
        {
          name: Like(`%${search}%`),
          ...filters,
        },
        {
          surname: Like(`%${search}%`),
          ...filters,
        },
      ];
    } else {
      conditions = {
        ...filters,
      };
    }

    console.log('conditions', conditions);

    const [items, count] = await this.clientRepository.findAndCount({
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

  /**
   * This entity is in relation with payments, for some reason,
   * by injecting the repositories, I cannot access the entity correctly,
   * so I have implemented this method and use it from the payment service.
   *
   * @param id
   * @returns
   */
  async findOne(id: string): Promise<Client> {
    return await this.clientRepository.findOne({
      id: id,
    });
  }

  async add(client: Client): Promise<Client> {
    const newClient = this.clientRepository.create(client);
    return await this.clientRepository.save(newClient);
  }

  async edit(id: number, client: Partial<Client>): Promise<UpdateResult> {
    return await this.clientRepository.update(id, client);
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.clientRepository.softDelete(id);
  }
}
