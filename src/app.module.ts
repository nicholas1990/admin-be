import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CatsModule } from './cats/cats.module';
import { Cat as CatEntity } from './cats/entity/cats.entity';
import { Client as ClientEntity } from './clients/entity/client.entity';
import { ClientsModule } from './clients/users.module';
import { User as UserEntity } from './users/entity/user.entity';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    CatsModule,
    UsersModule,
    ClientsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      // entities: ['./*/entity/*.entity.ts'],
      entities: [UserEntity, CatEntity, ClientEntity],
      synchronize: true,
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
