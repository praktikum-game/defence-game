import path from 'path';

import { ENVS } from './env';

export const WEBPACK_ROOT_DIR = path.join(__dirname, '../../');
export const SERVER_DIST_ROOT_DIR = path.join(__dirname, '..', '..');

export const ROOT_DIR = ENVS.__DEV__ ? SERVER_DIST_ROOT_DIR : WEBPACK_ROOT_DIR;

export const DIST_DIR = path.join(ROOT_DIR, 'dist');
export const SERVER_DIR = path.join(ROOT_DIR, 'server');
export const CLIENT_DIR = path.join(ROOT_DIR, 'client');
