// index.ts
import { Snake } from 'tgsnake'
import { apiId, token, apiHash } from './config/variables.js';
import { mention } from './middleware/mention.js';
import { logger } from './logger/winston.js';

const bot = new Snake({
    apiHash: apiHash,
    apiId: Number(apiId),
    botToken: token,
});

bot.use(mention.middleware())

logger.debug('Starting the bot...')

bot.run();