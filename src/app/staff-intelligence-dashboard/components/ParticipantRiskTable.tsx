'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface Participant {
  id: string;
  initials: string;
  name: string;
  riskLevel: 'High' | 'Moderate' | 'Low';
  attendance: string;
  housingStatus: string;
  employmentStatus: string;
  engagementTrend: 'up' | 'down' | 'stable';
  engagementDelta: string;
}

const participants: Participant[] = [
  {
    id: 'p-001',
    initials: 'AR',
    name: 'Alex Rivera',
    riskLevel: 'High',
    attendance: '65%',
    housingStatus: 'Unstable',
    employmentStatus: 'Seeking',
    engagementTrend: 'down',
    engagementDelta: '−8%',
  },
  {
    id: 'p-002',
    initials: 'JS',
    name: 'Jordan Smith',
    riskLevel: 'Moderate',
    attendance: '85%',
    housingStatus: 'Stable',
    employmentStatus: 'Part-time',
    engagementTrend: 'up',
    engagementDelta: '+5%',
  },
  {
    id: 'p-003',
    initials: 'TC',
    name: 'Taylor Chen',
    riskLevel: 'Low',
    attendance: '98%',
    housingStatus: 'Stable',
    employmentStatus: 'Full-time',
    engagementTrend: 'up',
    engagementDelta: '+12%',
  },
  {
    id: 'p-004',
    initials: 'SW',
    name: 'Sam Washington',
    riskLevel: 'High',
    attendance: '50%',
    housingStatus: 'At Risk',
    employmentStatus: 'Unemployed',
    engagementTrend: 'down',
    engagementDelta: '−14%',
  },
  {
    id: 'p-005',
    initials: 'MG',
    name: 'Maria Gonzalez',
    riskLevel: 'Low',
    attendance: '90%',
    housingStatus: 'Stable',
    employmentStatus: 'Part-time',
    engagementTrend: 'stable',
    engagementDelta: '0%',
  },
  {
    id: 'p-006',
    initials: 'DK',
    name: 'Devon Kim',
    riskLevel: 'Moderate',
    attendance: '78%',
    housingStatus: 'Transitional',
    employmentStatus: 'Seeking',
    engagementTrend: 'up',
    engagementDelta: '+3%',
  },
  {
    id: 'p-007',
    initials: 'PN',
    name: 'Priya Nair',
    riskLevel: 'Low',
    attendance: '95%',
    housingStatus: 'Stable',
    employmentStatus: 'Full-time',
    engagementTrend: 'up',
    engagementDelta: '+9%',
  },
  {
    id: 'p-008',
    initials: 'JT',
    name: 'James Torres',
    riskLevel: 'High',
    attendance: '45%',
    housingStatus: 'Unstable',
    employmentStatus: 'Unemployed',
    engagementTrend: 'down',
    engagementDelta: '−18%',
  },
];

const riskConfig = {
  High: { label: 'High', bg: 'bg-[#C83C3C]/08 border-[#C83C3C]/20', text: 'text-[#C83C3C]' },
  Moderate: { label: 'Moderate', bg: 'bg-[#B8965E]/08 border-[#B8965E]/20', text: 'text-[#B8965E]' },
  Low: { label: 'Low', bg: 'bg-[#173D35]/08 border-[#173D35]/20', text: 'text-[#173D35]' },
};

const housingConfig: Record<string, string> = {
  Stable: 'text-[#2E7D5A]',
  Unstable: 'text-[#C83C3C]',
  'At Risk': 'text-[#C83C3C]',
  Transitional: 'text-[#B8965E]',
};

const employmentConfig: Record<string, string> = {
  'Full-time': 'text-[#2E7D5A]',
  'Part-time': 'text-[#B8965E]',
  Seeking: 'text-[#72777D]',
  Unemployed: 'text-[#C83C3C]',
};

