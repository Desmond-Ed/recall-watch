import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createApp } from './app.js';
import { loadConfig } from './config.js';
import { createLogger } from './logger.js';

const apiDirectory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const envPath = path.resolve(apiDirectory, '../.env');
if (existsSync(envPath)) {
  process.loadEnvFile(envPath);
}

let config;
try {
  config = loadConfig();
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
}

const logger = createLogger(config);
const app = createApp({ logger });

app.listen(config.PORT, (error?: Error) => {
  if (error) {
    logger.fatal({ err: error }, 'server failed to start');
    process.exit(1);
  }
  logger.info({ port: config.PORT }, 'server listening');
});
