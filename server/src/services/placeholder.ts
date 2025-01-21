import type { Core } from '@strapi/strapi';

import { getPlaiceholder } from 'plaiceholder';

const getPlaceholder = async (
    imageBuffer: Buffer | null,
    strapi: Core.Strapi,
): Promise<string | null> => {
    if (!imageBuffer) {
        return null;
    }

    try {
        strapi.log.info('Processing image for placeholder...');
        const { base64 } = await getPlaiceholder(imageBuffer, { size: 10 });
        strapi.log.info(`Generated placeholder: ${base64}`);
        return base64;
    } catch (error) {
        strapi.log.error(`Error processing image for placeholder: ${error.message}`);
        return null;
    }
};

export default getPlaceholder;
