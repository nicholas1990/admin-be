import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './interfaces/user.interface';

// import { CreateCatDto } from './dto/create.dto';
// import { UpdateCatDto } from './dto/update.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Post()
  @HttpCode(201)
  create(@Body() createUserDto: any): string {
    console.log('🚀 ~ createCatDto', createUserDto);
    // this.catsService.create(createUserDto);
    return 'This action adds a new user';
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

  // @Delete(':id')
  // remove(@Param('id') id: string): string {
  //   return `This action removes a #${id} cat`;
  // }
}
