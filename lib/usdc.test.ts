import { getUsdcSupply } from './usdc';

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ result: '0x2540be400' }), // Example hex value
  }) as Promise<Response>
);

describe('getUsdcSupply', () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
    process.env.GROVE_PORTAL_API_KEY = 'test-key';
    process.env.GROVE_PORTAL_APP_ID = 'test-app-id';
  });

  it('should return the USDC supply as a number', async () => {
    const supply = await getUsdcSupply();
    expect(typeof supply).toBe('number');
    expect(supply).toBe(10000.000000); // 0x2540be400 / 1e6
  });

  it('should throw an error if API key or App ID is missing', async () => {
    delete process.env.GROVE_PORTAL_API_KEY;
    await expect(getUsdcSupply()).rejects.toThrow('Missing Grove Portal API key or App ID');
  });

  it('should throw an error if fetch fails', async () => {
    (fetch as jest.Mock).mockImplementationOnce(() => Promise.resolve({ ok: false, statusText: 'Not Found' }));
    await expect(getUsdcSupply()).rejects.toThrow('Failed to fetch USDC supply: Not Found');
  });

  it('should throw an error if the API returns an error', async () => {
    (fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ error: { message: 'Invalid request' } }),
      })
    );
    await expect(getUsdcSupply()).rejects.toThrow('Error from Grove API: Invalid request');
  });
});
