# Home Page Design Specification

Version : 2.0
Theme : Executive Portfolio
Style : Apple × Linear × Vercel
Color : Existing Theme (Dark)
Animation : Smooth, Elegant, Minimal

---

# Objective

Home bukan lagi hanya Hero Section.

Home harus menjadi ringkasan seluruh portfolio.

Setiap section hanya menampilkan preview.
Jika pengunjung ingin mengetahui lebih detail maka mereka akan diarahkan ke menu terkait.

Flow User

Hero
↓
Portfolio Snapshot
↓
Services
↓
Featured Projects
↓
Experience
↓
Tech Stack
↓
Latest Story
↓
Testimonials
↓
Contact CTA

Target waktu membaca :
30 detik

---

# SECTION 1

Hero

Tetap gunakan hero yang sekarang.

Namun tambahkan sedikit indicator bahwa halaman masih memiliki banyak informasi.

Contoh

↓

Scroll to Explore

atau

↓

Discover My Journey

dengan icon panah kecil yang bergerak naik turun.

Animation

fade up

delay 800ms

---

# SECTION 2

Portfolio Snapshot

Background

Sama seperti website sekarang.

Layout

+------------------------------------------------------------+

Portfolio Snapshot

Saya membangun solusi digital modern menggunakan
Laravel, React, Next.js, AI Integration
dan Cloud Services.

---

Project
12+

Experience
3+

Certificates
10+

Articles
15+

---

Button

Explore Portfolio →

+------------------------------------------------------------+

Ukuran card

Height sekitar

180-220px

Radius

30px

Shadow

soft

Hover

card naik 8px

---

Design

Card transparan

background:

rgba(255,255,255,.04)

border

1px rgba(255,255,255,.08)

---

Animation

Count Up Number

12

↓

12+

3

↓

3+

dst.

---

# SECTION 3

What I Do

Heading

What I Do

Subtitle

Saya membantu membangun produk digital dari ide hingga deployment.

Grid

2 x 2

+--------------------------+
| |
| 💻 |
| |
| Full Stack Development |
| |
| Website modern |
| Laravel |
| React |
| Next.js |
| |
+--------------------------+

+--------------------------+

☁️

Cloud Deployment

Firebase

Supabase

Vercel

Docker

+--------------------------+

+--------------------------+

🤖

AI Integration

Gemini

LangChain

RAG

YOLO

+--------------------------+

+--------------------------+

📱

Mobile Development

Flutter

Android

Firebase

+--------------------------+

Hover

Border menjadi putih

Card naik

Shadow lebih terang

Icon membesar

---

# SECTION 4

Featured Projects

Heading

Featured Works

Subtitle

Project pilihan yang paling merepresentasikan kemampuan saya.

Hanya tampilkan

3 Project

Layout

+------------------------------------------------+

IMAGE

Featured Badge

Project Name

Description

Tech Stack

React
Laravel
Firebase

Button

View Project →

+------------------------------------------------+

Card

Radius

28px

Image

Height

240px

Hover

Image Zoom

Scale

1.05

Gradient Overlay

Project Name muncul lebih jelas

Button berubah putih

---

Tambahkan

View All Projects

di bawah.

---

# SECTION 5

Experience Timeline Mini

Jangan gunakan timeline panjang.

Gunakan card horizontal.

Example

+----------------------------------------+

Lead Web Developer

GDG On Campus

2025 - Present

+----------------------------------------+

Teaching Assistant

2025

+----------------------------------------+

Intern

PT Sinar Galesong

2025

+----------------------------------------+

Button

View Complete Journey →

---

# SECTION 6

Technology Preview

Heading

Technology Stack

Tampilkan

10 teknologi favorit.

Contoh

Laravel

React

Next.js

Tailwind

TypeScript

Python

Flutter

Firebase

MySQL

Git

Gunakan

Badge

Bukan card besar.

Hover

Badge membesar sedikit.

---

# SECTION 7

Latest Story

2 artikel terbaru.

Card

Minimal.

Title

Category

Date

Read Time

Like

Comment

Button

Read More →

Di bawah

Explore All Stories

---

# SECTION 8

Testimonials

Gunakan carousel.

Satu card besar.

★★★★★

"Website yang dibuat sangat memuaskan."

— Vera

Auto Slide

8 detik

Pause saat hover.

---

# SECTION 9

Contact CTA

Background

Sedikit berbeda.

Gradient tipis.

Isi

Let's Build Something Amazing Together.

Saya terbuka untuk

Freelance

Remote

Internship

Full Time

Button

Download CV

Button

Contact Me

---

# MICRO INTERACTION

Semua card

transition

300ms

ease

Hover

translateY(-8px)

box-shadow

lebih terang.

Border

sedikit putih.

---

Semua button

Hover

background putih

text hitam

icon bergeser ke kanan

4px

---

Semua image

Hover

scale

1.04

---

# SCROLL ANIMATION

Setiap section

fade up

40px

duration

800ms

once

true

Card

stagger

100ms

---

# SPACING

Container

1280px

Section Gap

140px

Card Gap

24px

Padding

32px

---

# TYPOGRAPHY

Heading

56px

Bold

Subtitle

22px

Medium

Description

18px

Regular

Card Title

28px

Bold

Card Text

16px

Regular

---

# COLOR

Background

#0B0B0B

Card

#151515

Border

rgba(255,255,255,.08)

Primary

White

Secondary

#B5B5B5

Accent

gunakan warna existing website

---

# FINAL USER EXPERIENCE

Visitor membuka website.

↓

Melihat Hero.

↓

Melihat angka pencapaian.

↓

Melihat kemampuan utama.

↓

Melihat project terbaik.

↓

Melihat pengalaman.

↓

Melihat teknologi.

↓

Melihat artikel.

↓

Melihat testimoni.

↓

Menghubungi pemilik website.

Semua hanya dalam satu halaman.

Menu sidebar tetap menjadi halaman lengkap untuk eksplorasi lebih dalam.

Dengan konsep ini Home berubah dari sekadar landing page menjadi Executive Dashboard yang merangkum keseluruhan portfolio.

Saran tambahan yang akan membuat portofoliomu jauh lebih "premium"

Melihat style portofoliomu sekarang (dark, minimal, sidebar permanen), saya akan menambahkan satu section eksklusif yang jarang dimiliki portofolio developer lain, yaitu "Highlights" tepat setelah Hero.

Misalnya berupa empat kartu modern dengan layout tidak simetris:
┌──────────────────────────────┬──────────────┐
│ │ │
│ 🚀 12+ │ ☕ │
│ Projects Delivered │ Open │
│ │ Freelance │
├──────────────────────────────┤ │
│ ├──────────────┤
│ 🤖 AI Engineer │ ✍️ │
│ RAG • LangChain • Gemini │ 15 Articles │
│ │ │
└──────────────────────────────┴──────────────┘
