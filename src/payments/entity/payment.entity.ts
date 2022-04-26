import { Area } from 'src/area/entity/area.entity';
import { Client } from 'src/clients/entity/client.entity';
import { Society } from 'src/societies/entity/society.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity({
  name: 'payments',
})
export class Payment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  // @Column()
  // clientId: string;

  // @Column()
  // areaId: string;

  @Column()
  paymentDate: Date;

  @Column()
  total: number;

  @Column()
  annualFee: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => Client, (client: Client) => client.payment, {
    onDelete: 'CASCADE',
  })
  public client: Client;

  @ManyToOne(() => Area, (area: Area) => area.payment, {
    onDelete: 'CASCADE',
  })
  public area: Area;

  @ManyToOne(() => Society, (society: Society) => society.payment, {
    onDelete: 'CASCADE',
  })
  public society: Society;
}
