"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const fetchImageFromS3 = async (s3Url, strapi) => {
    try {
        if (!s3Url) {
            strapi.log.error(`S3 URL is not provided in the data object.`);
            return null;
        }
        strapi.log.info(`Fetching image from S3 URL: ${s3Url}`);
        const response = await axios_1.default.get(s3Url, { responseType: 'arraybuffer' });
        if (response.status === 200) {
            return Buffer.from(response.data);
        }
        else {
            strapi.log.error(`Failed to fetch image from S3. HTTP Status: ${response.status}`);
            return null;
        }
    }
    catch (error) {
        strapi.log.error(`Error fetching image from S3: ${error.message}`);
        return null;
    }
};
exports.default = fetchImageFromS3;
