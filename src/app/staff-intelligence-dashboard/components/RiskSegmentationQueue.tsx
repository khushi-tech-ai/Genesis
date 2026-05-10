'use client';
import React from 'react';
import Link from 'next/link';
import { ChevronRight, Clock } from 'lucide-react';

const participants = [
  {
    id: 'part-alex',
    initials: 'AR',
    name: 'Alex Rivera',
    lastSeen: '24h ago',
    risk: 'high' as const,
    attendance: '65%',
    riskScore: 82,
  },
  {
    id: 'part-jordan',
    initials: 'JS',
    name: 'Jordan Smith',
    lastSeen: '3 days ago',
    risk: 'moderate' as const,
    attendance: '85%',
    riskScore: 45,
  },
  {
    id: 'part-taylor',
    initials: 'TC',
    name: 'Taylor Chen',
    lastSeen: 'Today',
    risk: 'low' as const,
    attendance: '98%',
    riskScore: 12,
  },
  {
    id: 'part-sam',
    initials: 'SW',
    name: 'Sam Washington',
    lastSeen: '5 days ago',
    risk: 'high' as const,
    attendance: '50%',
    riskScore: 78,
  },
];

const riskConfig = {
  high: { label: 'HIGH', bg: 'risk-badge-high' },
  moderate: { label: 'MODERATE', bg: 'risk-badge-moderate' },
  low: { label: 'LOW', bg: 'risk-badge-low' },
};

export default function RiskSegmentationQueue() {
  return (
    <div className="bg-white border border-[#D9D4C9] rounded-xl p-5 h-full shadow-soft">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-[10px] text-[#72777D] uppercase tracking-widest-label font-sans font-medium mb-0.5">Risk Segmentation</p>
          <p className="text-[10px] text-[#9DA2A8] font-sans">Predictive Intervention Queue</p>
        </div>
        <button className="text-[#72777D] hover:text-[#101010] transition-colors">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 3h12M3 7h8M5 11h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <div className="space-y-3">
        {participants.map((p) => {
          const config = riskConfig[p.risk];
          return (
            <Link
              key={p.id}
              href="/participant-profile-detail"
              className="block bg-[#F5F2EB] border border-[#D9D4C9] rounded-xl p-3.5 hover:border-[#173D35]/30 transition-all duration-150 hover-lift"
            >
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#173D35]/10 border border-[#173D35]/15 flex items-center justify-center text-[#173D35] text-xs font-semibold font-sans flex-shrink-0">
                    {p.initials}
                  </div>
                  <div>
                    <p className="text-[#101010] text-sm font-medium font-sans">{p.name}</p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <Clock size={10} className="text-[#9DA2A8]" />
                      <span className="text-[10px] text-[#9DA2A8] font-sans">{p.lastSeen}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-semibold uppercase tracking-widest-label px-2 py-0.5 rounded-full font-sans ${config.bg}`}>
                    {config.label}
                  </span>
                  <ChevronRight size={12} className="text-[#9DA2A8]" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-white rounded-lg p-2 text-center border border-[#D9D4C9]">
                  <p className="text-[9px] text-[#9DA2A8] uppercase tracking-widest-label font-sans">Attendance</p>
                  <p className="text-[#101010] text-sm font-semibold font-sans text-tabular mt-0.5">{p.attendance}</p>
                </div>
                <div className="bg-white rounded-lg p-2 text-center border border-[#D9D4C9]">
                  <p className="text-[9px] text-[#9DA2A8] uppercase tracking-widest-label font-sans">Risk Score</p>
                  <p className={`text-sm font-semibold font-sans text-tabular mt-0.5 ${
                    p.risk === 'high' ? 'text-[#C83C3C]' : p.risk === 'moderate' ? 'text-[#B8965E]' : 'text-[#2E7D5A]'
                  }`}>{p.riskScore}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}