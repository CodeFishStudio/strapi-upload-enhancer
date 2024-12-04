import type { Core } from '@strapi/strapi';
import fetchImageFromS3 from './fetchS3Image';
import getPlaceholder from './placeholder';
import getDominantColour from './dominantColour';

const processImage = async (
  imageBuffer: Buffer | undefined,
  s3Url: string | undefined,
  data: any,
  strapi: Core.Strapi
): Promise<void> => {
  if (!imageBuffer) {
    if (!s3Url) {
      strapi.log.error('Neither imageBuffer nor S3 URL is provided. Cannot process image.');
      return;
    }

    imageBuffer = (await fetchImageFromS3(s3Url, strapi)) ?? undefined;

    if (!imageBuffer) {
      strapi.log.error('Failed to retrieve image from S3. Cannot process image.');
      return;
    }
  }

  data.placeholder = await getPlaceholder(imageBuffer, strapi);
  data.dominantColour = await getDominantColour(imageBuffer, strapi);
};

export default processImage;
