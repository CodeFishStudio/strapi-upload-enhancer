import type { Core } from '@strapi/strapi';

const register = ({ strapi }: { strapi: Core.Strapi }) => {
    // register phase
    // @ts-ignore
    strapi.plugin('upload').contentTypes.file.attributes.placeholder = {
        type: 'text',
    };
    // @ts-ignore
    strapi.plugin('upload').contentTypes.file.attributes.dominantColor = {
        type: 'text',
    };
};

export default register;
