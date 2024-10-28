import { z } from 'zod';
import { CONFIG_VAR } from './config.constant';

export const ConfigSchema = z
  .object({
    //DATABASE
    [CONFIG_VAR.DATABASE_URL]: z.string().trim().url(),

    // JWT
    [CONFIG_VAR.ADMIN_JWT_ACCESS_SECRET]: z.string().trim(),
    [CONFIG_VAR.ADMIN_JWT_REFRESH_SECRET]: z.string().trim(),

    [CONFIG_VAR.STUDENT_JWT_ACCESS_SECRET]: z.string().trim(),
    [CONFIG_VAR.STUDENT_JWT_REFRESH_SECRET]: z.string().trim(),

    [CONFIG_VAR.TUTOR_JWT_ACCESS_SECRET]: z.string().trim(),
    [CONFIG_VAR.TUTOR_JWT_REFRESH_SECRET]: z.string().trim(),

    [CONFIG_VAR.SUBADMIN_JWT_ACCESS_SECRET]: z.string().trim(),
    [CONFIG_VAR.SUBADMIN_JWT_REFRESH_SECRET]: z.string().trim(),

    // JWT EXPIRE TIME
    [CONFIG_VAR.JWT_ACCESS_EXPIRES_IN]: z.string().trim(),
    [CONFIG_VAR.JWT_REFRESH_EXPIRES_IN]: z.string().trim(),

    // REDIS
    [CONFIG_VAR.REDIS_HOST]: z.string().trim(),
    [CONFIG_VAR.REDIS_PORT]: z.string().trim(),
    [CONFIG_VAR.REDIS_PASSWORD]: z.string().trim(),
    [CONFIG_VAR.REDIS_DB_CACHE]: z.string().trim(),
    [CONFIG_VAR.REDIS_DB_QUEUE]: z.string().trim(),

    // // FE
    // [CONFIG_VAR.FE_CHOOSE_PASSWORD_URL]: z.string().trim(),
    // [CONFIG_VAR.FE_CREATE_PROFILE_URL]: z.string().trim(),
    // [CONFIG_VAR.FE_ADMIN_RESET_PASSWORD_URL]: z.string().trim(),
    // [CONFIG_VAR.FE_OWNER_RESET_PASSWORD_URL]: z.string().trim(),
    // [CONFIG_VAR.FE_DOCTOR_RESET_PASSWORD_URL]: z.string().trim(),
    // [CONFIG_VAR.FE_NURSE_RESET_PASSWORD_URL]: z.string().trim(),
    // [CONFIG_VAR.FE_DOCTOR_CHOOSE_PASSWORD_URL]: z.string().trim(),
    // [CONFIG_VAR.FE_NURSE_CHOOSE_PASSWORD_URL]: z.string().trim(),
    // [CONFIG_VAR.FE_DOCTOR_CREATE_PROFILE_URL]: z.string().trim(),
    // [CONFIG_VAR.FE_NURSE_CREATE_PROFILE_URL]: z.string().trim(),

    // MAIL
    [CONFIG_VAR.MAIL_USER]: z.string().trim(),
    [CONFIG_VAR.MAIL_PASSWORD]: z.string().trim(),

    // AWS
    [CONFIG_VAR.AWS_ACCESS_KEY_ID]: z.string().trim(),
    [CONFIG_VAR.AWS_SECRET_ACCESS_KEY]: z.string().trim(),
    [CONFIG_VAR.AWS_REGION]: z.string().trim(),
    [CONFIG_VAR.AWS_BUCKET_S3]: z.string().trim(),
    [CONFIG_VAR.AWS_ENDPOINT]: z.string().trim(),

    // // SOCKET
    // [CONFIG_VAR.SOCKET_URL]: z.string().trim(),

    // //FACEBOOK
    // [CONFIG_VAR.FACEBOOK_APP_ID]: z.string().trim(),
    // [CONFIG_VAR.FACEBOOK_APP_SECRET]: z.string().trim(),

    // // GOOGLE
    // [CONFIG_VAR.GOOGLE_APP_ID]: z.string().trim(),
    // [CONFIG_VAR.GOOGLE_APP_SECRET]: z.string().trim(),
  })
  .required()
  .strip();
