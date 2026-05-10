'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';
import {
  Home,
  ClipboardCheck,
  LifeBuoy,
  User,
  ChevronRight,
  CheckCircle2,
  Circle,
  Bus,
  Briefcase,
  Building2,
  MessageCircle,
  TrendingUp,
  Bell,
} from 'lucide-react';
import Icon from '@/components/ui/AppIcon';


const tasks = [
  {
    id: 'task-001',
    title: 'Weekly Check-In',
    meta: 'BASELINE • 2-3 MINS',
    status: 'pending' as const,
    href: '/weekly-check-in',
  },
  {
    id: 'task-002',
    title: 'Skill Building Workshop',
    meta: 'ACTIVITY • COMPLETED',
    status: 'completed' as const,
    href: '#',
  },
  {
    id: 'task-003',
    title: 'Confirm Activity Logs',
    meta: 'TRACKING • 1 MIN',
    status: 'pending' as const,
    href: '#',
  },
];

const supportActions = [
  { id: 'support-transport', icon: Bus, label: 'Transportation' },
  { id: 'support-job', icon: Briefcase, label: 'Job Search' },
  { id: 'support-housing', icon: Building2, label: 'Housing' },
  { id: 'support-coach', icon: MessageCircle, label: 'Talk to Coach' },
];

const attendanceDays = [
  { id: 'day-mon', day: 'M', present: true },
  { id: 'day-tue', day: 'T', present: true },
  { id: 'day-wed', day: 'W', present: true },
  { id: 'day-thu', day: 'T', present: true },
  { id: 'day-fri', day: 'F', present: false },
];

