import { renderHook, waitFor } from '@testing-library/react';
import { useLazyAuthState } from './useLazyAuthState';

jest.mock('firebase/app', () => ({
  initializeApp: jest.fn(),
  getApps: jest.fn(() => []),
}));

jest.mock('firebase/firestore', () => ({
  getFirestore: jest.fn(),
}));

jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(() => ({})),
  setPersistence: jest.fn(() => Promise.resolve()),
  browserLocalPersistence: 'browserLocalPersistence',
  inMemoryPersistence: 'inMemoryPersistence',
  onAuthStateChanged: jest.fn((auth, callback) => {
    callback({ uid: '123', email: 'test@test.com' });
    return jest.fn();
  }),
}));

describe('useLazyAuthState', () => {
  it('loads auth state correctly', async () => {
    const { result } = renderHook(() => useLazyAuthState());

    await waitFor(() => {
      expect(result.current[1]).toBe(false);
    });

    expect(result.current[2]).toBeUndefined();
    expect(result.current[0]).toEqual({ uid: '123', email: 'test@test.com' });
  });
});
