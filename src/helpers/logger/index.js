const pino = require('pino');
const pretty = require('pino-pretty');

const stream = pretty({
    colorize: true, // Colorize the output
    levelFirst: true, // Show level first
    translateTime: 'yyyy-mm-dd HH:MM:ss.l', // Timestamp format
});

const logger = pino(stream);

module.exports = logger;