import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update.dto';
import { User } from './interfaces/user.interface';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(): Promise<User[]> {
    const users = await this.usersService.findAll();

    return users.map((user) => {
      delete user.password;
      return user;
    });
  }

  @Post()
  @HttpCode(201)
  async create(@Body() createUserDto: any): Promise<number> {
    const user = await this.usersService.add(createUserDto);
    return user.id;
  }

  @Put(':id')
  @HttpCode(201)
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<number> {
    await this.usersService.edit(+id, updateUserDto);
    return +id;
  }

  @Delete(':id')
  remove(@Param('id') id: string): string {
    return `This action removes a #${+id} cat`;
  }

  // @Get()
  // findAll(@Req() request: Request): string {
  //   return 'This action returns all cats';
  // }

  // @Get(':id')
  // findOne(@Param() id: string): string {
  //   return `This action returns a #${id} cat`;
  // }

  // @Put(':id')
  // update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto): string {
  //   console.log('🚀 ~ updateCatDto', updateCatDto);
  //   return `This action updates a #${id} cat`;
  // }

  // const user = await this.usersService.findOne(+id);
  // delete user.password;
}
