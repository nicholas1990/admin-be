import { Type } from 'class-transformer';
import { IsEmail, IsOptional } from 'class-validator';

export class UsersFilterParams {
  @IsOptional()
  @Type(() => String)
  role?: 'admin' | 'operator';

  @IsOptional()
  @Type(() => String)
  @IsEmail()
  search?: string;
}
