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
import { UpdateSocietyDto } from './dto/update.dto';
import { Society } from './interfaces/society.interface';
import { SocietiesService } from './societies.service';

@Controller('societies')
export class SocietiesController {
  constructor(
    // private readonly authService: AuthService,
    private readonly societiesService: SocietiesService,
  ) {}

  @Get()
  async findAll(
    @Query() { offset, limit }: PaginationParams,
  ): Promise<{ data: Society[]; total: number }> {
    const { items, count } = await this.societiesService.getAll(offset, limit);

    return {
      data: items,
      total: count,
    };
  }

  @Post()
  @HttpCode(201)
  async create(@Body() createAreaDto: any): Promise<void> {
    await this.societiesService.add(createAreaDto);
  }

  @Put(':id')
  @HttpCode(204)
  async update(
    @Param('id') id: string,
    @Body() updateSocietyDto: UpdateSocietyDto,
  ): Promise<void> {
    await this.societiesService.edit(+id, updateSocietyDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string): Promise<void> {
    const deleteResponse = await this.societiesService.remove(+id);

    if (!deleteResponse.affected) {
      throw new NotFoundException();
    }
  }
}
