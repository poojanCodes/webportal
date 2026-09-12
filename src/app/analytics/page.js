"use client";

import React, { useState, useMemo } from "react";
import PageWrapper from "@/components/layout/PageWrapper";
import { useApp } from "@/context/AppContext";
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell
} from "recharts";
import {
  BarChart3,
  Sparkles,
  TrendingUp,
  Award,
  AlertTriangle,
  GitCompare,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  CheckCircle2,
  Users
} from "lucide-react";

export default function AnalyticsPage() {
  const { facultyList, stats, departments, feedbackLogs } = useApp();

  // Dual Selector State for Side-by-Side Faculty Comparison
  const [facultyAId, setFacultyAId] = useState(facultyList[0]?.id || "");
  const [facultyBId, setFacultyBId] = useState(facultyList[1]?.id || "");

  const facultyA = useMemo(() => facultyList.find((f) => f.id === facultyAId) || facultyList[0], [facultyList, facultyAId]);
  const facultyB = useMemo(() => facultyList.find((f) => f.id === facultyBId) || facultyList[1], [facultyList, facultyBId]);

  // 1. Radar Skill Footprint Data
  const radarData = useMemo(() => {
    if (!facultyA || !facultyB) return [];
    return [
      {
        parameter: "Subject Knowledge",
        [facultyA.name]: facultyA.metrics.subjectKnowledge,
        [facultyB.name]: facultyB.metrics.subjectKnowledge,
        fullMark: 5
      },
      {
        parameter: "Clarity",
        [facultyA.name]: facultyA.metrics.clarity,
        [facultyB.name]: facultyB.metrics.clarity,
        fullMark: 5
      },
      {
        parameter: "Communication",
        [facultyA.name]: facultyA.metrics.communication,
        [facultyB.name]: facultyB.metrics.communication,
        fullMark: 5
      },
      {
        parameter: "Engagement",
        [facultyA.name]: facultyA.metrics.engagement,
        [facultyB.name]: facultyB.metrics.engagement,
        fullMark: 5
      },
      {
        parameter: "Punctuality",
        [facultyA.name]: facultyA.metrics.punctuality,
        [facultyB.name]: facultyB.metrics.punctuality,
        fullMark: 5
      },
      {
        parameter: "Satisfaction",
        [facultyA.name]: facultyA.metrics.satisfaction,
        [facultyB.name]: facultyB.metrics.satisfaction,
        fullMark: 5
      }
    ];
  }, [facultyA, facultyB]);

  // 2. Department-Wise Grouped Bar Chart Data
  const departmentBarData = useMemo(() => {
    return departments.map((dept) => {
      const deptFaculty = facultyList.filter((f) => f.department === dept.name);
      const count = deptFaculty.length || 1;

      const avgKnowledge =
        deptFaculty.reduce((acc, f) => acc + f.metrics.subjectKnowledge, 0) / count;
      const avgClarity =
        deptFaculty.reduce((acc, f) => acc + f.metrics.clarity, 0) / count;
      const avgEngagement =
        deptFaculty.reduce((acc, f) => acc + f.metrics.engagement, 0) / count;
      const avgOverall =
        deptFaculty.reduce((acc, f) => acc + f.metrics.overallScore, 0) / count;

      return {
        department: dept.code,
        fullname: dept.name,
        "Subject Knowledge": Number(avgKnowledge.toFixed(2)),
        "Clarity": Number(avgClarity.toFixed(2)),
        "Engagement": Number(avgEngagement.toFixed(2)),
        "Overall Avg": Number(avgOverall.toFixed(2))
      };
    });
  }, [departments, facultyList]);

  // 3. Rating Density Distribution Chart Data (1 to 5 breakdown across all logs + seed)
  const ratingDensityData = useMemo(() => {
    const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    facultyList.forEach((f) => {
      f.rawRatings.satisfaction.forEach((val) => {
        if (counts[val] !== undefined) counts[val] += 1;
      });
    });

    return [
      { rating: "5 Stars (Exceptional)", count: counts[5], color: "#10B981" },
      { rating: "4 Stars (Above Avg)", count: counts[4], color: "#3B82F6" },
      { rating: "3 Stars (Satisfactory)", count: counts[3], color: "#F59E0B" },
      { rating: "2 Stars (Needs Work)", count: counts[2], color: "#FB923C" },
      { rating: "1 Star (Critical Concern)", count: counts[1], color: "#F43F5E" }
    ];
  }, [facultyList]);

  // Parameter Delta helper for faculty comparison
  const calculateDelta = (valA, valB) => {
    const delta = valA - valB;
    if (delta > 0) {
      return {
        text: `+${delta.toFixed(2)}`,
        color: "text-emerald-500",
        icon: ArrowUpRight
      };
    }
    if (delta < 0) {
      return {
        text: `${delta.toFixed(2)}`,
        color: "text-rose-500",
        icon: ArrowDownRight
      };
    }
    return { text: "0.00", color: "text-slate-400", icon: Minus };
  };

  return (
    <PageWrapper>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-10">
        {/* Page Header */}
        <div className="space-y-3">
          <div className="gsap-reveal inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-500/10 text-violet-700 dark:text-violet-300 border border-violet-500/20 text-xs font-bold">
            <BarChart3 className="w-3.5 h-3.5 text-violet-500" />
            <span>Multi-Dimensional Intelligence Suite</span>
          </div>
          <h1 className="gsap-reveal text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Visual Reports & <span className="gradient-text">Comparative Analytics</span>
          </h1>
          <p className="gsap-reveal text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-3xl">
            Explore institution-wide radar skill footprints, department benchmark performance, rating density curves, and side-by-side faculty delta matrices.
          </p>
        </div>

        {/* 1. Parameter Extremes Spotlight Banner */}
        <div className="gsap-reveal grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Highest-Rated Parameter */}
          <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-900 border border-emerald-500/30 text-white shadow-xl flex items-center justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
                <Award className="w-4 h-4" />
                <span>Highest-Rated Institutional Parameter</span>
              </div>
              <h3 className="text-2xl font-extrabold text-white">
                {stats.highestParam?.label || "Subject Knowledge"}
              </h3>
              <p className="text-xs text-slate-300">
                Consistently highest across all academic departments with zero critical policy drop-offs.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-center font-extrabold text-2xl">
              {stats.highestParam?.avg || "4.65"}
              <span className="text-xs text-slate-400 block font-normal">/ 5.0</span>
            </div>
          </div>

          {/* Lowest-Rated Parameter */}
          <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-950 via-slate-900 to-slate-900 border border-amber-500/30 text-white shadow-xl flex items-center justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
                <AlertTriangle className="w-4 h-4" />
                <span>Lowest-Rated Parameter (Target Area)</span>
              </div>
              <h3 className="text-2xl font-extrabold text-white">
                {stats.lowestParam?.label || "Punctuality & Lab Discipline"}
              </h3>
              <p className="text-xs text-slate-300">
                Primary focal point identified for institutional workshop pacing and faculty development.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 text-center font-extrabold text-2xl">
              {stats.lowestParam?.avg || "3.90"}
              <span className="text-xs text-slate-400 block font-normal">/ 5.0</span>
            </div>
          </div>
        </div>

        {/* 2. Side-by-Side Faculty Comparison Tool */}
        <div className="gsap-reveal p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                <GitCompare className="w-4 h-4" />
                <span>Comparative Matrix Engine</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                Side-by-Side Faculty Delta Comparison
              </h3>
            </div>

            {/* Dual Dropdown Selectors */}
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-indigo-500">Faculty A</label>
                <select
                  value={facultyAId}
                  onChange={(e) => setFacultyAId(e.target.value)}
                  className="px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-indigo-300 dark:border-indigo-700 text-slate-900 dark:text-white text-xs font-semibold"
                >
                  {facultyList.map((f) => (
                    <option key={f.id} value={f.id}>
                      {f.name} ({f.departmentCode})
                    </option>
                  ))}
                </select>
              </div>

              <span className="text-slate-400 font-bold text-xs pt-4">VS</span>

              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-violet-500">Faculty B</label>
                <select
                  value={facultyBId}
                  onChange={(e) => setFacultyBId(e.target.value)}
                  className="px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-violet-300 dark:border-violet-700 text-slate-900 dark:text-white text-xs font-semibold"
                >
                  {facultyList.map((f) => (
                    <option key={f.id} value={f.id}>
                      {f.name} ({f.departmentCode})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Comparison Delta Table */}
          {facultyA && facultyB && (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 uppercase tracking-wider">
                    <th className="py-3 px-4">Evaluation Dimension</th>
                    <th className="py-3 px-4 text-indigo-600 dark:text-indigo-400 font-bold">
                      {facultyA.name}
                    </th>
                    <th className="py-3 px-4 text-violet-600 dark:text-violet-400 font-bold">
                      {facultyB.name}
                    </th>
                    <th className="py-3 px-4 text-right">Delta Difference (A - B)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {[
                    { label: "Subject Knowledge", key: "subjectKnowledge" },
                    { label: "Explanation & Clarity", key: "clarity" },
                    { label: "Communication & Tone", key: "communication" },
                    { label: "Student Engagement", key: "engagement" },
                    { label: "Punctuality & Discipline", key: "punctuality" },
                    { label: "Overall Satisfaction", key: "satisfaction" },
                    { label: "Composite Score", key: "overallScore" }
                  ].map((row) => {
                    const valA = facultyA.metrics[row.key];
                    const valB = facultyB.metrics[row.key];
                    const deltaObj = calculateDelta(valA, valB);
                    const DeltaIcon = deltaObj.icon;

                    return (
                      <tr key={row.key} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                        <td className="py-3 px-4 font-semibold text-slate-900 dark:text-white">
                          {row.label}
                        </td>
                        <td className="py-3 px-4 font-bold text-slate-800 dark:text-slate-200">
                          {valA}
                        </td>
                        <td className="py-3 px-4 font-bold text-slate-800 dark:text-slate-200">
                          {valB}
                        </td>
                        <td className={`py-3 px-4 text-right font-bold flex items-center justify-end gap-1 ${deltaObj.color}`}>
                          <DeltaIcon className="w-4 h-4" />
                          <span>{deltaObj.text}</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* 3. Multi-Dimensional Visualizations Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Chart 1: Radar Skill Footprint */}
          <div className="gsap-reveal p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                  Multi-Parameter Skill Footprint (Radar)
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Comparing selected faculty signatures across 6 dimensions.
                </p>
              </div>
            </div>

            <div className="w-full h-80 pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#475569" strokeDasharray="3 3" />
                  <PolarAngleAxis dataKey="parameter" stroke="#94a3b8" tick={{ fontSize: 11 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 5]} stroke="#64748b" />
                  <Radar
                    name={facultyA?.name || "Faculty A"}
                    dataKey={facultyA?.name || "Faculty A"}
                    stroke="#4F46E5"
                    fill="#4F46E5"
                    fillOpacity={0.4}
                  />
                  <Radar
                    name={facultyB?.name || "Faculty B"}
                    dataKey={facultyB?.name || "Faculty B"}
                    stroke="#7C3AED"
                    fill="#7C3AED"
                    fillOpacity={0.4}
                  />
                  <Tooltip contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155", color: "#fff", borderRadius: "12px" }} />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 2: Rating Density Distribution Breakdown */}
          <div className="gsap-reveal p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
            <div>
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                Rating Density Distribution (1 to 5 Stars)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Proportion of evaluations across all rating tiers.
              </p>
            </div>

            <div className="w-full h-80 pt-4 flex flex-col md:flex-row items-center justify-between">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={ratingDensityData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={95}
                    paddingAngle={4}
                    dataKey="count"
                  >
                    {ratingDensityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155", color: "#fff", borderRadius: "12px" }} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Chart 3: Department-Wise Grouped Bar Chart */}
        <div className="gsap-reveal p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
          <div>
            <h3 className="font-bold text-lg text-slate-900 dark:text-white">
              Department Benchmark Comparisons (Grouped Bar)
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Cross-departmental averages across key parameters (Subject Knowledge, Clarity, Engagement, Overall Avg).
            </p>
          </div>

          <div className="w-full h-96 pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={departmentBarData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="department" stroke="#94a3b8" />
                <YAxis domain={[0, 5]} stroke="#94a3b8" />
                <Tooltip contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155", color: "#fff", borderRadius: "12px" }} />
                <Legend />
                <Bar dataKey="Subject Knowledge" fill="#4F46E5" radius={[6, 6, 0, 0]} />
                <Bar dataKey="Clarity" fill="#7C3AED" radius={[6, 6, 0, 0]} />
                <Bar dataKey="Engagement" fill="#3B82F6" radius={[6, 6, 0, 0]} />
                <Bar dataKey="Overall Avg" fill="#10B981" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
