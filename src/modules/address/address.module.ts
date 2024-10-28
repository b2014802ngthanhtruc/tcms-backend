import { Module } from '@nestjs/common';
import { AddressController } from './controllers';
import { AddressRepository } from './repositories';
import { AddressService } from './services';

@Module({
  imports: [],
  controllers: [AddressController],
  providers: [AddressRepository, AddressService],
  exports: [AddressService],
})
export class AddressModule {}
