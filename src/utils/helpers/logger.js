const winston = require('winston');

const createLogger = () => new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({
      colorize: true,
    }),
  ],
});

const logger = createLogger();

module.exports = logger;
