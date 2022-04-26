import { Society } from 'src/societies/interfaces/society.interface';

export class OutputPayment {
  id: string;
  clientName: string;
  clientSurname: string;
  total: number;
  annualFee: number;
  paymentDate: Date;
  paymentAreas: string[] | [];
  paymentSocieties: Society | null;
}
