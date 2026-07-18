import {sortProjectsByFeatured} from './sortProjects'

describe('sortProjectsByFeatured', () => {
  it('harus menempatkan proyek featured di atas proyek non-featured', () => {
    // Arrange
    const mockProjects = [
      {id: '1', featured: false, createdAt: '2026-01-15'},
      {id: '2', featured: true, createdAt: '2026-01-10'}, // Walau lebih lama, dia featured
    ]

    // Act
    const result = sortProjectsByFeatured(mockProjects as any)
    // Catatan: Gunakan 'as any' hanya jika tipe Project Anda butuh properti lain
    // yang tidak relevan dengan test ini. Jika tidak, definisikan objek secara utuh.

    // Assert
    expect(result[0].id).toBe('2') // ID 2 harus di index 0 karena featured
    expect(result[1].id).toBe('1')
  })

  it('harus mengurutkan berdasarkan tanggal terbaru jika status featured sama', () => {
    // Arrange
    const mockProjects = [
      {id: '1', featured: true, createdAt: '2026-01-05'},
      {id: '2', featured: true, createdAt: '2026-01-20'}, // Lebih baru
      {id: '3', featured: true, createdAt: '2026-01-15'},
    ]

    // Act
    const result = sortProjectsByFeatured(mockProjects as any)

    // Assert
    expect(result[0].id).toBe('2') // Paling baru (20 Jan)
    expect(result[1].id).toBe('3') // (15 Jan)
    expect(result[2].id).toBe('1') // Paling lama (05 Jan)
  })

  it('harus meletakkan proyek tanpa createdAt di urutan terbawah di antara status featured yang sama', () => {
    // Arrange
    const mockProjects = [
      {id: '1', featured: false, createdAt: undefined},
      {id: '2', featured: false, createdAt: '2026-01-10'},
    ]

    // Act
    const result = sortProjectsByFeatured(mockProjects as any)

    // Assert
    expect(result[0].id).toBe('2') // Punya tanggal valid
    expect(result[1].id).toBe('1') // Fallback ke 0, maka paling lama
  })
})
