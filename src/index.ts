// index.ts
import { Snake } from 'tgsnake'
import { apiId, token, apiHash } from './config/variables.js';
import { mention } from './middleware/mention.js';

const bot = new Snake({
    apiHash: apiHash,
    apiId: Number(apiId),
    botToken: token,
});

bot.use(mention.middleware())

bot.run();