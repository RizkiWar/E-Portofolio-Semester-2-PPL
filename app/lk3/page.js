"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { renderAsync } from "docx-preview";
import {
  BookOpen,
  ClipboardCheck,
  FileText,
  GraduationCap,
  Image as ImageIcon,
  LayoutDashboard,
  Menu,
  PlayCircle,
  UserRound,
  X,
  Target,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  CalendarDays,
  ArrowLeft,
} from "lucide-react";
import { FaInstagram, FaFacebookF, FaLinkedinIn } from "react-icons/fa";

const sections = [
  { id: "beranda", label: "Beranda", icon: LayoutDashboard },
  { id: "profil", label: "Profil Guru", icon: UserRound },
  { id: "analisis-modul", label: "Analisis Modul", icon: FileText },
  { id: "analisis-materi", label: "Analisis Materi", icon: BookOpen },
  { id: "analisis-media", label: "Analisis Media", icon: ImageIcon },
  { id: "analisis-video", label: "Analisis Video", icon: PlayCircle },
  { id: "nonmengajar", label: "Kegiatan Nonmengajar", icon: CalendarDays },
  { id: "instrumen", label: "Instrumen Penilaian", icon: ClipboardCheck },
  { id: "dokumentasi", label: "Dokumentasi", icon: ImageIcon },
];
const analysisOptions = [
  { id: "analisis-modul", label: "Analisis Modul" },
  { id: "analisis-materi", label: "Analisis Materi" },
  { id: "analisis-media", label: "Analisis Media" },
  { id: "analisis-video", label: "Analisis Video" },
];
const moduleCards = [
  {
    title: "Modul Ajar Pembagian Pecahan Kelas VI",
    image: "/Modul/Cover%20Modul%20pembagian%20Pecahan.png",
    file: "/Modul/Modul_Ajar_Pembagian_Pecahan_Kelas_VI.docx",
  },
  {
    title: "Modul Ajar Sendi Kelas VI",
    image: "/Modul/Cover%20Modul%20Sendi.png",
    file: "/Modul/Modul_Ajar_Sendi_Kelas_VI.docx",
  },
];
const mediaCards = [
  {
    title: "Media 3D Mozaik: Sistem Gerak dan Sendi",
    image: "/assets/Media%20Sendi.png",
    type: "image",
    description:
      "Model 3D Mozaik digunakan untuk mengamati letak, jenis, dan arah gerak sendi pada tubuh manusia.",
  },
  {
    title: "Website Interaktif Pembagian Pecahan",
    image:
      "/Modul/Cover%20Modul%20pembagian%20Pecahan.png",
    type: "iframe",
    file: "/media/pembagian-pecahan.html",
    description:
      "Website interaktif membantu siswa mempelajari konsep resiprokal, contoh soal bertahap, kuis, dan latihan mandiri.",
  },
];
const videoCards = [
  {
    title: "Video Praktik Mengajar",
    image:
      "https://images.unsplash.com/photo-1516321165247-4aa89a48be28?auto=format&fit=crop&w=1200&q=80",
    embed: "https://www.youtube.com/embed/tJnD-P8YHuo?si=O3I1NmNUB_H530Pw",
  },
];
const Card = ({ children, className = "" }) => (
  <div className={"card " + className}>{children}</div>
);
const Title = ({ eyebrow, title, desc }) => (
  <div className="section-title">
    <span>{eyebrow}</span>
    <h2>{title}</h2>
    <p>{desc}</p>
  </div>
);
function App() {
  const [active, setActive] = useState("beranda");
  const [open, setOpen] = useState(false);
  const [analysisOpen, setAnalysisOpen] = useState(false);
  const [selectedModule, setSelectedModule] = useState(null);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const previewRef = useRef(null);
  useEffect(() => {
    if (!selectedModule || !previewRef.current) return;
    let cancelled = false;
    previewRef.current.innerHTML =
      '<p class="preview-loading">Memuat preview dokumen...</p>';
    fetch(selectedModule.file)
      .then((response) => {
        if (!response.ok) throw new Error("Dokumen tidak ditemukan");
        return response.arrayBuffer();
      })
      .then((buffer) => {
        if (!cancelled) return renderAsync(buffer, previewRef.current);
      })
      .catch(() => {
        if (!cancelled)
          previewRef.current.innerHTML =
            '<p class="preview-error">Preview dokumen gagal dimuat. Silakan unduh file untuk membukanya.</p>';
      });
    return () => {
      cancelled = true;
      if (previewRef.current) previewRef.current.innerHTML = "";
    };
  }, [selectedModule]);
  useEffect(() => {
    const handleModulePreview = (event) => {
      const button = event.target.closest(".module-card .module-button");
      if (!button || button.textContent.trim() !== "Lihat Selengkapnya") return;
      const title = button
        .closest(".module-card")
        ?.querySelector("h3")
        ?.textContent.trim();
      const module = moduleCards.find((item) => item.title === title);
      if (module) setSelectedModule(module);
    };
    document.addEventListener("click", handleModulePreview);
    return () => document.removeEventListener("click", handleModulePreview);
  }, []);
  const go = (id) => {
    setActive(id);
    setOpen(false);
    setAnalysisOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div className="app">
      <div className="main-shell">
        <header className="topbar">
          <div className="brand-inline">
            <div className="brand-mark small">
              <img src="/assets/logo-unika.png" alt="Logo UNIKA" />
            </div>
            <div className="brand-name">
              <b>E-Portfolio PPG</b>
              <small>Portofolio Profesional</small>
            </div>
          </div>
          <nav className="top-nav" aria-label="Navigasi utama">
            <button
              className={active === "beranda" ? "active" : ""}
              onClick={() => go("beranda")}
            >
              Beranda
            </button>
            <button
              className={active === "profil" ? "active" : ""}
              onClick={() => go("profil")}
            >
              Profil
            </button>
            <div className="nav-dropdown">
              <button
                className={
                  analysisOptions.some((item) => item.id === active)
                    ? "active"
                    : ""
                }
                onClick={() => setAnalysisOpen(!analysisOpen)}
              >
                Analisis
              </button>
              {analysisOpen && (
                <div className="dropdown-menu" role="menu">
                  {analysisOptions.map((item) => (
                    <button
                      key={item.id}
                      className={active === item.id ? "active" : ""}
                      onClick={() => go(item.id)}
                      role="menuitem"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button
              className={active === "nonmengajar" ? "active" : ""}
              onClick={() => go("nonmengajar")}
            >
              Kegiatan Non-Mengajar
            </button>
            <button
              className={active === "instrumen" ? "active" : ""}
              onClick={() => go("instrumen")}
            >
              Instrumen Penilaian
            </button>
            <button
              className={active === "dokumentasi" ? "active" : ""}
              onClick={() => go("dokumentasi")}
            >
              Dokumentasi
            </button>
          </nav>
          <div className="topbar-actions">
            <Link href="/" className="menu-home-link">
              <ArrowLeft size={17} aria-hidden="true" />
              Menu
            </Link>
            <div className="badge">PPG Prajabatan</div>
          </div>
        </header>

        <main>
          <section id="beranda" className="hero" aria-labelledby="hero-title">
            <div className="hero-copy">
              <div className="pill">
                E-PORTFOLIO 1 • PRAKTIK MENGAJAR MANDIRI
              </div>
              <h1 id="hero-title">
                Muhammad Rizki Wardana,
                <br />
                <em>S.Pd.</em>
              </h1>
              <p>
                Portofolio ini menyajikan hasil analisis dan refleksi dari
                praktik mengajar mandiri yang mencakup analisis modul, materi,
                media, video pembelajaran, kegiatan nonmengajar, serta instrumen
                penilaian. Seluruh komponen dirancang untuk menunjukkan
                perkembangan kompetensi sebagai calon guru profesional di
                lingkungan sekolah dasar.
              </p>
              <div className="actions">
                <button className="primary" onClick={() => go("profil")}>
                  Lihat Profil
                </button>
              </div>
            </div>
            <aside
              className="hero-card"
              aria-label="Informasi umum profil guru"
            >
              <div className="avatar">
                <img src="/assets/Profil.png" alt="Muhammad Rizki Wardana" />
              </div>
              <h3>Informasi Umum</h3>
              <p>Mendidik Generasi Dasar dengan Inovasi dan Hati</p>
              <div className="mini-row">
                <span>Program</span>
                <b>PPG Prajabatan</b>
              </div>
              <div className="mini-row">
                <span>Bidang Studi</span>
                <b>PGSD</b>
              </div>
              <div className="mini-row">
                <span>Institusi</span>
                <b>Universitas Katolik Santo Thomas, Medan</b>
              </div>
            </aside>
          </section>

          <section className="stats" aria-label="Ringkasan portofolio">
            <ul className="stats-list">
              <li>
                <b>6+</b>
                <span>Produk Pembelajaran</span>
              </li>
              <li>
                <b>1</b>
                <span>Video Praktik Utama</span>
              </li>
              <li>
                <b>4</b>
                <span>Aspek Penilaian</span>
              </li>
            </ul>
          </section>
          <section id="profil" className="section">
            <Title
              eyebrow="01 • IDENTITAS"
              title="Profil Diri"
              desc="Data diri dan latar belakang akademik sesuai template portofolio PPG."
            />
            <div className="profile-layout">
              <Card className="profile-overview">
                <div className="profile-top">
                  <div className="profile-photo-wrap">
                    <img
                      src="/assets/Profil.png"
                      alt="Muhammad Rizki Wardana"
                    />
                  </div>
                  <div className="profile-summary">
                    <span className="eyebrow-soft">
                      Guru SD / Calon Pendidik
                    </span>
                    <h3>Muhammad Rizki Wardana, S.Pd.</h3>
                    <p>
                      Menjadi pendidik yang mampu menciptakan proses belajar
                      yang bermakna, inklusif, dan menyenangkan bagi setiap
                      peserta didik.
                    </p>
                  </div>
                </div>
                <div className="profile-meta-grid">
                  <div className="profile-meta-item">
                    <span>Program</span>
                    <b>PPG Prajabatan</b>
                  </div>
                  <div className="profile-meta-item">
                    <span>Bidang Studi</span>
                    <b>PGSD</b>
                  </div>
                  <div className="profile-meta-item">
                    <span>Institusi</span>
                    <b>Universitas Katolik Santo Thomas</b>
                  </div>
                  <div className="profile-meta-item">
                    <span>Lokasi</span>
                    <b>Medan, Sumatera Utara</b>
                  </div>
                </div>
                <div className="social-links" aria-label="Sosial media">
                  <a
                    className="social-link instagram"
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Instagram"
                  >
                    <FaInstagram />
                  </a>
                  <a
                    className="social-link facebook"
                    href="https://facebook.com"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Facebook"
                  >
                    <FaFacebookF />
                  </a>
                  <a
                    className="social-link linkedin"
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="LinkedIn"
                  >
                    <FaLinkedinIn />
                  </a>
                </div>
              </Card>
              <Card className="accent-card profile-focus">
                <span className="quote-mark">“</span>
                <div className="mini-tag">Peran Profesional</div>
                <h3>Tujuan & Prinsip</h3>
                <p>
                  Menjadi guru sekolah dasar yang mampu membangun fondasi
                  belajar yang kuat, menyenangkan, dan bermakna bagi peserta
                  didik, sekaligus mengintegrasikan teknologi pembelajaran
                  secara relevan dan berpihak pada peserta didik. Setiap anak
                  berhak belajar dengan cara yang menyenangkan dan bermakna.
                </p>
                <ul className="profile-list">
                  <li>
                    Mengembangkan pembelajaran yang aktif, kontekstual, dan
                    berpusat pada peserta didik.
                  </li>
                  <li>
                    Menyusun kegiatan belajar yang relevan dengan karakteristik
                    anak sekolah dasar.
                  </li>
                  <li>
                    Menggunakan media dan asesmen yang mendukung pemahaman serta
                    perkembangan siswa.
                  </li>
                </ul>
                <div className="signature">— Muhammad Rizki Wardana, S.Pd.</div>
              </Card>
            </div>
            <Card className="skills-card">
              <div className="skills-header">
                <span className="mini-tag">Keahlian Teknologi</span>
                <h3>Teknologi yang Saya Kuasai</h3>
              </div>
              <div className="skills-grid">
                <div className="skill-item">
                  <b>Pengembangan Media Pembelajaran Digital</b>
                  <p>
                    Merancang dan mengembangkan media pembelajaran interaktif
                    berbasis game, multimedia, dan teknologi digital untuk
                    mendukung proses belajar mengajar.
                  </p>
                </div>
                <div className="skill-item">
                  <b>Pengembangan Pembelajaran Imersif (AR/VR)</b>
                  <p>
                    Mendesain media pembelajaran menggunakan Augmented Reality
                    (AR), Virtual Reality (VR), dan Mixed Reality (MR) untuk
                    meningkatkan pengalaman belajar siswa.
                  </p>
                </div>
                <div className="skill-item">
                  <b>Pengembangan Platform Pembelajaran Berbasis Web</b>
                  <p>
                    Membangun aplikasi dan website edukasi yang responsif
                    sebagai sarana pembelajaran, asesmen, dan penyampaian
                    materi.
                  </p>
                </div>
                <div className="skill-item">
                  <b>Pemrograman dan Pengembangan Web</b>
                  <p>
                    Mengembangkan situs, aplikasi, dan produk digital edukatif
                    dengan pendekatan fungsional, responsif, dan ramah pengguna.
                  </p>
                </div>
                <div className="skill-item">
                  <b>Pemanfaatan Kecerdasan Buatan (AI) dalam Pendidikan</b>
                  <p>
                    Mengintegrasikan AI untuk membantu penyusunan asesmen
                    diagnostik, pembuatan perangkat ajar, serta personalisasi
                    pembelajaran.
                  </p>
                </div>
                <div className="skill-item">
                  <b>Desain UI/UX dan Konten Edukasi Digital</b>
                  <p>
                    Merancang antarmuka yang ramah pengguna serta menghasilkan
                    konten visual seperti infografis, animasi, dan materi
                    pembelajaran digital.
                  </p>
                </div>
              </div>
            </Card>
          </section>
          <section id="analisis-modul" className="section alt">
            <Title
              eyebrow="02 • ANALISIS MODUL"
              title="Analisis Modul untuk Praktik Mengajar Mandiri"
              desc="Evaluasi terhadap modul ajar yang disusun dan diterapkan dalam praktik mengajar mandiri, dengan fokus pada kekuatan, kelemahan, dan perbaikan yang diperlukan pada tiap modul."
            />
            <div className="module-grid">
              {moduleCards.map((module) => (
                <div className="module-card" key={module.title}>
                  <div className="module-image">
                    <img src={module.image} alt={module.title} />
                  </div>
                  <div className="module-content">
                    <h3>{module.title}</h3>
                    <button className="module-button">
                      Lihat Selengkapnya
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="module-analysis-grid">
              <div className="module-analysis-card">
                <h3>Modul Ajar Pembagian Pecahan Kelas VI</h3>
                <div className="analysis-split">
                  <div>
                    <span>Kelebihan</span>
                    <ul>
                      <li>
                        Tujuan pembelajaran terukur, mulai dari memahami konsep
                        resiprokal hingga menyelesaikan masalah kontekstual.
                      </li>
                      <li>
                        Langkah penyelesaian disusun runtut: mengubah bilangan
                        asli, membalik pecahan pembagi, mengalikan, lalu
                        menyederhanakan hasil.
                      </li>
                      <li>
                        Website interaktif, LKPD, diskusi enam kelompok, dan
                        contoh pembagian bahan makanan atau panjang benda
                        menghubungkan konsep dengan situasi nyata.
                      </li>
                    </ul>
                  </div>
                  <div>
                    <span>Kekurangan</span>
                    <ul>
                      <li>
                        Konsep resiprokal masih berpotensi membingungkan,
                        terutama saat siswa harus membalik pecahan pembagi.
                      </li>
                      <li>
                        Alokasi satu pertemuan 2 x 35 menit cukup padat untuk
                        diskusi, presentasi, penguatan, dan evaluasi individu.
                      </li>
                      <li>
                        Latihan perlu dibedakan sesuai kemampuan karena modul
                        memuat soal LOTS, MOTS, HOTS, pengayaan, dan remedial.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="module-analysis-card">
                <h3>Modul Ajar Sendi Kelas VI</h3>
                <div className="analysis-split">
                  <div>
                    <span>Kelebihan</span>
                    <ul>
                      <li>
                        Materi mengaitkan jenis dan fungsi sendi dengan gerak
                        sehari-hari, seperti menekuk lutut, berjalan, dan
                        menulis.
                      </li>
                      <li>
                        Gambar tengkorak, video, dan demonstrasi Mozaik3D
                        membantu siswa mengamati arah gerak serta letak sendi
                        secara konkret.
                      </li>
                      <li>
                        PBL, diskusi kelompok, LKPD, presentasi, dan refleksi
                        mendukung identifikasi sendi mati, kaku, gerak, serta
                        gangguan sendi.
                      </li>
                    </ul>
                  </div>
                  <div>
                    <span>Kekurangan</span>
                    <ul>
                      <li>
                        Mozaik3D ditampilkan secara klasikal melalui LCD, jadi
                        setiap kelompok belum dapat mengeksplorasi objek 3D
                        secara langsung.
                      </li>
                      <li>
                        Banyak jenis sendi dan contoh letaknya perlu dipetakan
                        bertahap agar siswa tidak tertukar antara sendi engsel,
                        peluru, putar, pelana, dan geser.
                      </li>
                      <li>
                        Asesmen perlu memastikan siswa tidak hanya menghafal
                        nama sendi, tetapi mampu menjelaskan fungsi, gangguan,
                        dan kaitannya dengan aktivitas tubuh.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section id="analisis-materi" className="section">
            <Title
              eyebrow="03 • ANALISIS MATERI"
              title="Analisis Materi Berdasarkan Dua Modul"
              desc="Kajian terhadap materi pembagian pecahan dan sistem gerak manusia berdasarkan ketepatan konsep, pengalaman belajar, media, serta kebutuhan peserta didik kelas VI."
            />
            <div className="analysis-material-grid">
              <div className="material-analysis-card">
                <h3>Pembagian Pecahan</h3>
                <p>
                  Materi berfokus pada pembagian pecahan dengan bilangan asli
                  dan pembagian bilangan asli dengan pecahan. Konsep inti
                  dibangun melalui resiprokal: bilangan asli diubah menjadi
                  pecahan berpenyebut satu, pecahan pembagi dibalik, tanda bagi
                  diubah menjadi kali, lalu hasil disederhanakan. Contoh soal
                  kontekstual, LKPD, website interaktif, presentasi, dan soal
                  evaluasi membantu peserta didik menerapkan prosedur secara
                  logis. Miskonsepsi utama yang perlu dipantau adalah membalik
                  pecahan yang salah dan lupa menyederhanakan hasil.
                </p>
              </div>
              <div className="material-analysis-card">
                <h3>Sistem Gerak Manusia: Sendi</h3>
                <p>
                  Materi menjelaskan sendi sebagai penghubung antartulang,
                  klasifikasi sendi mati, kaku, dan gerak, serta lima jenis
                  sendi gerak: engsel, peluru, putar, pelana, dan geser. Gambar
                  tengkorak, video, dan demonstrasi Mozaik3D menghubungkan arah
                  gerak dengan letak sendi pada tubuh. Pembahasan disempurnakan
                  dengan gangguan dislokasi, terkilir, artritis, dan ankilosis,
                  sehingga peserta didik tidak hanya menghafal istilah tetapi
                  juga menganalisis fungsi sendi dalam aktivitas sehari-hari.
                </p>
              </div>
            </div>
          </section>
          <section id="analisis-media" className="section alt">
            <Title
              eyebrow="04 • ANALISIS MEDIA"
              title="Analisis Media Pembelajaran yang Dipergunakan"
              desc="Analisis terhadap media 3D Mozaik pada materi sendi dan website interaktif pada materi pembagian pecahan berdasarkan fungsi, kesesuaian dengan tujuan pembelajaran, keterlibatan peserta didik, serta keterbatasan penggunaannya."
            />
            <div className="module-grid">
              {mediaCards.map((media) => (
                <div className="module-card" key={media.title}>
                  <div className="module-image">
                    <img src={media.image} alt={media.title} />
                  </div>
                  <div className="module-content">
                    <h3>{media.title}</h3>
                    <button
                      className="module-button"
                      onClick={() => setSelectedMedia(media)}
                    >
                      Lihat Selengkapnya
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="module-analysis-grid media-analysis-grid">
              <div className="module-analysis-card">
                <h3>Analisis Media Mozaik3D: Materi Sendi</h3>
                <div className="analysis-split">
                  <div>
                    <span>Kelebihan</span>
                    <ul>
                      <li>
                        Menampilkan model rangka secara tiga dimensi sehingga
                        letak dan arah gerak sendi lebih mudah diamati.
                      </li>
                      <li>
                        Fitur memutar dan memperbesar objek membantu guru
                        menjelaskan sendi engsel, peluru, putar, pelana, dan
                        geser secara konkret.
                      </li>
                      <li>
                        Mendukung diskusi LKPD, tanya jawab, dan presentasi
                        kelompok dalam pembelajaran berbasis masalah.
                      </li>
                    </ul>
                  </div>
                  <div>
                    <span>Keterbatasan</span>
                    <ul>
                      <li>
                        Media ditampilkan melalui LCD sehingga tidak semua
                        kelompok dapat mengeksplorasi objek 3D secara langsung.
                      </li>
                      <li>
                        Penggunaan bergantung pada laptop, proyektor, dan
                        koneksi atau kesiapan aplikasi.
                      </li>
                      <li>
                        Guru tetap perlu memberi panduan agar siswa tidak hanya
                        melihat model, tetapi mampu mengaitkannya dengan fungsi
                        dan aktivitas tubuh.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="module-analysis-card">
                <h3>Analisis Website: Pembagian Pecahan</h3>
                <div className="analysis-split">
                  <div>
                    <span>Kelebihan</span>
                    <ul>
                      <li>
                        Menyajikan tujuan, konsep resiprokal, aturan "balik
                        kali", dan langkah penyelesaian secara runtut.
                      </li>
                      <li>
                        Menyediakan contoh soal bertahap, kuis pilihan ganda,
                        dan latihan isian untuk penguatan serta evaluasi.
                      </li>
                      <li>
                        Mendukung belajar mandiri dan membantu siswa memahami
                        pembagian pecahan dengan bilangan asli maupun pecahan.
                      </li>
                    </ul>
                  </div>
                  <div>
                    <span>Keterbatasan</span>
                    <ul>
                      <li>
                        Membutuhkan perangkat dan akses website agar seluruh
                        fitur interaktif dapat digunakan.
                      </li>
                      <li>
                        Latihan digital perlu dipadukan dengan diskusi dan LKPD
                        agar siswa memahami alasan di balik setiap langkah.
                      </li>
                      <li>
                        Guru perlu mendampingi siswa yang masih keliru
                        membalik pecahan pembagi atau menyederhanakan hasil.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section id="analisis-video" className="section">
            <Title
              eyebrow="05 • ANALISIS VIDEO"
              title="Analisis Video Pelaksanaan Praktik Mengajar Mandiri"
              desc="Video pembelajaran menunjukkan bahwa proses pengelolaan pembelajaran dimulai dengan pembukaan yang kondusif, dilanjutkan dengan penyajian materi yang sistematis, dan diakhiri dengan refleksi serta penegasan pemahaman siswa terhadap konsep yang dipelajari."
            />
            <div className="video-card-grid single">
              {videoCards.map((video) => (
                <div className="video-card large" key={video.title}>
                  <div className="video-poster">
                    <iframe
                      src={video.embed}
                      title={video.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    />
                  </div>
                  <div className="video-card-content">
                    <h3>{video.title}</h3>
                    <p>
                      Video ini menggambarkan praktik pembelajaran yang tertib,
                      komunikatif, dan berorientasi pada keterlibatan siswa.
                      Guru mampu menciptakan suasana belajar yang kondusif,
                      mengarahkan siswa secara jelas, serta menumbuhkan
                      interaksi edukatif yang mendukung tercapainya tujuan
                      pembelajaran.
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="grid three">
              <Metric
                title="Pembukaan Pembelajaran"
                text="Pada awal pembelajaran, guru melakukan apersepsi dan orientasi yang relevan dengan materi sehingga siswa lebih siap mengikuti proses belajar. Kegiatan pembukaan berlangsung secara terstruktur dan mampu menumbuhkan perhatian serta kesiapan belajar siswa."
              />
              <Metric
                title="Pelaksanaan Inti"
                text="Pada kegiatan inti, guru menyampaikan materi dengan urutan yang logis dan penggunaan contoh yang relevan untuk memudahkan pemahaman siswa. Guru juga mendorong partisipasi aktif siswa melalui pertanyaan, diskusi, dan bimbingan yang terarah, sehingga proses pembelajaran tidak bersifat satu arah."
              />
              <Metric
                title="Pengelolaan Kelas dan Penutup"
                text="Guru mampu menjaga suasana kelas agar tetap kondusif dan menumbuhkan disiplin positif selama proses pembelajaran berlangsung. Penutup dilakukan dengan menyimpulkan materi, melakukan refleksi singkat, dan memberikan tindak lanjut yang memperkuat pemahaman siswa serta menutup pembelajaran secara efektif."
              />
            </div>
          </section>
          <section id="nonmengajar" className="section alt">
            <Title
              eyebrow="06 • KEGIATAN NONMENGAJAR"
              title="Analisis Kegiatan Nonmengajar"
              desc="Kegiatan nonmengajar yang dilakukan berkontribusi pada pembentukan lingkungan belajar yang tertib, sehat, dan kondusif, serta mendukung perkembangan literasi siswa di lingkungan sekolah."
            />
            <div className="timeline">
              <div className="time-item">
                <div className="dot">1</div>
                <Card>
                  <small>KEGIATAN 1</small>
                  <h3>Koordinasi Piket Kelas di Pagi Hari</h3>
                  <p>
                    Saya melakukan koordinasi dengan tiap kelas terkait jadwal
                    piket pagi agar kebersihan kelas terjaga, suasana belajar
                    lebih nyaman, dan siswa terbiasa menumbuhkan tanggung jawab
                    terhadap lingkungan sekolah.
                  </p>
                </Card>
              </div>
              <div className="time-item">
                <div className="dot">2</div>
                <Card>
                  <small>KEGIATAN 2</small>
                  <h3>Bimbingan Membaca Siswa Kelas Tinggi</h3>
                  <p>
                    Saya juga memberikan bimbingan khusus kepada siswa kelas
                    tinggi yang masih belum lancar membaca. Kegiatan ini
                    dilakukan dengan pendekatan yang sabar dan terstruktur agar
                    siswa memiliki motivasi, kepercayaan diri, dan kemampuan
                    membaca yang lebih baik.
                  </p>
                </Card>
              </div>
            </div>
          </section>
          <section id="instrumen" className="section instrument-section">
            <Title
              eyebrow="07 • INSTRUMEN PENILAIAN"
              title="Instrumen Penilaian Sesuai Setiap Modul"
              desc="Instrumen penilaian dirancang sesuai karakteristik masing-masing modul, yaitu pembagian pecahan pada Matematika dan sistem gerak pada IPAS, agar penilaian benar-benar mencerminkan tujuan, proses, dan hasil belajar siswa."
            />
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Modul</th>
                    <th>Jenis Instrumen</th>
                    <th>Tujuan Penilaian</th>
                    <th>Analisis</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Modul Ajar Pembagian Pecahan</td>
                    <td>Observasi dan diskusi</td>
                    <td>
                      Menilai keterlibatan siswa saat memahami konsep
                      resiprokal, mengerjakan soal, dan menjelaskan langkah
                      penyelesaian
                    </td>
                    <td>
                      Siswa tampak antusias mengikuti pembelajaran interaktif
                      dan mampu menjelaskan konsep membalik pecahan pembagi,
                      meskipun beberapa masih perlu bimbingan pada soal yang
                      lebih kompleks.
                    </td>
                  </tr>
                  <tr>
                    <td>Modul Ajar Pembagian Pecahan</td>
                    <td>Penilaian Kinerja (LKPD)</td>
                    <td>
                      Menilai kemampuan siswa menyelesaikan soal pembagian
                      pecahan dengan cara yang sistematis dan benar
                    </td>
                    <td>
                      LKPD menunjukkan siswa mampu mengubah bilangan asli
                      menjadi pecahan, membalik pecahan pembagi, dan
                      menyederhanakan hasil. Kesalahan paling umum adalah lupa
                      membalik pecahan pembagi atau belum menyederhanakan hasil
                      akhir.
                    </td>
                  </tr>
                  <tr>
                    <td>Modul Ajar Sendi</td>
                    <td>Tes tertulis dan identifikasi gambar</td>
                    <td>
                      Menilai pemahaman siswa terhadap jenis sendi, gerak yang
                      terjadi, serta fungsi organ gerak pada tubuh manusia
                    </td>
                    <td>
                      Siswa dapat mengidentifikasi jenis sendi dan menjelaskan
                      fungsi masing-masing dengan cukup baik. Media 3D Mozaik
                      membantu siswa memahami konsep secara konkret dan lebih
                      mudah diingat.
                    </td>
                  </tr>
                  <tr>
                    <td>Modul Ajar Sendi</td>
                    <td>Refleksi dan rubrik sikap</td>
                    <td>
                      Mengetahui respons, minat, dan sikap belajar siswa selama
                      pembelajaran berlangsung
                    </td>
                    <td>
                      Refleksi siswa menunjukkan adanya peningkatan rasa ingin
                      tahu, kerja sama, dan kepercayaan diri saat melakukan
                      pengamatan serta menjelaskan hasil diskusi.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <Card className="reflection">
              <h3>Analisis Keseluruhan Instrumen</h3>
              <p>
                Setiap modul memiliki kebutuhan penilaian yang berbeda. Pada
                modul pembagian pecahan, instrumen lebih menekankan proses
                berpikir dan ketepatan langkah pengerjaan. Sedangkan pada modul
                sendi, penilaian lebih menekankan pemahaman konsep dan
                pengamatan visual. Dengan menyesuaikan instrumen pada tiap
                modul, hasil penilaian menjadi lebih valid, objektif, dan
                relevan terhadap tujuan pembelajaran yang ingin dicapai.
              </p>
            </Card>
          </section>
          <section id="dokumentasi" className="section alt">
            <Title
              eyebrow="08 • BUKTI VISUAL"
              title="Dokumentasi"
              desc="Galeri foto, screenshot perangkat pembelajaran, asesmen, dan kegiatan sekolah."
            />
            <div className="gallery">
              {[
                {
                  title: "Foto Bersama Tim Paskibra",
                  description: "Dokumentasi kebersamaan dalam kegiatan ekstrakurikuler Paskibra di lingkungan sekolah.",
                  image: "/assets/Dokumentasi/Foto bersama tim paskibra.jpeg",
                },
                {
                  title: "Kegiatan Literasi di Sekolah",
                  description: "Siswa membaca dan menumbuhkan budaya literasi bersama untuk meningkatkan minat baca.",
                  image: "/assets/Dokumentasi/Kegiatan Literasi.jpeg",
                },
                {
                  title: "Membantu Menghias Kelas Menyambut Hari Kemerdekaan",
                  description: "Kegiatan kerja sama siswa dan guru dalam menyiapkan dekorasi kelas untuk memperingati kemerdekaan Indonesia.",
                  image: "/assets/Dokumentasi/membantu guru menghias kelas dalam menyambut hari kemerdekaan indonesia.jpeg",
                },
                {
                  title: "Bimbingan Membaca bagi Siswa yang Belum Lancar",
                  description: "Kegiatan pendampingan membaca secara individu untuk membantu siswa kelas tinggi yang masih kesulitan membaca.",
                  image: "/assets/Dokumentasi/Memberikan bimbingan ke siswa yang belum bisa membaca.jpeg",
                },
                {
                  title: "Menyambut Siswa di Gerbang Sekolah",
                  description: "Kegiatan menyambut kedatangan siswa di pagi hari agar suasana belajar dimulai dengan semangat dan disiplin.",
                  image: "/assets/Dokumentasi/Menyambut Siswa Di Depan Gerbang Sekolah.jpeg",
                },
                {
                  title: "Senam Pagi Siswa",
                  description: "Kegiatan senam pagi untuk menumbuhkan kebugaran jasmani dan semangat belajar siswa di pagi hari.",
                  image: "/assets/Dokumentasi/Senam Pagi.jpeg",
                },
              ].map((item) => (
                <div className="gallery-item" key={item.title}>
                  <img src={item.image} alt={item.title} className="gallery-image" />
                  <b>{item.title}</b>
                  <small>{item.description}</small>
                </div>
              ))}
            </div>
          </section>
          <footer>
            <div>
              <b>E-Portfolio PPG — Muhammad Rizki Wardana, S.Pd.</b>
              <span>Portofolio profesional • 2026</span>
            </div>
            <button onClick={() => go("beranda")}>Kembali ke Beranda ↑</button>
          </footer>
        </main>
        {selectedModule && (
          <div
            className="preview-backdrop"
            role="presentation"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setSelectedModule(null);
            }}
          >
            <section
              className="preview-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="preview-title"
            >
              <div className="preview-header">
                <div>
                  <span className="eyebrow-soft">Preview Dokumen</span>
                  <h2 id="preview-title">{selectedModule.title}</h2>
                </div>
                <button
                  className="preview-close"
                  onClick={() => setSelectedModule(null)}
                  aria-label="Tutup preview"
                >
                  <X size={22} />
                </button>
              </div>
              <div className="docx-preview" ref={previewRef} />
              <div className="preview-actions">
                <a className="secondary" href={selectedModule.file} download>
                  Unduh Dokumen
                </a>
                <button
                  className="primary"
                  onClick={() => setSelectedModule(null)}
                >
                  Tutup
                </button>
              </div>
            </section>
          </div>
        )}
        {selectedMedia && (
          <div
            className="preview-backdrop"
            role="presentation"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setSelectedMedia(null);
            }}
          >
            <section
              className="preview-modal media-preview-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="media-preview-title"
            >
              <div className="preview-header">
                <div>
                  <span className="eyebrow-soft">Preview Media Pembelajaran</span>
                  <h2 id="media-preview-title">{selectedMedia.title}</h2>
                </div>
                <button
                  className="preview-close"
                  onClick={() => setSelectedMedia(null)}
                  aria-label="Tutup preview media"
                >
                  <X size={22} />
                </button>
              </div>
              <p className="media-preview-description">{selectedMedia.description}</p>
              {selectedMedia.type === "iframe" ? (
                <iframe
                  className="learning-site-frame"
                  src={selectedMedia.file}
                  title={selectedMedia.title}
                />
              ) : (
                <div className="media-image-preview">
                  <img src={selectedMedia.image} alt={selectedMedia.title} />
                </div>
              )}
              <div className="preview-actions">
                {selectedMedia.type === "iframe" && (
                  <a
                    className="secondary"
                    href={selectedMedia.file}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Buka di Tab Baru
                  </a>
                )}
                <button className="primary" onClick={() => setSelectedMedia(null)}>
                  Tutup
                </button>
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
const Info = ({ label, value }) => (
  <div className="info">
    <span>{label}</span>
    <b>{value}</b>
  </div>
);
const Metric = ({ title, text }) => (
  <Card>
    <div className="metric-icon">
      <Sparkles size={18} />
    </div>
    <h3>{title}</h3>
    <p>{text}</p>
  </Card>
);
const UploadBox = ({ title, text }) => (
  <div className="upload">
    <FileText size={26} />
    <div>
      <b>{title}</b>
      <span>{text}</span>
    </div>
    <button className="secondary">Lihat Dokumen</button>
  </div>
);
const Media = ({ title, icon }) => (
  <Card className="media-card">
    <div className="emoji">{icon}</div>
    <h3>{title}</h3>
    <p>Tambahkan gambar/screenshot dan deskripsi penggunaan media.</p>
  </Card>
);
const ModuleCard = ({ title, image }) => (
  <div className="module-card">
    <div className="module-image">
      <img src={image} alt={title} />
    </div>
    <div className="module-content">
      <h3>{title}</h3>
      <button className="module-button">Lihat Selengkapnya</button>
    </div>
  </div>
);
const Check = ({ children }) => (
  <div>
    <CheckCircle2 size={17} />
    <span>{children}</span>
  </div>
);
const Reflection = ({ title, children }) => (
  <Card>
    <h3>{title}</h3>
    <div className="write-space">{children}</div>
  </Card>
);
const Timeline = () => (
  <div className="timeline">
    {[
      "Kegiatan sekolah / rapat",
      "Pendampingan peserta didik",
      "Pengembangan perangkat pembelajaran",
      "Kegiatan ekstrakurikuler",
    ].map((x, i) => (
      <div className="time-item" key={x}>
        <div className="dot">{i + 1}</div>
        <Card>
          <small>KEGIATAN {i + 1}</small>
          <h3>{x}</h3>
          <p>
            Tambahkan tanggal, peran, deskripsi kegiatan, hasil yang diperoleh,
            dokumentasi, dan kompetensi yang dikembangkan.
          </p>
        </Card>
      </div>
    ))}
  </div>
);
export default App;
