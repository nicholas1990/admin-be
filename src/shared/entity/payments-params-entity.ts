import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class PaymentsFilterParams {
  @IsOptional()
  @Type(() => Date)
  @IsNumber()
  date?: Date;

  @IsOptional()
  @Type(() => String)
  client?: string;

  @IsOptional()
  @Type(() => String)
  area?: string;
}
