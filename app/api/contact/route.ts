import {NextResponse} from 'next/server'
import {getAdminDb} from '@/lib/firebase-admin'
import nodemailer from 'nodemailer'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {name, email, subject, message} = body

    if (!name || !email || !subject || !message) {
      return NextResponse.json({success: false, message: 'Semua field wajib diisi'}, {status: 400})
    }

    // Validasi email sederhana
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({success: false, message: 'Format email tidak valid'}, {status: 400})
    }

    // Simpan ke Firestore
    const adminDb = getAdminDb()
    const docRef = await adminDb.collection('messages').add({
      name,
      email,
      subject,
      message,
      createdAt: new Date().toISOString(),
      read: false,
    })

    // Kirim Email via Nodemailer jika kredensial tersedia
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 587,
          secure: false, // menggunakan STARTTLS
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });

        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: 'muhmakbul6@gmail.com',
          replyTo: email,
          subject: `Pesan Portofolio: ${subject}`,
          text: `Nama: ${name}\nEmail: ${email}\n\nPesan:\n${message}`,
          html: `<p><strong>Nama:</strong> ${name}</p>
                 <p><strong>Email:</strong> ${email}</p>
                 <p><strong>Pesan:</strong><br/>${message.replace(/\n/g, '<br/>')}</p>`,
        };

        await transporter.sendMail(mailOptions);
      } catch (emailError: unknown) {
        // Tangani error khusus untuk email (seperti ISP memblokir port SMTP)
        // Pesan tetap tersimpan di Firestore, jadi kita tidak menggagalkan seluruh request
        console.warn("Gagal mengirim notifikasi email (Mungkin port SMTP diblokir oleh provider internet Anda saat berjalan di localhost):", (emailError instanceof Error ? emailError.message : String(emailError)));
      }
    } else {
      console.warn("EMAIL_USER atau EMAIL_PASS tidak dikonfigurasi. Pesan disimpan di database tetapi email notifikasi tidak dikirim.");
    }

    return NextResponse.json(
      {success: true, message: 'Pesan berhasil dikirim', id: docRef.id},
      {status: 201},
    )
  } catch (error) {
    console.error('Error in /api/contact:', error)
    return NextResponse.json(
      {success: false, message: 'Terjadi kesalahan pada server'},
      {status: 500},
    )
  }
}
