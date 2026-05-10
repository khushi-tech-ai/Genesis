import React from 'react';
import Link from 'next/link';
import { ChevronLeft, MessageSquare, Zap, Calendar, MapPin, Phone } from 'lucide-react';

interface ProfileHeaderProps {
  onAddNote: () => void;
  onTriggerIntervention: () => void;
}

export default function ProfileHeader({ onAddNote, onTriggerIntervention }: ProfileHeaderProps) {
  return (
    <div>
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-5">
        <Link href="/program-overview-dashboard" className="flex items-center gap-1.5 text-[#72777D] hover:text-[#101010] transition-colors text-xs font-sans">
          <ChevronLeft size={14} />
          Pilot Overview
        </Link>
        <span className="text-[#D9D4C9]">/</span>
        <span className="text-[#101010] text-xs font-sans">Jane Smith</span>
      </div>

      <div className="bg-white border border-[#D9D4C9] rounded-xl p-5 shadow-soft">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex items-start gap-4">
            {/* Avatar */}
            <div className="w-14 h-14 rounded-2xl bg-[#173D35]/10 border border-[#173D35]/15 flex items-center justify-center text-[#173D35] text-xl font-semibold font-serif flex-shrink-0">
              JS
            </div>
            <div>
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="font-serif text-[#101010] text-2xl font-semibold">Jane Smith</h1>
                <span className="text-[10px] font-semibold uppercase tracking-widest-label px-2.5 py-1 rounded-full border font-sans risk-badge-high">
                  HIGH RISK
                </span>
                <span className="text-[10px] text-[#2E7D5A] uppercase tracking-widest-label font-sans font-medium bg-[#2E7D5A]/08 border border-[#2E7D5A]/20 px-2.5 py-1 rounded-full" style={{backgroundColor:'rgba(46,125,90,0.06)'}}>
                  Active
                </span>
              </div>
              <div className="flex items-center gap-4 mt-2 flex-wrap">
                <div className="flex items-center gap-1.5 text-[#72777D] text-xs font-sans">
                  <Calendar size={12} />
                  Enrolled March 3, 2026
                </div>
                <div className="flex items-center gap-1.5 text-[#72777D] text-xs font-sans">
                  <MapPin size={12} />
                  District 4 — Cohort B
                </div>
                <div className="flex items-center gap-1.5 text-[#72777D] text-xs font-sans">
                  <Phone size={12} />
                  (415) 882-3041
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={onAddNote}
              className="flex items-center gap-2 px-4 py-2.5 text-xs font-medium font-sans text-[#72777D] border border-[#D9D4C9] rounded-xl hover:bg-[#F5F2EB] hover:text-[#101010] transition-all"
            >
              <MessageSquare size={13} />
              Add Note
            </button>
            <button
              onClick={onTriggerIntervention}
              className="flex items-center gap-2 px-4 py-2.5 text-xs font-medium font-sans text-[#F5F2EB] bg-[#173D35] border border-[#173D35] rounded-xl hover:bg-[#1F4A40] transition-all"
            >
              <Zap size={13} />
              Trigger Intervention
            </button>
          </div>
        </div>

        {/* Key metrics row */}
        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-4 gap-3 mt-5 pt-5 border-t border-[#EAE6DE]">
          {[
            { id: 'pm-score', label: 'Risk Score', value: '82', color: 'text-[#C83C3C]' },
            { id: 'pm-attendance', label: 'Attendance', value: '68%', color: 'text-[#B8965E]' },
            { id: 'pm-checkins', label: 'Check-Ins Completed', value: '5/8', color: 'text-[#101010]' },
            { id: 'pm-readiness', label: 'Readiness Score', value: '4.2/10', color: 'text-[#101010]' },
          ].map(({ id, label, value, color }) => (
            <div key={id} className="bg-[#F5F2EB] rounded-xl p-3 border border-[#D9D4C9]">
              <p className="text-[10px] text-[#72777D] uppercase tracking-widest-label font-sans mb-1">{label}</p>
              <p className={`font-serif text-2xl font-semibold text-tabular ${color}`}>{value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}