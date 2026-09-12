"use client";

import React from "react";
import Link from "next/link";
import { GraduationCap, ShieldCheck, Lock, Award, Heart, Sparkles, ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-slate-900 text-slate-300 border-t border-slate-800 transition-colors duration-300 mt-auto">
      {/* Top Guarantee Ribbon */}
      <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-violet-950 border-b border-indigo-900/40 py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
              <ShieldCheck className="w-6 h-6 text-indigo-400" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm flex items-center gap-2">
                100% Institutional Anonymity Guarantee
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full uppercase font-bold tracking-wider">
                  Verified
                </span>
              </h4>
              <p className="text-xs text-slate-400">
                Zero collection of student IDs, IP addresses, browser fingerprints, or timestamp signatures.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-indigo-400" /> SHA-256 Hashed
            </span>
            <span className="flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-violet-400" /> Academic Board Compliant
            </span>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Col 1: Brand Info */}
        <div className="space-y-4 md:col-span-1">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white font-bold">
              <GraduationCap className="w-5 h-5" />
            </div>
            <span className="font-bold text-xl text-white tracking-tight">
              Academix<span className="text-indigo-400">Pulse</span>
            </span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Institutional Quality Assurance & Anonymous Faculty Evaluation Engine. Empowering academic excellence through structured data intelligence.
          </p>
          <div className="pt-2 text-xs text-slate-500">
            &copy; {new Date().getFullYear()} Academix Governance System. All rights reserved.
          </div>
        </div>

        {/* Col 2: Navigation */}
        <div className="space-y-3">
          <h5 className="text-xs font-bold uppercase tracking-wider text-slate-200">
            System Modules
          </h5>
          <ul className="space-y-2 text-xs">
            <li>
              <Link href="/" className="hover:text-indigo-400 transition-colors">
                Portal Overview & Workflow
              </Link>
            </li>
            <li>
              <Link href="/feedback" className="hover:text-indigo-400 transition-colors">
                Submit Anonymous Evaluation
              </Link>
            </li>
            <li>
              <Link href="/dashboard" className="hover:text-indigo-400 transition-colors">
                Faculty Performance Directory
              </Link>
            </li>
            <li>
              <Link href="/analytics" className="hover:text-indigo-400 transition-colors">
                Visual Analytics & Comparative Radar
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 3: Records & AI */}
        <div className="space-y-3">
          <h5 className="text-xs font-bold uppercase tracking-wider text-slate-200">
            Intelligence & Reports
          </h5>
          <ul className="space-y-2 text-xs">
            <li>
              <Link href="/reports" className="hover:text-indigo-400 transition-colors">
                Master Records Data Table
              </Link>
            </li>
            <li>
              <Link href="/insights" className="hover:text-indigo-400 transition-colors">
                AI Sentiment Breakdown
              </Link>
            </li>
            <li>
              <Link href="/reports" className="hover:text-indigo-400 transition-colors">
                Printable Quality Audits
              </Link>
            </li>
            <li>
              <Link href="/analytics" className="hover:text-indigo-400 transition-colors">
                Faculty Delta Comparison Matrix
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 4: Institutional Standards */}
        <div className="space-y-3">
          <h5 className="text-xs font-bold uppercase tracking-wider text-slate-200">
            Academic Compliance
          </h5>
          <p className="text-xs text-slate-400 leading-relaxed">
            Built in alignment with Higher Education Board Standards for Institutional Effectiveness & Continuous Quality Improvement (CQI).
          </p>
          <div className="pt-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800 text-xs font-medium text-slate-300 border border-slate-700">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" /> ISO/IEC 27001 Security Standard
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
