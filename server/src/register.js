"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const register = ({ strapi }) => {
    // register phase
    // @ts-ignore
    strapi.plugin('upload').contentTypes.file.attributes.placeholder = {
        type: 'text',
    };
    // @ts-ignore
    strapi.plugin('upload').contentTypes.file.attributes.dominantColour = {
        type: 'text',
    };
};
exports.default = register;
