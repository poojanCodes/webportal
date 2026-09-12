"use client";

import React from "react";
import { Sparkles, CheckCircle2, AlertTriangle } from "lucide-react";

export default function StatusBadge({ status, score }) {
  if (status === "Top-Rated Faculty" || (score && score >= 4.2)) {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 shadow-sm">
        <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
        Top-Rated Faculty
      </span>
    );
  }

  if (status === "Faculty Requiring Improvement" || (score && score < 3.0)) {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 shadow-sm">
        <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />
        Faculty Requiring Improvement
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 shadow-sm">
      <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" />
      Satisfactory / Consistent
    </span>
  );
}
