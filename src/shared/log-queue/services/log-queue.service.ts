import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/prisma/prisma.service';
import { ResponseSuccess } from '@common/types';

@Injectable()
export class LogQueueService {
  constructor(private readonly _prismaService: PrismaService) {}

  async create(message: string): Promise<ResponseSuccess> {
    // const result = await this._prismaService.logQueue.create({
    //   data: {
    //     message,
    //   },
    // });

    return {
      success: true,
    };
  }

  // async findAll(): Promise<LogQueue[]> {
  //   const result = await this._prismaService.logQueue.findMany({});
  //   return result;
  // }
}
