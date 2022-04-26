import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AreasModule } from 'src/area/areas.module';
import { ClientsModule } from 'src/clients/clients.module';
import { SocietiesModule } from 'src/societies/societies.module';
import { Payment } from './entity/payment.entity';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';

@Module({
  imports: [
    AreasModule,
    ClientsModule,
    SocietiesModule,
    TypeOrmModule.forFeature([Payment]),
  ],
  controllers: [PaymentsController],
  providers: [PaymentsService],
  exports: [PaymentsService],
})
export class PaymentsModule {}
