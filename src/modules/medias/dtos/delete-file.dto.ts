import { createZodDto } from "@anatine/zod-nestjs";
import { z } from "zod";

export const DeleteFileValidator = z.object({
  key: z.string().trim(),
});

export class DeleteFileImgDto extends createZodDto(DeleteFileValidator) {}
