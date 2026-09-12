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
          <div className="gsap-reveal inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border border-indigo-500/20 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
            <span>Institutional KPI Command Center</span>
          </div>
          <h1 className="gsap-reveal text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Faculty Performance & <span className="gradient-text">KPI Dashboard</span>
          </h1>
          <p className="gsap-reveal text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-3xl">
            Real-time aggregate performance indicators across all academic departments. Monitor composite score distributions, percentage conversions, and academic designations.
          </p>
        </div>

        {/* 1. Executive KPI Ribbon */}
        <div className="gsap-reveal grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Ribbon 1: Submissions */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl flex items-center gap-4 hover:border-indigo-500/50 transition-colors">
            <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400 flex-shrink-0">
              <Users className="w-7 h-7" />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                <AnimatedCounter value={stats.totalSubmissions} decimals={0} />
              </div>
              <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mt-0.5">
                Total Submissions Logged
              </div>
            </div>
          </div>

          {/* Ribbon 2: Institutional Avg */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl flex items-center gap-4 hover:border-violet-500/50 transition-colors">
            <div className="w-14 h-14 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-600 dark:text-violet-400 flex-shrink-0">
              <Star className="w-7 h-7" />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-1">
                <AnimatedCounter value={stats.overallAvg} decimals={2} />
                <span className="text-sm font-normal text-slate-400">/ 5.0</span>
              </div>
              <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mt-0.5">
                Institutional Overall Rating
              </div>
            </div>
          </div>

          {/* Ribbon 3: Top-Rated Count */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl flex items-center gap-4 hover:border-emerald-500/50 transition-colors">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 flex-shrink-0">
              <Award className="w-7 h-7" />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">
                <AnimatedCounter value={stats.topRatedCount} decimals={0} />
              </div>
              <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mt-0.5">
                Top-Rated Faculty (≥ 4.2)
              </div>
            </div>
          </div>

          {/* Ribbon 4: Requiring Improvement */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl flex items-center gap-4 hover:border-rose-500/50 transition-colors">
            <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-600 dark:text-rose-400 flex-shrink-0">
              <AlertTriangle className="w-7 h-7" />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-rose-600 dark:text-rose-400">
                <AnimatedCounter value={stats.requiringImprovementCount} decimals={0} />
              </div>
              <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mt-0.5">
                Requiring Improvement (&lt; 3.0)
              </div>
            </div>
          </div>
        </div>

        {/* 2. Quick Search & Dynamic Filter Toolbar */}
        <div className="gsap-reveal p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search by faculty name or title..."
                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all placeholder:text-slate-400"
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
                className="px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs font-semibold focus:ring-2 focus:ring-indigo-500 focus:outline-none"
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
                className="px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs font-semibold focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              >
                <option value="ALL">All Designations</option>
                <option value="Top-Rated Faculty">Top-Rated Faculty (≥ 4.2)</option>
                <option value="Satisfactory / Consistent">Satisfactory / Consistent (3.0–4.1)</option>
                <option value="Faculty Requiring Improvement">Requiring Improvement (&lt; 3.0)</option>
              </select>

              {/* Min Rating Slider */}
              <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300">
                <SlidersHorizontal className="w-4 h-4 text-indigo-500" />
                <span>Min Rating: {minRating.toFixed(1)}</span>
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
                  className="w-20 accent-indigo-600"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
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
                className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline"
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
                <div className="h-full p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl hover:shadow-2xl hover:border-indigo-500/40 transition-all flex flex-col justify-between space-y-5">
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
                          <h3 className="font-bold text-base text-slate-900 dark:text-white leading-snug">
                            {faculty.name}
                          </h3>
                          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                            {faculty.title}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <StatusBadge status={metrics.statusBadge} score={metrics.overallScore} />
                    </div>

                    <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                      <GraduationCap className="w-4 h-4 text-indigo-500" />
                      <span className="line-clamp-1">{faculty.department}</span>
                    </div>

                    {/* Overall Score & Percentage Gauge */}
                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/50 flex items-center justify-between">
                      <div>
                        <div className="text-xs uppercase font-bold text-slate-400 tracking-wider">
                          Composite Rating
                        </div>
                        <div className="text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-1 mt-0.5">
                          <span>{metrics.overallScore}</span>
                          <span className="text-xs font-normal text-slate-400">/ 5.0</span>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                          {metrics.percentageScore}% Score
                        </div>
                        <div className="w-24 h-2 bg-slate-200 dark:bg-slate-700 rounded-full mt-2 overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              metrics.overallScore >= 4.2
                                ? "bg-emerald-500"
                                : metrics.overallScore < 3.0
                                ? "bg-rose-500"
                                : "bg-blue-500"
                            }`}
                            style={{ width: `${metrics.percentageScore}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Quick Metric Mini-Badges */}
                    <div className="grid grid-cols-3 gap-2 text-center text-xs">
                      <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800">
                        <div className="text-slate-400 text-[10px]">Knowledge</div>
                        <div className="font-bold text-slate-800 dark:text-slate-200">
                          {metrics.subjectKnowledge}
                        </div>
                      </div>
                      <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800">
                        <div className="text-slate-400 text-[10px]">Clarity</div>
                        <div className="font-bold text-slate-800 dark:text-slate-200">
                          {metrics.clarity}
                        </div>
                      </div>
                      <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800">
                        <div className="text-slate-400 text-[10px]">Reviews</div>
                        <div className="font-bold text-slate-800 dark:text-slate-200">
                          {metrics.reviewCount}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Action Button */}
                  <button
                    onClick={() => setSelectedFacultyModal(faculty)}
                    className="w-full py-3 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 text-indigo-600 dark:text-indigo-300 font-bold text-xs border border-indigo-200 dark:border-indigo-800/60 flex items-center justify-center gap-2 transition-all"
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
                className={`w-10 h-10 rounded-xl font-bold text-xs transition-all ${
                  currentPage === page
                    ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-500/20"
                    : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-indigo-400"
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
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto space-y-6 shadow-2xl relative"
            >
              <button
                onClick={() => setSelectedFacultyModal(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white"
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
                  <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
                    {selectedFacultyModal.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
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

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
                {selectedFacultyModal.bio}
              </p>

              {/* 6 Parameter Detailed Grid */}
              <div className="space-y-3">
                <h4 className="font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider">
                  6-Parameter Rating Footprint
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-between">
                    <span className="text-slate-500">Subject Knowledge</span>
                    <span className="font-bold text-indigo-600 dark:text-indigo-400">
                      {selectedFacultyModal.metrics.subjectKnowledge} / 5.0
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-between">
                    <span className="text-slate-500">Explanation / Clarity</span>
                    <span className="font-bold text-indigo-600 dark:text-indigo-400">
                      {selectedFacultyModal.metrics.clarity} / 5.0
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-between">
                    <span className="text-slate-500">Communication & Tone</span>
                    <span className="font-bold text-indigo-600 dark:text-indigo-400">
                      {selectedFacultyModal.metrics.communication} / 5.0
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-between">
                    <span className="text-slate-500">Student Engagement</span>
                    <span className="font-bold text-indigo-600 dark:text-indigo-400">
                      {selectedFacultyModal.metrics.engagement} / 5.0
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-between">
                    <span className="text-slate-500">Punctuality</span>
                    <span className="font-bold text-indigo-600 dark:text-indigo-400">
                      {selectedFacultyModal.metrics.punctuality} / 5.0
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-between">
                    <span className="text-slate-500">Overall Satisfaction</span>
                    <span className="font-bold text-indigo-600 dark:text-indigo-400">
                      {selectedFacultyModal.metrics.satisfaction} / 5.0
                    </span>
                  </div>
                </div>
              </div>

              {/* Assigned Courses List */}
              <div className="space-y-2">
                <h4 className="font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider">
                  Assigned Academic Courses
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedFacultyModal.coursesAssigned.map((course, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 text-xs font-semibold border border-indigo-200 dark:border-indigo-800"
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
