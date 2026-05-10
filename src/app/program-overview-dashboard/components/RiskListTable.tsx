'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, ChevronUp, ChevronDown } from 'lucide-react';

const participants = [
  { id: 'part-001', initials: 'JD', name: 'John Doe', barriers: 'Transportation', riskLevel: 'low' as const, score: 15 },
  { id: 'part-002', initials: 'JS', name: 'Jane Smith', barriers: 'Housing, Digital Access', riskLevel: 'high' as const, score: 82 },
  { id: 'part-003', initials: 'RR', name: 'Robert Ross', barriers: 'Job Search', riskLevel: 'moderate' as const, score: 45 },
  { id: 'part-004', initials: 'EC', name: 'Emily Chen', barriers: 'No barriers', riskLevel: 'low' as const, score: 12 },
  { id: 'part-005', initials: 'MG', name: 'Marcus Green', barriers: 'Transportation, Housing', riskLevel: 'high' as const, score: 74 },
  { id: 'part-006', initials: 'LW', name: 'Leila Wilson', barriers: 'Digital Access', riskLevel: 'moderate' as const, score: 38 },
  { id: 'part-007', initials: 'DT', name: 'Devon Torres', barriers: 'No barriers', riskLevel: 'low' as const, score: 8 },
  { id: 'part-008', initials: 'PK', name: 'Priya Kumar', barriers: 'Employment', riskLevel: 'moderate' as const, score: 51 },
];

const riskConfig = {
  high: { label: 'HIGH', className: 'risk-badge-high' },
  moderate: { label: 'MODERATE', className: 'risk-badge-moderate' },
  low: { label: 'LOW', className: 'risk-badge-low' },
};

export default function RiskListTable() {
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');

  const sorted = [...participants].sort((a, b) =>
    sortDir === 'desc' ? b.score - a.score : a.score - b.score
  );

  return (
    <div className="bg-white border border-[#D9D4C9] rounded-xl overflow-hidden shadow-soft">
      <div className="flex items-center justify-between px-5 py-4 border-b border-[#EAE6DE]">
        <h3 className="font-serif text-[#101010] text-lg font-semibold">Risk List</h3>
        <Link href="/participant-profile-detail" className="text-[10px] text-[#B8965E] uppercase tracking-widest-label font-sans font-medium hover:text-[#C9A97A] transition-colors flex items-center gap-1">
          View All <ChevronRight size={12} />
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#EAE6DE] bg-[#F5F2EB]">
              <th className="text-left px-5 py-3 text-[10px] text-[#72777D] uppercase tracking-widest-label font-sans font-medium">Participant</th>
              <th className="text-left px-4 py-3 text-[10px] text-[#72777D] uppercase tracking-widest-label font-sans font-medium">Barriers</th>
              <th className="text-left px-4 py-3 text-[10px] text-[#72777D] uppercase tracking-widest-label font-sans font-medium">Risk Level</th>
              <th
                className="text-left px-4 py-3 text-[10px] text-[#72777D] uppercase tracking-widest-label font-sans font-medium cursor-pointer hover:text-[#101010] transition-colors"
                onClick={() => setSortDir(d => d === 'desc' ? 'asc' : 'desc')}
              >
                <span className="flex items-center gap-1">
                  Score
                  {sortDir === 'desc' ? <ChevronDown size={10} /> : <ChevronUp size={10} />}
                </span>
              </th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {sorted.map((p, i) => {
              const config = riskConfig[p.riskLevel];
              return (
                <tr
                  key={p.id}
                  className={`border-b border-[#EAE6DE] hover:bg-[#F5F2EB] transition-colors group ${i % 2 === 0 ? 'bg-white' : 'bg-[#FDFCFA]'}`}
                >
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-full bg-[#173D35]/10 border border-[#173D35]/15 flex items-center justify-center text-[#173D35] text-[11px] font-semibold font-sans flex-shrink-0">
                        {p.initials}
                      </div>
                      <span className="text-[#101010] text-sm font-medium font-sans">{p.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="text-[#72777D] text-xs font-sans">{p.barriers}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className={`text-[10px] font-semibold uppercase tracking-widest-label px-2 py-0.5 rounded-full border font-sans ${config.className}`}>
                      {config.label}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className={`text-sm font-semibold font-sans text-tabular ${
                      p.riskLevel === 'high' ? 'text-[#C83C3C]' : p.riskLevel === 'moderate' ? 'text-[#B8965E]' : 'text-[#2E7D5A]'
                    }`}>{p.score}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <Link
                      href="/participant-profile-detail"
                      className="opacity-0 group-hover:opacity-100 transition-opacity text-[#72777D] hover:text-[#101010]"
                    >
                      <ChevronRight size={14} />
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