export default function ParticipantHomeContent() {
  const [activeTab, setActiveTab] = useState<'home' | 'checkin' | 'support' | 'profile'>('home');

  return (
    <div className="min-h-screen bg-[#EDE9E1] flex items-center justify-center p-4">
      {/* Mobile shell */}
      <div className="w-full max-w-[390px] min-h-[844px] bg-[#F5F2EB] rounded-[32px] overflow-hidden flex flex-col shadow-elevated relative border border-[#D9D4C9]">

        {/* Status bar */}
        <div className="flex items-center justify-between px-6 pt-4 pb-2 bg-[#F5F2EB]">
          <span className="text-[#101010] text-sm font-semibold font-sans">9:41</span>
          <div className="flex items-center gap-1">
            <div className="flex gap-0.5">
              {[4, 3, 2, 1].map((bar) => (
                <div
                  key={`signal-${bar}`}
                  className="bg-[#101010] rounded-sm"
                  style={{ width: 3, height: bar * 3 + 2 }}
                />
              ))}
            </div>
            <div className="w-6 h-3 border border-[#101010] rounded-sm ml-1 flex items-center px-0.5">
              <div className="w-4 h-2 bg-[#101010] rounded-sm" />
            </div>
          </div>
        </div>

        {/* Header — Forest Green */}
        <div className="bg-[#173D35] px-5 pt-3 pb-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <AppLogo size={20} src="/assets/images/genesis_platform_logo-1778430199358.png" />
              <span className="text-[10px] font-sans text-white/65 tracking-widest-label uppercase font-medium">Genesis Program</span>
            </div>
            <button className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
              <Bell size={15} className="text-white" />
            </button>
          </div>
          <h1 className="font-serif text-[#F5F2EB] text-2xl font-semibold">Welcome, Alex</h1>
          <p className="text-white/55 text-xs mt-0.5 font-sans">Sunday, May 10, 2026</p>
        </div>

        {/* Scrollable content — Ivory */}
        <div className="flex-1 overflow-y-auto px-4 py-5 space-y-5 pb-24 bg-[#F5F2EB]">

          {/* Current Status Card — Forest */}
          <div className="bg-[#173D35] rounded-2xl p-4 relative overflow-hidden">
            <div className="absolute top-3 right-3 opacity-[0.07]">
              <TrendingUp size={52} className="text-white" />
            </div>
            <p className="text-[10px] text-white/55 uppercase tracking-widest-label font-sans font-medium mb-1">Current Status</p>
            <p className="font-serif text-[#F5F2EB] text-xl font-semibold italic mb-3">You are on track.</p>
            <div className="bg-white/10 rounded-xl p-3 flex items-start gap-2">
              <span className="text-sm mt-0.5">🤝</span>
              <p className="text-white/75 text-xs font-sans leading-relaxed">Your coach is happy with your engagement this week!</p>
            </div>
          </div>

          {/* Next Steps */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-serif text-[#101010] text-lg font-semibold">Next Steps</h2>
              <span className="text-[10px] text-[#B8965E] uppercase tracking-widest-label font-sans font-semibold bg-[#B8965E]/10 px-2.5 py-1 rounded-full border border-[#B8965E]/20">
                3 Tasks
              </span>
            </div>
            <div className="space-y-2">
              {tasks.map((task) => (
                <Link
                  key={task.id}
                  href={task.href}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3.5 transition-all duration-150 hover:scale-[1.01] border ${
                    task.status === 'completed'
                      ? 'bg-white border-[#D9D4C9]' :'bg-white border-[#173D35]/20 hover:border-[#173D35]/40'
                  }`}
                >
                  {task.status === 'completed' ? (
                    <CheckCircle2 size={18} className="text-[#2E7D5A] flex-shrink-0" />
                  ) : (
                    <Circle size={18} className="text-[#D9D4C9] flex-shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium font-sans ${task.status === 'completed' ? 'text-[#72777D] line-through' : 'text-[#101010]'}`}>
                      {task.title}
                    </p>
                    <p className={`text-[10px] uppercase tracking-widest-label mt-0.5 font-sans ${task.status === 'completed' ? 'text-[#2E7D5A]' : 'text-[#72777D]'}`}>
                      {task.meta}
                    </p>
                  </div>
                  <ChevronRight size={16} className="text-[#9DA2A8] flex-shrink-0" />
                </Link>
              ))}
            </div>
          </div>

          {/* Need Help */}
          <div>
            <h2 className="font-serif text-[#101010] text-lg font-semibold mb-3">Need Help?</h2>
            <div className="grid grid-cols-2 gap-2.5">
              {supportActions.map((action) => {
                const Icon = action.icon;
                return (
                  <button
                    key={action.id}
                    className="bg-white border border-[#D9D4C9] rounded-2xl p-4 flex flex-col items-center gap-3 hover:border-[#173D35]/30 hover:shadow-soft transition-all duration-150 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#173D35]/08 border border-[#173D35]/12 flex items-center justify-center" style={{backgroundColor: 'rgba(23,61,53,0.07)'}}>
                      <Icon size={22} className="text-[#173D35]" />
                    </div>
                    <span className="text-[#101010] text-xs font-medium font-sans text-center">{action.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Attendance */}
          <div className="bg-white border border-[#D9D4C9] rounded-2xl p-4 shadow-soft">
            <div className="flex items-center justify-between mb-3">
              <p className="text-[10px] text-[#72777D] uppercase tracking-widest-label font-sans font-medium">This Week&apos;s Attendance</p>
              <span className="text-[#2E7D5A] text-xs font-semibold font-sans">85% AVG</span>
            </div>
            <div className="flex gap-1.5 mb-3">
              {attendanceDays.map((day) => (
                <div key={day.id} className="flex-1 flex flex-col items-center gap-1">
                  <div
                    className={`w-full h-1.5 rounded-full ${day.present ? 'bg-[#173D35]' : 'bg-[#D9D4C9]'}`}
                  />
                  <span className={`text-[10px] font-sans ${day.present ? 'text-[#72777D]' : 'text-[#C5C0B8]'}`}>{day.day}</span>
                </div>
              ))}
            </div>
            <div className="w-full bg-[#EAE6DE] rounded-full h-1.5">
              <div className="bg-[#173D35] h-1.5 rounded-full" style={{ width: '85%' }} />
            </div>
          </div>
        </div>

        {/* Bottom navigation — White */}
        <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-[#D9D4C9] px-4 pb-6 pt-3">
          <div className="flex items-center justify-around">
            {[
              { key: 'tab-home', tab: 'home' as const, icon: Home, label: 'Home', href: '/' },
              { key: 'tab-checkin', tab: 'checkin' as const, icon: ClipboardCheck, label: 'Check-In', href: '/weekly-check-in' },
              { key: 'tab-support', tab: 'support' as const, icon: LifeBuoy, label: 'Support', href: '#' },
              { key: 'tab-profile', tab: 'profile' as const, icon: User, label: 'Profile', href: '#' },
            ].map(({ key, tab, icon: Icon, label, href }) => (
              <Link
                key={key}
                href={href}
                onClick={() => setActiveTab(tab)}
                className={`flex flex-col items-center gap-1 transition-colors ${
                  activeTab === tab ? 'text-[#173D35]' : 'text-[#9DA2A8]'
                }`}
              >
                {tab === 'checkin' ? (
                  <div className="w-12 h-12 bg-[#173D35] rounded-full flex items-center justify-center -mt-6 shadow-elevated border-2 border-white">
                    <Icon size={20} className="text-[#F5F2EB]" />
                  </div>
                ) : (
                  <Icon size={20} />
                )}
                <span className="text-[10px] font-sans font-medium">{label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}