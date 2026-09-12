"use client";

import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import { INITIAL_FACULTY, INITIAL_FEEDBACK_LOGS, PROFANITY_TOKENS, DEPARTMENTS } from "@/lib/data";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [facultyList, setFacultyList] = useState(INITIAL_FACULTY);
  const [feedbackLogs, setFeedbackLogs] = useState(INITIAL_FEEDBACK_LOGS);
  const [theme, setTheme] = useState("dark");
  const [submittedCooldowns, setSubmittedCooldowns] = useState({});

  // Synchronize dark class on document root
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  // Helper to compute faculty dynamic stats
  const computedFaculty = useMemo(() => {
    return facultyList.map((faculty) => {
      const raw = faculty.rawRatings;
      const getAvg = (arr) =>
        arr && arr.length > 0
          ? Number((arr.reduce((a, b) => a + b, 0) / arr.length).toFixed(2))
          : 5.0;

      const subjectKnowledge = getAvg(raw.subjectKnowledge);
      const clarity = getAvg(raw.clarity);
      const communication = getAvg(raw.communication);
      const engagement = getAvg(raw.engagement);
      const punctuality = getAvg(raw.punctuality);
      const satisfaction = getAvg(raw.satisfaction);

      const overallScore = Number(
        (
          (subjectKnowledge + clarity + communication + engagement + punctuality + satisfaction) /
          6
        ).toFixed(2)
      );

      const percentageScore = Number(((overallScore / 5) * 100).toFixed(1));

      let statusBadge = "Satisfactory / Consistent";
      let statusColor = "blue";
      if (overallScore >= 4.2) {
        statusBadge = "Top-Rated Faculty";
        statusColor = "emerald";
      } else if (overallScore < 3.0) {
        statusBadge = "Faculty Requiring Improvement";
        statusColor = "rose";
      }

      const reviewCount = raw.subjectKnowledge ? raw.subjectKnowledge.length : 0;

      return {
        ...faculty,
        metrics: {
          subjectKnowledge,
          clarity,
          communication,
          engagement,
          punctuality,
          satisfaction,
          overallScore,
          percentageScore,
          statusBadge,
          statusColor,
          reviewCount
        }
      };
    });
  }, [facultyList]);

  // Institution-wide stats calculation
  const stats = useMemo(() => {
    const totalSubmissions = feedbackLogs.length + computedFaculty.reduce((acc, f) => acc + f.metrics.reviewCount, 0) - INITIAL_FEEDBACK_LOGS.length;
    const totalFacultyCount = computedFaculty.length;
    const overallAvg = Number(
      (
        computedFaculty.reduce((acc, f) => acc + f.metrics.overallScore, 0) /
        (totalFacultyCount || 1)
      ).toFixed(2)
    );
    const topRatedCount = computedFaculty.filter(
      (f) => f.metrics.statusBadge === "Top-Rated Faculty"
    ).length;
    const requiringImprovementCount = computedFaculty.filter(
      (f) => f.metrics.statusBadge === "Faculty Requiring Improvement"
    ).length;
    const consistentCount = computedFaculty.filter(
      (f) => f.metrics.statusBadge === "Satisfactory / Consistent"
    ).length;

    // Parameter extremes spotlight
    const paramNames = [
      { key: "subjectKnowledge", label: "Subject Knowledge" },
      { key: "clarity", label: "Explanation & Clarity" },
      { key: "communication", label: "Communication" },
      { key: "engagement", label: "Student Engagement" },
      { key: "punctuality", label: "Punctuality & Discipline" },
      { key: "satisfaction", label: "Overall Satisfaction" }
    ];

    const paramAverages = paramNames.map((p) => {
      const avg =
        computedFaculty.reduce((acc, f) => acc + f.metrics[p.key], 0) /
        (totalFacultyCount || 1);
      return { key: p.key, label: p.label, avg: Number(avg.toFixed(2)) };
    });

    paramAverages.sort((a, b) => b.avg - a.avg);

    const highestParam = paramAverages[0];
    const lowestParam = paramAverages[paramAverages.length - 1];

    return {
      totalSubmissions,
      totalFacultyCount,
      overallAvg,
      topRatedCount,
      requiringImprovementCount,
      consistentCount,
      highestParam,
      lowestParam,
      paramAverages
    };
  }, [computedFaculty, feedbackLogs]);

  // Real-time toxic token scanner
  const scanForProfanity = (text) => {
    if (!text) return false;
    const lower = text.toLowerCase();
    return PROFANITY_TOKENS.some((token) => lower.includes(token));
  };

  // Add new anonymous feedback entry
  const submitFeedback = (newSubmission) => {
    const { facultyId, department, course, ratings, comment } = newSubmission;

    // Determine sentiment
    let sentiment = "neutral";
    const lowerComment = (comment || "").toLowerCase();
    if (
      lowerComment.includes("brilliant") ||
      lowerComment.includes("great") ||
      lowerComment.includes("excellent") ||
      lowerComment.includes("best") ||
      lowerComment.includes("love") ||
      lowerComment.includes("outstanding") ||
      lowerComment.includes("clear")
    ) {
      sentiment = "positive";
    } else if (
      lowerComment.includes("lack") ||
      lowerComment.includes("improve") ||
      lowerComment.includes("slow") ||
      lowerComment.includes("confusing") ||
      lowerComment.includes("difficult") ||
      lowerComment.includes("rush") ||
      lowerComment.includes("hard")
    ) {
      sentiment = "actionable";
    }

    // Target faculty name
    const facultyObj = computedFaculty.find((f) => f.id === facultyId);
    const facultyName = facultyObj ? facultyObj.name : "Faculty Member";

    // New log entry
    const logItem = {
      id: `LOG-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toISOString(),
      facultyId,
      facultyName,
      department,
      course,
      ratings,
      comment: comment || "No written comments submitted.",
      sentiment
    };

    // Update feedback logs
    setFeedbackLogs((prev) => [logItem, ...prev]);

    // Update raw ratings for target faculty
    setFacultyList((prevList) =>
      prevList.map((f) => {
        if (f.id === facultyId) {
          return {
            ...f,
            rawRatings: {
              subjectKnowledge: [...f.rawRatings.subjectKnowledge, ratings.subjectKnowledge],
              clarity: [...f.rawRatings.clarity, ratings.clarity],
              communication: [...f.rawRatings.communication, ratings.communication],
              engagement: [...f.rawRatings.engagement, ratings.engagement],
              punctuality: [...f.rawRatings.punctuality, ratings.punctuality],
              satisfaction: [...f.rawRatings.satisfaction, ratings.satisfaction]
            }
          };
        }
        return f;
      })
    );

    // Set cooldown
    setSubmittedCooldowns((prev) => ({
      ...prev,
      [facultyId]: Date.now()
    }));

    return logItem;
  };

  return (
    <AppContext.Provider
      value={{
        facultyList: computedFaculty,
        feedbackLogs,
        departments: DEPARTMENTS,
        stats,
        theme,
        toggleTheme,
        scanForProfanity,
        submitFeedback,
        submittedCooldowns
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
