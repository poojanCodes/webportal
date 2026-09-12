"use client";

import React, { useState, useMemo } from "react";
import PageWrapper from "@/components/layout/PageWrapper";
import { useApp } from "@/context/AppContext";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import {
  ShieldCheck,
  Star,
  AlertCircle,
  CheckCircle2,
  Lock,
  BookOpen,
  UserCheck,
  Sparkles,
  ArrowRight,
  RefreshCw,
  Info
} from "lucide-react";

export default function FeedbackPage() {
  const {
    departments,
    facultyList,
    scanForProfanity,
    submitFeedback,
    submittedCooldowns
  } = useApp();

  // 4-Tier Selection Cascade state
  const [selectedDeptId, setSelectedDeptId] = useState("");
  const [selectedSemId, setSelectedSemId] = useState("");
  const [selectedCourseCode, setSelectedCourseCode] = useState("");
  const [selectedFacultyId, setSelectedFacultyId] = useState("");

  // 6-Parameter Matrix state (values 1 to 5)
  const [ratings, setRatings] = useState({
    subjectKnowledge: 0,
    clarity: 0,
    communication: 0,
    engagement: 0,
    punctuality: 0,
    satisfaction: 0
  });

  // Comment state & validation
  const [comment, setComment] = useState("");
  const [shakeForm, setShakeForm] = useState(false);
  const [validationError, setValidationError] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [lastSubmittedLog, setLastSubmittedLog] = useState(null);

  // Derived options for 4-tier cascade
  const activeDepartment = useMemo(() => {
    return departments.find((d) => d.id === selectedDeptId) || null;
  }, [departments, selectedDeptId]);

  const activeSemesters = useMemo(() => {
    return activeDepartment ? activeDepartment.semesters : [];
  }, [activeDepartment]);

  const activeSemester = useMemo(() => {
    return activeSemesters.find((s) => s.id === selectedSemId) || null;
  }, [activeSemesters, selectedSemId]);

  const activeCourses = useMemo(() => {
    return activeSemester ? activeSemester.courses : [];
  }, [activeSemester]);

  const activeCourse = useMemo(() => {
    return activeCourses.find((c) => c.code === selectedCourseCode) || null;
  }, [activeCourses, selectedCourseCode]);

  // Selected faculty object details
  const activeFaculty = useMemo(() => {
    if (!selectedFacultyId) return null;
    return facultyList.find((f) => f.id === selectedFacultyId) || null;
  }, [facultyList, selectedFacultyId]);

  // Cooldown check for selected faculty
  const isCooldownActive = useMemo(() => {
    if (!selectedFacultyId) return false;
    const timestamp = submittedCooldowns[selectedFacultyId];
    if (!timestamp) return false;
    // 5-minute cooldown rule
    return Date.now() - timestamp < 300000;
  }, [submittedCooldowns, selectedFacultyId]);

  // Profanity scanner warning
  const hasProfanity = useMemo(() => {
    return scanForProfanity(comment);
  }, [comment, scanForProfanity]);

  // Parameters list meta
  const ratingParameters = [
    {
      id: "subjectKnowledge",
      label: "1. Subject Knowledge & Expertise",
      desc: "Depth of domain mastery, accuracy of course material, and theoretical command."
    },
    {
      id: "clarity",
      label: "2. Explanation & Concept Clarity",
      desc: "Ability to simplify complex problems, structure lectures logically, and answer questions."
    },
    {
      id: "communication",
      label: "3. Communication & Tone",
      desc: "Articulation, voice clarity, accessibility during office hours, and respectful dialogue."
    },
    {
      id: "engagement",
      label: "4. Student Engagement & Pacing",
      desc: "Active participation methods, encouragement of critical thinking, and balanced workload."
    },
    {
      id: "punctuality",
      label: "5. Punctuality & Professional Discipline",
      desc: "Timeliness of lectures, prompt grading feedback, and commitment to syllabus timeline."
    },
    {
      id: "satisfaction",
      label: "6. Overall Satisfaction",
      desc: "General evaluation of learning quality, inspiration, and holistic course execution."
    }
  ];

  const handleRatingChange = (paramId, score) => {
    setRatings((prev) => ({ ...prev, [paramId]: score }));
  };

  const handleDepartmentChange = (e) => {
    setSelectedDeptId(e.target.value);
    setSelectedSemId("");
    setSelectedCourseCode("");
    setSelectedFacultyId("");
  };

  const handleSemChange = (e) => {
    setSelectedSemId(e.target.value);
    setSelectedCourseCode("");
    setSelectedFacultyId("");
  };

  const handleCourseChange = (e) => {
    const code = e.target.value;
    setSelectedCourseCode(code);
    const crs = activeCourses.find((c) => c.code === code);
    if (crs && crs.facultyId) {
      setSelectedFacultyId(crs.facultyId);
    } else {
      setSelectedFacultyId("");
    }
  };

  // Submit Handler
  const handleSubmit = (e) => {
    e.preventDefault();
    setValidationError("");

    // Validate cascade selection
    if (!selectedDeptId || !selectedSemId || !selectedCourseCode || !selectedFacultyId) {
      setValidationError("Please complete all 4 tiers of the Faculty Selection Cascade.");
      triggerShake();
      return;
    }

    // Validate 6 parameters
    const unrated = ratingParameters.find((p) => ratings[p.id] === 0);
    if (unrated) {
      setValidationError(`Please provide a rating for "${unrated.label}".`);
      triggerShake();
      return;
    }

    // Validate profanity warning
    if (hasProfanity) {
      setValidationError("Please rephrase your comments to remove prohibited toxic or unparliamentary language.");
      triggerShake();
      return;
    }

    // Check duplicate cooldown
    if (isCooldownActive) {
      setValidationError("You have already submitted an anonymous feedback for this faculty member recently. Please wait before re-submitting.");
      triggerShake();
      return;
    }

    // Submit payload
    const logResult = submitFeedback({
      facultyId: selectedFacultyId,
      department: activeDepartment ? activeDepartment.name : "",
      course: activeCourse ? `${activeCourse.code}: ${activeCourse.title}` : "",
      ratings,
      comment
    });

    setLastSubmittedLog(logResult);
    setShowSuccessModal(true);

    // Fire Confetti!
    try {
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err) {
      console.log("Confetti trigger:", err);
    }
  };

  const triggerShake = () => {
    setShakeForm(true);
    setTimeout(() => setShakeForm(false), 500);
  };

  const resetForm = () => {
    setSelectedDeptId("");
    setSelectedSemId("");
    setSelectedCourseCode("");
    setSelectedFacultyId("");
    setRatings({
      subjectKnowledge: 0,
      clarity: 0,
      communication: 0,
      engagement: 0,
      punctuality: 0,
      satisfaction: 0
    });
    setComment("");
    setShowSuccessModal(false);
  };

  return (
    <PageWrapper>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-8">
        {/* Page Header */}
        <div className="text-center space-y-3">
          <div className="gsap-reveal inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-[#064E3B] dark:text-emerald-300 border border-[#059669] dark:border-emerald-500 text-xs font-extrabold shadow-sm">
            <Lock className="w-3.5 h-3.5 text-[#047857] dark:text-emerald-400" />
            <span>256-Bit Cryptographically Encrypted Gate</span>
          </div>
          <h1 className="gsap-reveal text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-950 dark:text-white">
            Anonymous Student <span className="gradient-text">Evaluation Portal</span>
          </h1>
          <p className="gsap-reveal text-sm sm:text-base text-slate-700 dark:text-slate-200 max-w-2xl mx-auto font-bold">
            Your feedback directly impacts academic quality assurance. No student IDs, IP addresses, or identity tokens are logged or accessible to faculty or administrators.
          </p>
        </div>

        {/* Anonymity Confirmation Guarantee Banner (Bento Green) */}
        <div className="gsap-reveal bento-card bento-green p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-emerald-200 dark:bg-emerald-900/60 border border-emerald-400 dark:border-emerald-700 flex-shrink-0 text-[#064E3B] dark:text-emerald-200">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm flex items-center gap-2">
                Guaranteed Anonymous Session
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 dark:bg-emerald-400 animate-pulse" />
              </h4>
              <p className="bento-subtext text-xs font-bold">
                Session Token: <code className="font-mono bg-emerald-200/80 dark:bg-emerald-950 px-2 py-0.5 rounded font-extrabold text-[#064E3B] dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700">0x7F9A...ANON</code> • No Cookies Saved • Zero Identity Trackers
              </p>
            </div>
          </div>
          <div className="text-right text-xs font-extrabold text-[#064E3B] dark:text-emerald-300">
            Institutional Protocol v2.4
          </div>
        </div>

        {/* Main Evaluation Form (High Contrast Container) */}
        <motion.form
          onSubmit={handleSubmit}
          animate={shakeForm ? { x: [-10, 10, -8, 8, -4, 4, 0] } : {}}
          transition={{ duration: 0.4 }}
          className="gsap-reveal bg-white dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-800 rounded-[32px] p-6 sm:p-10 shadow-lg space-y-10"
        >
          {/* SECTION 1: 4-Tier Selection Cascade */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b-2 border-slate-200 dark:border-slate-800">
              <div className="w-9 h-9 rounded-xl bg-indigo-700 text-white flex items-center justify-center font-extrabold text-sm shadow-md">
                1
              </div>
              <div>
                <h3 className="font-extrabold text-lg text-slate-950 dark:text-white">
                  4-Tier Faculty Selection Cascade
                </h3>
                <p className="text-xs text-slate-700 dark:text-slate-300 font-bold">
                  Select your academic department to reveal active courses and assigned instructors.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Tier 1: Department */}
              <div className="space-y-2">
                <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-900 dark:text-slate-100">
                  Tier 1: Academic Department
                </label>
                <select
                  value={selectedDeptId}
                  onChange={handleDepartmentChange}
                  className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 text-slate-950 dark:text-white text-sm font-extrabold focus:ring-2 focus:ring-indigo-600 focus:outline-none transition-all"
                >
                  <option value="">-- Choose Department --</option>
                  {departments.map((dept) => (
                    <option key={dept.id} value={dept.id}>
                      {dept.name} ({dept.code})
                    </option>
                  ))}
                </select>
              </div>

              {/* Tier 2: Semester / Class */}
              <div className="space-y-2">
                <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-900 dark:text-slate-100">
                  Tier 2: Semester / Level
                </label>
                <select
                  disabled={!selectedDeptId}
                  value={selectedSemId}
                  onChange={handleSemChange}
                  className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 text-slate-950 dark:text-white text-sm font-extrabold focus:ring-2 focus:ring-indigo-600 focus:outline-none disabled:opacity-50 transition-all"
                >
                  <option value="">-- Select Semester --</option>
                  {activeSemesters.map((sem) => (
                    <option key={sem.id} value={sem.id}>
                      {sem.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Tier 3: Subject / Course */}
              <div className="space-y-2">
                <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-900 dark:text-slate-100">
                  Tier 3: Course / Module
                </label>
                <select
                  disabled={!selectedSemId}
                  value={selectedCourseCode}
                  onChange={handleCourseChange}
                  className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 text-slate-950 dark:text-white text-sm font-extrabold focus:ring-2 focus:ring-indigo-600 focus:outline-none disabled:opacity-50 transition-all"
                >
                  <option value="">-- Select Course --</option>
                  {activeCourses.map((crs) => (
                    <option key={crs.code} value={crs.code}>
                      {crs.code}: {crs.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Tier 4: Assigned Faculty Member */}
              <div className="space-y-2">
                <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-900 dark:text-slate-100">
                  Tier 4: Assigned Faculty Member
                </label>
                <select
                  disabled={!selectedCourseCode}
                  value={selectedFacultyId}
                  onChange={(e) => setSelectedFacultyId(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 text-slate-950 dark:text-white text-sm font-extrabold focus:ring-2 focus:ring-indigo-600 focus:outline-none disabled:opacity-50 transition-all"
                >
                  <option value="">-- Select Faculty --</option>
                  {facultyList
                    .filter((f) =>
                      activeCourse
                        ? f.id === activeCourse.facultyId || f.department === activeDepartment?.name
                        : true
                    )
                    .map((f) => (
                      <option key={f.id} value={f.id}>
                        {f.name} — ({f.title})
                      </option>
                    ))}
                </select>
              </div>
            </div>

            {/* Selected Faculty Preview Card (Bento Lavender) */}
            {activeFaculty && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bento-card bento-lavender p-5 shadow-sm flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3.5">
                  <div
                    className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${activeFaculty.avatarBg} text-white font-extrabold flex items-center justify-center text-lg shadow-md`}
                  >
                    {activeFaculty.initials}
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm text-[#2E1065] dark:text-white">
                      Evaluating: {activeFaculty.name}
                    </h4>
                    <p className="bento-subtext text-xs font-bold">
                      {activeFaculty.title} • {activeFaculty.department}
                    </p>
                  </div>
                </div>

                {isCooldownActive && (
                  <div className="flex items-center gap-1.5 text-xs text-amber-950 dark:text-amber-300 font-extrabold bg-amber-200 dark:bg-amber-950 px-3 py-1.5 rounded-xl border border-amber-400 dark:border-amber-700">
                    <Info className="w-4 h-4" />
                    <span>Submission Cooldown Active</span>
                  </div>
                )}
              </motion.div>
            )}
          </div>

          {/* SECTION 2: 6-Parameter Evaluation Matrix */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b-2 border-slate-200 dark:border-slate-800">
              <div className="w-9 h-9 rounded-xl bg-violet-700 text-white flex items-center justify-center font-extrabold text-sm shadow-md">
                2
              </div>
              <div>
                <h3 className="font-extrabold text-lg text-slate-950 dark:text-white">
                  6-Parameter Performance Evaluation Matrix
                </h3>
                <p className="text-xs text-slate-700 dark:text-slate-300 font-bold">
                  Rate each dimension from 1 (Needs Work) to 5 (Exemplary).
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {ratingParameters.map((param) => {
                const currentScore = ratings[param.id];
                return (
                  <div
                    key={param.id}
                    className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border-2 border-slate-200 dark:border-slate-700 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                  >
                    <div className="space-y-1 max-w-lg">
                      <h4 className="font-extrabold text-sm text-slate-950 dark:text-white flex items-center gap-2">
                        {param.label}
                        {currentScore > 0 && (
                          <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-900 dark:text-indigo-200 border border-indigo-300 dark:border-indigo-700">
                            Score: {currentScore} / 5
                          </span>
                        )}
                      </h4>
                      <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-bold">
                        {param.desc}
                      </p>
                    </div>

                    {/* Star Chips Input Matrix (1-5 High Contrast) */}
                    <div className="flex items-center gap-2 self-stretch md:self-auto justify-between md:justify-end">
                      {[1, 2, 3, 4, 5].map((starVal) => {
                        const isSelected = currentScore >= starVal;
                        return (
                          <button
                            key={starVal}
                            type="button"
                            onClick={() => handleRatingChange(param.id, starVal)}
                            className={`flex flex-col items-center justify-center w-11 h-11 rounded-2xl font-extrabold text-sm transition-all duration-200 ${
                              isSelected
                                ? "bg-gradient-to-br from-indigo-700 to-violet-700 text-white shadow-md shadow-indigo-600/30 scale-105"
                                : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-2 border-slate-300 dark:border-slate-700 hover:border-indigo-500"
                            }`}
                          >
                            <Star
                              className={`w-4 h-4 ${
                                isSelected ? "fill-amber-300 text-amber-300" : "text-slate-400"
                              }`}
                            />
                            <span className="text-[10px] mt-0.5 font-extrabold">{starVal}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* SECTION 3: Constructive Qualitative Comments */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b-2 border-slate-200 dark:border-slate-800">
              <div className="w-9 h-9 rounded-xl bg-emerald-700 text-white flex items-center justify-center font-extrabold text-sm shadow-md">
                3
              </div>
              <div>
                <h3 className="font-extrabold text-lg text-slate-950 dark:text-white">
                  Constructive Qualitative Comments
                </h3>
                <p className="text-xs text-slate-700 dark:text-slate-300 font-bold">
                  Provide specific classroom observations, teaching highlights, or suggestions for course pacing.
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-700 dark:text-slate-300 font-extrabold">
                <span>Detailed Classroom Feedback</span>
                <span className={comment.length > 500 ? "text-amber-800 dark:text-amber-400 font-extrabold" : ""}>
                  {comment.length} / 600 chars
                </span>
              </div>

              <textarea
                rows={4}
                maxLength={600}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="E.g., Dr. Thorne's practical coding demonstrations made complex neural network math very accessible. Suggest adding more live debugging exercises during labs."
                className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 text-slate-950 dark:text-white text-sm font-bold focus:ring-2 focus:ring-indigo-600 focus:outline-none transition-all placeholder:text-slate-500"
              />

              {/* Profanity Filter Warning Banner (Bento Peach High Contrast) */}
              {hasProfanity && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bento-card bento-peach p-4 text-xs font-extrabold flex items-center gap-2 shadow-sm"
                >
                  <AlertCircle className="w-4 h-4 flex-shrink-0 text-[#7C2D12] dark:text-orange-300" />
                  <span>
                    Warning: Real-time scanner detected toxic language. Please maintain constructive academic feedback standards.
                  </span>
                </motion.div>
              )}
            </div>
          </div>

          {/* Validation Error Message */}
          {validationError && (
            <div className="p-4 rounded-2xl bg-rose-100 dark:bg-rose-950 border-2 border-rose-400 dark:border-rose-700 text-rose-950 dark:text-rose-200 text-sm font-extrabold flex items-center gap-2">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span>{validationError}</span>
            </div>
          )}

          {/* Submit Action Bar */}
          <div className="pt-4 border-t-2 border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-700 dark:text-slate-300 flex items-center gap-2 font-extrabold">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Cryptographic SHA-256 verification triggered on submit.</span>
            </div>

            <button
              type="submit"
              disabled={isCooldownActive}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-700 via-violet-700 to-fuchsia-700 hover:from-indigo-600 hover:to-fuchsia-600 text-white font-extrabold text-sm shadow-md shadow-indigo-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-3"
            >
              <Sparkles className="w-5 h-5" />
              <span>Submit Anonymous Evaluation</span>
            </button>
          </div>
        </motion.form>
      </div>

      {/* Full-Screen Success Modal */}
      <AnimatePresence>
        {showSuccessModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
              className="bg-white dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-800 rounded-[32px] p-8 max-w-lg w-full text-center space-y-6 shadow-2xl relative overflow-hidden"
            >
              <div className="w-20 h-20 mx-auto rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="w-10 h-10 animate-bounce" />
              </div>

              <div className="space-y-2">
                <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
                  Submission Verified
                </span>
                <h3 className="text-2xl font-extrabold text-slate-950 dark:text-white">
                  Anonymous Feedback Logged!
                </h3>
                <p className="text-sm text-slate-700 dark:text-slate-200 font-bold">
                  Your evaluation has been cryptographically integrated into the institutional analytics dataset for <strong className="text-indigo-700 dark:text-indigo-300">{activeFaculty?.name}</strong>.
                </p>
              </div>

              {lastSubmittedLog && (
                <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-left text-xs space-y-1 font-bold">
                  <div className="text-slate-600 dark:text-slate-400">Log Record Hash:</div>
                  <div className="font-mono text-indigo-700 dark:text-indigo-300 truncate">{lastSubmittedLog.id} • {lastSubmittedLog.timestamp}</div>
                  <div className="text-slate-600 dark:text-slate-400 pt-1">Sentiment Classification: <span className="uppercase font-extrabold text-emerald-700 dark:text-emerald-400">{lastSubmittedLog.sentiment}</span></div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={resetForm}
                  className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-extrabold text-xs hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Submit Another Review</span>
                </button>

                <a
                  href="/dashboard"
                  className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-indigo-700 text-white font-extrabold text-xs hover:bg-indigo-600 transition-colors flex items-center justify-center gap-2 shadow-md shadow-indigo-700/30"
                >
                  <span>View Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageWrapper>
  );
}
