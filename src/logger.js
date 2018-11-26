const winston = require('winston');
const chalk = require('chalk');

const { format, createLogger: createWinstonLogger, transports } = winston;
const { Console } = transports;
const { combine, printf } = format;

const DEFAULT_COMMON_OPTIONS = {
  colorize: true,
  timestamp: true,
};

function fillDigit(num) {
  const str = String(num);
  if (str.length === 1) {
    return `0${str}`;
  }

  return str;
}

function getFormatedDate() {
  const date = new Date();

  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
      + ` ${fillDigit(date.getHours())}:${fillDigit(date.getMinutes())}`
      + `:${fillDigit(date.getSeconds())}`;
}

function createTransports() {
  return [
    new Console(Object.assign({}, DEFAULT_COMMON_OPTIONS)),
  ];
}

function colorLevel(str) {
  if (str === 'error') {
    return chalk.red(str);
  } else if (str === 'info') {
    return chalk.green(str);
  }

  return str;
}

function createLogger(level = 'warn') {
  return createWinstonLogger({
    format: combine(printf(info =>
        `${getFormatedDate()} - ${colorLevel(info.level)} ${info.message}`)),
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
