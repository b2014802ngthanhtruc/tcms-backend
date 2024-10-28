import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { PresignedUrlDto, PresignedUrlsDto } from '../dtos';
import { MediaService } from '../services';

import { ZodValidationPipe } from '@anatine/zod-nestjs';

@Controller('medias')
export class MediaController {
  constructor(private readonly _mediaService: MediaService) {}

  @Post('presigned-url')
  @UsePipes(ZodValidationPipe)
  async getUploadPresignedUrl(@Body() data: PresignedUrlDto) {
    return this._mediaService.getPresignedUrl(data);
  }

  @Post('presigned-urls')
  @UsePipes(ZodValidationPipe)
  async getUploadPresignedUrls(@Body() data: PresignedUrlsDto) {
    return this._mediaService.getPresignedUrls(data);
  }
}
