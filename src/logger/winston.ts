import winston from "winston";
import chalk from "chalk";

const { combine, timestamp, json, label, printf, colorize } = winston.format;

const myFormat = printf(({ level, message, label, timestamp, data }) => {
    return `${chalk.yellow.bold('[' + timestamp + ']')} ${chalk.bold.greenBright(label)} ${level} ${chalk.cyanBright(JSON.stringify(message, null, 4))}`;
});

export const logger = winston.createLogger({
    levels: winston.config.syslog.levels,
    level: process.env.LOG_LEVEL || 'info',
    format: combine(
        timestamp({
            format: 'YYYY-MM-DD hh:mm:ss A',
        }),
        json()
    ),
    defaultMeta: {
        service: 'mention-bot',
    },
    transports: [
        new winston.transports.File({
            filename: 'logs/error.log', level: 'error'
        }),
        new winston.transports.Console({
            format: combine(
                colorize(),
                label({ label: 'BOT' }),
                timestamp(),
                myFormat
            ),
        })
    ],
    exceptionHandlers: [
        new winston.transports.File({ filename: 'logs/exception.log' }),
    ],
    rejectionHandlers: [
        new winston.transports.File({ filename: 'logs/rejection.log' }),
    ],
});
