"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { renderAsync } from "docx-preview";
import { ArrowLeft, FileText, Image as ImageIcon, PlayCircle } from "lucide-react";

const youtubeEmbed = (videoId) =>
  `https://www.youtube.com/embed/${videoId}`;

export default function AssessmentPage({
  semester,
  moduleTitle,
  coverImage,
  moduleFile,
  mediaUrl,
  mediaImage,
  implementationVideoId,
}) {
  const [moduleOpen, setModuleOpen] = useState(false);
  const previewRef = useRef(null);

  useEffect(() => {
    if (!moduleOpen || !previewRef.current) return;
    let cancelled = false;
    previewRef.current.innerHTML = '<p class="preview-loading">Memuat modul...</p>';
    fetch(moduleFile)
      .then((response) => {
        if (!response.ok) throw new Error("Modul tidak ditemukan");
        return response.arrayBuffer();
      })
      .then((buffer) => {
        if (!cancelled && previewRef.current) {
          return renderAsync(buffer, previewRef.current);
        }
      })
      .catch(() => {
        if (!cancelled && previewRef.current) {
          previewRef.current.innerHTML = '<p class="preview-error">Modul tidak dapat dimuat.</p>';
        }
      });
    return () => {
      cancelled = true;
    };
  }, [moduleFile, moduleOpen]);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="assessment-page">
      <header className="assessment-header">
        <Link href="/" className="assessment-menu-link">
          <ArrowLeft size={18} />
          Menu
        </Link>
        <nav aria-label={`Navigasi ${semester}`}>
          <button onClick={() => scrollTo("analisis-modul")}>Analisis Modul</button>
          <button onClick={() => scrollTo("analisis-media")}>Analisis Media</button>
          <button onClick={() => scrollTo("analisis-video")}>Analisis Video</button>
        </nav>
        <strong>{semester}</strong>
      </header>

      <main>
        <section className="assessment-hero">
          <div>
            <span>Produk Praktik Mengajar Mandiri</span>
            <h1>{moduleTitle}</h1>
            <p>
              Rancangan pembelajaran lengkap dan analisis pelaksanaan praktik
              mengajar mandiri untuk {semester}.
            </p>
            <button className="primary" onClick={() => setModuleOpen(true)}>
              Lihat Modul Ajar
            </button>
          </div>
          <img src={coverImage} alt={`Cover ${moduleTitle}`} />
        </section>

        <section id="analisis-modul" className="assessment-section">
          <div className="assessment-title">
            <div className="assessment-title-icon"><FileText size={24} /></div>
            <div>
              <span>01 • Analisis Modul</span>
              <h2>Analisis Modul Ajar</h2>
            </div>
          </div>
          <div className="assessment-card-grid">
            <article className="assessment-card">
              <h3>Kelebihan</h3>
              <ul>
                <li>Tujuan pembelajaran disusun sesuai capaian pembelajaran dan kebutuhan peserta didik.</li>
                <li>Kegiatan pembelajaran memiliki alur yang runtut dan memuat asesmen yang terukur.</li>
                <li>Modul menyediakan pendekatan, media, dan aktivitas yang mendukung pemahaman konsep.</li>
              </ul>
            </article>
            <article className="assessment-card">
              <h3>Perbaikan</h3>
              <ul>
                <li>Memberikan variasi kegiatan untuk memenuhi perbedaan kemampuan peserta didik.</li>
                <li>Memperkuat penguatan konsep dan pengelolaan waktu pada kegiatan inti.</li>
                <li>Menambahkan instrumen pemantauan perkembangan individu secara lebih rinci.</li>
              </ul>
            </article>
          </div>
          <button className="secondary assessment-module-button" onClick={() => setModuleOpen(true)}>
            Buka Modul Lengkap
          </button>
        </section>

        <section id="analisis-media" className="assessment-section assessment-section-alt">
          <div className="assessment-title">
            <div className="assessment-title-icon"><ImageIcon size={24} /></div>
            <div>
              <span>02 • Analisis Media</span>
              <h2>Media Pembelajaran</h2>
            </div>
          </div>
          <div className="assessment-media-frame">
            {mediaImage ? (
              <img
                className="assessment-media-image"
                src={mediaImage}
                alt={`Media pembelajaran ${moduleTitle}`}
              />
            ) : (
              <iframe src={mediaUrl} title={`Media pembelajaran ${moduleTitle}`} allowFullScreen />
            )}
          </div>
          <div className="assessment-card-grid">
            <article className="assessment-card">
              <h3>Kesesuaian</h3>
              <p>Media dipilih karena mendukung pencapaian tujuan pembelajaran dan dapat digunakan secara interaktif oleh peserta didik.</p>
            </article>
            <article className="assessment-card">
              <h3>Relevansi</h3>
              <p>Aktivitas pada media menghubungkan konsep pembelajaran dengan pengalaman siswa serta memancing keterlibatan aktif.</p>
            </article>
          </div>
        </section>

        <section id="analisis-video" className="assessment-section">
          <div className="assessment-title">
            <div className="assessment-title-icon"><PlayCircle size={24} /></div>
            <div>
              <span>03 • Analisis Video</span>
              <h2>Pelaksanaan Praktik Mengajar Mandiri</h2>
            </div>
          </div>
          <div className="assessment-video">
            <iframe
              src={youtubeEmbed(implementationVideoId)}
              title={`Video praktik mengajar ${semester}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
          <div className="assessment-card-grid">
            <article className="assessment-card">
              <h3>Pembukaan</h3>
              <p>Guru membuka pembelajaran secara terarah melalui apersepsi, penyampaian tujuan, dan penyiapan suasana belajar.</p>
            </article>
            <article className="assessment-card">
              <h3>Kegiatan Inti</h3>
              <p>Materi disampaikan secara sistematis dengan contoh relevan serta interaksi yang mendorong partisipasi siswa.</p>
            </article>
            <article className="assessment-card">
              <h3>Penutup</h3>
              <p>Pembelajaran ditutup melalui kesimpulan, refleksi, penilaian singkat, dan tindak lanjut pembelajaran.</p>
            </article>
          </div>
        </section>
      </main>

      {moduleOpen && (
        <div className="preview-overlay" role="dialog" aria-modal="true" aria-labelledby="module-preview-title">
          <div className="preview-modal">
            <div className="preview-header">
              <div>
                <span>Rancangan Pembelajaran</span>
                <h2 id="module-preview-title">{moduleTitle}</h2>
              </div>
              <button className="preview-close" onClick={() => setModuleOpen(false)} aria-label="Tutup preview">×</button>
            </div>
            <div ref={previewRef} className="docx-preview" />
          </div>
        </div>
      )}
    </div>
  );
}
