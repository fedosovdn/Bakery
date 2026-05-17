import type { Core } from '@strapi/strapi';

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Plugin => ({
  'users-permissions': {
    config: {
      jwtSecret: env('STRAPI_JWT_SECRET', env('JWT_SECRET')),
    },
  },
  upload: {
    config: {
      provider: 'aws-s3',
      providerOptions: {
        baseUrl: env('MINIO_PUBLIC_URL'),
        s3Options: {
          credentials: {
            accessKeyId: env('MINIO_ROOT_USER'),
            secretAccessKey: env('MINIO_ROOT_PASSWORD'),
          },
          endpoint: `http://${env('MINIO_ENDPOINT', 'localhost')}:${env.int('MINIO_PORT', 9000)}`,
          forcePathStyle: true,
          region: env('MINIO_REGION', 'us-east-1'),
          params: {
            Bucket: env('MINIO_BUCKET', 'bakery-media'),
          },
        },
      },
      actionOptions: {
        upload: {},
        uploadStream: {},
        delete: {},
      },
    },
  },
});

export default config;
