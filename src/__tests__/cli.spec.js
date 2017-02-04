const { getOptionsArgs } = require('../cli');

describe('cli', () => {
  describe('getOptionsArgs', () => {
    it('should return an object with specified fields when provided', () => {
      const options = {
        socks: 'socks',
        port: 'port',
        level: 'level',
        config: 'config',
        FIELD_NOT_EXIST: 'FIELD_NOT_EXIST',
      };

      const res = getOptionsArgs(options);

      Object.keys(options).forEach((name) => {
        if (name === 'FIELD_NOT_EXIST') {
          expect(res[name]).toBeFalsy();
          return;
        }

        expect(res[name]).toBeTruthy();
      });
    });
  });
});
