"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fetchS3Image_1 = __importDefault(require("./fetchS3Image"));
const placeholder_1 = __importDefault(require("./placeholder"));
const dominantColour_1 = __importDefault(require("./dominantColour"));
const processImage = async (imageBuffer, s3Url, data, strapi) => {
    var _a;
    if (!imageBuffer) {
        if (!s3Url) {
            strapi.log.error('Neither imageBuffer nor S3 URL is provided. Cannot process image.');
            return;
        }
        imageBuffer = (_a = (await (0, fetchS3Image_1.default)(s3Url, strapi))) !== null && _a !== void 0 ? _a : undefined;
        if (!imageBuffer) {
            strapi.log.error('Failed to retrieve image from S3. Cannot process image.');
            return;
        }
    }
    data.placeholder = await (0, placeholder_1.default)(imageBuffer, strapi);
    data.dominantColour = await (0, dominantColour_1.default)(imageBuffer, strapi);
};
exports.default = processImage;
