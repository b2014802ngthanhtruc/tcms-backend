import * as fs from 'fs';
import { PrismaClient } from '@prisma/client';

export class CitySeed {
  static key = 'city-seed-key';
  constructor(private readonly _prisma: PrismaClient) {}

  async _loadFile(filePath: string) {
    try {
      const data = fs.readFileSync(filePath, 'utf8');
      const cityData = JSON.parse(data);
      return cityData;
    } catch (error) {
      console.error('Error reading citys file:', error);
      throw error;
    }
  }

  async run() {
    const cityData = await this._loadFile(__dirname + '/../data/city.json');
    for (const city of cityData) {
      await this._prisma.city.create({
        data: {
          name: city.name,
          country: {
            connect: {
              id: '10ac436f-124a-47b2-b21b-4da27eb1aa40',
            },
          },
          districts: {
            create: city.district.map((dis) => ({
              name: dis.name,
              wards: {
                create: dis.ward.map((wardData) => ({
                  name: wardData.name,
                })),
              },
            })),
          },
        },
      });
    }
  }
}
