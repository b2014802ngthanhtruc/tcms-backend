import { Injectable } from '@nestjs/common';
import { Document, Prisma } from '@prisma/client';
import { PrismaService } from '@shared/prisma/prisma.service';

@Injectable()
export class DocumentRepository {
  constructor(private readonly _prismaService: PrismaService) {}

  async create(data: Prisma.DocumentCreateInput): Promise<Document> {
    const document = await this._prismaService.document.create({ data });
    return document;
  }

  async findMany(
    findOptions: Prisma.DocumentFindManyArgs,
  ): Promise<Document[]> {
    const documents = await this._prismaService.document.findMany(findOptions);
    return documents;
  }

  async findOne(
    conditions: Prisma.DocumentWhereUniqueInput,
  ): Promise<Document | null> {
    const document = await this._prismaService.document.findUnique({
      where: conditions,
    });
    return document;
  }

  async update(
    conditions: Prisma.DocumentWhereUniqueInput,
    data: Prisma.DocumentUpdateInput,
  ): Promise<Document> {
    const document = await this._prismaService.document.update({
      where: conditions,
      data,
    });
    return document;
  }

  async delete(conditions: Prisma.DocumentWhereUniqueInput): Promise<void> {
    await this._prismaService.document.update({
      where: conditions,
      data: { deletedAt: new Date() },
    });
  }
}
