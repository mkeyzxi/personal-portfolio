/** @jest-environment node */
import { GET, POST } from './route';
import { getAdminDb } from '@/lib/firebase-admin-db';
import { verifyAdminToken } from '@/lib/adminAuthHelper';

jest.mock('@/lib/firebase-admin-db', () => ({
  getAdminDb: jest.fn(),
}));

jest.mock('@/lib/adminAuthHelper', () => ({
  verifyAdminToken: jest.fn(),
}));

describe('/api/categories', () => {
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
    it('returns categories successfully', async () => {
      const mockDocs = [
        { id: 'cat1', data: () => ({ name: 'Category 1', slug: 'cat-1' }) },
      ];
      mockGet.mockResolvedValueOnce({ docs: mockDocs });

      const response = await GET();
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.data).toHaveLength(1);
      expect(data.data[0].slug).toBe('cat-1');
      expect(mockCollection).toHaveBeenCalledWith('categories');
    });

    it('handles errors gracefully', async () => {
      mockGet.mockRejectedValueOnce(new Error('DB Error'));

      const response = await GET();
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.success).toBe(false);
      expect(data.message).toBe('DB Error');
    });
  });

  describe('POST', () => {
    it('returns 401 if unauthorized', async () => {
      (verifyAdminToken as jest.Mock).mockRejectedValueOnce(new Error('UNAUTHORIZED'));

      const request = new Request('http://localhost', { method: 'POST', body: JSON.stringify({}) });
      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(401);
      expect(data.success).toBe(false);
    });

    it('returns 400 if required fields are missing', async () => {
      (verifyAdminToken as jest.Mock).mockResolvedValueOnce({});
      
      const request = new Request('http://localhost', { method: 'POST', body: JSON.stringify({ name: 'Only Name' }) });
      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.message).toBe('Missing required fields');
    });

    it('returns 400 if category slug already exists', async () => {
      (verifyAdminToken as jest.Mock).mockResolvedValueOnce({});
      mockGet.mockResolvedValueOnce({ empty: false }); // simulate existing slug

      const request = new Request('http://localhost', {
        method: 'POST', 
        body: JSON.stringify({ name: 'Test', slug: 'test-slug' })
      });
      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.message).toBe('Category with this slug already exists');
      expect(mockWhere).toHaveBeenCalledWith('slug', '==', 'test-slug');
    });

    it('creates new category successfully', async () => {
      (verifyAdminToken as jest.Mock).mockResolvedValueOnce({});
      mockGet.mockResolvedValueOnce({ empty: true });
      mockAdd.mockResolvedValueOnce({ id: 'new-cat-id' });

      const request = new Request('http://localhost', {
        method: 'POST', 
        body: JSON.stringify({ name: 'Test Category', slug: 'test-cat' })
      });
      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(201);
      expect(data.success).toBe(true);
      expect(data.data.id).toBe('new-cat-id');
      expect(data.data.name).toBe('Test Category');
      expect(mockAdd).toHaveBeenCalled();
    });
  });
});
