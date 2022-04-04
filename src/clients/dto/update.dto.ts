export interface UpdateClientDto {
  email: string;
  name: string;
  surname: string;
  parentName?: string;
  parentSurname?: string;
  address: string;
  cap: number;
  city: string;
  born: Date;
  bornPlace: string;
  cf: string;
  parentCf?: string;
  phone: string;
  cardNumber: number;
  cardYear: number;
  isActive: boolean;
  payed: boolean;
  isDisabled: boolean;
  note: string;
}

// Modifica di un nuovo cliente
// Endpoint: PUT /admin/client
