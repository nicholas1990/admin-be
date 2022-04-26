import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AreasModule } from './area/areas.module';
import { Area as AreaEntity } from './area/entity/area.entity';
import { AuthModule } from './auth/auth.module';
import { ClientsModule } from './clients/clients.module';
import { Client as ClientEntity } from './clients/entity/client.entity';
import { Payment as PaymentsEntity } from './payments/entity/payment.entity';
import { PaymentsModule } from './payments/payments.module';
import { Society as SocietyEntity } from './societies/entity/society.entity';
import { SocietiesModule } from './societies/societies.module';
import { User as UserEntity } from './users/entity/user.entity';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    UsersModule,
    ClientsModule,
    AreasModule,
    SocietiesModule,
    PaymentsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      entities: [
        UserEntity,
        ClientEntity,
        AreaEntity,
        PaymentsEntity,
        SocietyEntity,
      ], // entities: ['./*/entity/*.entity.ts'],
      synchronize: true,
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
