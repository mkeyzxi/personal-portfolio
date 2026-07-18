import { renderHook } from '@testing-library/react';
import { useSectionTitle } from './useSectionTitle';

describe('useSectionTitle', () => {
  const originalTitle = document.title;

  afterEach(() => {
    document.title = originalTitle;
  });

  it('sets document.title to the correct section title', () => {
    renderHook(() => useSectionTitle('about'));
    expect(document.title).toBe('Tentang Saya | Makbul N');
  });

  it('sets document.title to home if section is invalid', () => {
    renderHook(() => useSectionTitle('nonexistent'));
    expect(document.title).toBe('Makbul N | Portofolio');
  });

  it('updates document.title when section changes', () => {
    const { rerender } = renderHook(({ section }) => useSectionTitle(section), {
      initialProps: { section: 'home' },
    });
    
    expect(document.title).toBe('Makbul N | Portofolio');

    rerender({ section: 'projects' });
    
    expect(document.title).toBe('Proyek | Makbul N');
  });
});
