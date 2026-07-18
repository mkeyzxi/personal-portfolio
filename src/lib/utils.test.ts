import { cn } from './utils';

describe('utils cn', () => {
  it('merges tailwind classes correctly', () => {
    expect(cn('bg-red-500', 'text-white')).toBe('bg-red-500 text-white');
    expect(cn('px-2 py-1', 'p-4')).toBe('p-4');
    expect(cn('bg-red-500', undefined, null, false, 'text-black')).toBe('bg-red-500 text-black');
  });
});
