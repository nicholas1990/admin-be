import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { PaginationParams } from 'src/shared/entity/pagination-params.entity';
import { CreatePaymentDto } from './dto/create.dto';
import { OutputPayment } from './dto/output.dto';
import { PaymentsService } from './payments.service';
import { PaymentsFilterParams } from 'src/shared/entity/payments-params-entity';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Get()
  async findAll(
    @Query() { offset, limit }: PaginationParams,
    @Query() { date, client, area }: PaymentsFilterParams,
  ): Promise<{ data: OutputPayment[]; total: number }> {
    const { items, count } = await this.paymentsService.getAll(
      offset,
      limit,
      date,
      client,
      area,
    );

    return {
      data: items.map((item) => {
        return {
          id: item.id,
          clientName: item.client?.name ?? null,
          clientSurname: item.client?.surname ?? null,
          total: item.total,
          annualFee: item.annualFee,
          paymentDate: item.paymentDate,
          paymentAreas: item.area?.name ? [item.area.name] : [],
          paymentSocieties: item.society ?? null,
        };
      }),
      total: count,
    };
  }

  @Post()
  @HttpCode(201)
  async create(@Body() createPaymentDto: CreatePaymentDto): Promise<void> {
    await this.paymentsService.add(createPaymentDto);
  }

  /**
   * TODO: https://github.com/typeorm/typeorm/issues/5838
   */
  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string): Promise<void> {
    console.log('id', id);
    const deleteResponse = await this.paymentsService.remove(+id);

    if (!deleteResponse.affected) {
      throw new NotFoundException();
    }
  }
}
