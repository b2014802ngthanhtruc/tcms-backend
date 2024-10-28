import { Controller, Get } from '@nestjs/common';
import { AddressService } from '../services';

@Controller('addresses')
export class AddressController {
  constructor(private readonly _addressService: AddressService) {}

  @Get('cities')
  async findManyCity() {
    return await this._addressService.findManyCity();
  }
}
