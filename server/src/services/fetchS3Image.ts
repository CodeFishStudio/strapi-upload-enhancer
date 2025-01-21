import type { Core } from '@strapi/strapi';
import axios from 'axios';

const fetchImageFromS3 = async (
    s3Url: string | undefined,
    strapi: Core.Strapi,
): Promise<Buffer | null> => {
    try {
        if (!s3Url) {
            strapi.log.error(`S3 URL is not provided in the data object.`);
            return null;
        }

        strapi.log.info(`Fetching image from S3 URL: ${s3Url}`);
        const response = await axios.get(s3Url, { responseType: 'arraybuffer' });

        if (response.status === 200) {
            return Buffer.from(response.data);
        } else {
            strapi.log.error(`Failed to fetch image from S3. HTTP Status: ${response.status}`);
            return null;
        }
    } catch (error) {
        strapi.log.error(`Error fetching image from S3: ${error.message}`);
        return null;
    }
};

export default fetchImageFromS3;
