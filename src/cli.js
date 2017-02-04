const { readFileSync } = require('fs');
const { resolve } = require('path');
const cli = require('commander');
const { version } = require('../package.json');
const { createServer } = require('./server');
const { logger, changeLevel } = require('./logger');

const optionNames = [
  'socks',
  'port',
  'level',
  'config',
];

function getFileConfig(filePath) {
  const absFile = resolve(process.cwd(), filePath);

  const content = readFileSync(absFile).toString('utf8');

  let fileConfig = null;

  try {
    fileConfig = JSON.parse(content);
  } catch (err) {
    const error = new Error(`invalid json content: ${err.message}`);
    error.code = err.code;
    throw error;
  }

  return fileConfig;
}

function getOptionsArgs(args) {
  const options = {};

  optionNames.forEach((name) => {
    if (Object.hasOwnProperty.apply(args, [name])) {
      if (typeof args[name] !== 'string') {
        throw new Error(`string "${name}" expected`);
      }
      options[name] = args[name];
    }
  });

  return options;
}

function main() {
  cli.version(version)
    .option('-s, --socks [socks]', 'specify your socks proxy host, default: 127.0.0.1:1080')
    .option('-p, --port [port]', 'specify the listening port of http proxy server, default: 8080')
    .option('-c, --config [config]', 'read configs from file in json format')
    .option('--level [level]', 'log level, vals: info, error')
    .parse(process.argv);

  const options = getOptionsArgs(cli);

  let fileConfig = null;

  if (options.config) {
    fileConfig = getFileConfig(options.config);
  }

  Object.assign(options, fileConfig);

  if (typeof options.level === 'string') {
    changeLevel(logger, options.level);
  }

  createServer(options);
}

module.exports = {
  getOptionsArgs,
  main,
};
