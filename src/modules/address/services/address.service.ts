import { Injectable } from '@nestjs/common';
import { CreateAddressDto } from '../dtos';
import { AddressEntity } from '../entities';
import { AddressRepository } from '../repositories';
import { CityResponse } from '../types';

@Injectable()
export class AddressService {
  constructor(private readonly _addressRepository: AddressRepository) {}

  async create(data: CreateAddressDto): Promise<AddressEntity> {
    const { country, ...rest } = data;
    const address = await this._addressRepository.create({
      ...rest,
      country: country || 'VN',
      fullAddress: `${data.address}, ${data.ward}, ${data.district}, ${data.city}`,
    });
    return address;
  }

  async findManyCity(): Promise<CityResponse[]> {
    const cities = await this._addressRepository.findMany({
      where: {
        isProvided: true,
      },
      select: {
        id: true,
        name: true,
        districts: {
          select: {
            id: true,
            name: true,
            wards: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });
    return cities.map((city) => city as CityResponse);
  }
}