export default function ParticipantRiskTable() {
  const [filter, setFilter] = useState<'All' | 'High' | 'Moderate' | 'Low'>('All');

  const filtered = filter === 'All' ? participants : participants.filter((p) => p.riskLevel === filter);

  return (
    <div className="bg-white border border-[#D9D4C9] rounded-xl shadow-soft overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-[#EAE6DE]">
        <div>
          <h3 className="font-serif text-[#101010] text-lg font-semibold">Participant Risk Table</h3>
          <p className="text-[#72777D] text-xs font-sans mt-0.5">Real-time participant status and engagement indicators</p>
        </div>
        <div className="flex items-center gap-1.5">
          {(['All', 'High', 'Moderate', 'Low'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`text-[11px] font-sans font-medium px-3 py-1.5 rounded-lg border transition-all duration-150 ${
                filter === f
                  ? 'bg-[#173D35] text-white border-[#173D35]'
                  : 'text-[#72777D] border-[#D9D4C9] hover:border-[#173D35]/30 hover:text-[#101010]'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#EAE6DE] bg-[#F5F2EB]/60">
              <th className="text-left px-5 py-3 text-[10px] text-[#72777D] uppercase tracking-widest-label font-sans font-medium">Participant</th>
              <th className="text-left px-4 py-3 text-[10px] text-[#72777D] uppercase tracking-widest-label font-sans font-medium">Risk Level</th>
              <th className="text-left px-4 py-3 text-[10px] text-[#72777D] uppercase tracking-widest-label font-sans font-medium">Attendance</th>
              <th className="text-left px-4 py-3 text-[10px] text-[#72777D] uppercase tracking-widest-label font-sans font-medium">Housing</th>
              <th className="text-left px-4 py-3 text-[10px] text-[#72777D] uppercase tracking-widest-label font-sans font-medium">Employment</th>
              <th className="text-left px-4 py-3 text-[10px] text-[#72777D] uppercase tracking-widest-label font-sans font-medium">Engagement</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p, idx) => {
              const risk = riskConfig[p.riskLevel];
              const TrendIcon = p.engagementTrend === 'up' ? TrendingUp : p.engagementTrend === 'down' ? TrendingDown : Minus;
              const trendColor = p.engagementTrend === 'up' ? 'text-[#2E7D5A]' : p.engagementTrend === 'down' ? 'text-[#C83C3C]' : 'text-[#72777D]';
              return (
                <tr
                  key={p.id}
                  className={`border-b border-[#EAE6DE] hover:bg-[#F5F2EB]/50 transition-colors duration-100 ${idx === filtered.length - 1 ? 'border-b-0' : ''}`}
                >
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#173D35]/10 border border-[#173D35]/15 flex items-center justify-center text-[#173D35] text-xs font-semibold font-sans flex-shrink-0">
                        {p.initials}
                      </div>
                      <span className="text-[#101010] text-sm font-medium font-sans">{p.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className={`inline-flex items-center text-[10px] font-semibold uppercase tracking-widest-label px-2.5 py-1 rounded-full border font-sans ${risk.bg} ${risk.text}`}>
                      {risk.label}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className={`text-sm font-semibold font-sans text-tabular ${
                      parseInt(p.attendance) >= 85 ? 'text-[#2E7D5A]' : parseInt(p.attendance) >= 70 ? 'text-[#B8965E]' : 'text-[#C83C3C]'
                    }`}>{p.attendance}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className={`text-sm font-sans ${housingConfig[p.housingStatus] ?? 'text-[#72777D]'}`}>{p.housingStatus}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className={`text-sm font-sans ${employmentConfig[p.employmentStatus] ?? 'text-[#72777D]'}`}>{p.employmentStatus}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-1.5">
                      <TrendIcon size={13} className={trendColor} />
                      <span className={`text-sm font-semibold font-sans text-tabular ${trendColor}`}>{p.engagementDelta}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <Link href="/participant-profile-detail" className="text-[#72777D] hover:text-[#173D35] transition-colors">
                      <ChevronRight size={15} />
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
