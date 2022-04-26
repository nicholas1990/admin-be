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
import { AreasService } from './areas.service';
import { UpdateAreaDto } from './dto/update.dto';
import { Area } from './interfaces/area.interface';
// import { UpdateClientDto } from './dto/update.dto';

@Controller('areas')
export class AreasController {
  constructor(private readonly areasService: AreasService) {}

  @Get()
  async findAll(
    @Query() { offset, limit }: PaginationParams,
  ): Promise<{ data: Area[]; total: number }> {
    const { items, count } = await this.areasService.getAll(offset, limit);

    return {
      data: items,
      total: count,
    };
  }

  // @Get(':id')
  // async find(@Param('id') id: string): Promise<Area> {
  //   console.log('🚀 ~ id', id);
  //   return await this.areasService.findOne(id);
  // }

  @Post()
  @HttpCode(201)
  async create(@Body() createAreaDto: any): Promise<void> {
    await this.areasService.add(createAreaDto);
  }

  @Put(':id')
  @HttpCode(204)
  async update(
    @Param('id') id: string,
    @Body() updateAreaDto: UpdateAreaDto,
  ): Promise<void> {
    await this.areasService.edit(+id, updateAreaDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string): Promise<void> {
    const areaResponse = await this.areasService.remove(+id);
    console.log('deleteResponse', areaResponse);

    if (!areaResponse.affected) {
      throw new NotFoundException();
    }
  }
}
