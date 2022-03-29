import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { User } from '../users/entity/user.entity';
import { Cat } from './entity/cats.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cat]), TypeOrmModule.forFeature([User])],
  controllers: [CatsController],
  providers: [CatsService],
  exports: [CatsService, TypeOrmModule],
})
export class CatsModule {}
