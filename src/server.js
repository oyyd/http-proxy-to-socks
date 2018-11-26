const { logger, changeLevel } = require('./logger');
const { createServer: createProxyServer } = require('./proxy_server');

const DEFAULT_OPTIONS = {
  host: '127.0.0.1',
  socks: '127.0.0.1:1080',
  proxyListReloadTimeout: 60,
  port: 8080,
};

function createServer(opts) {
  const options = Object.assign({}, DEFAULT_OPTIONS, opts);

  if (typeof options.level === 'string') {
    changeLevel(logger, options.level);
  }

  const { port, socks, host } = options;

  // eslint-disable-next-line
  console.log(`SOCKS: ${socks}\nhttp-proxy listening: ${host}:${port}`);

  return createProxyServer(options).listen(port, host);
}

module.exports = {
  createServer,
};
