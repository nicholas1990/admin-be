import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class ClientsFilterParams {
  @IsOptional()
  @Type(() => Boolean)
  active?: boolean;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  born?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  cardYear?: number;

  @IsOptional()
  @Type(() => String)
  search?: string;
}
