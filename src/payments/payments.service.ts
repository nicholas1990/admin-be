import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AreasService } from 'src/area/areas.service';
import { ClientsService } from 'src/clients/clients.service';
import { SocietiesService } from 'src/societies/societies.service';
import { Like, Repository } from 'typeorm';
import { CreatePaymentDto } from './dto/create.dto';
import { Payment } from './entity/payment.entity';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,

    // @InjectRepository(Area)
    // private areaRepository: Repository<Area>,
    // @InjectRepository(Client)
    // private clientRepository: Repository<Client>,
    // @InjectRepository(Society)
    // private societyRepository: Repository<Society>,

    private readonly areaService: AreasService,
    private readonly clientService: ClientsService,
    private readonly societiesService: SocietiesService,
  ) {}

  async getAll(
    offset?: number,
    limit?: number,
    date?: Date,
    client?: string,
    area?: string,
  ): Promise<{ items: Payment[]; count: number }> {
    const filters: any = {};

    if (date) {
      filters.paymentDate = new Date(date);
    }

    if (area) {
      filters.area = { name: Like(`%${area}%`) };
    }

    let conditions: any;

    if (client) {
      conditions = [
        {
          client: { name: Like(`%${client}%`) },
          ...filters,
        },
        {
          client: { surname: Like(`%${client}%`) },
          ...filters,
        },
      ];
    } else {
      conditions = {
        ...filters,
      };
    }

    const [items, count] = await this.paymentRepository.findAndCount({
      relations: ['client', 'area', 'society'],
      order: {
        id: 'ASC',
      },
      skip: offset,
      take: limit,
      where: conditions,
    });

    return {
      items,
      count,
    };
  }

  async add(payment: Partial<CreatePaymentDto>): Promise<Payment> {
    const [area, client, society] = await Promise.all([
      this.areaService.findOne(String(payment.area)),
      this.clientService.findOne(String(payment.client)),
      this.societiesService.findOne(String(payment.client)),
    ]);

    const newPayment = this.paymentRepository.create({
      area,
      client,
      society,
      paymentDate: payment.paymentDate,
      total: payment.total,
      annualFee: payment.annualFee,
    });

    return await this.paymentRepository.save(newPayment);
  }

  async remove(id: number) {
    return await this.paymentRepository.softDelete(id);
  }
}
