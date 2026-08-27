import { renderHook } from '@testing-library/react';
if (typeof global.Response === 'undefined') {
  global.Response = class Response {} as any;
}
import { useSyncOfflineData } from './useSyncOfflineData';
import { db } from '@/lib/db';
import { toast } from 'sonner';

// Mock dependencies
jest.mock('@/lib/db', () => ({
  db: {
    pendingRequests: {
      toArray: jest.fn(),
      delete: jest.fn(),
    }
  }
}));

jest.mock('sonner', () => ({
  toast: {
    info: jest.fn(),
    success: jest.fn(),
    error: jest.fn(),
  }
}));

// Mock Firebase dynamic import
jest.mock('@/lib/firebase', () => ({
  auth: {
    currentUser: {
      getIdToken: jest.fn().mockResolvedValue('fake-token')
    }
  }
}));

describe('useSyncOfflineData', () => {
  let mockFetch: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    
    // Default empty array so we don't crash on .length
    (db.pendingRequests.toArray as jest.Mock).mockResolvedValue([]);
    
    mockFetch = jest.fn();
    global.fetch = mockFetch;

    // Default: online
    Object.defineProperty(navigator, 'onLine', {
      value: true,
      writable: true
    });
  });

  it('adds online event listener on mount and removes on unmount', () => {
    const addEventListenerSpy = jest.spyOn(window, 'addEventListener');
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');

    const { unmount } = renderHook(() => useSyncOfflineData());

    expect(addEventListenerSpy).toHaveBeenCalledWith('online', expect.any(Function));

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith('online', expect.any(Function));
  });

  it('does nothing if there are no pending requests', async () => {
    (db.pendingRequests.toArray as jest.Mock).mockResolvedValueOnce([]);

    renderHook(() => useSyncOfflineData());

    // Wait for async operations to complete
    await new Promise(process.nextTick);

    expect(toast.info).not.toHaveBeenCalled();
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it('syncs pending requests successfully', async () => {
    const mockRequests = [
      { id: 1, url: '/api/test', method: 'POST', payload: { data: 'test1' }, type: 'test' },
      { id: 2, url: '/api/test', method: 'POST', payload: { data: 'test2' }, type: 'test' },
    ];
    (db.pendingRequests.toArray as jest.Mock).mockResolvedValueOnce(mockRequests);
    
    // Both fetches succeed
    mockFetch.mockResolvedValue({ ok: true, text: () => Promise.resolve('ok') });

    renderHook(() => useSyncOfflineData());

    // Wait for all async ops
    await new Promise(resolve => setTimeout(resolve, 50));

    expect(toast.info).toHaveBeenCalledWith('Menyinkronkan 2 data yang tertunda...');
    expect(mockFetch).toHaveBeenCalledTimes(2);
    expect(db.pendingRequests.delete).toHaveBeenCalledTimes(2);
    expect(db.pendingRequests.delete).toHaveBeenCalledWith(1);
    expect(db.pendingRequests.delete).toHaveBeenCalledWith(2);
    expect(toast.success).toHaveBeenCalledWith('2 data berhasil disinkronkan ke server.');
  });

  it('handles failed syncs appropriately', async () => {
    const mockRequests = [
      { id: 1, url: '/api/test', method: 'POST', payload: { data: 'test1' }, type: 'test' }
    ];
    (db.pendingRequests.toArray as jest.Mock).mockResolvedValueOnce(mockRequests);
    
    // Fetch fails
    mockFetch.mockResolvedValueOnce({ ok: false, text: () => Promise.resolve('error') });

    renderHook(() => useSyncOfflineData());

    // Wait for all async ops
    await new Promise(resolve => setTimeout(resolve, 50));

    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(db.pendingRequests.delete).not.toHaveBeenCalled();
    expect(toast.error).toHaveBeenCalledWith('1 data gagal disinkronkan. Pastikan koneksi dan sesi login valid.');
  });

  it('handles network errors during sync', async () => {
    const mockRequests = [
      { id: 1, url: '/api/test', method: 'POST', payload: { data: 'test1' }, type: 'test' }
    ];
    (db.pendingRequests.toArray as jest.Mock).mockResolvedValueOnce(mockRequests);
    
    // Fetch throws
    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    renderHook(() => useSyncOfflineData());

    // Wait for all async ops
    await new Promise(resolve => setTimeout(resolve, 50));

    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(db.pendingRequests.delete).not.toHaveBeenCalled();
    expect(toast.error).toHaveBeenCalledWith('1 data gagal disinkronkan. Pastikan koneksi dan sesi login valid.');
  });
});
