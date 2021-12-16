import { clientConfig } from './webpack/client.config';
import { serverConfig } from './webpack/server.config';
import { notificationWorkerConfig } from './webpack/notificationWorker.config';

export default [serverConfig, clientConfig, notificationWorkerConfig];
