import { v3 } from '../../../src/api';
import { open } from '../../data/api/pull-request';

describe('API v3 test', () => {
  describe('v3 call', () => {
    beforeEach(() => {
      global.fetch = jest.fn().mockImplementation(() =>
        Promise.resolve({
          status: 200,
          json: () => Promise.resolve(open),
        })
      );
    });

    it('should call fetch with the expected params', () => {
      const expectedUrl = 'https://api.github.com';
      const expectedParams = 'parameters';
      expect(global.fetch).not.toHaveBeenCalled();
      v3.call('https://api.github.com', 'parameters');
      expect(global.fetch).toHaveBeenCalledWith(expectedUrl, expectedParams);
    });

    it('should return the expected response object', async () => {
      const expected = open;

      expect(
        await v3.call('https://api.github.com', 'parameters')
      ).resolves.toEqual(expected);
    });
  });
});
