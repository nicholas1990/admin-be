import { Area } from 'src/area/interfaces/area.interface';
import { Client } from 'src/clients/interfaces/client.interface';
import { Society } from 'src/societies/entity/society.entity';

export interface IPayment {
  id: string;
  client: Client;
  area: Area;
  society: Society;
  paymentDate: Date;
  total: number;
  annualFee: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
