"use client";

import Link from "next/link";
import { ArrowRight, BookOpen, ClipboardCheck, FileCheck2 } from "lucide-react";

export default function MenuPage() {
  return (
    <main className="exam-menu">
      <section className="exam-menu-content" aria-labelledby="exam-menu-title">
        <div className="exam-menu-heading">
          <span className="exam-menu-eyebrow">E-Portfolio</span>
          <h1 id="exam-menu-title">Pilih Menu</h1>
          <p>Pilih jenis penilaian yang ingin Anda kunjungi.</p>
        </div>

        <div className="exam-card-grid">
          <Link href="/lk3" className="exam-card exam-card-lk3" aria-label="Buka halaman LK3">
            <div className="exam-card-icon" aria-hidden="true">
              <FileCheck2 size={34} strokeWidth={1.8} />
            </div>
            <div>
              <span className="exam-card-label">Lembar Kerja</span>
              <h2>LK3</h2>
            </div>
            <span className="exam-card-action">
              Buka LK3 <ArrowRight size={20} aria-hidden="true" />
            </span>
          </Link>

          <Link href="/uts" className="exam-card exam-card-uts" aria-label="Buka halaman UTS">
            <div className="exam-card-icon" aria-hidden="true">
              <BookOpen size={34} strokeWidth={1.8} />
            </div>
            <div>
              <span className="exam-card-label">Penilaian Tengah Semester</span>
              <h2>UTS</h2>
            </div>
            <span className="exam-card-action">
              Buka UTS <ArrowRight size={20} aria-hidden="true" />
            </span>
          </Link>

          <Link href="/uas" className="exam-card exam-card-uas" aria-label="Buka halaman UAS">
            <div className="exam-card-icon" aria-hidden="true">
              <ClipboardCheck size={34} strokeWidth={1.8} />
            </div>
            <div>
              <span className="exam-card-label">Penilaian Akhir Semester</span>
              <h2>UAS</h2>
            </div>
            <span className="exam-card-action">
              Buka UAS <ArrowRight size={20} aria-hidden="true" />
            </span>
          </Link>
        </div>
      </section>
    </main>
  );
}
