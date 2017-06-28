const server = require('../server');

describe('server', () => {
  it('should export `createServer`', () => {
    expect(typeof server.createServer).toBe('function');
  });
});
