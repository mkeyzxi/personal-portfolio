import { verifyAdminToken } from './adminAuthHelper';
import { getAdminAuth } from './firebase-admin-auth';

// Mock the dependencies
jest.mock('./firebase-admin-auth', () => ({
  getAdminAuth: jest.fn(),
}));

describe('verifyAdminToken', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.clearAllMocks();
    process.env = { ...originalEnv, ADMIN_EMAIL: 'admin@example.com' };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it('throws UNAUTHORIZED if authorization header is missing', async () => {
    const request = { headers: { get: () => null } } as unknown as Request;
    await expect(verifyAdminToken(request)).rejects.toThrow('UNAUTHORIZED');
  });

  it('throws UNAUTHORIZED if authorization header does not start with Bearer ', async () => {
    const request = { headers: { get: () => 'Basic some-token' } } as unknown as Request;
    await expect(verifyAdminToken(request)).rejects.toThrow('UNAUTHORIZED');
  });

  it('throws INVALID_TOKEN if token verification fails', async () => {
    const request = { headers: { get: () => 'Bearer invalid-token' } } as unknown as Request;

    const mockVerifyIdToken = jest.fn().mockRejectedValue(new Error('Invalid token'));
    (getAdminAuth as jest.Mock).mockReturnValue({ verifyIdToken: mockVerifyIdToken });

    await expect(verifyAdminToken(request)).rejects.toThrow('INVALID_TOKEN');
  });

  it('throws SERVER_CONFIG_ERROR if ADMIN_EMAIL is not set', async () => {
    delete process.env.ADMIN_EMAIL;
    const request = { headers: { get: () => 'Bearer valid-token' } } as unknown as Request;

    const mockVerifyIdToken = jest.fn().mockResolvedValue({ email: 'admin@example.com' });
    (getAdminAuth as jest.Mock).mockReturnValue({ verifyIdToken: mockVerifyIdToken });

    await expect(verifyAdminToken(request)).rejects.toThrow('SERVER_CONFIG_ERROR');
  });

  it('throws FORBIDDEN if email does not match ADMIN_EMAIL', async () => {
    const request = { headers: { get: () => 'Bearer valid-token' } } as unknown as Request;

    const mockVerifyIdToken = jest.fn().mockResolvedValue({ email: 'user@example.com' });
    (getAdminAuth as jest.Mock).mockReturnValue({ verifyIdToken: mockVerifyIdToken });

    await expect(verifyAdminToken(request)).rejects.toThrow('FORBIDDEN');
  });

  it('returns decoded token if email matches ADMIN_EMAIL', async () => {
    const request = { headers: { get: () => 'Bearer valid-token' } } as unknown as Request;

    const decodedToken = { email: 'admin@example.com', uid: '123' };
    const mockVerifyIdToken = jest.fn().mockResolvedValue(decodedToken);
    (getAdminAuth as jest.Mock).mockReturnValue({ verifyIdToken: mockVerifyIdToken });

    const result = await verifyAdminToken(request);
    expect(result).toEqual(decodedToken);
  });
});
