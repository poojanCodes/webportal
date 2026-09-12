"use client";

import React, { useMemo } from "react";
import PageWrapper from "@/components/layout/PageWrapper";
import { useApp } from "@/context/AppContext";
import StatusBadge from "@/components/ui/StatusBadge";
import {
  BrainCircuit,
  Sparkles,
  TrendingUp,
  Smile,
  Meh,
  AlertCircle,
  Lightbulb,
  CheckCircle2,
  ChevronRight,
  Target,
  GraduationCap
} from "lucide-react";

export default function InsightsPage() {
  const { facultyList, feedbackLogs, stats } = useApp();

  // Sentiment distribution counts
  const sentimentStats = useMemo(() => {
    const counts = { positive: 0, neutral: 0, actionable: 0 };
    feedbackLogs.forEach((log) => {
      if (counts[log.sentiment] !== undefined) {
        counts[log.sentiment] += 1;
      }
    });

    const total = feedbackLogs.length || 1;
    const positivePct = Number(((counts.positive / total) * 100).toFixed(1));
    const neutralPct = Number(((counts.neutral / total) * 100).toFixed(1));
    const actionablePct = Number(((counts.actionable / total) * 100).toFixed(1));

    return { counts, total, positivePct, neutralPct, actionablePct };
  }, [feedbackLogs]);

  // AI-Generated Actionable Feedback Strategies per Faculty
  const aiStrategies = useMemo(() => {
    return facultyList.map((faculty) => {
      const m = faculty.metrics;
      const strategies = [];

      if (m.engagement < 4.0) {
        strategies.push("Integrate active learning workshops and live coding/problem-solving prompts every 20 minutes to elevate student engagement.");
      }
      if (m.clarity < 4.0) {
        strategies.push("Incorporate step-by-step visual slide breakdowns and post lecture recording timestamps for complex derivations.");
      }
      if (m.punctuality < 4.0) {
        strategies.push("Establish automated assignment submission cutoffs and post assignment grading rubrics within 5 business days.");
      }
      if (m.communication < 4.0) {
        strategies.push("Host dedicated weekly office-hour Q&A sessions and structure interactive Discord/LMS discussion threads.");
      }
      if (strategies.length === 0) {
        strategies.push("Maintain exemplary teaching methodology. Offer mentorship to junior faculty members within the department.");
      }

      return {
        faculty,
        strategies
      };
    });
  }, [facultyList]);

  return (
    <PageWrapper>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-10">
        {/* Page Header */}
        <div className="space-y-3">
          <div className="gsap-reveal inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-fuchsia-500/10 text-fuchsia-700 dark:text-fuchsia-300 border border-fuchsia-500/20 text-xs font-bold shadow-sm">
            <BrainCircuit className="w-3.5 h-3.5 text-fuchsia-500" />
            <span>AI Automated Quality Engine</span>
          </div>
          <h1 className="gsap-reveal text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            AI Innovation & <span className="gradient-text">Sentiment Insights</span>
          </h1>
          <p className="gsap-reveal text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-3xl font-medium">
            Automated qualitative comment breakdown, AI-generated concrete development strategies, and longitudinal performance shifts across recent academic evaluation terms.
          </p>
        </div>

        {/* 1. Comment Sentiment Distribution Cards (Bento Soft Pastel Palette) */}
        <div className="gsap-reveal grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Positive Sentiment (Bento Green) */}
          <div className="bento-card bento-green p-6 space-y-3 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border border-emerald-500/30 flex items-center justify-center">
                <Smile className="w-6 h-6" />
              </div>
              <span className="text-3xl font-extrabold text-emerald-800 dark:text-emerald-300">
                {sentimentStats.positivePct}%
              </span>
            </div>
            <div>
              <h3 className="font-bold text-base">
                Positive Sentiment
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                Praising teaching clarity, mastery, and engaging classroom delivery.
              </p>
            </div>
            <div className="w-full bg-emerald-500/20 h-2 rounded-full overflow-hidden">
              <div
                className="bg-emerald-600 h-full rounded-full"
                style={{ width: `${sentimentStats.positivePct}%` }}
              />
            </div>
          </div>

          {/* Neutral / Balanced (Bento Blue) */}
          <div className="bento-card bento-blue p-6 space-y-3 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/20 text-blue-800 dark:text-blue-300 border border-blue-500/30 flex items-center justify-center">
                <Meh className="w-6 h-6" />
              </div>
              <span className="text-3xl font-extrabold text-blue-800 dark:text-blue-300">
                {sentimentStats.neutralPct}%
              </span>
            </div>
            <div>
              <h3 className="font-bold text-base">
                Neutral / Balanced
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                Constructive observations regarding course pacing or assignment difficulty.
              </p>
            </div>
            <div className="w-full bg-blue-500/20 h-2 rounded-full overflow-hidden">
              <div
                className="bg-blue-600 h-full rounded-full"
                style={{ width: `${sentimentStats.neutralPct}%` }}
              />
            </div>
          </div>

          {/* Actionable Concern (Bento Peach) */}
          <div className="bento-card bento-peach p-6 space-y-3 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-orange-500/20 text-orange-800 dark:text-orange-300 border border-orange-500/30 flex items-center justify-center">
                <AlertCircle className="w-6 h-6" />
              </div>
              <span className="text-3xl font-extrabold text-orange-800 dark:text-orange-300">
                {sentimentStats.actionablePct}%
              </span>
            </div>
            <div>
              <h3 className="font-bold text-base">
                Actionable Concern
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                Highlights specific gaps in lab hardware, grading delays, or lecture pacing.
              </p>
            </div>
            <div className="w-full bg-orange-500/20 h-2 rounded-full overflow-hidden">
              <div
                className="bg-orange-600 h-full rounded-full"
                style={{ width: `${sentimentStats.actionablePct}%` }}
              />
            </div>
          </div>
        </div>

        {/* 2. Longitudinal Trend Indicators (Sparklines Grid in Bento Lavender) */}
        <div className="gsap-reveal bento-card bento-lavender p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-indigo-800 dark:text-indigo-300">
                <TrendingUp className="w-4 h-4" />
                <span>Term-by-Term Trajectory</span>
              </div>
              <h3 className="text-2xl font-extrabold tracking-tight">
                Longitudinal Performance Shifts
              </h3>
            </div>
            <span className="text-xs font-bold text-slate-600 dark:text-slate-300 hidden sm:inline-block">
              4 Evaluation Cycles (Fall '24 $\rightarrow$ Fall '26)
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {facultyList.map((f) => {
              const history = f.historicalTrends || [4.0, 4.2, 4.3, f.metrics.overallScore];
              const latest = history[history.length - 1];
              const previous = history[history.length - 2] || latest;
              const diff = Number((latest - previous).toFixed(2));
              const isUp = diff >= 0;

              return (
                <div
                  key={f.id}
                  className="p-4 rounded-2xl bg-white/70 dark:bg-slate-900/60 border border-purple-200 dark:border-purple-900/50 flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl bg-gradient-to-br ${f.avatarBg} text-white font-bold flex items-center justify-center text-sm`}
                    >
                      {f.initials}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                        {f.name}
                      </h4>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                        {f.departmentCode} • Score: {f.metrics.overallScore}
                      </p>
                    </div>
                  </div>

                  {/* SVG Sparkline */}
                  <div className="flex items-center gap-3">
                    <div className="w-24 h-8 flex items-center justify-center">
                      <svg viewBox="0 0 100 30" className="w-full h-full">
                        <polyline
                          fill="none"
                          stroke={isUp ? "#10B981" : "#F43F5E"}
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          points={history
                            .map((val, idx) => {
                              const x = (idx / (history.length - 1)) * 90 + 5;
                              const y = 28 - ((val - 2.5) / 2.5) * 24;
                              return `${x},${y}`;
                            })
                            .join(" ")}
                        />
                      </svg>
                    </div>

                    <span
                      className={`text-xs font-bold px-2 py-1 rounded-lg ${
                        isUp
                          ? "bg-emerald-500/20 text-emerald-800 dark:text-emerald-300"
                          : "bg-rose-500/20 text-rose-800 dark:text-rose-300"
                      }`}
                    >
                      {isUp ? `+${diff}` : `${diff}`}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. AI-Generated Actionable Feedback Summaries (Bento Grid Cards) */}
        <div className="gsap-reveal bento-card bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-fuchsia-600 dark:text-fuchsia-400">
              <Lightbulb className="w-4 h-4" />
              <span>Automated Professional Guidance</span>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
              AI-Synthesized Faculty Development Strategies
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">
              Data-driven action steps computed from multi-dimensional evaluation gaps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {aiStrategies.map(({ faculty, strategies }) => (
              <div
                key={faculty.id}
                className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl bg-gradient-to-br ${faculty.avatarBg} text-white font-bold flex items-center justify-center text-sm`}
                    >
                      {faculty.initials}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                        {faculty.name}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                        {faculty.title}
                      </p>
                    </div>
                  </div>

                  <StatusBadge status={faculty.metrics.statusBadge} score={faculty.metrics.overallScore} />
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-700">
                  <div className="text-[10px] uppercase font-bold text-indigo-600 dark:text-indigo-400 tracking-wider">
                    AI Recommended Action Items:
                  </div>
                  {strategies.map((strat, sIdx) => (
                    <div key={sIdx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300 font-medium">
                      <Target className="w-3.5 h-3.5 text-indigo-500 flex-shrink-0 mt-0.5" />
                      <span>{strat}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
