import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Client } from './entity/client.entity';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private clientRepository: Repository<Client>,
  ) {}

  findAll(): Promise<Client[]> {
    return this.clientRepository.find();
  }

  async add(client: Client): Promise<Client> {
    const newClient = this.clientRepository.create(client);
    return await this.clientRepository.save(newClient);
  }

  async edit(id: number, client: Partial<Client>): Promise<UpdateResult> {
    return await this.clientRepository.update(id, client);
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.clientRepository.delete(id);
  }
}
