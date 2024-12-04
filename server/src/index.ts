import type { Core } from '@strapi/strapi';

/**
 * Application methods
 */
import bootstrap from './bootstrap';

/**
 * Plugin server methods
 */
import config from './config';
import register from './register';

export default {
  register,
  bootstrap,
  config,
};
