import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  InternalServerErrorException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ClientsService } from './clients.service';
import { UpdateClientDto } from './dto/update.dto';
import { Client } from './interfaces/client.interface';
// import { UpdateUserDto } from './dto/update.dto';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Get()
  async findAll(): Promise<any[]> {
    const clients = await this.clientsService.findAll();
    return clients;
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
  async remove(@Param('id') id: string): Promise<void> {
    await this.clientsService.remove(+id);
  }
}
