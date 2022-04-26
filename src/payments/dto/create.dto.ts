import { Area } from 'src/area/interfaces/area.interface';
import { Client } from 'src/clients/interfaces/client.interface';
import { Society } from 'src/societies/entity/society.entity';

export class CreatePaymentDto {
  area: Area;
  client: Client;
  society: Society;
  paymentDate: Date;
  total: number;
  annualFee: number;
}
