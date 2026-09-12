"use client";

import React from "react";
import { Sparkles, CheckCircle2, AlertTriangle } from "lucide-react";

export default function StatusBadge({ status, score }) {
  if (status === "Top-Rated Faculty" || (score && score >= 4.2)) {
    return (
      <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-extrabold bg-[#D1FAE5] text-[#064E3B] dark:bg-emerald-950/80 dark:text-emerald-300 border border-[#059669] dark:border-emerald-500 shadow-sm">
        <Sparkles className="w-3.5 h-3.5 text-[#047857] dark:text-emerald-400" />
        Top-Rated Faculty
      </span>
    );
  }

  if (status === "Faculty Requiring Improvement" || (score && score < 3.0)) {
    return (
      <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-extrabold bg-[#FFEBE3] text-[#7C2D12] dark:bg-rose-950/80 dark:text-rose-300 border border-[#DC2626] dark:border-rose-500 shadow-sm">
        <AlertTriangle className="w-3.5 h-3.5 text-[#B91C1C] dark:text-rose-400" />
        Faculty Requiring Improvement
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-extrabold bg-[#E0F2FE] text-[#0C4A6E] dark:bg-blue-950/80 dark:text-blue-300 border border-[#2563EB] dark:border-blue-500 shadow-sm">
      <CheckCircle2 className="w-3.5 h-3.5 text-[#1D4ED8] dark:text-blue-400" />
      Satisfactory / Consistent
    </span>
  );
}
