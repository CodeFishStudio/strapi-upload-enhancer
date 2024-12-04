"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const processImage_1 = __importDefault(require("./services/processImage"));
const handleImageUpload = async (event) => {
    const { data } = event.params;
    const s3Url = data.url;
    let imageBuffer;
    if (!data.tmpWorkingDirectory) {
        strapi.log.warn('No tmpWorkingDirectory found in event data. Attempting to fetch image from s3.');
        return await (0, processImage_1.default)(imageBuffer, s3Url, data, strapi);
    }
    try {
        // List the files in the temporary directory
        const filesInTempDir = await promises_1.default.readdir(data.tmpWorkingDirectory);
        if (filesInTempDir.length < 1) {
            // No files in temp dir, attempting to fetch image from S3
            return await (0, processImage_1.default)(imageBuffer, s3Url, data, strapi);
        }
        // Order of precedence to find the smallest image
        const orderOfPrecedence = [/*'thumbnail', 'small', 'medium', 'large', */ 'optimized'];
        let selectedFile = undefined;
        // Looking for a file name match in order of precedence
        for (const prefix of orderOfPrecedence) {
            selectedFile = filesInTempDir.find((file) => file.startsWith(prefix));
            if (selectedFile)
                break; // Exit loop once a match is found
        }
        if (!selectedFile) {
            strapi.log.warn('No matching image file found based on precedence. Using the first file in the directory.');
            selectedFile = filesInTempDir[0];
        }
        const tempFilePath = path_1.default.join(data.tmpWorkingDirectory, selectedFile);
        // Read the image data from the temporary file
        imageBuffer = await promises_1.default.readFile(tempFilePath);
    }
    catch (error) {
        strapi.log.warn(`Error generating placeholder:\n${error.message}.\nAttempting to fetch image from s3.`);
    }
    return await (0, processImage_1.default)(imageBuffer, s3Url, data, strapi);
};
const bootstrap = ({ strapi }) => {
    // bootstrap phase
    strapi.log.info('Strapi Upload Enhancer Activated.');
    strapi.db.lifecycles.subscribe({
        models: ['plugin::upload.file'],
        beforeCreate: handleImageUpload,
        beforeUpdate: handleImageUpload,
    });
};
exports.default = bootstrap;
