import { join } from 'path';

export const SRC_DIR = join(__dirname, '..', 'src');
export const DIST_DIR = join(__dirname, '..', 'dist');
export const SSR_DIR = join(__dirname, '..', 'server');

export const IS_DEV = process.env.NODE_ENV !== 'production';
