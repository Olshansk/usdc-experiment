import { getMints, getBurns } from './usdc-events';

const mockLogs = [
  {
    blockHash: '0x1',
    blockNumber: '0x1',
    transactionHash: '0x2',
    topics: [
      '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
      '0x0000000000000000000000000000000000000000000000000000000000000000',
      '0x0000000000000000000000001234567890123456789012345678901234567890',
    ],
    data: '0x3b9aca00', // 1,000,000,000
  },
];

global.fetch = jest.fn((url, options) => {
  const body = JSON.parse(options.body as string);
  if (body.method === 'eth_getLogs') {
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ result: mockLogs }),
    }) as Promise<Response>;
  }
  if (body.method === 'eth_getBlockByHash') {
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ result: { timestamp: '0x610f8f00' } }), // 1628409600
    }) as Promise<Response>;
  }
  return Promise.reject(new Error('Unknown method'));
});

describe('USDC Events', () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
    process.env.GROVE_PORTAL_API_KEY = 'test-key';
    process.env.GROVE_PORTAL_APP_ID = 'test-app-id';
  });

  describe('getMints', () => {
    it('should return mint events', async () => {
      const mints = await getMints(1, 2);
      expect(mints).toHaveLength(1);
      const mint = mints[0];
      expect(mint.amount).toBe(1000);
      expect(mint.to).toBe('0x1234567890123456789012345678901234567890');
      expect(mint.timestamp).toEqual(new Date(1628409600000));
    });
  });

  describe('getBurns', () => {
    it('should return burn events', async () => {
      const burns = await getBurns(1, 2);
      expect(burns).toHaveLength(1);
      const burn = burns[0];
      expect(burn.amount).toBe(1000);
      expect(burn.from).toBe('0x0000000000000000000000000000000000000000');
    });
  });
});
