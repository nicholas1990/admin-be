import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { PaginationParams } from 'src/shared/entity/pagination-params.entity';
import { ClientsFilterParams } from 'src/shared/entity/clients-params-entity';
import { ClientsService } from './clients.service';
import { UpdateClientDto } from './dto/update.dto';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  /**
   * Assume born is year in Date
   *
   * @param active: boolean
   * @param born: year in Date
   * @returns
   */
  @Get()
  async findAll(
    @Query() { offset, limit }: PaginationParams,
    @Query() { active, born, cardYear, search }: ClientsFilterParams,
  ): Promise<{ data: any[]; total: number }> {
    const { items, count } = await this.clientsService.getAll(
      offset,
      limit,
      active,
      born,
      cardYear,
      search,
    );

    return {
      data: items,
      total: count,
    };
  }

  @Post()
  @HttpCode(201)
  async create(@Body() createClientDto: any): Promise<void> {
    await this.clientsService.add(createClientDto);
  }

  @Put(':id')
  @HttpCode(204)
  async update(
    @Param('id') id: string,
    @Body() updateClientDto: UpdateClientDto,
  ): Promise<void> {
    await this.clientsService.edit(+id, updateClientDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string): Promise<void> {
    const deleteResponse = await this.clientsService.remove(+id);
    console.log('deleteResponse', deleteResponse);

    if (!deleteResponse.affected) {
      throw new NotFoundException();
    }
  }
}
