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
  Layers,
  ChevronRight,
  Star
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
      {/* 1. Kinetic Ambient Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-24 md:pt-20 md:pb-32 px-4 sm:px-6 lg:px-8 bg-slate-900 text-white">
        {/* Kinetic Mesh Glow Orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-indigo-600/30 to-violet-600/30 rounded-full blur-[140px] pointer-events-none animate-mesh-1" />
        <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-gradient-to-br from-violet-600/25 to-fuchsia-600/20 rounded-full blur-[120px] pointer-events-none animate-mesh-2" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            {/* Top Pill */}
            <div className="gsap-reveal inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/80 border border-slate-700/80 text-xs font-semibold text-indigo-300 backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span>Next-Gen Academic Quality Assurance & Feedback</span>
              <span className="px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-[10px]">
                Active
              </span>
            </div>

            {/* Kinetic Main Title */}
            <h1 className="gsap-reveal text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight">
              Elevating Teaching Standards Through{" "}
              <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                Anonymous Intelligence
              </span>
            </h1>

            <p className="gsap-reveal text-base sm:text-xl text-slate-300 font-normal leading-relaxed">
              A cryptographic, multi-dimensional feedback ecosystem empowering students to provide honest evaluation and providing faculty with actionable KPI analytics.
            </p>

            {/* Launchpad Quick Buttons */}
            <div className="gsap-reveal flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                href="/feedback"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold text-base shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 group"
              >
                <MessageSquarePlus className="w-5 h-5 text-indigo-200" />
                <span>Submit Anonymous Evaluation</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/dashboard"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-800/90 hover:bg-slate-700/90 text-slate-200 hover:text-white font-bold text-base border border-slate-700/80 backdrop-blur-md hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3"
              >
                <BarChart3 className="w-5 h-5 text-violet-400" />
                <span>Explore KPI Analytics</span>
              </Link>
            </div>
          </div>

          {/* Live High-Level Institutional Pulse Counters */}
          <div className="gsap-reveal mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {/* Stat Card 1 */}
            <div className="p-6 rounded-2xl bg-slate-800/60 border border-slate-700/60 backdrop-blur-xl text-center space-y-2 hover:border-indigo-500/50 transition-colors">
              <div className="w-10 h-10 mx-auto rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 mb-2">
                <MessageSquarePlus className="w-5 h-5" />
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold text-white">
                <AnimatedCounter value={stats.totalSubmissions} decimals={0} />
              </div>
              <div className="text-xs uppercase tracking-widest font-semibold text-slate-400">
                Evaluations Logged
              </div>
            </div>

            {/* Stat Card 2 */}
            <div className="p-6 rounded-2xl bg-slate-800/60 border border-slate-700/60 backdrop-blur-xl text-center space-y-2 hover:border-violet-500/50 transition-colors">
              <div className="w-10 h-10 mx-auto rounded-xl bg-violet-500/10 flex items-center justify-center text-violet-400 mb-2">
                <Users className="w-5 h-5" />
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold text-white">
                <AnimatedCounter value={stats.totalFacultyCount} decimals={0} />
              </div>
              <div className="text-xs uppercase tracking-widest font-semibold text-slate-400">
                Faculty Members Rated
              </div>
            </div>

            {/* Stat Card 3 */}
            <div className="p-6 rounded-2xl bg-slate-800/60 border border-slate-700/60 backdrop-blur-xl text-center space-y-2 hover:border-emerald-500/50 transition-colors">
              <div className="w-10 h-10 mx-auto rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-2">
                <Star className="w-5 h-5" />
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold text-white flex items-center justify-center gap-1">
                <AnimatedCounter value={stats.overallAvg} decimals={2} />
                <span className="text-lg text-slate-400 font-normal">/ 5.0</span>
              </div>
              <div className="text-xs uppercase tracking-widest font-semibold text-slate-400">
                Institutional Avg Rating
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Interactive System Workflow Showcase */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <span className="gsap-reveal text-xs font-extrabold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
            End-to-End Operational Lifecycle
          </span>
          <h2 className="gsap-reveal text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            5-Stage Institutional Feedback Roadmap
          </h2>
          <p className="gsap-reveal text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Click through each stage to explore how anonymous student sentiment translates into verifiable academic quality metrics.
          </p>
        </div>

        {/* Workflow Node Selector */}
        <div className="gsap-reveal grid grid-cols-2 sm:grid-cols-5 gap-3 mb-8">
          {workflowStages.map((stage, idx) => {
            const Icon = stage.icon;
            const isActive = activeWorkflowStage === idx;
            return (
              <button
                key={stage.step}
                onClick={() => setActiveWorkflowStage(idx)}
                className={`p-4 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between ${
                  isActive
                    ? "bg-gradient-to-br from-indigo-600 to-violet-600 text-white border-transparent shadow-lg shadow-indigo-500/25 scale-[1.03]"
                    : "bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700/60 text-slate-700 dark:text-slate-300 hover:border-indigo-400 dark:hover:border-indigo-500"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`text-xs font-bold px-2 py-0.5 rounded-md ${
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-300"
                    }`}
                  >
                    {stage.step}
                  </span>
                  <Icon className={`w-5 h-5 ${isActive ? "text-white" : "text-indigo-500"}`} />
                </div>
                <h3 className="font-bold text-xs sm:text-sm leading-snug line-clamp-2">
                  {stage.title}
                </h3>
              </button>
            );
          })}
        </div>

        {/* Active Stage Details Card */}
        <div className="gsap-reveal p-8 rounded-3xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/80 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 text-xs font-bold">
              <span>{workflowStages[activeWorkflowStage].badge}</span>
              <span>•</span>
              <span>{workflowStages[activeWorkflowStage].subtitle}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              {workflowStages[activeWorkflowStage].title}
            </h3>
            <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed">
              {workflowStages[activeWorkflowStage].desc}
            </p>
          </div>

          <div className="w-full md:w-auto flex-shrink-0">
            <Link
              href={activeWorkflowStage === 0 || activeWorkflowStage === 1 ? "/feedback" : "/dashboard"}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold text-sm shadow-md hover:shadow-indigo-500/25 hover:scale-105 transition-all"
            >
              <span>Explore Stage In Action</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 3. Dual Animated Launchpad Portals */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Portal Card 1: Submit Feedback */}
          <TiltCard className="h-full">
            <div className="h-full p-8 rounded-3xl bg-gradient-to-br from-indigo-900 via-slate-900 to-slate-900 text-white border border-indigo-500/30 shadow-2xl flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-600/30 border border-indigo-400/40 flex items-center justify-center text-indigo-300">
                  <MessageSquarePlus className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-extrabold text-white">
                  Student Feedback Portal
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Evaluate course faculty across 6 parameters: Subject Knowledge, Clarity, Communication, Engagement, Punctuality, and Overall Satisfaction. Protected by 256-bit anonymity encryption.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <span className="text-xs font-semibold text-indigo-400 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" /> Zero Identity Tracking
                </span>
                <Link
                  href="/feedback"
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-2 transition-all shadow-md shadow-indigo-600/30"
                >
                  <span>Launch Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </TiltCard>

          {/* Portal Card 2: Analytics & Intelligence */}
          <TiltCard className="h-full">
            <div className="h-full p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-violet-950 text-white border border-violet-500/30 shadow-2xl flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-violet-600/30 border border-violet-400/40 flex items-center justify-center text-violet-300">
                  <BarChart3 className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-extrabold text-white">
                  Analytics & Intelligence Hub
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Explore multi-parameter Radar skills footprints, department benchmarks, side-by-side faculty comparison matrices, and automated AI sentiment breakdowns.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <span className="text-xs font-semibold text-violet-400 flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-violet-400" /> Real-time KPI Radar
                </span>
                <Link
                  href="/analytics"
                  className="px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs flex items-center gap-2 transition-all shadow-md shadow-violet-600/30"
                >
                  <span>View Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </TiltCard>
        </div>
      </section>
    </PageWrapper>
  );
}
