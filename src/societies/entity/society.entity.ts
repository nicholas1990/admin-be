import { Payment } from 'src/payments/entity/payment.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity({
  name: 'societies',
})
export class Society extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  ragioneSociale: string;

  @Column()
  type: string;

  @Column()
  address: string;

  @Column()
  city: string;

  @Column()
  cf: string;

  @Column()
  albo: string;

  @Column()
  affiliazione: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  public deletedAt: Date;

  @OneToMany(() => Payment, (payment: Payment) => payment.id, {
    cascade: true,
  })
  public payment: Payment[];
}
