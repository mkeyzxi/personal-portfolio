import { fetcher, FetchError } from './fetcher';

describe('fetcher', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('fetches successfully with standard response format', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({ success: true, data: { id: 1 } }),
    });

    const data = await fetcher('/api/test');
    expect(data).toEqual({ id: 1 });
  });

  it('throws an error if standard response returns success: false', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({ success: false, message: 'Custom error message' }),
    });

    await expect(fetcher('/api/test')).rejects.toThrow('Custom error message');
  });

  it('returns raw data if standard format is not used', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({ id: 2, name: 'Test' }),
    });

    const data = await fetcher('/api/test');
    expect(data).toEqual({ id: 2, name: 'Test' });
  });

  it('throws a FetchError when res.ok is false', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 404,
      json: jest.fn().mockResolvedValue({ error: 'Not found' }),
    });

    try {
      await fetcher('/api/test');
    } catch (e) {
      const err = e as FetchError;
      expect(err).toBeInstanceOf(FetchError);
      expect(err.message).toBe('An error occurred while fetching the data.');
      expect(err.status).toBe(404);
      expect(err.info).toEqual({ error: 'Not found' });
    }
  });
});
