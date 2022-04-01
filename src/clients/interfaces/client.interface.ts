export interface Client {
  id: string;
  email: string;
  name: string;
  surname: string;
  parentName: string;
  parentSurname: string;
  address: string;
  cap: number;
  city: string;
  born: Date;
  bornPlace: string;
  cf: string;
  parentCf: string;
  phone: string;
  cardNumber: number;
  cardYear: number;
  isActive: boolean;
  payed: boolean;
  isDisabled: boolean;
  createdAt: Date; // creationDate: Date;
  updatedAt: Date;
  note: string;
}
