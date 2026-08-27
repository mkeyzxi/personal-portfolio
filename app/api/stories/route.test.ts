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

describe('/api/stories', () => {
  let mockCollection: jest.Mock;
  let mockOrderBy: jest.Mock;
  let mockGet: jest.Mock;
  let mockWhere: jest.Mock;
  let mockAdd: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();

    mockGet = jest.fn();
    mockOrderBy = jest.fn().mockReturnValue({ get: mockGet });
    mockWhere = jest.fn();
    mockWhere.mockReturnValue({
      orderBy: mockOrderBy,
      get: mockGet,
      where: mockWhere // support chaining
    });
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
    it('returns published stories for public access', async () => {
      (verifyAdminToken as jest.Mock).mockRejectedValueOnce(new Error('No token'));
      
      const mockDocs = [
        { id: '1', data: () => ({ title: 'Story 1', status: 'published' }) }
      ];
      mockGet.mockResolvedValueOnce({ docs: mockDocs });

      const request = new Request('http://localhost/api/stories');
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.data).toHaveLength(1);
      expect(mockWhere).toHaveBeenCalledWith('status', '==', 'published');
    });

    it('returns all stories for admin access', async () => {
      (verifyAdminToken as jest.Mock).mockResolvedValueOnce({});
      
      const mockDocs = [
        { id: '1', data: () => ({ title: 'Story 1', status: 'published' }) },
        { id: '2', data: () => ({ title: 'Story 2', status: 'draft' }) }
      ];
      mockGet.mockResolvedValueOnce({ docs: mockDocs });

      const request = new Request('http://localhost/api/stories', {
        headers: { authorization: 'Bearer admin-token' }
      });
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.data).toHaveLength(2);
      
      // when isAdmin is true, 'where' shouldn't be called for 'status' == 'published'
      // it might be called if there is a category, but we didn't pass one
      expect(mockWhere).not.toHaveBeenCalledWith('status', '==', 'published');
      expect(mockOrderBy).toHaveBeenCalledWith('createdAt', 'desc');
    });

    it('filters by category if category is provided', async () => {
      (verifyAdminToken as jest.Mock).mockRejectedValueOnce(new Error('No token'));
      
      const mockDocs = [];
      mockGet.mockResolvedValueOnce({ docs: mockDocs });

      const request = new Request('http://localhost/api/stories?category=tech');
      const response = await GET(request);
      
      expect(response.status).toBe(200);
      expect(mockWhere).toHaveBeenCalledWith('categorySlug', '==', 'tech');
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
      
      const request = new Request('http://localhost', { method: 'POST', body: JSON.stringify({ title: 'T' }) });
      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.message).toBe('Missing required fields');
    });

    it('returns 400 if slug already exists', async () => {
      (verifyAdminToken as jest.Mock).mockResolvedValueOnce({});
      mockGet.mockResolvedValueOnce({ empty: false }); // simulate existing slug

      const request = new Request('http://localhost', {
        method: 'POST', 
        body: JSON.stringify({ title: 'Test', slug: 'test-slug', content: 'Cont' })
      });
      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.message).toBe('Story with this slug already exists');
    });

    it('creates new story successfully', async () => {
      const mockToken = {
        name: 'Admin Name',
        picture: 'http://avatar.url',
        email: 'admin@test.com'
      };
      (verifyAdminToken as jest.Mock).mockResolvedValueOnce(mockToken);
      mockGet.mockResolvedValueOnce({ empty: true });
      mockAdd.mockResolvedValueOnce({ id: 'new-story-id' });

      const request = new Request('http://localhost', {
        method: 'POST', 
        body: JSON.stringify({ title: 'Test Story', slug: 'test-story', content: 'C' })
      });
      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(201);
      expect(data.success).toBe(true);
      expect(data.data.id).toBe('new-story-id');
      expect(data.data.authorName).toBe('Admin Name');
      expect(mockAdd).toHaveBeenCalled();
    });
  });
});
