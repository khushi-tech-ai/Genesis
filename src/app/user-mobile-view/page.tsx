'use client';
import React, { useState } from 'react';
import StaffLayout from '@/components/StaffLayout';
import ParticipantHomeContent from '@/app/components/ParticipantHomeContent';
import WeeklyCheckInContent from '@/app/weekly-check-in/components/WeeklyCheckInContent';
import { Smartphone, Home, ClipboardCheck } from 'lucide-react';

type MobileScreen = 'home' | 'checkin';

export default function UserMobileViewPage() {
  const [activeScreen, setActiveScreen] = useState<MobileScreen>('home');

  return (
    <StaffLayout>
      <div className="p-6 lg:p-8">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-1">
            <Smartphone size={20} className="text-[#173D35]" />
            <h1 className="font-serif text-2xl font-semibold text-[#101010]">User Mobile View</h1>
          </div>
          <p className="text-sm text-[#72777D] font-sans">Preview the participant mobile experience as seen by program participants.</p>
        </div>

        {/* Screen Selector */}
        <div className="flex items-center gap-2 mb-8">
          <button
            onClick={() => setActiveScreen('home')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium font-sans transition-all ${
              activeScreen === 'home' ?'bg-[#173D35] text-[#F5F2EB]' :'bg-white border border-[#D9D4C9] text-[#101010] hover:bg-[#F5F2EB]'
            }`}
          >
            <Home size={14} />
            Welcome / Home
          </button>
          <button
            onClick={() => setActiveScreen('checkin')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium font-sans transition-all ${
              activeScreen === 'checkin' ?'bg-[#173D35] text-[#F5F2EB]' :'bg-white border border-[#D9D4C9] text-[#101010] hover:bg-[#F5F2EB]'
            }`}
          >
            <ClipboardCheck size={14} />
            Weekly Check-In
          </button>
        </div>

        {/* Mobile Frame */}
        <div className="flex justify-center">
          <div className="relative">
            {/* Phone frame */}
            <div className="w-[390px] rounded-[40px] border-[8px] border-[#101010] shadow-2xl overflow-hidden bg-white" style={{ minHeight: '780px' }}>
              {/* Status bar */}
              <div className="bg-[#101010] h-8 flex items-center justify-between px-6">
                <span className="text-white text-[10px] font-medium font-sans">9:41</span>
                <div className="w-20 h-4 bg-[#101010] rounded-full" />
                <div className="flex items-center gap-1">
                  <div className="w-3 h-2 border border-white/60 rounded-sm">
                    <div className="w-2 h-full bg-white/60 rounded-sm" />
                  </div>
                </div>
              </div>
              {/* Screen content */}
              <div className="overflow-y-auto" style={{ maxHeight: '740px' }}>
                {activeScreen === 'home' ? (
                  <ParticipantHomeContent />
                ) : (
                  <WeeklyCheckInContent />
                )}
              </div>
            </div>
            {/* Label */}
            <p className="text-center text-xs text-[#9DA2A8] font-sans mt-4">
              {activeScreen === 'home' ? 'Welcome / Home Screen' : 'Weekly Check-In Flow'}
            </p>
          </div>
        </div>
      </div>
    </StaffLayout>
  );
}
