"use client";

import React, { useState, useMemo } from "react";
import PageWrapper from "@/components/layout/PageWrapper";
import { useApp } from "@/context/AppContext";
import StatusBadge from "@/components/ui/StatusBadge";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileSpreadsheet,
  Download,
  Printer,
  Search,
  ArrowUpDown,
  ChevronDown,
  ChevronUp,
  Sparkles,
  MessageSquare,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  Filter
} from "lucide-react";

export default function ReportsPage() {
  const { facultyList, feedbackLogs, departments } = useApp();

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDept, setSelectedDept] = useState("ALL");
  const [selectedStatus, setSelectedStatus] = useState("ALL");

  // Sorting State
  const [sortField, setSortField] = useState("overallScore");
  const [sortDirection, setSortDirection] = useState("desc");

  // Expanded Rows State
  const [expandedRowId, setExpandedRowId] = useState(null);

  // Sorting Handler
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  // Processed Master Table Data
  const processedData = useMemo(() => {
    let result = facultyList.map((f) => {
      const logsForFaculty = feedbackLogs.filter((l) => l.facultyId === f.id);
      return {
        id: f.id,
        name: f.name,
        title: f.title,
        department: f.department,
        courses: f.coursesAssigned.join(", "),
        reviewCount: f.metrics.reviewCount,
        subjectKnowledge: f.metrics.subjectKnowledge,
        clarity: f.metrics.clarity,
        communication: f.metrics.communication,
        engagement: f.metrics.engagement,
        punctuality: f.metrics.punctuality,
        satisfaction: f.metrics.satisfaction,
        overallScore: f.metrics.overallScore,
        percentageScore: f.metrics.percentageScore,
        statusBadge: f.metrics.statusBadge,
        comments: logsForFaculty
      };
    });

    // Apply Filter
    result = result.filter((row) => {
      const matchesSearch =
        row.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.courses.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesDept = selectedDept === "ALL" || row.department === selectedDept;
      const matchesStatus = selectedStatus === "ALL" || row.statusBadge === selectedStatus;

      return matchesSearch && matchesDept && matchesStatus;
    });

    // Apply Sorting
    result.sort((a, b) => {
      let valA = a[sortField];
      let valB = b[sortField];

      if (typeof valA === "string") {
        valA = valA.toLowerCase();
        valB = valB.toLowerCase();
      }

      if (valA < valB) return sortDirection === "asc" ? -1 : 1;
      if (valA > valB) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });

    return result;
  }, [facultyList, feedbackLogs, searchQuery, selectedDept, selectedStatus, sortField, sortDirection]);

  // CSV Export Engine
  const exportToCSV = () => {
    const headers = [
      "Faculty Name",
      "Department",
      "Assigned Courses",
      "Review Count",
      "Subject Knowledge",
      "Clarity",
      "Communication",
      "Engagement",
      "Punctuality",
      "Overall Score",
      "Percentage",
      "Status Designation"
    ];

    const rows = processedData.map((row) => [
      `"${row.name}"`,
      `"${row.department}"`,
      `"${row.courses}"`,
      row.reviewCount,
      row.subjectKnowledge,
      row.clarity,
      row.communication,
      row.engagement,
      row.punctuality,
      row.overallScore,
      `"${row.percentageScore}%"`,
      `"${row.statusBadge}"`
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Academix_Faculty_Quality_Report_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Print Report Engine
  const triggerPrint = () => {
    window.print();
  };

  const toggleRowExpand = (id) => {
    setExpandedRowId((prev) => (prev === id ? null : id));
  };

  return (
    <PageWrapper>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-8">
        {/* Page Header (No Print) */}
        <div className="no-print space-y-3">
          <div className="gsap-reveal inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20 text-xs font-bold shadow-sm">
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-500" />
            <span>Master Institutional Ledger</span>
          </div>
          <h1 className="gsap-reveal text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Master Records & <span className="gradient-text">Detailed Reports</span>
          </h1>
          <p className="gsap-reveal text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-3xl font-medium">
            Interactive institutional audit matrix featuring multi-column sorting, instant filters, expandable sentiment drawer logs, CSV export, and printable report generation.
          </p>
        </div>

        {/* Printable Header (Visible only when printing) */}
        <div className="hidden print-only mb-6 space-y-2">
          <h1 className="text-2xl font-bold text-black">Academix Pulse — Official Faculty Quality Audit Report</h1>
          <p className="text-xs text-gray-600">Generated on: {new Date().toLocaleDateString()} • Verified Institutional Compliance Ledger</p>
          <hr className="border-gray-400 my-2" />
        </div>

        {/* Control & Export Toolbar (No Print - Bento Card) */}
        <div className="no-print gsap-reveal bento-card bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search master records..."
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs font-semibold focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            {/* Filters Row */}
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              <select
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                className="px-3.5 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs font-semibold"
              >
                <option value="ALL">All Departments</option>
                {departments.map((d) => (
                  <option key={d.id} value={d.name}>
                    {d.name}
                  </option>
                ))}
              </select>

              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3.5 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs font-semibold"
              >
                <option value="ALL">All Status Badges</option>
                <option value="Top-Rated Faculty">Top-Rated Faculty</option>
                <option value="Satisfactory / Consistent">Satisfactory / Consistent</option>
                <option value="Faculty Requiring Improvement">Requiring Improvement</option>
              </select>

              {/* Action Buttons: Export CSV & Print */}
              <div className="flex items-center gap-2">
                <button
                  onClick={exportToCSV}
                  className="px-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 transition-all shadow-sm"
                >
                  <Download className="w-4 h-4" />
                  <span>Export CSV</span>
                </button>

                <button
                  onClick={triggerPrint}
                  className="px-4 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700 flex items-center gap-2 transition-all"
                >
                  <Printer className="w-4 h-4 text-indigo-400" />
                  <span>Print Report</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Master Interactive Data Table (Bento Container) */}
        <div className="gsap-reveal bento-card bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-semibold">
              <thead className="bg-slate-100/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 font-bold uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="py-4 px-4">Faculty Member</th>
                  <th className="py-4 px-4">Department</th>
                  <th
                    onClick={() => handleSort("reviewCount")}
                    className="py-4 px-3 cursor-pointer hover:text-indigo-500 transition-colors"
                  >
                    <div className="flex items-center gap-1">
                      <span>Reviews</span>
                      <ArrowUpDown className="w-3.5 h-3.5" />
                    </div>
                  </th>
                  <th
                    onClick={() => handleSort("subjectKnowledge")}
                    className="py-4 px-3 cursor-pointer hover:text-indigo-500 transition-colors"
                  >
                    <div className="flex items-center gap-1">
                      <span>Knowledge</span>
                      <ArrowUpDown className="w-3.5 h-3.5" />
                    </div>
                  </th>
                  <th
                    onClick={() => handleSort("clarity")}
                    className="py-4 px-3 cursor-pointer hover:text-indigo-500 transition-colors"
                  >
                    <div className="flex items-center gap-1">
                      <span>Clarity</span>
                      <ArrowUpDown className="w-3.5 h-3.5" />
                    </div>
                  </th>
                  <th
                    onClick={() => handleSort("communication")}
                    className="py-4 px-3 cursor-pointer hover:text-indigo-500 transition-colors"
                  >
                    <div className="flex items-center gap-1">
                      <span>Comm.</span>
                      <ArrowUpDown className="w-3.5 h-3.5" />
                    </div>
                  </th>
                  <th
                    onClick={() => handleSort("engagement")}
                    className="py-4 px-3 cursor-pointer hover:text-indigo-500 transition-colors"
                  >
                    <div className="flex items-center gap-1">
                      <span>Engage.</span>
                      <ArrowUpDown className="w-3.5 h-3.5" />
                    </div>
                  </th>
                  <th
                    onClick={() => handleSort("punctuality")}
                    className="py-4 px-3 cursor-pointer hover:text-indigo-500 transition-colors"
                  >
                    <div className="flex items-center gap-1">
                      <span>Punct.</span>
                      <ArrowUpDown className="w-3.5 h-3.5" />
                    </div>
                  </th>
                  <th
                    onClick={() => handleSort("overallScore")}
                    className="py-4 px-3 cursor-pointer hover:text-indigo-500 transition-colors text-indigo-600 dark:text-indigo-400"
                  >
                    <div className="flex items-center gap-1">
                      <span>Overall</span>
                      <ArrowUpDown className="w-3.5 h-3.5" />
                    </div>
                  </th>
                  <th className="py-4 px-4">Status</th>
                  <th className="py-4 px-3 text-center no-print">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {processedData.map((row) => {
                  const isExpanded = expandedRowId === row.id;
                  return (
                    <React.Fragment key={row.id}>
                      <tr className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors">
                        <td className="py-4 px-4">
                          <div className="font-bold text-slate-900 dark:text-white">
                            {row.name}
                          </div>
                          <div className="text-[10px] text-slate-500 dark:text-slate-400">
                            {row.title}
                          </div>
                        </td>
                        <td className="py-4 px-4 font-semibold text-slate-600 dark:text-slate-300">
                          {row.department}
                        </td>
                        <td className="py-4 px-3 font-extrabold text-slate-800 dark:text-slate-200">
                          {row.reviewCount}
                        </td>
                        <td className="py-4 px-3 font-medium">{row.subjectKnowledge}</td>
                        <td className="py-4 px-3 font-medium">{row.clarity}</td>
                        <td className="py-4 px-3 font-medium">{row.communication}</td>
                        <td className="py-4 px-3 font-medium">{row.engagement}</td>
                        <td className="py-4 px-3 font-medium">{row.punctuality}</td>
                        <td className="py-4 px-3 font-extrabold text-indigo-600 dark:text-indigo-400">
                          {row.overallScore} <span className="text-[10px] text-slate-400 font-normal">({row.percentageScore}%)</span>
                        </td>
                        <td className="py-4 px-4">
                          <StatusBadge status={row.statusBadge} score={row.overallScore} />
                        </td>
                        <td className="py-4 px-3 text-center no-print">
                          <button
                            onClick={() => toggleRowExpand(row.id)}
                            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                          >
                            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                          </button>
                        </td>
                      </tr>

                      {/* Expandable Drawer Row */}
                      {isExpanded && (
                        <tr className="bg-slate-50/60 dark:bg-slate-950/60 no-print">
                          <td colSpan={11} className="p-6">
                            <div className="space-y-4">
                              <h4 className="font-bold text-xs text-indigo-700 dark:text-indigo-300 uppercase tracking-wider flex items-center gap-2">
                                <MessageSquare className="w-4 h-4" />
                                <span>Recent Student Qualitative Feedback Logs ({row.comments.length})</span>
                              </h4>

                              {row.comments.length === 0 ? (
                                <p className="text-xs text-slate-500 italic">No specific qualitative logs recorded yet.</p>
                              ) : (
                                <div className="space-y-2">
                                  {row.comments.map((log) => (
                                    <div
                                      key={log.id}
                                      className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs space-y-1"
                                    >
                                      <div className="flex items-center justify-between">
                                        <span className="font-bold text-slate-800 dark:text-slate-200">
                                          {log.course}
                                        </span>
                                        <span
                                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                                            log.sentiment === "positive"
                                              ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                                              : log.sentiment === "actionable"
                                              ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20"
                                              : "bg-slate-500/10 text-slate-400 border border-slate-500/20"
                                          }`}
                                        >
                                          {log.sentiment}
                                        </span>
                                      </div>
                                      <p className="text-slate-600 dark:text-slate-300 italic font-medium">
                                        "{log.comment}"
                                      </p>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
