import { Injectable } from '@nestjs/common';
import { S3Service } from '@shared/s3/services/s3.service';
import { PresignedUrlDto, PresignedUrlsDto } from '../dtos';

@Injectable()
export class MediaService {
  constructor(private readonly _s3Service: S3Service) {}

  async getPresignedUrl(
    data: PresignedUrlDto,
  ): Promise<{ url: string; key: string }> {
    const { url, key } = await this._s3Service.getPresignedUrl(data);
    return {
      url,
      key,
    };
  }

  async getPresignedUrls(
    data: PresignedUrlsDto,
  ): Promise<{ url: string; key: string }[]> {
    const result = await Promise.all(
      data.urls.map(async (item) => {
        const { key, url } = await this._s3Service.getPresignedUrl(item);
        return {
          url,
          key,
        };
      }),
    );
    return [...result];
  }
}
