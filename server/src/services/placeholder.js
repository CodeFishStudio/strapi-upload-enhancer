"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const plaiceholder_1 = require("plaiceholder");
const getPlaceholder = async (imageBuffer, strapi) => {
    if (!imageBuffer) {
        return null;
    }
    try {
        strapi.log.info('Processing image for placeholder...');
        const { base64 } = await (0, plaiceholder_1.getPlaiceholder)(imageBuffer, { size: 10 });
        strapi.log.info(`Generated placeholder: ${base64}`);
        return base64;
    }
    catch (error) {
        strapi.log.error(`Error processing image for placeholder: ${error.message}`);
        return null;
    }
};
exports.default = getPlaceholder;
