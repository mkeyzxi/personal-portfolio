import React from 'react'

const WriteMbulCard = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      {/* 
        Container Utama: 
        Rasio dikunci 9:16. Jika ini untuk web nyata, hapus 'aspect-[9/16]' dan 
        biarkan tinggi mengikuti konten secara dinamis.
      */}
      <div className="w-full max-w-[420px] aspect-[9/16] bg-white rounded-3xl shadow-xl flex flex-col p-8 overflow-hidden font-sans">
        {/* Header */}
        <header className="flex items-center justify-between border-b border-gray-100 pb-4">
          <h1 className="text-xl font-extrabold tracking-tight text-black">WriteMbuL</h1>
          <div className="flex items-center space-x-2 text-gray-700 text-sm font-medium">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <span>Insight</span>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex-1 flex flex-col justify-center py-6">
          <h2 className="text-[2.5rem] font-bold leading-tight text-black mb-4">
            BPJS (Bantuan Pamrih Jaminan Sosial)
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            Ketika kebaikan berubah menjadi investasi masa depan. Sebuah refleksi tentang motif
            menolong, utang budi, dan ketakutan akan stigma sosial yang membentuk cara kita
            berinteraksi dengan sesama.
          </p>
        </div>

        {/* Meta Data */}
        <div className="flex items-center text-gray-500 text-sm border-t border-b border-gray-100 py-4 mb-6">
          <div className="flex items-center flex-1 justify-center space-x-2">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            <span>1.2K Likes</span>
          </div>
          <div className="h-6 border-l border-gray-200"></div>
          <div className="flex items-center flex-1 justify-center space-x-2">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span>14 Jul 2025</span>
          </div>
        </div>

        {/* Author Info */}
        <div className="flex items-center mb-6">
          <img
            src="/api/placeholder/100/100"
            alt="Muhammad Makbul N"
            className="w-14 h-14 rounded-full object-cover bg-gray-200 mr-4"
          />
          <div>
            <h3 className="font-bold text-black text-base">Muhammad Makbul N</h3>
            <p className="text-sm text-gray-500">Author</p>
          </div>
        </div>

        {/* Footer / Call to Action */}
        <div className="bg-gray-50 rounded-2xl border border-gray-100 p-4 flex items-center">
          <div className="w-20 h-20 bg-white rounded-xl border border-gray-200 flex-shrink-0 mr-4 p-1">
            {/* Ganti dengan komponen QR Code sesungguhnya */}
            <img
              src="/api/placeholder/80/80"
              alt="QR Code"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col justify-center">
            <span className="font-bold text-sm text-black mb-1">Baca selengkapnya di</span>
            <div className="flex items-center text-xs text-gray-700 font-medium mb-2">
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                />
              </svg>
              writembul.com/story/bpjs
            </div>
            <p className="text-[10px] leading-snug text-gray-500">
              Scan QR atau kunjungi link di atas untuk membaca versi lengkap.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WriteMbulCard
