import type { Core } from '@strapi/strapi';
import Vibrant from 'node-vibrant';

const getDominantColour = async (
  imageBuffer: Buffer | null,
  strapi: Core.Strapi
): Promise<string | null> => {
  if (!imageBuffer) {
    return null;
  }

  const { DarkMuted, DarkVibrant } = await Vibrant.from(imageBuffer).getPalette();

  // Average `DarkMuted` and `DarkVibrant` colors
  const r = ((DarkMuted?.r || 0) + (DarkVibrant?.r || 0)) / 2;
  const g = ((DarkMuted?.g || 0) + (DarkVibrant?.g || 0)) / 2;
  const b = ((DarkMuted?.b || 0) + (DarkVibrant?.b || 0)) / 2;

  const toHex = (c: number) => {
    const hex = Math.round(c).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };

  const dominantColour: string = '#' + toHex(r) + toHex(g) + toHex(b);

  strapi.log.info(`Got dominant colour: ${dominantColour}`);

  return dominantColour;
};

export default getDominantColour;
