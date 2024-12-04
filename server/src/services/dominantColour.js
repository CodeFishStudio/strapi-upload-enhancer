"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_vibrant_1 = __importDefault(require("node-vibrant"));
const getDominantColour = async (imageBuffer, strapi) => {
    if (!imageBuffer) {
        return null;
    }
    const { DarkMuted, DarkVibrant } = await node_vibrant_1.default.from(imageBuffer).getPalette();
    // Average `DarkMuted` and `DarkVibrant` colors
    const r = (((DarkMuted === null || DarkMuted === void 0 ? void 0 : DarkMuted.r) || 0) + ((DarkVibrant === null || DarkVibrant === void 0 ? void 0 : DarkVibrant.r) || 0)) / 2;
    const g = (((DarkMuted === null || DarkMuted === void 0 ? void 0 : DarkMuted.g) || 0) + ((DarkVibrant === null || DarkVibrant === void 0 ? void 0 : DarkVibrant.g) || 0)) / 2;
    const b = (((DarkMuted === null || DarkMuted === void 0 ? void 0 : DarkMuted.b) || 0) + ((DarkVibrant === null || DarkVibrant === void 0 ? void 0 : DarkVibrant.b) || 0)) / 2;
    const toHex = (c) => {
        const hex = Math.round(c).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    };
    const dominantColour = '#' + toHex(r) + toHex(g) + toHex(b);
    strapi.log.info(`Got dominant colour: ${dominantColour}`);
    return dominantColour;
};
exports.default = getDominantColour;
