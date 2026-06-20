# Feature Specification: Testimonials Authentication System

## File

`FeatTestimonials.md`

## Version

1.0.0

## Status

Approved

## Feature Name

Authenticated Testimonials & Comments System

---

# 1. Overview

Fitur ini memungkinkan pengunjung website untuk masuk (login) menggunakan akun sosial yang didukung Firebase Authentication sebelum memberikan testimonial atau komentar pada website.

Tujuan utama:

- Mengurangi spam komentar
- Meningkatkan kredibilitas testimonial
- Memastikan setiap testimonial berasal dari pengguna nyata
- Menampilkan identitas pengguna secara otomatis
- Memberikan pengalaman interaktif pada website portfolio

---

# 2. Supported Authentication Providers

Authentication menggunakan Firebase Authentication Provider.

Provider minimum:

- Google
- GitHub
- Facebook
- X (Twitter)
- Microsoft

Provider opsional:

- Apple
- Yahoo
- Email & Password

Provider dapat diaktifkan atau dinonaktifkan melalui Firebase Console.

---

# 3. User Flow

## Guest User

Flow:

```text
Visitor
    ↓
Membuka Testimonials Section
    ↓
Melihat daftar testimonial
    ↓
Klik "Add Testimonial"
    ↓
Muncul Login Modal
    ↓
Pilih Social Login
```

---

## Authenticated User

Flow:

```text
User Login
    ↓
Firebase Authentication
    ↓
Ambil data user
    ↓
Tampilkan form testimonial
    ↓
Isi komentar
    ↓
Submit
    ↓
Data disimpan ke Firestore
    ↓
Komentar langsung muncul
```

---

# 4. User Information Retrieved

Data user diambil otomatis dari Firebase Authentication.

Field:

```ts
{
  uid: string
  displayName: string
  email: string
  photoURL: string
  provider: string
}
```

Contoh:

```ts
{
uid:"u83j3jd93",
displayName:"Muhammad Makbul",
email:"makbul@gmail.com",
photoURL:"https://...",
provider:"google.com"
}
```

---

# 5. Testimonial Data Structure

Collection:

```text
testimonials
```

Document:

```ts
{

id:string,

uid:string,

name:string,

email:string,

avatar:string,

provider:string,

message:string,

createdAt:Timestamp,

updatedAt:Timestamp,

likes:number,

status:"approved",

isEdited:false

}
```

Contoh:

```ts
{

id:"testimonial001",

uid:"fj3j3jf93",

name:"Muhammad Makbul",

email:"makbul@gmail.com",

avatar:"https://photo.jpg",

provider:"google.com",

message:
"Website sangat responsif dan menarik.",

createdAt:new Date(),

updatedAt:new Date(),

likes:0,

status:"approved",

isEdited:false

}
```

---

# 6. UI Components

Directory:

```text
components/

└── testimonials/
    ├── TestimonialList.tsx
    ├── TestimonialCard.tsx
    ├── AddTestimonialButton.tsx
    ├── LoginModal.tsx
    ├── SocialLoginButton.tsx
    ├── TestimonialForm.tsx
    ├── UserProfileMini.tsx
    └── TestimonialSkeleton.tsx
```

---

# 7. Login Modal UI

Desktop:

```text
---------------------------------

Login untuk memberikan testimonial

[ Continue with Google ]

[ Continue with Github ]

[ Continue with Facebook ]

[ Continue with X ]

[ Continue with Microsoft ]

---------------------------------
```

---

Mobile:

```text
---------------------

Login

[Google]

[Github]

[Facebook]

[X]

[Microsoft]

---------------------
```

---

# 8. Firebase Authentication

Firebase client:

```ts
import {
  GoogleAuthProvider,
  GithubAuthProvider,
  FacebookAuthProvider,
  TwitterAuthProvider,
  signInWithPopup,
} from 'firebase/auth'
```

---

Login example:

```ts
const provider = new GoogleAuthProvider()

await signInWithPopup(auth, provider)
```

---

# 9. Firestore Collection Design

```text
Firestore

testimonials
    |
    ├── testimonial01
    ├── testimonial02
    ├── testimonial03
```

Document:

```text
testimonialId

    uid
    name
    avatar
    provider
    message
    createdAt
    updatedAt
```

---

# 10. Security Rules

Firestore rules:

```js
rules_version='2';

service cloud.firestore {

match /databases/{database}/documents {

match /testimonials/{doc} {

allow read: if true;

allow create:
if request.auth!=null;

allow update,delete:
if request.auth.uid==
resource.data.uid;

}

}

}
```

Tujuan:

- Guest hanya membaca
- User login dapat membuat testimonial
- User hanya mengubah testimonial miliknya

---

# 11. Anti Spam Protection

Layer keamanan:

### Authentication

Hanya user login dapat submit

### Duplicate prevention

Maksimum:

```text
1 testimonial / user / 24 jam
```

---

### Character validation

Minimum:

```text
10 karakter
```

Maksimum:

```text
500 karakter
```

---

### Bad words filtering

Filter kata kasar sebelum disimpan.

Contoh:

```ts
const blockedWords = ['spam', 'xxxx', 'yyyy']
```

---

### Rate Limiting

```text
Maksimal:

5 request
per menit
```

---

# 12. User Experience Rules

Jika user belum login:

```text
"Login untuk menambahkan testimonial"
```

---

Jika user sudah login:

```text
"Halo, Muhammad Makbul"
```

Menampilkan:

- avatar
- nama
- provider login

---

Ketika submit:

Button berubah:

```text
Sending...
```

---

Jika berhasil:

Toast:

```text
"Testimonial berhasil ditambahkan"
```

---

Jika gagal:

Toast:

```text
"Gagal menambahkan testimonial"
```

---

# 13. Future Enhancement

Versi berikutnya:

### Likes

```text
👍 15
```

---

### Replies

```text
Owner:
Terima kasih atas masukannya
```

---

### Rating

```text
⭐⭐⭐⭐⭐
```

---

### Sorting

Urutan:

- terbaru
- terlama
- paling disukai

---

### Admin Dashboard

Fitur:

- approve testimonial
- hapus testimonial
- blok user spam

---

# 14. Acceptance Criteria

### AC-TST-01

Guest:

- dapat melihat testimonial
- tidak dapat menulis testimonial

---

### AC-TST-02

User login:

- dapat menambahkan testimonial

---

### AC-TST-03

User:

- dapat mengedit testimonial miliknya

---

### AC-TST-04

User:

- dapat menghapus testimonial miliknya

---

### AC-TST-05

Sistem:

- otomatis mengambil nama dan foto profil dari Firebase

---

### AC-TST-06

Sistem:

- mencegah spam dan duplicate testimonial

---

### AC-TST-07

Mobile dan desktop responsif

```

```
