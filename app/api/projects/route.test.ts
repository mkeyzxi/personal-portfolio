/** @jest-environment node */
import { GET, POST } from './route';
import { getAdminDb } from '@/lib/firebase-admin-db';
import { verifyAdminToken } from '@/lib/adminAuthHelper';

// Mock dependencies
jest.mock('@/lib/firebase-admin-db', () => ({
  getAdminDb: jest.fn(),
}));

jest.mock('@/lib/adminAuthHelper', () => ({
  verifyAdminToken: jest.fn(),
}));

describe('/api/projects', () => {
  let mockCollection: jest.Mock;
  let mockOrderBy: jest.Mock;
  let mockGet: jest.Mock;
  let mockWhere: jest.Mock;
  let mockAdd: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();

    mockGet = jest.fn();
    mockOrderBy = jest.fn().mockReturnValue({ get: mockGet });
    mockWhere = jest.fn().mockReturnValue({ get: mockGet });
    mockAdd = jest.fn();

    mockCollection = jest.fn().mockReturnValue({
      orderBy: mockOrderBy,
      where: mockWhere,
      add: mockAdd,
    });

    (getAdminDb as jest.Mock).mockReturnValue({
      collection: mockCollection,
    });
  });

  describe('GET', () => {
    it('returns empty array when no projects exist', async () => {
      mockGet.mockResolvedValueOnce({ empty: true, docs: [] });

      const response = await GET();
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual({ success: true, data: [] });
      expect(mockCollection).toHaveBeenCalledWith('projects');
      expect(mockOrderBy).toHaveBeenCalledWith('createdAt', 'desc');
    });

    it('returns list of projects when exist', async () => {
      const mockDocs = [
        { id: '1', data: () => ({ title: 'Project 1' }) },
        { id: '2', data: () => ({ title: 'Project 2' }) },
      ];
      mockGet.mockResolvedValueOnce({ empty: false, docs: mockDocs });

      const response = await GET();
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.data).toHaveLength(2);
      expect(data.data[0]).toEqual({ id: '1', title: 'Project 1' });
    });
  });

  describe('POST', () => {
    it('returns 401 if token is unauthorized', async () => {
      (verifyAdminToken as jest.Mock).mockRejectedValueOnce(new Error('UNAUTHORIZED'));

      const request = new Request('http://localhost', { method: 'POST', body: JSON.stringify({}) });
      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(401);
      expect(data.success).toBe(false);
      expect(data.message).toBe('Unauthorized');
    });

    it('returns 400 if required fields are missing', async () => {
      (verifyAdminToken as jest.Mock).mockResolvedValueOnce({ email: 'admin@test.com' });

      const request = new Request('http://localhost', {
        method: 'POST',
        body: JSON.stringify({ title: 'Test' }), // missing slug and content
      });
      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.message).toBe('Data proyek tidak lengkap');
    });

    it('returns 400 if slug contains space', async () => {
      (verifyAdminToken as jest.Mock).mockResolvedValueOnce({ email: 'admin@test.com' });

      const request = new Request('http://localhost', {
        method: 'POST',
        body: JSON.stringify({ title: 'Test', slug: 'test space', content: 'Content' }),
      });
      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.message).toBe('Slug tidak boleh mengandung spasi');
    });

    it('returns 400 if slug already exists', async () => {
      (verifyAdminToken as jest.Mock).mockResolvedValueOnce({ email: 'admin@test.com' });
      mockGet.mockResolvedValueOnce({ empty: false }); // simulate existing

      const request = new Request('http://localhost', {
        method: 'POST',
        body: JSON.stringify({ title: 'Test', slug: 'test-slug', content: 'Content' }),
      });
      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.message).toBe('Slug sudah digunakan');
      expect(mockWhere).toHaveBeenCalledWith('slug', '==', 'test-slug');
    });

    it('creates project successfully', async () => {
      (verifyAdminToken as jest.Mock).mockResolvedValueOnce({ email: 'admin@test.com' });
      mockGet.mockResolvedValueOnce({ empty: true }); // no existing slug
      mockAdd.mockResolvedValueOnce({ id: 'new-id' });

      const request = new Request('http://localhost', {
        method: 'POST',
        body: JSON.stringify({
          title: 'Test',
          slug: 'test-slug',
          shortDescription: 'Desc',
          content: 'Content',
          category: 'Web',
        }),
      });
      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(201);
      expect(data.success).toBe(true);
      expect(data.id).toBe('new-id');
      expect(mockAdd).toHaveBeenCalled();
      
      const addedData = mockAdd.mock.calls[0][0];
      expect(addedData.title).toBe('Test');
      expect(addedData.slug).toBe('test-slug');
    });
  });
});
