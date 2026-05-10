import React from 'react';
import KpiMetrics from './KpiMetrics';
import ReadinessMatrixChart from './ReadinessMatrixChart';
import ParticipantRiskTable from './ParticipantRiskTable';
import InterventionQueuePanel from './InterventionQueuePanel';
import StaffNotesPanel from './StaffNotesPanel';

export default function StaffDashboardContent() {
  return (
    <div className="p-6 xl:p-8 space-y-6 max-w-screen-2xl">
      {/* Page header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-serif text-[#101010] text-3xl font-semibold">Staff Intelligence</h1>
          <p className="text-[#72777D] text-sm font-sans mt-1">Operational command center — real-time participant outcomes</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-white border border-[#D9D4C9] rounded-lg px-3 py-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2E7D5A] animate-pulse" />
            <span className="text-[10px] text-[#72777D] uppercase tracking-widest-label font-sans">System Live</span>
          </div>
          <div className="text-right hidden md:block">
            <p className="text-[11px] text-[#72777D] font-sans">Cycle: Spring 2026</p>
            <p className="text-[10px] text-[#9DA2A8] font-sans">Track · Predict · Adjust · Repeat</p>
          </div>
        </div>
      </div>

      {/* KPI row — 6 cards */}
      <KpiMetrics />

      {/* Readiness Matrix + Intervention Queue */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ReadinessMatrixChart />
        </div>
        <div className="lg:col-span-1">
          <InterventionQueuePanel />
        </div>
      </div>

      {/* Participant Risk Table — full width */}
      <ParticipantRiskTable />

      {/* Staff Notes Panel */}
      <StaffNotesPanel />
    </div>
  );
}