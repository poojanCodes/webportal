"use client";

import React, { useState, useMemo } from "react";
import PageWrapper from "@/components/layout/PageWrapper";
import { useApp } from "@/context/AppContext";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import StatusBadge from "@/components/ui/StatusBadge";
import TiltCard from "@/components/ui/TiltCard";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Filter,
  Users,
  Star,
  Award,
  AlertTriangle,
  BookOpen,
  ChevronRight,
  Sparkles,
  X,
  TrendingUp,
  SlidersHorizontal,
  Mail,
  GraduationCap
} from "lucide-react";

export default function DashboardPage() {
  const { facultyList, stats, departments } = useApp();

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDept, setSelectedDept] = useState("ALL");
  const [selectedBadge, setSelectedBadge] = useState("ALL");
  const [minRating, setMinRating] = useState(1.0);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Selected faculty modal state
  const [selectedFacultyModal, setSelectedFacultyModal] = useState(null);

  // Filtered faculty calculation
  const filteredFaculty = useMemo(() => {
    return facultyList.filter((faculty) => {
      // Search match
      const matchesSearch =
        faculty.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faculty.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faculty.title.toLowerCase().includes(searchQuery.toLowerCase());

      // Department filter
      const matchesDept =
        selectedDept === "ALL" || faculty.department === selectedDept;

      // Badge status filter
      const matchesBadge =
        selectedBadge === "ALL" || faculty.metrics.statusBadge === selectedBadge;

      // Rating slider filter
      const matchesRating = faculty.metrics.overallScore >= minRating;

      return matchesSearch && matchesDept && matchesBadge && matchesRating;
    });
  }, [facultyList, searchQuery, selectedDept, selectedBadge, minRating]);

  // Paginated faculty items
  const paginatedFaculty = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredFaculty.slice(start, start + itemsPerPage);
  }, [filteredFaculty, currentPage]);

  const totalPages = Math.ceil(filteredFaculty.length / itemsPerPage) || 1;

  return (
    <PageWrapper>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-10">
        {/* Page Header */}
        <div className="space-y-3">
          <div className="gsap-reveal inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-900 dark:text-indigo-200 border border-indigo-300 dark:border-indigo-700 text-xs font-extrabold shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>Institutional KPI Command Center</span>
          </div>
          <h1 className="gsap-reveal text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-950 dark:text-white">
            Faculty Performance & <span className="gradient-text">KPI Dashboard</span>
          </h1>
          <p className="gsap-reveal text-sm sm:text-base text-slate-700 dark:text-slate-200 max-w-3xl font-bold">
            Real-time aggregate performance indicators across all academic departments. Monitor composite score distributions, percentage conversions, and academic designations.
          </p>
        </div>

        {/* 1. Executive Bento KPI Ribbon (High Contrast Soft Pastel Cards) */}
        <div className="gsap-reveal grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          
          {/* Ribbon 1: Submissions (Pastel Pink) */}
          <TiltCard>
            <div className="bento-card bento-pink p-6 h-full flex items-center gap-4 shadow-sm">
              <div className="w-14 h-14 rounded-2xl bg-pink-200 dark:bg-pink-900/60 border border-pink-400 dark:border-pink-700 flex items-center justify-center text-[#831843] dark:text-pink-200 font-extrabold flex-shrink-0">
                <Users className="w-7 h-7" />
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-[#831843] dark:text-pink-300">
                  <AnimatedCounter value={stats.totalSubmissions} decimals={0} />
                </div>
                <div className="text-xs font-extrabold uppercase tracking-wider text-[#831843] dark:text-pink-200 mt-0.5">
                  Submissions Logged
                </div>
              </div>
            </div>
          </TiltCard>

          {/* Ribbon 2: Institutional Avg (Ice Blue) */}
          <TiltCard>
            <div className="bento-card bento-blue p-6 h-full flex items-center gap-4 shadow-sm">
              <div className="w-14 h-14 rounded-2xl bg-sky-200 dark:bg-sky-900/60 border border-sky-400 dark:border-sky-700 flex items-center justify-center text-[#0C4A6E] dark:text-sky-200 font-extrabold flex-shrink-0">
                <Star className="w-7 h-7" />
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-[#0C4A6E] dark:text-sky-300 flex items-center gap-1">
                  <AnimatedCounter value={stats.overallAvg} decimals={2} />
                  <span className="text-xs font-extrabold text-slate-600 dark:text-slate-400">/ 5.0</span>
                </div>
                <div className="text-xs font-extrabold uppercase tracking-wider text-[#0C4A6E] dark:text-sky-200 mt-0.5">
                  Institutional Avg
                </div>
              </div>
            </div>
          </TiltCard>

          {/* Ribbon 3: Top-Rated Count (Sage Green) */}
          <TiltCard>
            <div className="bento-card bento-green p-6 h-full flex items-center gap-4 shadow-sm">
              <div className="w-14 h-14 rounded-2xl bg-emerald-200 dark:bg-emerald-900/60 border border-emerald-400 dark:border-emerald-700 flex items-center justify-center text-[#064E3B] dark:text-emerald-200 font-extrabold flex-shrink-0">
                <Award className="w-7 h-7" />
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-[#064E3B] dark:text-emerald-300">
                  <AnimatedCounter value={stats.topRatedCount} decimals={0} />
                </div>
                <div className="text-xs font-extrabold uppercase tracking-wider text-[#064E3B] dark:text-emerald-200 mt-0.5">
                  Top-Rated (≥ 4.2)
                </div>
              </div>
            </div>
          </TiltCard>

          {/* Ribbon 4: Requiring Improvement (Soft Peach) */}
          <TiltCard>
            <div className="bento-card bento-peach p-6 h-full flex items-center gap-4 shadow-sm">
              <div className="w-14 h-14 rounded-2xl bg-orange-200 dark:bg-orange-900/60 border border-orange-400 dark:border-orange-700 flex items-center justify-center text-[#7C2D12] dark:text-orange-200 font-extrabold flex-shrink-0">
                <AlertTriangle className="w-7 h-7" />
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-[#7C2D12] dark:text-orange-300">
                  <AnimatedCounter value={stats.requiringImprovementCount} decimals={0} />
                </div>
                <div className="text-xs font-extrabold uppercase tracking-wider text-[#7C2D12] dark:text-orange-200 mt-0.5">
                  Target Cases (&lt; 3.0)
                </div>
              </div>
            </div>
          </TiltCard>
        </div>

        {/* 2. Quick Search & Dynamic Filter Toolbar (High Contrast Container) */}
        <div className="gsap-reveal p-6 rounded-[28px] bg-white dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-800 shadow-md space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search by faculty name or title..."
                className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 text-slate-950 dark:text-white text-xs font-extrabold focus:ring-2 focus:ring-indigo-600 focus:outline-none transition-all placeholder:text-slate-500"
              />
            </div>

            {/* Filters Row */}
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              {/* Department Dropdown */}
              <select
                value={selectedDept}
                onChange={(e) => {
                  setSelectedDept(e.target.value);
                  setCurrentPage(1);
                }}
                className="px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 text-slate-950 dark:text-white text-xs font-extrabold focus:ring-2 focus:ring-indigo-600 focus:outline-none"
              >
                <option value="ALL">All Departments</option>
                {departments.map((d) => (
                  <option key={d.id} value={d.name}>
                    {d.name}
                  </option>
                ))}
              </select>

              {/* Status Badge Dropdown */}
              <select
                value={selectedBadge}
                onChange={(e) => {
                  setSelectedBadge(e.target.value);
                  setCurrentPage(1);
                }}
                className="px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 text-slate-950 dark:text-white text-xs font-extrabold focus:ring-2 focus:ring-indigo-600 focus:outline-none"
              >
                <option value="ALL">All Designations</option>
                <option value="Top-Rated Faculty">Top-Rated Faculty (≥ 4.2)</option>
                <option value="Satisfactory / Consistent">Satisfactory / Consistent (3.0–4.1)</option>
                <option value="Faculty Requiring Improvement">Requiring Improvement (&lt; 3.0)</option>
              </select>

              {/* Min Rating Slider */}
              <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 text-xs font-extrabold text-slate-900 dark:text-slate-100">
                <SlidersHorizontal className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span>Min: {minRating.toFixed(1)}</span>
                <input
                  type="range"
                  min="1.0"
                  max="5.0"
                  step="0.2"
                  value={minRating}
                  onChange={(e) => {
                    setMinRating(parseFloat(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="w-20 accent-indigo-700"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-700 dark:text-slate-300 pt-3 border-t border-slate-200 dark:border-slate-800 font-extrabold">
            <span>
              Showing <strong>{filteredFaculty.length}</strong> of <strong>{facultyList.length}</strong> faculty records
            </span>
            {(searchQuery || selectedDept !== "ALL" || selectedBadge !== "ALL" || minRating > 1.0) && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedDept("ALL");
                  setSelectedBadge("ALL");
                  setMinRating(1.0);
                  setCurrentPage(1);
                }}
                className="text-indigo-700 dark:text-indigo-300 font-extrabold hover:underline"
              >
                Reset All Filters
              </button>
            )}
          </div>
        </div>

        {/* 3. Faculty-Wise Performance Cards Grid */}
        <div className="gsap-reveal grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedFaculty.map((faculty) => {
            const metrics = faculty.metrics;
            return (
              <TiltCard key={faculty.id} className="h-full">
                <div className="bento-card bg-white dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-800 p-6 h-full flex flex-col justify-between space-y-5 shadow-sm hover:shadow-md">
                  {/* Top Bar: Avatar + Badge */}
                  <div className="space-y-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${faculty.avatarBg} text-white font-extrabold flex items-center justify-center text-xl shadow-md`}
                        >
                          {faculty.initials}
                        </div>
                        <div>
                          <h3 className="font-extrabold text-base text-slate-950 dark:text-white leading-snug">
                            {faculty.name}
                          </h3>
                          <p className="text-xs text-slate-700 dark:text-slate-300 font-extrabold">
                            {faculty.title}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <StatusBadge status={metrics.statusBadge} score={metrics.overallScore} />
                    </div>

                    <div className="text-xs text-slate-700 dark:text-slate-300 flex items-center gap-1.5 font-extrabold">
                      <GraduationCap className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                      <span className="line-clamp-1">{faculty.department}</span>
                    </div>

                    {/* Overall Score & Percentage Gauge */}
                    <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 flex items-center justify-between">
                      <div>
                        <div className="text-[10px] uppercase font-extrabold text-slate-600 dark:text-slate-400 tracking-wider">
                          Composite Rating
                        </div>
                        <div className="text-3xl font-extrabold text-slate-950 dark:text-white flex items-center gap-1 mt-0.5">
                          <span>{metrics.overallScore}</span>
                          <span className="text-xs font-bold text-slate-500">/ 5.0</span>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-xs font-extrabold text-indigo-700 dark:text-indigo-300">
                          {metrics.percentageScore}% Score
                        </div>
                        <div className="w-24 h-2 bg-slate-300 dark:bg-slate-700 rounded-full mt-2 overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              metrics.overallScore >= 4.2
                                ? "bg-emerald-600"
                                : metrics.overallScore < 3.0
                                ? "bg-rose-600"
                                : "bg-blue-600"
                            }`}
                            style={{ width: `${metrics.percentageScore}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Quick Metric Mini-Badges */}
                    <div className="grid grid-cols-3 gap-2 text-center text-xs">
                      <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700">
                        <div className="text-slate-600 dark:text-slate-400 text-[10px] font-extrabold">Knowledge</div>
                        <div className="font-extrabold text-slate-950 dark:text-white">
                          {metrics.subjectKnowledge}
                        </div>
                      </div>
                      <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700">
                        <div className="text-slate-600 dark:text-slate-400 text-[10px] font-extrabold">Clarity</div>
                        <div className="font-extrabold text-slate-950 dark:text-white">
                          {metrics.clarity}
                        </div>
                      </div>
                      <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700">
                        <div className="text-slate-600 dark:text-slate-400 text-[10px] font-extrabold">Reviews</div>
                        <div className="font-extrabold text-slate-950 dark:text-white">
                          {metrics.reviewCount}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Action Button */}
                  <button
                    onClick={() => setSelectedFacultyModal(faculty)}
                    className="w-full py-3 rounded-2xl bg-indigo-100 dark:bg-indigo-950/80 hover:bg-indigo-200 dark:hover:bg-indigo-900 text-indigo-900 dark:text-indigo-200 font-extrabold text-xs border border-indigo-300 dark:border-indigo-700 flex items-center justify-center gap-2 transition-all shadow-sm"
                  >
                    <span>View Full KPI Breakdown</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </TiltCard>
            );
          })}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="gsap-reveal flex items-center justify-center gap-2 pt-4">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-10 h-10 rounded-2xl font-extrabold text-xs transition-all ${
                  currentPage === page
                    ? "bg-indigo-700 text-white shadow-sm"
                    : "bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 border-2 border-slate-300 dark:border-slate-700 hover:border-indigo-500"
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Faculty KPI Detail Modal */}
      <AnimatePresence>
        {selectedFacultyModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-800 rounded-[32px] p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto space-y-6 shadow-2xl relative"
            >
              <button
                onClick={() => setSelectedFacultyModal(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Header */}
              <div className="flex items-center gap-4">
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${selectedFacultyModal.avatarBg} text-white font-extrabold flex items-center justify-center text-2xl shadow-lg`}
                >
                  {selectedFacultyModal.initials}
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-slate-950 dark:text-white">
                    {selectedFacultyModal.name}
                  </h3>
                  <p className="text-xs text-slate-700 dark:text-slate-300 font-extrabold">
                    {selectedFacultyModal.title} • {selectedFacultyModal.department}
                  </p>
                  <div className="mt-2">
                    <StatusBadge
                      status={selectedFacultyModal.metrics.statusBadge}
                      score={selectedFacultyModal.metrics.overallScore}
                    />
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-800 dark:text-slate-200 leading-relaxed bg-slate-100 dark:bg-slate-800/80 p-4 rounded-2xl border border-slate-300 dark:border-slate-700 font-extrabold">
                {selectedFacultyModal.bio}
              </p>

              {/* 6 Parameter Detailed Grid */}
              <div className="space-y-3">
                <h4 className="font-extrabold text-xs text-slate-950 dark:text-white uppercase tracking-wider">
                  6-Parameter Rating Footprint
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-extrabold">
                  <div className="p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 flex items-center justify-between">
                    <span className="text-slate-700 dark:text-slate-300">Subject Knowledge</span>
                    <span className="font-extrabold text-indigo-700 dark:text-indigo-300">
                      {selectedFacultyModal.metrics.subjectKnowledge} / 5.0
                    </span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 flex items-center justify-between">
                    <span className="text-slate-700 dark:text-slate-300">Explanation / Clarity</span>
                    <span className="font-extrabold text-indigo-700 dark:text-indigo-300">
                      {selectedFacultyModal.metrics.clarity} / 5.0
                    </span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 flex items-center justify-between">
                    <span className="text-slate-700 dark:text-slate-300">Communication & Tone</span>
                    <span className="font-extrabold text-indigo-700 dark:text-indigo-300">
                      {selectedFacultyModal.metrics.communication} / 5.0
                    </span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 flex items-center justify-between">
                    <span className="text-slate-700 dark:text-slate-300">Student Engagement</span>
                    <span className="font-extrabold text-indigo-700 dark:text-indigo-300">
                      {selectedFacultyModal.metrics.engagement} / 5.0
                    </span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 flex items-center justify-between">
                    <span className="text-slate-700 dark:text-slate-300">Punctuality</span>
                    <span className="font-extrabold text-indigo-700 dark:text-indigo-300">
                      {selectedFacultyModal.metrics.punctuality} / 5.0
                    </span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 flex items-center justify-between">
                    <span className="text-slate-700 dark:text-slate-300">Overall Satisfaction</span>
                    <span className="font-extrabold text-indigo-700 dark:text-indigo-300">
                      {selectedFacultyModal.metrics.satisfaction} / 5.0
                    </span>
                  </div>
                </div>
              </div>

              {/* Assigned Courses List */}
              <div className="space-y-2">
                <h4 className="font-extrabold text-xs text-slate-950 dark:text-white uppercase tracking-wider">
                  Assigned Academic Courses
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedFacultyModal.coursesAssigned.map((course, idx) => (
                    <span
                      key={idx}
                      className="px-3.5 py-1.5 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-900 dark:text-indigo-200 text-xs font-extrabold border border-indigo-300 dark:border-indigo-700"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageWrapper>
  );
}
