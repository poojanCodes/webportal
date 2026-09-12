"use client";

import React, { useState } from "react";
import Link from "next/link";
import PageWrapper from "@/components/layout/PageWrapper";
import { useApp } from "@/context/AppContext";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import TiltCard from "@/components/ui/TiltCard";
import {
  GraduationCap,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Users,
  CheckCircle2,
  BarChart3,
  FileSpreadsheet,
  MessageSquarePlus,
  TrendingUp,
  Cpu,
  Star,
  ChevronRight,
  Target,
  Award
} from "lucide-react";

export default function LandingPage() {
  const { stats, facultyList } = useApp();
  const [activeWorkflowStage, setActiveWorkflowStage] = useState(0);

  const workflowStages = [
    {
      step: "01",
      title: "Select Faculty & Course",
      subtitle: "Tiered Academic Cascade",
      desc: "Students filter through Department, Semester, Course Code, and assigned Professor using our verified course database.",
      icon: Users,
      badge: "Step 1"
    },
    {
      step: "02",
      title: "Submit Anonymous Feedback",
      subtitle: "Cryptographic Anonymity",
      desc: "Complete the 6-parameter rating matrix and constructive comments with zero identity, IP, or session tracking.",
      icon: MessageSquarePlus,
      badge: "Step 2"
    },
    {
      step: "03",
      title: "Aggregate Ratings",
      subtitle: "Real-time Recalculation Engine",
      desc: "Calculates overall composite scores, percentage gauges, and assigns standardized academic status badges automatically.",
      icon: Cpu,
      badge: "Step 3"
    },
    {
      step: "04",
      title: "Analyze Performance",
      subtitle: "Multi-dimensional Radar & Delta",
      desc: "Compare faculty side-by-side, inspect department benchmark distributions, and highlight parameter extremes.",
      icon: BarChart3,
      badge: "Step 4"
    },
    {
      step: "05",
      title: "Generate Institutional Reports",
      subtitle: "AI Insights & CSV Export",
      desc: "Export master record spreadsheets, print executive quality audit sheets, and review automated AI sentiment summaries.",
      icon: FileSpreadsheet,
      badge: "Step 5"
    }
  ];

  return (
    <PageWrapper>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-10">
        {/* Header Title Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="gsap-reveal inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-900 dark:text-indigo-200 border border-indigo-300 dark:border-indigo-700 text-xs font-extrabold shadow-sm">
            <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span>Next-Gen Academic Quality Assurance</span>
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-700 text-white text-[10px] uppercase font-extrabold tracking-wider">
              VERIFIED
            </span>
          </div>

          <h1 className="gsap-reveal text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-950 dark:text-white leading-tight">
            Institutional Anonymous Feedback & <span className="gradient-text">Performance Analytics</span>
          </h1>

          <p className="gsap-reveal text-sm sm:text-base text-slate-700 dark:text-slate-200 font-bold max-w-2xl mx-auto">
            A cryptographic, multi-dimensional feedback ecosystem empowering students to provide honest evaluation and faculty with actionable KPI analytics.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* BENTO GRID LAYOUT (High Contrast WCAG AAA Compliant Palette)               */}
        {/* ========================================================================= */}
        <div className="gsap-reveal grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* 1. Bento Card 1 (Left Tall Column - Lavender) */}
          <div className="lg:col-span-5 flex">
            <TiltCard className="w-full">
              <div className="bento-card bento-lavender h-full p-8 flex flex-col justify-between space-y-8 shadow-sm">
                <div className="space-y-6">
                  <div className="w-12 h-12 rounded-2xl bg-violet-200 dark:bg-violet-900/60 border border-violet-400 dark:border-violet-700 flex items-center justify-center text-[#2E1065] dark:text-violet-200 font-bold">
                    <GraduationCap className="w-6 h-6" />
                  </div>

                  <div className="space-y-3">
                    <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-snug">
                      Elevating Academic Excellence
                    </h2>
                    <p className="bento-subtext text-sm leading-relaxed font-bold">
                      Structured 6-parameter evaluation matrices paired with cryptographic zero-identity log tracking to foster continuous institutional improvement.
                    </p>
                  </div>
                </div>

                <div className="pt-6 border-t border-purple-300 dark:border-purple-800 space-y-4">
                  <div className="flex items-center gap-2 text-xs font-extrabold text-[#2E1065] dark:text-purple-200">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span>256-Bit SHA-256 Encrypted Session</span>
                  </div>

                  <Link
                    href="/feedback"
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-700 to-violet-700 hover:from-indigo-600 hover:to-violet-600 text-white font-extrabold text-sm shadow-md shadow-indigo-700/30 transition-all flex items-center justify-center gap-2 group"
                  >
                    <span>Submit Anonymous Evaluation</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </TiltCard>
          </div>

          {/* Right Column Layout (2 Rows of Cards) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Top Row: Card 2 (Pink) */}
            <TiltCard>
              <div className="bento-card bento-pink p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-sm">
                <div className="space-y-2 max-w-sm">
                  <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#831843] dark:text-pink-300">
                    <Users className="w-4 h-4" />
                    <span>Executive Pulse</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight">
                    Total Evaluations Logged
                  </h3>
                  <p className="bento-subtext text-xs font-bold">
                    Live cumulative reviews processed across all departments.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-pink-300 dark:border-pink-800 text-center flex-shrink-0">
                  <div className="text-3xl sm:text-4xl font-extrabold text-[#831843] dark:text-pink-400">
                    <AnimatedCounter value={stats.totalSubmissions} decimals={0} />
                  </div>
                  <span className="text-[10px] uppercase font-extrabold text-slate-700 dark:text-slate-300">
                    Submissions
                  </span>
                </div>
              </div>
            </TiltCard>

            {/* Middle Row: Card 3 (Yellow) & Card 4 (Green) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Card 3 (Butter Yellow Tint) */}
              <TiltCard>
                <div className="bento-card bento-yellow p-6 h-full flex flex-col justify-between space-y-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-amber-200 dark:bg-amber-900/60 border border-amber-400 dark:border-amber-700 flex items-center justify-center text-[#78350F] dark:text-amber-200 font-bold">
                      <Target className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] uppercase font-extrabold tracking-wider px-2.5 py-1 rounded-full bg-amber-200 text-[#78350F] dark:bg-amber-950 dark:text-amber-300 border border-amber-300 dark:border-amber-700">
                      Target Metrics
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-lg font-extrabold">Faculty Rated</h3>
                    <p className="bento-subtext text-xs font-bold">
                      Active professors across CSE, DSAI, EEE, MAE, SBAM.
                    </p>
                  </div>

                  <div className="text-3xl font-extrabold text-[#78350F] dark:text-amber-400">
                    <AnimatedCounter value={stats.totalFacultyCount} decimals={0} />
                    <span className="text-xs font-extrabold text-slate-700 dark:text-slate-300 block">Faculty Members</span>
                  </div>
                </div>
              </TiltCard>

              {/* Card 4 (Sage Green Tint) */}
              <TiltCard>
                <div className="bento-card bento-green p-6 h-full flex flex-col justify-between space-y-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-emerald-200 dark:bg-emerald-900/60 border border-emerald-400 dark:border-emerald-700 flex items-center justify-center text-[#064E3B] dark:text-emerald-200 font-bold">
                      <Star className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] uppercase font-extrabold tracking-wider px-2.5 py-1 rounded-full bg-emerald-200 text-[#064E3B] dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700">
                      Institutional Avg
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-lg font-extrabold">Overall Benchmark</h3>
                    <p className="bento-subtext text-xs font-bold">
                      Weighted score across 6 core evaluation dimensions.
                    </p>
                  </div>

                  <div className="text-3xl font-extrabold text-[#064E3B] dark:text-emerald-400 flex items-baseline gap-1">
                    <AnimatedCounter value={stats.overallAvg} decimals={2} />
                    <span className="text-xs font-extrabold text-slate-700 dark:text-slate-300">/ 5.0</span>
                  </div>
                </div>
              </TiltCard>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* BOTTOM ROW BENTO LAUNCHPADS                                             */}
        {/* ========================================================================= */}
        <div className="gsap-reveal grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Card 5 (Soft Peach / Coral Tint) */}
          <TiltCard>
            <div className="bento-card bento-peach p-8 h-full flex flex-col justify-between space-y-6 shadow-sm">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-orange-200 dark:bg-orange-900/60 border border-orange-400 dark:border-orange-700 flex items-center justify-center text-[#7C2D12] dark:text-orange-200 font-bold">
                  <MessageSquarePlus className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-extrabold tracking-tight">
                  Student Evaluation Portal
                </h3>
                <p className="bento-subtext text-sm leading-relaxed font-bold">
                  Select your department, semester, and course to provide honest feedback. Matrix covers Subject Knowledge, Clarity, Communication, Engagement, Punctuality, and Overall Satisfaction.
                </p>
              </div>

              <div className="pt-6 border-t border-orange-300 dark:border-orange-800 flex items-center justify-between">
                <span className="text-xs font-extrabold text-[#7C2D12] dark:text-orange-200 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> Zero Student ID Tracking
                </span>
                <Link
                  href="/feedback"
                  className="px-5 py-2.5 rounded-xl bg-orange-700 hover:bg-orange-600 text-white font-extrabold text-xs flex items-center gap-2 transition-all shadow-md shadow-orange-700/20"
                >
                  <span>Launch Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </TiltCard>

          {/* Card 6 (Ice Blue Tint) */}
          <TiltCard>
            <div className="bento-card bento-blue p-8 h-full flex flex-col justify-between space-y-6 shadow-sm">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-sky-200 dark:bg-sky-900/60 border border-sky-400 dark:border-sky-700 flex items-center justify-center text-[#0C4A6E] dark:text-sky-200 font-bold">
                  <BarChart3 className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-extrabold tracking-tight">
                  Analytics & Comparative Intelligence
                </h3>
                <p className="bento-subtext text-sm leading-relaxed font-bold">
                  Inspect multi-parameter Radar skill footprints, side-by-side faculty comparison matrices with delta indicators ($\pm \Delta$), and department benchmark distributions.
                </p>
              </div>

              <div className="pt-6 border-t border-sky-300 dark:border-sky-800 flex items-center justify-between">
                <span className="text-xs font-extrabold text-[#0C4A6E] dark:text-sky-200 flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-sky-600 dark:text-sky-400" /> Multi-dimensional Radar
                </span>
                <Link
                  href="/analytics"
                  className="px-5 py-2.5 rounded-xl bg-sky-700 hover:bg-sky-600 text-white font-extrabold text-xs flex items-center gap-2 transition-all shadow-md shadow-sky-700/20"
                >
                  <span>View Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </TiltCard>
        </div>

        {/* ========================================================================= */}
        {/* 5-STAGE INTERACTIVE WORKFLOW ROADMAP (High Contrast Bento Style)           */}
        {/* ========================================================================= */}
        <section className="gsap-reveal py-8 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-widest text-indigo-700 dark:text-indigo-300">
              Operational Lifecycle
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white">
              5-Stage Feedback Roadmap
            </h2>
          </div>

          {/* Workflow Node Selector */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            {workflowStages.map((stage, idx) => {
              const Icon = stage.icon;
              const isActive = activeWorkflowStage === idx;
              return (
                <button
                  key={stage.step}
                  onClick={() => setActiveWorkflowStage(idx)}
                  className={`p-4 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between space-y-3 ${
                    isActive
                      ? "bento-lavender font-extrabold shadow-md scale-[1.02] border-indigo-500"
                      : "bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-100 hover:border-indigo-400"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-slate-100">
                      {stage.step}
                    </span>
                    <Icon className={`w-4 h-4 ${isActive ? "text-indigo-700 dark:text-indigo-300" : "text-slate-500"}`} />
                  </div>
                  <h3 className="font-extrabold text-xs sm:text-sm line-clamp-2">
                    {stage.title}
                  </h3>
                </button>
              );
            })}
          </div>

          {/* Active Stage Details Card */}
          <div className="bento-card bento-lavender p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-3 max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-200 text-[#2E1065] dark:bg-violet-950 dark:text-violet-200 border border-violet-300 dark:border-violet-700 text-xs font-extrabold">
                <span>{workflowStages[activeWorkflowStage].badge}</span>
                <span>•</span>
                <span>{workflowStages[activeWorkflowStage].subtitle}</span>
              </div>
              <h3 className="text-2xl font-extrabold">
                {workflowStages[activeWorkflowStage].title}
              </h3>
              <p className="bento-subtext text-sm leading-relaxed font-bold">
                {workflowStages[activeWorkflowStage].desc}
              </p>
            </div>

            <Link
              href={activeWorkflowStage === 0 || activeWorkflowStage === 1 ? "/feedback" : "/dashboard"}
              className="px-6 py-3 rounded-xl bg-indigo-700 hover:bg-indigo-600 text-white font-extrabold text-xs shadow-md flex items-center gap-2 transition-all flex-shrink-0"
            >
              <span>Explore Stage</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </div>
    </PageWrapper>
  );
}
