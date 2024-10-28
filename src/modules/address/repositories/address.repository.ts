import { Injectable } from '@nestjs/common';
import { Address, City, Prisma } from '@prisma/client';
import { PrismaService } from '@shared/prisma/prisma.service';

@Injectable()
export class AddressRepository {
  constructor(private readonly _prismaService: PrismaService) {}

  async create(data: Prisma.AddressCreateInput): Promise<Address> {
    const address = await this._prismaService.address.create({ data });

    return address;
  }

  async findMany(findOptions: Prisma.CityFindManyArgs): Promise<City[]> {
    const cities = await this._prismaService.city.findMany(findOptions);
    return cities;
  }
}
