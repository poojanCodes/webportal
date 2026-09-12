"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap,
  ShieldCheck,
  LayoutDashboard,
  MessageSquarePlus,
  BarChart3,
  FileSpreadsheet,
  BrainCircuit,
  Sun,
  Moon,
  Menu,
  X,
  Sparkles
} from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Overview", href: "/", icon: GraduationCap },
    { name: "Submit Feedback", href: "/feedback", icon: MessageSquarePlus },
    { name: "Faculty Directory", href: "/dashboard", icon: LayoutDashboard },
    { name: "Analytics & Radar", href: "/analytics", icon: BarChart3 },
    { name: "Master Records", href: "/reports", icon: FileSpreadsheet },
    { name: "AI Insights", href: "/insights", icon: BrainCircuit }
  ];

  return (
    <header className="sticky top-0 z-50 w-full glass-header border-b border-slate-200/60 dark:border-slate-800/60 transition-all duration-300">
      {/* Spacious Navbar Container */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 h-24 flex items-center justify-between gap-8">
        
        {/* 1. Spacious Brand Logo Section */}
        <Link href="/" className="flex items-center gap-4 group flex-shrink-0">
          <div className="relative flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-600 text-white shadow-xl shadow-indigo-500/25 group-hover:scale-105 transition-all duration-300">
            <GraduationCap className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-white dark:border-slate-950 animate-pulse" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2.5">
              <span className="font-extrabold text-2xl tracking-tight text-slate-900 dark:text-white">
                Academix<span className="gradient-text">Pulse</span>
              </span>
              <span className="hidden xl:inline-flex text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 border border-indigo-500/20">
                VERIFIED v2.4
              </span>
            </div>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium tracking-normal">
              Institutional Quality Assurance Engine
            </span>
          </div>
        </Link>

        {/* 2. Spacious Floating Navigation Bar (Desktop) */}
        <nav className="hidden lg:flex items-center gap-1.5 p-2 rounded-2xl bg-slate-100/70 dark:bg-slate-900/60 border border-slate-200/70 dark:border-slate-800/70 backdrop-blur-xl shadow-sm">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold tracking-tight transition-all duration-200 ${
                  isActive
                    ? "text-white font-bold shadow-md shadow-indigo-500/25"
                    : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-800/60"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeNavBackground"
                    className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 rounded-xl -z-10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-indigo-500 dark:text-indigo-400"}`} />
                <span>{link.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* 3. Spacious Action Bar & Security Badge */}
        <div className="hidden md:flex items-center gap-4 flex-shrink-0">
          {/* Anonymity Security Status Badge */}
          <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20 text-xs font-bold shadow-sm">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span className="hidden lg:inline">256-Bit Encrypted Gate</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          </div>

          {/* Theme Toggle Icon Button */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Dark/Light Theme"
            className="flex items-center justify-center w-11 h-11 rounded-2xl bg-slate-100 dark:bg-slate-900/80 text-slate-700 dark:text-slate-200 hover:bg-slate-200/80 dark:hover:bg-slate-800 transition-all border border-slate-200 dark:border-slate-800 shadow-sm hover:scale-105 active:scale-95"
          >
            {theme === "dark" ? (
              <Sun className="w-5 h-5 text-amber-400" />
            ) : (
              <Moon className="w-5 h-5 text-indigo-600" />
            )}
          </button>
        </div>

        {/* Mobile Controls & Hamburger */}
        <div className="flex lg:hidden items-center gap-3">
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-800"
          >
            {theme === "dark" ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-indigo-600" />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-800"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Spacious Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur-2xl px-6 py-6 space-y-3"
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/20">
                <ShieldCheck className="w-4 h-4" />
                <span>Verified Cryptographic Session</span>
              </div>
            </div>

            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3.5 px-4 py-3.5 rounded-2xl text-sm font-semibold transition-all ${
                    isActive
                      ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold shadow-lg shadow-indigo-500/20"
                      : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900"
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? "text-white" : "text-indigo-500"}`} />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
