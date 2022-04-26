import { Module } from '@nestjs/common';
import { PasswordService } from './service/password.service';
import { DateService } from './service/date.service';

@Module({
  providers: [PasswordService, DateService],
  exports: [PasswordService, DateService],
})
export class SharedModule {}
