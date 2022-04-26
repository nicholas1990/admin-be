import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { PaginationParams } from 'src/shared/entity/pagination-params.entity';
import { UsersFilterParams } from 'src/shared/entity/users-params-entity';
import { PasswordService } from 'src/shared/service/password.service';
import { OutputUser } from './dto/output.dto';
import { UpdateUserDto } from './dto/update.dto';
import { UpdatePasswordUserDto } from './dto/update_password.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly passwordService: PasswordService,
  ) {}

  /**
   * TODO: Exclude password in entity file.
   */
  @Get()
  async findAll(
    @Query() { offset, limit }: PaginationParams,
    @Query() { role, search }: UsersFilterParams,
  ): Promise<{ data: OutputUser[]; total: number }> {
    const users = await this.usersService.getAll(offset, limit, role, search);
    return {
      data: users.items.map((item) => {
        return {
          id: item.id,
          firstName: item.firstName,
          lastName: item.lastName,
          email: item.email,
          role: item.role,
          isActive: item.isActive,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
          deletedAt: item.deletedAt,
        };
      }),
      total: users.count,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<OutputUser> {
    const user = await this.usersService.findOne(+id);
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      isActive: user.isActive,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      deletedAt: user.deletedAt,
    };
  }

  @Post()
  @HttpCode(201)
  async create(@Body() createUserDto: any): Promise<number> {
    const user = await this.usersService.add(createUserDto);
    return user.id;
  }

  @Put(':id')
  @HttpCode(204)
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<number> {
    await this.usersService.edit(+id, updateUserDto);
    return +id;
  }

  @Put('change_password/:id')
  @HttpCode(204)
  async updatePassword(
    @Param('id') id: string,
    @Body() updatePasswordDto: UpdatePasswordUserDto,
  ): Promise<number> {
    const { oldPassword, newPassword } = updatePasswordDto;
    const user = await this.usersService.findOne(+id);

    const checkPassword = await this.passwordService.comparePassword(
      oldPassword,
      user.password,
    );

    if (!checkPassword) {
      throw new InternalServerErrorException();
    }

    const newPasswordHash = await this.passwordService.getPasswordHash(
      newPassword,
    );

    await this.usersService.editPassword(+id, newPasswordHash);
    return +id;
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string): Promise<void> {
    const deleteResponse = await this.usersService.remove(+id);

    if (!deleteResponse.affected) {
      throw new NotFoundException();
    }
  }
}
