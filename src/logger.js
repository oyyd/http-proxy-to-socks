const winston = require('winston');

const { Logger, transports } = winston;
const { Console } = transports;

const DEFAULT_COMMON_OPTIONS = {
  colorize: true,
  timestamp: true,
};

function createTransports() {
  return [
    new Console(Object.assign({}, DEFAULT_COMMON_OPTIONS)),
  ];
}

function createLogger(level = 'warn') {
  return new Logger({
    level,
    transports: createTransports(),
  });
}

function changeLevel(logger, level) {
  logger.configure({
    level,
    transports: createTransports(),
  });
}

const logger = createLogger();

module.exports = {
  logger,
  createLogger,
  changeLevel,
};
