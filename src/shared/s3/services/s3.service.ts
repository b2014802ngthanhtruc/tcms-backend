// import { BadRequestException, Injectable } from "@nestjs/common";
// import {
//   DeleteObjectCommand,
//   PutObjectCommand,
//   S3Client,
// } from "@aws-sdk/client-s3";

// import { CONFIG_VAR } from "@config/config.constant";
// import { ConfigService } from "@nestjs/config";
// import { PresignedUrlDto } from "@modules/medias/dtos";
// import { S3_ERRORS } from "src/content/errors";
// import { YEAR } from "@common/constants";
// import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

// @Injectable()
// export class S3Service {
//   private readonly _s3Client: S3Client;

//   constructor(private readonly _configService: ConfigService) {
//     this._s3Client = new S3Client({
//       region: this._configService.getOrThrow(CONFIG_VAR.AWS_REGION),
//       endpoint: this._configService.getOrThrow(CONFIG_VAR.AWS_ENDPOINT),
//       credentials: {
//         secretAccessKey: this._configService.getOrThrow(
//           CONFIG_VAR.AWS_SECRET_ACCESS_KEY
//         ),
//         accessKeyId: this._configService.getOrThrow(
//           CONFIG_VAR.AWS_ACCESS_KEY_ID
//         ),
//       },
//     });
//   }

//   async getPresignedUrl(data: PresignedUrlDto, expiresIn: number = 3600) {
//     const { key, type } = data;
//     const randomKey = new Date().getTime() + key;
//     const command = new PutObjectCommand({
//       Bucket: this._configService.get(CONFIG_VAR.AWS_BUCKET_S3),
//       Key: randomKey,
//       ACL: "public-read",
//       ContentType: type,
//     });

//     const presigned = await getSignedUrl(this._s3Client, command, {
//       expiresIn,
//       signableHeaders: new Set(["content-type"]),
//     }).catch((err) => {
//       throw new BadRequestException(
//         err?.message ?? S3_ERRORS.ERROR_CREATED_PRESIGNED_URL
//       );
//     });

//     return {
//       url: presigned,
//       key: randomKey,
//     };
//   }

//   async deleteObjectFromS3(key: string) {
//     const command = new DeleteObjectCommand({
//       Bucket: this._configService.get(CONFIG_VAR.AWS_BUCKET_S3),
//       Key: key,
//     });

//     await this._s3Client.send(command).catch((error: any) => {
//       console.error(error);

//       throw new BadRequestException(
//         error?.message ?? S3_ERRORS.ERROR_DELETE_OBJECT
//       );
//     });
//   }
// }
