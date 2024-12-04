import type { Core } from '@strapi/strapi';
import fs from 'fs/promises';
import path from 'path';
import processImage from './services/processImage';

const handleImageUpload = async (event: any): Promise<void> => {
  const { data } = event.params;
  const s3Url: string | undefined = data.url;
  let imageBuffer: Buffer | undefined;

  if (!data.tmpWorkingDirectory) {
    strapi.log.warn(
      'No tmpWorkingDirectory found in event data. Attempting to fetch image from s3.'
    );
    return await processImage(imageBuffer, s3Url, data, strapi);
  }

  try {
    // List the files in the temporary directory
    const filesInTempDir = await fs.readdir(data.tmpWorkingDirectory);

    if (filesInTempDir.length < 1) {
      // No files in temp dir, attempting to fetch image from S3
      return await processImage(imageBuffer, s3Url, data, strapi);
    }

    // Order of precedence to find the smallest image
    const orderOfPrecedence = [/*'thumbnail', 'small', 'medium', 'large', */ 'optimized'];

    let selectedFile: string | undefined = undefined;

    // Looking for a file name match in order of precedence
    for (const prefix of orderOfPrecedence) {
      selectedFile = filesInTempDir.find((file) => file.startsWith(prefix));
      if (selectedFile) break; // Exit loop once a match is found
    }

    if (!selectedFile) {
      strapi.log.warn(
        'No matching image file found based on precedence. Using the first file in the directory.'
      );
      selectedFile = filesInTempDir[0];
    }

    const tempFilePath = path.join(data.tmpWorkingDirectory, selectedFile);

    // Read the image data from the temporary file
    imageBuffer = await fs.readFile(tempFilePath);
  } catch (error) {
    strapi.log.warn(
      `Error generating placeholder:\n${error.message}.\nAttempting to fetch image from s3.`
    );
  }
  return await processImage(imageBuffer, s3Url, data, strapi);
};

const bootstrap = ({ strapi }: { strapi: Core.Strapi }) => {
  // bootstrap phase
  strapi.log.info('Strapi Upload Enhancer Activated.');

  strapi.db.lifecycles.subscribe({
    models: ['plugin::upload.file'],
    beforeCreate: handleImageUpload,
    beforeUpdate: handleImageUpload,
  });
};

export default bootstrap;
