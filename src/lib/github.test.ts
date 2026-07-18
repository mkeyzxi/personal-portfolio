import { parseGithubUrl, buildRawReadmeUrl, fetchReadmeWithFallback } from './github';

describe('github utility', () => {
  describe('parseGithubUrl', () => {
    it('parses valid github urls correctly', () => {
      expect(parseGithubUrl('https://github.com/owner/repo')).toEqual({ owner: 'owner', repo: 'repo' });
      expect(parseGithubUrl('http://github.com/owner/repo')).toEqual({ owner: 'owner', repo: 'repo' });
      expect(parseGithubUrl('https://www.github.com/owner/repo')).toEqual({ owner: 'owner', repo: 'repo' });
      expect(parseGithubUrl('https://github.com/owner/repo.git')).toEqual({ owner: 'owner', repo: 'repo' });
      expect(parseGithubUrl('https://github.com/owner/repo/')).toEqual({ owner: 'owner', repo: 'repo' });
    });

    it('returns null for invalid urls', () => {
      expect(parseGithubUrl('https://gitlab.com/owner/repo')).toBeNull();
      expect(parseGithubUrl('random string')).toBeNull();
    });
  });

  describe('buildRawReadmeUrl', () => {
    it('builds raw url correctly', () => {
      expect(buildRawReadmeUrl('owner', 'repo', 'main')).toBe('https://raw.githubusercontent.com/owner/repo/main/README.md');
      expect(buildRawReadmeUrl('owner', 'repo', 'master')).toBe('https://raw.githubusercontent.com/owner/repo/master/README.md');
    });
  });

  describe('fetchReadmeWithFallback', () => {
    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('throws error for invalid URL', async () => {
      await expect(fetchReadmeWithFallback('invalid-url')).rejects.toThrow('URL GitHub tidak valid');
    });

    it('fetches successfully from main branch', async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        text: jest.fn().mockResolvedValue('Main README'),
      });

      const readme = await fetchReadmeWithFallback('https://github.com/owner/repo');
      expect(readme).toBe('Main README');
      expect(global.fetch).toHaveBeenCalledWith('https://raw.githubusercontent.com/owner/repo/main/README.md');
    });

    it('fetches successfully from master branch when main returns 404', async () => {
      global.fetch = jest.fn()
        .mockResolvedValueOnce({ ok: false, status: 404 }) // main
        .mockResolvedValueOnce({ ok: true, text: jest.fn().mockResolvedValue('Master README') }); // master

      const readme = await fetchReadmeWithFallback('https://github.com/owner/repo');
      expect(readme).toBe('Master README');
      expect(global.fetch).toHaveBeenCalledTimes(2);
      expect(global.fetch).toHaveBeenNthCalledWith(2, 'https://raw.githubusercontent.com/owner/repo/master/README.md');
    });

    it('throws specific error when both main and master return 404', async () => {
      global.fetch = jest.fn()
        .mockResolvedValueOnce({ ok: false, status: 404 }) // main
        .mockResolvedValueOnce({ ok: false, status: 404 }); // master

      await expect(fetchReadmeWithFallback('https://github.com/owner/repo')).rejects.toThrow(
        "README.md tidak ditemukan di branch 'main' maupun 'master'. Pastikan repo bersifat publik dan memiliki file README.md."
      );
    });

    it('throws general error when main returns non-404 error', async () => {
      global.fetch = jest.fn().mockResolvedValue({ ok: false, status: 500 }); // main

      await expect(fetchReadmeWithFallback('https://github.com/owner/repo')).rejects.toThrow(
        'Gagal mengambil README (status: 500).'
      );
    });
  });
});
