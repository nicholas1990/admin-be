import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CatsService } from 'src/cats/cats.service';
import { Cat } from './interfaces/cat.interface';
import { CreateCatDto } from './dto/create.dto';
import { UpdateCatDto } from './dto/update.dto';
import { PaginationParams } from './entity/pagination-params.entity';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  @HttpCode(201)
  async create(@Body() createCatDto: CreateCatDto): Promise<Cat> {
    return this.catsService.insert(createCatDto);
  }

  @Get()
  async findAll(
    @Query() { offset, limit }: PaginationParams,
  ): Promise<{ items: Cat[]; count: number }> {
    return this.catsService.getAll(offset, limit);
  }

  // @Get()
  // findAll(@Req() request: Request): string {
  //   return 'This action returns all cats';
  // }

  @Get(':id')
  findOne(@Param() id: string): string {
    return `This action returns a #${id} cat`;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto): string {
    console.log('🚀 ~ updateCatDto', updateCatDto);
    return `This action updates a #${id} cat`;
  }

  @Delete(':id')
  remove(@Param('id') id: string): string {
    return `This action removes a #${id} cat`;
  }
}
