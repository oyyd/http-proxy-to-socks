const { createServer: createProxyServer } = require('./proxy_server');

const DEFAULT_OPTIONS = {
  proxy: '127.0.0.1:1080',
  proxyListReloadTimeout: 60,
  port: 8080,
};

function createServer(opts) {
  const options = Object.assign({}, DEFAULT_OPTIONS, opts);
  const { port } = options;

  // eslint-disable-next-line
  console.log(`listening: http://127.0.0.1:${port}`);

  return createProxyServer(options).listen(port);
}

module.exports = {
  createServer,
};
