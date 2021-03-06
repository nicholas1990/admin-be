import { Payment } from 'src/payments/entity/payment.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'clients',
})
export class Client extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column()
  parentName: string;

  @Column()
  parentSurname: string;

  @Column()
  address: string;

  @Column()
  cap: number;

  @Column()
  city: string;

  @Column()
  born: Date;

  @Column()
  bornPlace: string;

  @Column()
  cf: string;

  @Column()
  parentCf: string;

  @Column()
  phone: string;

  @Column()
  cardNumber: number;

  @Column()
  cardYear: number;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: false })
  payed: boolean;

  @Column({ default: false })
  isDisabled: boolean;

  @Column()
  note: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => Payment, (payment: Payment) => payment.id, {
    cascade: true,
  })
  public payment: Payment[];
}
