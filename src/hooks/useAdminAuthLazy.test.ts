import { renderHook } from '@testing-library/react';
import { useAdminAuthLazy } from './useAdminAuthLazy';

describe('useAdminAuthLazy', () => {
  afterEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it('returns false initially if admin-auth is not set', () => {
    const { result } = renderHook(() => useAdminAuthLazy());
    expect(result.current).toBe(false);
  });
});
